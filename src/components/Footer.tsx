import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <p style={styles.text}>Jack Fowler - 2025</p>
            </div>
        </footer>
    );
};

const styles: Record<string, React.CSSProperties> = {
    footer: {
        backgroundColor: 'var(--stone-950)',
        borderTop: '1px solid var(--stone-800)',
        padding: '2rem 0',
        marginTop: 'auto', // Push to bottom if using flex column layout
    },
    container: {
        textAlign: 'center',
    },
    text: {
        color: 'var(--stone-500)',
        fontSize: '0.9rem',
    }
};

export default Footer;
