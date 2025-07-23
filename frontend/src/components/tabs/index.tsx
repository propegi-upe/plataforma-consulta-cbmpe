'use client';

import { ReactElement, Children } from 'react';

interface TabsProps {
  children: ReactElement<{ title: string }>[];
  className?: string;
  onChange?: (tabTitle: string) => Promise<void> | void;
  activeKey: string;
  justify?:
    | 'justify-start'
    | 'justify-center'
    | 'justify-between'
    | 'justify-end'
    | 'justify-evenly';
}

export function Tabs({
  children,
  className,
  activeKey,
  onChange,
  justify = 'justify-evenly',
}: TabsProps) {
  const activeIndex = children.findIndex((child) => child.props.title === activeKey);

  return (
    <div className={`w-full ${className || ''}`}>
      <div className={`flex border-b text-md font-medium ${justify}`}>
        {Children.map(children, (child, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => onChange?.(child.props.title)}
              // deixo o texto em negrito
              className={`px-4 py-2 border-b-2 transition-all font-semibold cursor-pointer ${
                isActive
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-400 hover:text-secondary hover:border-secondary'
              }`}
            >
              {child.props.title}
            </button>
          );
        })}
      </div>
      <div className="pt-4">{children[activeIndex]}</div>
    </div>
  );
}
