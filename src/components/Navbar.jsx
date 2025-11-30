import { Link } from 'react-router-dom';

// Actually, let's keep it simple and use a module or just classes from index.css + specific styles.
// I'll add specific styles here as a style object or create a css file.
// Let's create a CSS file for it later if needed, but for now I'll use a simple style block or just classes.

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>Jack Fowler</Link>
                <div style={styles.links}>
                    <Link to="/" style={styles.link}>Home</Link>
                    <Link to="/projects" style={styles.link}>Projects</Link>
                    <Link to="/resume" style={styles.link}>Resume</Link>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: 'rgba(12, 10, 9, 0.8)', // Stone 950 with opacity
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        borderBottom: '1px solid var(--stone-800)',
        padding: '1rem 0',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--stone-50)',
    },
    links: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        fontWeight: '500',
        fontSize: '1rem',
        color: 'var(--stone-300)',
    }
};

export default Navbar;
