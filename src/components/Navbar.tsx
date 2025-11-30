import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

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
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">Jack Fowler</Link>

                {isMobile ? (
                    <>
                        <button className="hamburger-btn" onClick={toggleMenu}>
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                            <div className="hamburger-line" />
                        </button>

                        {isMenuOpen && (
                            <div className="mobile-menu">
                                <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
                                <Link to="/projects" className="mobile-link" onClick={toggleMenu}>Projects</Link>
                                <Link to="/resume" className="mobile-link" onClick={toggleMenu}>Resume</Link>
                            </div>
                        )}
                    </>
                ) : (
                    <ul className="navbar-links">
                        <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link to="/" className="navbar-link">Home</Link>
                        </li>
                        <li className={`navbar-item ${location.pathname.startsWith('/projects') ? 'active' : ''}`}>
                            <Link to="/projects" className="navbar-link">Projects</Link>
                        </li>
                        <li className={`navbar-item ${location.pathname === '/resume' ? 'active' : ''}`}>
                            <Link to="/resume" className="navbar-link">Resume</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
