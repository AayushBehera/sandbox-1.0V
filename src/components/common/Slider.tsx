import React from 'react';
import { classNames } from '../../utils/helpers';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  className = '',
  ...props
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={classNames('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {showValue && (
            <span className="text-sm font-semibold text-primary-600">{value}</span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          style={{
            background: `linear-gradient(to right, #0066cc 0%, #0066cc ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
          {...props}
        />
      </div>
    </div>
  );
};
