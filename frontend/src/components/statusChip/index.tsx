import React from 'react';

type StatusChipProps = {
  status: string;
  bgColor?: string;
  textColor?: string;
  circleColor?: string;
};

export default function StatusChip({
  status,
  bgColor = 'bg-gray-300',
  textColor = 'text-black',
  circleColor = 'bg-gray-400',
}: StatusChipProps) {
  return (
    <div className={`flex gap-2 items-center mt-2 ${bgColor} px-2 py-1 rounded-full ${textColor}`}>
      <div className={`inline-block w-4 h-4 rounded-full ${circleColor}`} />
      <span>{status}</span>
    </div>
  );
}
