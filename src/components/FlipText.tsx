import { useState, useEffect } from 'react';

interface FlipTextProps {
    words: string[];
    duration?: number;
    color?: string;
}

const FlipText = ({ words, duration = 2000, color }: FlipTextProps) => {
    const [index, setIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsFading(false);
            }, 300); // Wait for fade out before switching
        }, duration);

        return () => clearInterval(interval);
    }, [words.length, duration]);

    return (
        <span
            style={{
                display: 'inline-block',
                minWidth: '120px', // Prevent layout shift
                textAlign: 'center',
                color: color || 'inherit',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: isFading ? 0 : 1,
                transform: isFading ? 'translateY(10px)' : 'translateY(0)',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)', // Match parent shadow
                fontWeight: 700,
            }}
        >
            {words[index]}
        </span>
    );
};

export default FlipText;
