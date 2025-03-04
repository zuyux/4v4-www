'use client';

import Link from 'next/link';

export default function Navigation({ selectedStyle, onMenuSelect }) {
  return (
    <nav className="bg-transparent p-4 flex justify-between items-center shadow-md">
      <div className="flex space-x-4">
        <select
          value={selectedStyle}
          onChange={(e) => onMenuSelect(e.target.value)}
          className="px-4 py-2 rounded bg-transparent text-black hover:bg-gray-100"
        >
          <option value="low-poly">Low-Poly</option>
          <option value="med">Medium</option>
          <option value="high">High</option>
          <option value="anime">Anime</option>
          <option value="humanoid">Humanoid</option>
        </select>
        {['Hair', 'Eyes', 'Clothing', 'Accessories'].map((item) => (
          <button
            key={item}
            onClick={() => onMenuSelect(item)}
            className="px-4 py-2 rounded bg-transparent text-black hover:bg-gray-100"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/4V4PD.pdf" target="_blank">Docs</Link>
        <Link href="https://github.com/zuyux/4v4-www" target="_blank">Code</Link>
        <span className="text-lg font-semibold">4V4</span>
      </div>
    </nav>
  );
}