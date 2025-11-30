import React, { useMemo, useState } from 'react';
import { experienceData } from '../data/experience';

const Timeline = () => {
    const TOTAL_SEMESTERS = 7; // User-defined total semesters
    const SEMESTER_HEIGHT = 70; // px per semester
    const TRACK_WIDTH = 20; // px
    const LABEL_OFFSET = 40;
    const LOGO_OFFSET_X = -100;
    const COLUMN_OFFSET_X = 20; // Extra offset for columns 1 & 2

    const [selectedItem, setSelectedItem] = useState(null);

    // 1. Process Data & Calculate Layout
    const { processedData, totalSemesters, maxTrack } = useMemo(() => {
        // Find max semester and max track
        let maxSem = 0;
        let maxTrk = 0;

        experienceData.forEach(item => {
            if (item.semesterEnd > maxSem) maxSem = item.semesterEnd;
            if (item.track > maxTrk) maxTrk = item.track;
        });

        // Calculate Layout based on Semesters


        const finalData = experienceData.map(item => {
            // Height in units
            const duration = item.semesterEnd - item.semesterStart;

            // Bottom Position (Semester 1 is at 0)
            // item.semesterStart = 1 -> Bottom = 0
            const bottomUnits = item.semesterStart - 1;

            return {
                ...item,
                bottomUnits,
                heightUnits: duration || 0.5 // Minimal height
            };
        });

        return {
            processedData: finalData,
            totalSemesters: TOTAL_SEMESTERS, // Use fixed count
            maxTrack: maxTrk
        };
    }, []);

    const TOTAL_TRACK_WIDTH = (maxTrack + 1) * TRACK_WIDTH;

    return (
        <div className="timeline-container" style={styles.container}>
            {/* Header Removed */}

            <div style={{ ...styles.timelineWrapper, height: `${totalSemesters * SEMESTER_HEIGHT + 50}px` }}>

                {/* Present Day Split Line (Mask) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: `${totalSemesters * SEMESTER_HEIGHT}px`,
                        left: '0', // Start at the first track
                        width: `${maxTrack * TRACK_WIDTH + 8}px`, // Exact width of the tracks (last track starts at maxTrack*20 and is 8px wide)
                        height: '10px', // Thickness of the split
                        backgroundColor: 'var(--bg-primary)', // Match background to create "cut" effect
                        zIndex: 20, // Above the bars
                    }}
                />
                {/* Label Removed */}

                {/* Render Tracks & Labels */}
                {processedData.map((item) => {
                    const isSelected = selectedItem?.id === item.id;

                    // Layout Logic
                    const leftPos = item.track * TRACK_WIDTH;

                    // Dynamic Label Position:
                    // Base Offset + Global Logo Offset + (Track Index * Column Spacing)
                    const labelLeft = TOTAL_TRACK_WIDTH + LABEL_OFFSET + LOGO_OFFSET_X + (item.track * COLUMN_OFFSET_X);

                    // Vertical Position
                    const bottomPos = item.bottomUnits * SEMESTER_HEIGHT;
                    let height = item.heightUnits * SEMESTER_HEIGHT;

                    // Stagger "Present" items to avoid overlap
                    // Reverse Stagger: Track 0 is Tallest.
                    // Max height extension = Base + (MaxTrack * Step)
                    // Track 0 extension = Base + (MaxTrack * Step)
                    // Track N extension = Base + ((MaxTrack - N) * Step)
                    if (item.endDate === 'Present') {
                        const step = 80;
                        const baseExtension = 60;
                        // Use maxTrack from closure
                        const stagger = (maxTrack - item.track) * step;
                        height += baseExtension + stagger;
                    }

                    // Border Radius Logic
                    // "Pill shaped at top and bottom"
                    // "Cutoff at present day can still be sharp"
                    // Since bars grow UPWARDS:
                    // Bottom = Start Date
                    // Top = End Date
                    // Present items (ongoing) -> Sharp Top, Rounded Bottom
                    // Past items (finished) -> Rounded Top, Rounded Bottom
                    const borderRadius = item.endDate === 'Present' ? '0 0 4px 4px' : '4px';

                    return (
                        <React.Fragment key={item.id}>
                            {/* Vertical Line */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: `${leftPos}px`,
                                    bottom: `${bottomPos}px`,
                                    height: `${height}px`,
                                    width: '8px', // Slightly thicker
                                    backgroundColor: item.color,
                                    borderRadius: borderRadius, // Apply dynamic radius
                                    zIndex: 10,
                                    cursor: 'pointer',
                                    opacity: selectedItem && !isSelected ? 0.3 : 1,
                                    transition: 'opacity 0.3s',
                                }}
                                onClick={() => setSelectedItem(item)}
                            />

                            {/* Label Group - Aligned to TOP of bar */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: `${bottomPos + height}px`, // Top of the bar
                                    left: `${labelLeft}px`,
                                    transform: 'translateY(100%)', // Move DOWN so top aligns with anchor
                                    display: 'flex',
                                    alignItems: 'flex-start', // Top align
                                    gap: '1rem',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer',
                                    opacity: selectedItem && !isSelected ? 0.3 : 1,
                                    transition: 'opacity 0.3s',
                                    // paddingLeft removed, handled by labelLeft
                                    // The top of this div is at `bottomPos + height`.
                                    // If we want the top of the logo to be level with it, we just need to ensure the image is the first thing.
                                    // And we might need to offset it slightly if the line has a cap or something, but here it's just a div.
                                }}
                                onClick={() => setSelectedItem(item)}
                            >
                                {/* Logo Image Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                }}>
                                    <div style={{
                                        backgroundColor: item.logoBg || 'transparent',
                                        padding: item.logoBg ? '4px 8px' : '0',
                                        borderRadius: '4px',
                                        display: 'flex', // Ensure image fits
                                    }}>
                                        <img
                                            src={item.logo}
                                            alt={item.company}
                                            style={{
                                                maxHeight: '50px', // Limit height
                                                maxWidth: '120px', // Limit width
                                                height: 'auto', // Allow natural height
                                                width: 'auto', // Allow natural width
                                                display: 'block', // Remove inline spacing
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Hidden Title (Accessible but visually replaced by logo) */}
                                {/* <div>
                                    <h3 style={{ ...styles.role, color: isSelected ? item.color : 'var(--stone-50)', margin: 0, lineHeight: 1 }}>
                                        {item.company}
                                    </h3>
                                </div> */}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Detail Modal */}
            {selectedItem && (
                <div style={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button style={styles.closeBtn} onClick={() => setSelectedItem(null)}>×</button>

                        <div style={styles.modalHeader}>
                            <span style={{ fontSize: '3rem', marginRight: '1rem' }}>{selectedItem.logo}</span>
                            <div>
                                <h3 style={{ ...styles.modalTitle, color: selectedItem.color }}>{selectedItem.company}</h3>
                                <h4 style={styles.modalRole}>{selectedItem.role}</h4>
                            </div>
                        </div>

                        <div style={styles.modalDates}>
                            {selectedItem.startDate} — {selectedItem.endDate}
                        </div>

                        <p style={styles.modalDesc}>{selectedItem.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        marginTop: '10rem',
        position: 'relative',
        width: '100%',
        maxWidth: '480px', // Restrict to left thirdish
    },
    header: {
        marginBottom: '3rem',
        fontSize: '2.5rem',
        color: 'var(--stone-50)',
    },
    timelineWrapper: {
        position: 'relative',
        width: '100%',
    },
    role: {
        fontSize: '1.2rem',
        fontWeight: '700',
        transition: 'color 0.2s',
    },
    dates: {
        fontSize: '0.9rem',
        color: 'var(--stone-400)',
    },
    moreBtn: {
        marginLeft: '1rem',
        padding: '0.25rem 0.75rem',
        fontSize: '0.8rem',
        backgroundColor: 'var(--stone-800)',
        color: 'var(--stone-300)',
        border: '1px solid var(--stone-700)',
        borderRadius: '12px',
        cursor: 'pointer',
    },
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '2rem',
    },
    modalContent: {
        backgroundColor: 'var(--stone-900)',
        border: '1px solid var(--stone-700)',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    closeBtn: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        color: 'var(--stone-400)',
        fontSize: '2rem',
        cursor: 'pointer',
        lineHeight: 1,
    },
    modalHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    modalTitle: {
        fontSize: '2rem',
        marginBottom: '0.25rem',
    },
    modalRole: {
        fontSize: '1.2rem',
        color: 'var(--stone-300)',
    },
    modalDates: {
        fontSize: '1rem',
        color: 'var(--stone-500)',
        marginBottom: '1.5rem',
        fontFamily: 'monospace',
        borderBottom: '1px solid var(--stone-800)',
        paddingBottom: '1rem',
    },
    modalDesc: {
        fontSize: '1.1rem',
        color: 'var(--stone-200)',
        lineHeight: 1.6,
    }
};

export default Timeline;
