import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Images, Info, Mail, Settings } from 'lucide-react';

const defaultItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Gallery', icon: Images, href: '/gallery' },
    { label: 'About', icon: Info, href: '/about' },
    { label: 'Contact', icon: Mail, href: '/contact' },
];

const InteractiveMenu = ({ items, accentColor, onNavigate }) => {
  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 6;
     return isValid ? items : defaultItems;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
      if (activeIndex >= finalItems.length) setActiveIndex(0);
  }, [finalItems, activeIndex]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemEl = itemRefs.current[activeIndex];
      const activeTextEl = textRefs.current[activeIndex];
      if (activeItemEl && activeTextEl) {
        activeItemEl.style.setProperty('--lineWidth', `${activeTextEl.offsetWidth}px`);
      }
    };
    setLineWidth();
    window.addEventListener('resize', setLineWidth);
    return () => window.removeEventListener('resize', setLineWidth);
  }, [activeIndex, finalItems]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (onNavigate && finalItems[index]?.href) {
      onNavigate(finalItems[index].href);
    }
  };

  const navStyle = {
    '--component-active-color': accentColor || 'var(--component-active-color-default, #2563eb)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '8px 16px',
    gap: '4px',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
  };

  return (
    <nav style={navStyle} role="navigation" aria-label="Mobile navigation">
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={item.label}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleItemClick(index)}
            style={{
              '--lineWidth': '0px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '8px 12px',
              border: 'none',
              background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all  0.2s var(--ease-expo)',
              color: isActive ? '#2563eb' : '#6b7280',
              minWidth: '52px',
              position: 'relative',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <IconComponent
              style={{
                width: '22px',
                height: '22px',
                transition: 'transform  0.2s var(--ease-expo)',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
            />
            <strong
              ref={(el) => (textRefs.current[index] = el)}
              style={{
                fontSize: '10px',
                fontWeight: isActive ? '700' : '500',
                letterSpacing: '0.02em',
                transition: 'all  0.2s var(--ease-expo)',
              }}
            >
              {item.label}
            </strong>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: '-2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'var(--lineWidth)',
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px',
                transition: 'width  0.2s var(--ease-expo)',
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };
export default InteractiveMenu;
