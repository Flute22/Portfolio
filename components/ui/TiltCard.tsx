import React, { useRef, useState, MouseEvent } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number; // How strong the tilt is (default 15)
  glow?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  onClick,
  intensity = 15,
  glow = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the center of the card
    // Range: -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Rotate X is based on Y position (tilting up/down)
    // Rotate Y is based on X position (tilting left/right)
    const rotateX = mouseY * -intensity * 2; // Invert for natural feel
    const rotateY = mouseX * intensity * 2;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-300 ease-out perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.05 : 1})`,
      }}
    >
      {/* Glow Effect */}
      {glow && isHovering && (
        <div 
          className="absolute inset-0 bg-primary/10 blur-xl rounded-xl -z-10 transition-opacity duration-300"
        />
      )}
      
      {/* Content */}
      <div className="h-full w-full">
        {children}
      </div>
    </div>
  );
};