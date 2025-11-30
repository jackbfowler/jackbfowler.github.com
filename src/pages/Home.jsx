import PFP from '../assets/PFP.png';
import Timeline from '../components/Timeline';

const Home = () => {
    const photoConfig = {
        scale: 1.5,
        x: -10,
        y: -5
    };

    return (
        <div className="home-page" style={{ paddingTop: '80px' }}>
            <section className="hero section">
                <div className="container" style={{ textAlign: 'left' }}>
                    <div className="profile-photo-container" style={styles.photoContainer}>
                        <img
                            src={PFP}
                            alt="Jack Fowler"
                            style={{
                                ...styles.photo,
                                transform: `scale(${photoConfig.scale}) translate(${photoConfig.x}px, ${photoConfig.y}px)`
                            }}
                        />
                    </div>
                    <h1 style={styles.title}>Jack Fowler</h1>
                    <h2 style={styles.subtitle}>Mechanical Engineering Student @ N.C. State</h2>
                    <p style={styles.summary}>
                        Passionate about designing and building innovative mechanical systems.
                        Experienced in CAD, prototyping, and analysis.
                        Welcome to my portfolio where I showcase my projects and journey.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <a href="/projects" className="btn">View My Work</a>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <Timeline />
                </div>
            </section>
        </div>
    );
};

const styles = {
    photoContainer: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: '2rem',
        // Removed border and shadow
    },
    photo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    title: {
        fontSize: '3.5rem',
        marginBottom: '0.5rem',
        color: 'var(--text-primary)', // Was --stone-50
    },
    subtitle: {
        fontSize: '1.5rem',
        color: 'var(--text-secondary)', // Was --stone-400
        marginBottom: '1.5rem',
        fontWeight: '400',
    },
    summary: {
        maxWidth: '600px',
        fontSize: '1.1rem',
        color: 'var(--text-secondary)', // Uses theme variable
    }
};

export default Home;
