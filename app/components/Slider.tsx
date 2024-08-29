import React, { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  label?: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ min, max, step = 1, value, onChange, trackStyle, handleStyle, label }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center font-system">
      <div className="flex justify-between w-full">
        <label className="font-inter-medium">{label}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        style={{ ...trackStyle, ...handleStyle }}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;