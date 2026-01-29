import React from 'react';
import { classNames } from '../../utils/helpers';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-[18px] border border-[#f5f5f5] p-6',
        'shadow-[0_0.42px_0.42px_rgba(22,107,197,0),0_1.6px_1.6px_rgba(22,107,197,0.03),0_7px_7px_rgba(22,107,197,0.13)]',
        hover && 'transition-all duration-300 hover:shadow-[0_0.42px_0.42px_rgba(22,107,197,0),0_1.6px_1.6px_rgba(22,107,197,0.05),0_7px_7px_rgba(22,107,197,0.2)] hover:-translate-y-1 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
