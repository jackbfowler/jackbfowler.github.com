import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>Jack Fowler</Link>

                {isMobile ? (
                    <>
                        <button style={styles.hamburgerBtn} onClick={toggleMenu}>
                            <div style={styles.hamburgerLine} />
                            <div style={styles.hamburgerLine} />
                            <div style={styles.hamburgerLine} />
                        </button>

                        {isMenuOpen && (
                            <div style={styles.mobileMenu}>
                                <Link to="/" style={styles.mobileLink} onClick={toggleMenu}>Home</Link>
                                <Link to="/projects" style={styles.mobileLink} onClick={toggleMenu}>Projects</Link>
                                <Link to="/resume" style={styles.mobileLink} onClick={toggleMenu}>Resume</Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={styles.links}>
                        <Link to="/" style={styles.link}>Home</Link>
                        <Link to="/projects" style={styles.link}>Projects</Link>
                        <Link to="/resume" style={styles.link}>Resume</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const styles: Record<string, React.CSSProperties> = {
    nav: {
        backgroundColor: 'var(--stone-950)', // Solid dark background
        position: 'relative', // Push content down
        width: '100%',
        zIndex: 1000,
        padding: '1rem 0',
        borderBottom: '1px solid var(--stone-800)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative', // For absolute mobile menu
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--stone-50)', // Light text
    },
    links: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        fontWeight: '500',
        fontSize: '1rem',
        color: 'var(--stone-300)', // Light text
    },
    hamburgerBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '0.5rem',
    },
    hamburgerLine: {
        width: '25px',
        height: '2px',
        backgroundColor: 'var(--stone-50)',
        borderRadius: '2px',
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'var(--stone-900)',
        border: '1px solid var(--stone-800)',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 1001,
        minWidth: '150px',
    },
    mobileLink: {
        fontWeight: '500',
        fontSize: '1rem',
        color: 'var(--stone-300)',
        textDecoration: 'none',
        display: 'block',
        padding: '0.5rem',
    }
};

export default Navbar;
