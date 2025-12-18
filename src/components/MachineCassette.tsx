
import { useEffect, useRef } from 'react';
import './MachineCassette.css';
import { machines } from '../data/machines';

const MachineCassette = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Create a tripled buffer for infinite scrolling
    const extendedMachines = [...machines, ...machines, ...machines];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Auto-scroll logic
        const scrollInterval = setInterval(() => {
            if (!scrollContainer) return;

            const cardWidth = scrollContainer.querySelector('.machine-card')?.clientWidth || 0;
            const gap = 24; // 1.5rem gap (approx 24px)
            const scrollAmount = cardWidth + gap;

            // Current scroll position
            const currentScroll = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth / 3; // Approx width of one set

            // If we are in the last third, jump back to the first third instantly
            if (currentScroll >= maxScroll * 2) {
                scrollContainer.scrollTo({
                    left: currentScroll - maxScroll,
                    behavior: 'auto' // Instant jump
                });
                // Small delay to allow jump to render before scrolling again
                setTimeout(() => {
                    scrollContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }, 50);
            } else {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, 2000);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="machine-cassette-section">
            <h2 className="machine-cassette-title">Tools I've Used</h2>
            <div className="machine-cassette-wrapper">
                <div className="machine-cassette-scroll" ref={scrollRef}>
                    {extendedMachines.map((machine, index) => (
                        <div key={`${machine.id}-${index}`} className="machine-card">
                            <img src={machine.image} alt={machine.name} />
                            <div className="machine-info-overlay">
                                <div className="machine-name">{machine.name}</div>
                                <div className="machine-desc">{machine.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cassette-edge cassette-edge-left"></div>
                <div className="cassette-edge cassette-edge-right"></div>
            </div>
        </div>
    );
};

export default MachineCassette;
