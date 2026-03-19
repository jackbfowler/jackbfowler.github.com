% Robot and load parameters
L1 = 1; L2 = 1;                  % Link lengths (m)
m_link = 1.08;                   % Mass of each link (kg) - aluminum 6061 (2700 kg/m³ * 1m * 0.02m * 0.02m)
m_box = 0.138;                   % Mass of box (kg) - (2700 kg/m³ * 0.08m * 0.08m * 0.08m)
m_end = 0.5;                     % Mass of end effector (kg)
m_load = m_box + m_end;          % Total end load mass (kg)
g = 9.81;                        % Gravity (m/s²)

% Calculate moments of inertia
% For rectangular links about CM: (1/12)*m*(l² + w²)
I_cm_link = (1/12) * m_link * (1^2 + 0.02^2);
% For cube about CM: (1/6)*m*l²
I_cm_cube = (1/6) * m_box * 0.08^2;

% Time vector
t = linspace(0, 5, 100);

% Define start and end positions
start_x = -1.25;  % Starting x coordinate
start_y = -0.5;   % Starting y coordinate
end_x = -1.25;    % Ending x coordinate
end_y = 1.5;      % Ending y coordinate

% Time vector
t = linspace(0, 5, 100);

% Trajectory planning
% Linear interpolation for x (if start_x no equal end_x)
x = start_x + (end_x - start_x) * (t/5);

% smooth polynomial for y using quintic polynomial
% y(t) = a0 + a1*t + a2*t^2 + a3*t^3 + a4*t^4 + a5*t^5
% Ensures zero velocity and acceleration at start and end
tf = 5;  % Final time
a0 = start_y;
a1 = 0;  % Zero initial velocity
a2 = 0;  % Zero initial acceleration
a3 = 10*(end_y - start_y)/tf^3;
a4 = -15*(end_y - start_y)/tf^4;
a5 = 6*(end_y - start_y)/tf^5;

% trajectory
y = a0 + a1*t + a2*t.^2 + a3*t.^3 + a4*t.^4 + a5*t.^5;

% first and second derivatives for PATH velocity and acceleration
dy_dt = a1 + 2*a2*t + 3*a3*t.^2 + 4*a4*t.^3 + 5*a5*t.^4;
d2y_dt2 = 2*a2 + 6*a3*t + 12*a4*t.^2 + 20*a5*t.^3;

% Main calculation loop
for i = 1:length(t)
    % Inverse Kinematics
    c2 = (x(i)^2 + y(i)^2 - L1^2 - L2^2)/(2*L1*L2);
    c2 = max(min(c2, 1), -1);               % Avoid numerical issues
    s2 = sqrt(1 - c2^2);
    theta2(i) = atan2(s2, c2);
    
    k1 = L1 + L2*c2;
    k2 = L2*s2;
    theta1(i) = wrapToPi(atan2(y(i), x(i)) - atan2(k2, k1));
    
    % Handle angle discontinuities
    if i > 1
        diff1 = theta1(i) - theta1(i-1);
        if abs(diff1) > pi
            theta1(i) = theta1(i) - sign(diff1) * 2*pi;
        end
        diff2 = theta2(i) - theta2(i-1);
        if abs(diff2) > pi
            theta2(i) = theta2(i) - sign(diff2) * 2*pi;
        end
    end
    
    % Jacobian matrix
    J = [-L1*sin(theta1(i))-L2*sin(theta1(i)+theta2(i)), -L2*sin(theta1(i)+theta2(i));
         L1*cos(theta1(i))+L2*cos(theta1(i)+theta2(i)),  L2*cos(theta1(i)+theta2(i))];
    
    % Calculate joint velocities
    dq = J \ [0; dy_dt(i)];
    v1(i) = dq(1);
    v2(i) = dq(2);
    
    % Calculate joint accelerations
    dJ1 = [-L1*cos(theta1(i))*v1(i)-L2*cos(theta1(i)+theta2(i))*(v1(i)+v2(i)), -L2*cos(theta1(i)+theta2(i))*(v1(i)+v2(i));
           -L1*sin(theta1(i))*v1(i)-L2*sin(theta1(i)+theta2(i))*(v1(i)+v2(i)), -L2*sin(theta1(i)+theta2(i))*(v1(i)+v2(i))];
    d2q = J \ ([0; d2y_dt2(i)] - dJ1 * [v1(i); v2(i)]);
    a1(i) = d2q(1);
    a2(i) = d2q(2);
    
    % Calculate torques for Joint 2
    % Gravity torque
    tau2_g = (m_link*g*L2/2 + m_load*g*L2) * cos(theta1(i) + theta2(i));
    
    % Inertial components using parallel axis theorem
    I2_arm = I_cm_link + m_link*(L2/2)^2;           % Link 2 about joint 2
    I2_load = I_cm_cube + m_load*L2^2;              % Load about joint 2
    
    tau2(i) = tau2_g + (I2_arm + I2_load)*a2(i);    % Total joint 2 torque
    
    % Calculate torques for Joint 1
    % Gravity torques
    tau1_g1 = m_link*g*L1/2 * cos(theta1(i));       % Link 1
    tau1_g2 = m_link*g * (L1*cos(theta1(i)) + L2/2*cos(theta1(i)+theta2(i))); % Link 2
    tau1_g3 = m_load*g * (L1*cos(theta1(i)) + L2*cos(theta1(i)+theta2(i)));   % End load
    
    % Inertial components
    I1_arm = I_cm_link + m_link*(L1/2)^2;           % Link 1 about base
    I2_about_1 = I_cm_link + m_link*(L1^2 + L2^2/4 + L1*L2*cos(theta2(i))); % Link 2 about base
    I_load_1 = I_cm_cube + m_load*(L1^2 + L2^2 + 2*L1*L2*cos(theta2(i)));   % Load about base
    
    tau1(i) = tau1_g1 + tau1_g2 + tau1_g3 + (I1_arm + I2_about_1 + I_load_1)*a1(i);
end

%END OF DYNAMICS, REST IS JUST VISUALIZATION


% Create animation figure
figure('Position', [100 100 1000 800])
axis([-2 2 -2 2])
grid on
hold on
axis equal



% Create video writer object
v = VideoWriter('robot_animation.avi');
v.FrameRate = 30;
open(v);

% Animation loop
for i = 1:length(t)
    % Calculate joint positions
    x1 = L1*cos(theta1(i));
    y1 = L1*sin(theta1(i));
    x2 = x1 + L2*cos(theta1(i) + theta2(i));
    y2 = y1 + L2*sin(theta1(i) + theta2(i));
    
    % Clear previous frame
    cla
    
    % Plot robot links
    link1 = plot([0 x1], [0 y1], 'b-', 'LineWidth', 2);
    link2 = plot([x1 x2], [y1 y2], 'r-', 'LineWidth', 2);
    
    % Plot joints
    joint1 = plot(0, 0, 'ko', 'MarkerFaceColor', 'k', 'MarkerSize', 10);
    joint2 = plot(x1, y1, 'ko', 'MarkerFaceColor', 'k', 'MarkerSize', 10);
    endpoint = plot(x2, y2, 'ko', 'MarkerFaceColor', 'k', 'MarkerSize', 10);
    
    % Plot trajectory
    traj = plot(x(1:i), y(1:i), 'g--');
    % Plot angle representations
% For theta1
radius1 = 0.3; % Radius of the arc
theta1_arc = linspace(0, theta1(i), 20);
x1_arc = radius1 * cos(theta1_arc);
y1_arc = radius1 * sin(theta1_arc);
plot(x1_arc, y1_arc, 'b:', 'LineWidth', 1.5)
text(radius1/2, radius1/2, ['\theta_1 = ' num2str(round(theta1(i)*180/pi,1)) '°'], ...
    'Color', 'blue')

% For theta2
radius2 = 0.2; % Radius of the arc
theta2_arc = linspace(theta1(i), theta1(i)+theta2(i), 20);
x2_arc = x1 + radius2 * cos(theta2_arc);
y2_arc = y1 + radius2 * sin(theta2_arc);
plot(x2_arc, y2_arc, 'r:', 'LineWidth', 1.5)
text(x1+radius2/2*cos(theta1(i)+theta2(i)/2), ...
    y1+radius2/2*sin(theta1(i)+theta2(i)/2), ...
    ['\theta_2 = ' num2str(round(theta2(i)*180/pi,1)) '°'], ...
    'Color', 'red')

    % Calculate centers of mass
    x1_cm = L1/2*cos(theta1(i));
    y1_cm = L1/2*sin(theta1(i));
    x2_cm = x1 + L2/2*cos(theta1(i) + theta2(i));
    y2_cm = y1 + L2/2*sin(theta1(i) + theta2(i));
    
    % Draw center of mass points (small x markers)
    plot(x1_cm, y1_cm, 'kx', 'MarkerSize', 8)
    plot(x2_cm, y2_cm, 'kx', 'MarkerSize', 8)
    
    % Force vector scaling factor
    force_scale = 0.1;  % Adjust for better visualization
    torque_scale = 0.01;
    
    % Plot gravity force vectors at centers of mass
    g1 = quiver(x1_cm, y1_cm, 0, -m_link*g*force_scale, 'r', 'LineWidth', 1.5, 'MaxHeadSize', 0.5);
    g2 = quiver(x2_cm, y2_cm, 0, -m_link*g*force_scale, 'r', 'LineWidth', 1.5, 'MaxHeadSize', 0.5);
    g3 = quiver(x2, y2, 0, -m_load*g*force_scale, 'r', 'LineWidth', 1.5, 'MaxHeadSize', 0.5);
    
    % Plot torque vectors (scaled circular arrows)
    % Joint 1 torque
    if abs(tau1(i)) > 0.1
        radius = 0.15;
        theta_arrow = linspace(0, sign(tau1(i))*pi/2, 20);
        x_arrow = radius*cos(theta_arrow);
        y_arrow = radius*sin(theta_arrow);
        t1 = plot(x_arrow, y_arrow, 'b', 'LineWidth', 2);
        % Add arrowhead
        arrow_angle = sign(tau1(i)) * pi/2;
        quiver(radius*cos(arrow_angle), radius*sin(arrow_angle), ...
               -0.05*sin(arrow_angle), 0.05*cos(arrow_angle), ...
               'b', 'LineWidth', 2, 'MaxHeadSize', 1);
    end
    
    % Joint 2 torque
    if abs(tau2(i)) > 0.1
        radius = 0.15;
        theta_arrow = linspace(0, sign(tau2(i))*pi/2, 20);
        x_arrow = x1 + radius*cos(theta_arrow);
        y_arrow = y1 + radius*sin(theta_arrow);
        t2 = plot(x_arrow, y_arrow, 'b', 'LineWidth', 2);
        % Add arrowhead
        arrow_angle = sign(tau2(i)) * pi/2;
        quiver(x1 + radius*cos(arrow_angle), y1 + radius*sin(arrow_angle), ...
               -0.05*sin(arrow_angle), 0.05*cos(arrow_angle), ...
               'b', 'LineWidth', 2, 'MaxHeadSize', 1);
    end
    
    % Draw box at end effector
    box_size = 0.08; % 8cm box
    box_x = [x2-box_size/2, x2+box_size/2, x2+box_size/2, x2-box_size/2, x2-box_size/2];
    box_y = [y2-box_size/2, y2-box_size/2, y2+box_size/2, y2+box_size/2, y2-box_size/2];
    box_plot = plot(box_x, box_y, 'k-', 'LineWidth', 1.5);
    
    % Add title and labels
    title('2-DOF Robot Arm Animation with Forces and Torques')
    xlabel('X Position (m)')
    ylabel('Y Position (m)')
    
    % Add legend
    legend([link1, link2, joint1, g1, t1, box_plot], ...
           {'Link 1', 'Link 2', 'Joints', 'Gravity Forces', 'Joint Torques', 'Load'}, ...
           'Location', 'eastoutside')
    
    % Update axis limits and grid
    axis([-2 2 -2 2])
    grid on
    
    % Capture frame
    drawnow
    frame = getframe(gcf);
    writeVideo(v, frame);
end

% Close video file
close(v);



% Calculate power for each joint
P1 = tau1 .* v1;  % Power at joint 1 (W)
P2 = tau2 .* v2;  % Power at joint 2 (W)

% Calculate total energy used by integrating power
E1 = trapz(t, abs(P1));  % Energy used by joint 1 (Joules)
E2 = trapz(t, abs(P2));  % Energy used by joint 2 (Joules)

% Create animation figure and run animation

% Create analysis plots
figure('Position', [100 100 800 1000]);  % Made taller for extra subplot

% Joint angles plot
subplot(5,1,1)
plot(t, theta1, 'b-', t, theta2, 'r--')
title('Joint Angles')
ylabel('Angle (rad)')
legend('Joint 1', 'Joint 2')
grid on

% Joint velocities plot
subplot(5,1,2)
plot(t, v1, 'b-', t, v2, 'r--')
title('Joint Velocities')
ylabel('Velocity (rad/s)')
legend('Joint 1', 'Joint 2')
grid on

% Joint accelerations plot
subplot(5,1,3)
plot(t, a1, 'b-', t, a2, 'r--')
title('Joint Accelerations')
ylabel('Acceleration (rad/s^2)')
legend('Joint 1', 'Joint 2')
grid on

% Joint torques plot
subplot(5,1,4)
plot(t, tau1, 'b-', t, tau2, 'r--')
title('Joint Torques')
ylabel('Torque (N⋅m)')
legend('Joint 1', 'Joint 2')
grid on

% Joint power plot
subplot(5,1,5)
plot(t, P1, 'b-', t, P2, 'r--')
title(sprintf('Joint Power (Total Energy: J1=%.2f J, J2=%.2f J)', E1, E2))
xlabel('Time (s)')
ylabel('Power (W)')
legend('Joint 1', 'Joint 2')
grid on