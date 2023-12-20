import React, { useState, ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

// Tooltip component
const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);
  
    const handleMouseEnter = () => {
      setShowTooltip(true);
    };
  
    const handleMouseLeave = () => {
      setShowTooltip(false);
    };
  
    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-block"
        >
          {children}
        </div>
        {showTooltip && (
            
          <div className="absolute bottom-full left-1/7 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
            {text}
          </div>
        )}
      </div>
    );
};


export default Tooltip;

