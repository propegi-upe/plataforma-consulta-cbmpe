'use client';
import React from 'react';

export function Tab({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
