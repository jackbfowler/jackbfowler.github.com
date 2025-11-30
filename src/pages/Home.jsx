import PFP from '../assets/PFP.png';
import Timeline from '../components/Timeline';
import HomeBackground from '../assets/HomeBackground.png';

const Home = () => {
    const photoConfig = {
        scale: 1.5,
        x: -10,
        y: -5
    };

    return (
        <div className="home-page">
            <section className="hero section" style={{
                backgroundImage: `url(${HomeBackground})`,
                backgroundSize: 'cover', // Ensures text is always contained
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                paddingTop: '4rem', // Reduced distance from navbar
                paddingBottom: '4rem', // Ensure image extends below text
            }}>
                <div className="container" style={{ textAlign: 'left', width: '100%' }}>
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
                        Bincent Bincent Bincent
                    </p>
                    {/* View My Work button removed */}
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
        border: '4px solid var(--stone-50)', // Keep white border for contrast
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        marginBottom: '2rem',
        position: 'relative',
    },
    photo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    title: {
        fontSize: '3.5rem',
        marginBottom: '0.5rem',
        color: 'var(--stone-50)', // Light text
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        color: 'var(--stone-200)', // Light text
        fontWeight: '500',
    },
    summary: {
        maxWidth: '600px',
        fontSize: '1.1rem',
        color: 'var(--stone-300)', // Light text
    }
};

export default Home;
