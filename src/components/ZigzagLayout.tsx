import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './ZigzagLayout.css';

interface ZigzagItem {
    id: string | number;
    title?: string;
    text: React.ReactNode;
    media?: string | React.ReactNode;
    caption?: string;
}

interface ZigzagLayoutProps {
    items: ZigzagItem[];
}

const ZigzagLayout: React.FC<ZigzagLayoutProps> = ({ items }) => {
    const isVideo = (url: string) => {
        return /\.(mp4|webm|ogg|mov)$/i.test(url);
    };

    return (
        <div className="zigzag-container">
            {items.map((item) => (
                <div key={item.id} className="zigzag-row">
                    <div className="zigzag-text">
                        {item.title && <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--stone-100)' }}>{item.title}</h3>}
                        <div style={{ lineHeight: '1.6', color: 'var(--stone-300)' }}>
                            {item.text}
                        </div>
                    </div>
                    <div className="zigzag-image">
                        {typeof item.media === 'string' ? (
                            isVideo(item.media) ? (
                                <video
                                    src={item.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                            ) : (
                                <Zoom>
                                    <img src={item.media} alt={item.title || 'Project media'} />
                                </Zoom>
                            )
                        ) : item.media ? (
                            item.media
                        ) : (
                            <div className="placeholder">Media Container</div>
                        )}
                        {item.caption && <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--stone-500)', marginTop: '0.5rem' }}>{item.caption}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ZigzagLayout;
