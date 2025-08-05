import React from 'react';

type StatusChipProps = {
  status: string;
  bgColor?: string;
  textColor?: string;
  isCircle?: boolean;
  circleColor?: string;
  className?: string;
};

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  bgColor = 'bg-gray-300',
  textColor = 'text-black',
  isCircle = true,
  circleColor = 'bg-gray-400',
  className = '',
}) => {
  return (
    <div
      className={`flex gap-2 items-center justify-center mt-2 ${bgColor} px-2 py-1 rounded-full ${textColor} ${className}`}
    >
      {isCircle && <div className={`inline-block w-4 h-4 rounded-full ${circleColor}`} />}
      <span>{status}</span>
    </div>
  );
};

export { StatusChip };
