import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = true,
  circle = false,
}) => {
  const baseStyles = 'bg-gray-200 relative overflow-hidden';
  const shapeStyles = circle ? 'rounded-full' : rounded ? 'rounded' : '';
  
  return (
    <div 
      className={`${baseStyles} ${height} ${width} ${shapeStyles} ${className}`}
      aria-hidden="true"
    >
      <div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
        style={{ transform: 'translateX(-100%)' }}
      ></div>
    </div>
  );
};

export default Skeleton;