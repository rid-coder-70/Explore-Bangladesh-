import React from 'react';

export const RocketLoader = ({ scale = 1 }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      transform: `scale(${scale})`
    }}>
      <div className="loader-container">
        <div className="clouds">
          <div className="cloud cloud1" />
          <div className="cloud cloud2" />
          <div className="cloud cloud3" />
          <div className="cloud cloud4" />
          <div className="cloud cloud5" />
        </div>
        <div className="loader">
          <span><span /><span /><span /><span /></span>
          <div className="base">
            <span />
            <div className="face" />
          </div>
        </div>
        <div className="longfazers">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
};

// Simple per-image skeleton with shimmer
export const ImageSkeleton = ({ className, style }) => (
  <div
    className={`img-skeleton ${className || ''}`}
    style={{
      background: 'linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '12px',
      ...style,
    }}
  />
);

export default RocketLoader;
