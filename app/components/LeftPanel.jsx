'use client';

export default function LeftPanel({ color, secondaryColor, onColorChange, onSecondaryColorChange }) {
  return (
    <aside className="w-1/6 bg-white p-4 flex flex-col space-y-4">
      <div>
        <label htmlFor="colorPicker" className="block text-sm mb-2">Primary Color</label>
        <input
          id="colorPicker"
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="secondaryColorPicker" className="block text-sm mb-2">Secondary Color</label>
        <input
          id="secondaryColorPicker"
          type="color"
          value={secondaryColor}
          onChange={(e) => onSecondaryColorChange(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
    </aside>
  );
}