'use client';

import { Share2, Download, Save, RefreshCw, Info } from 'lucide-react'; // Import icons here

export default function RightPanel({
  brushSize,
  texture,
  background,
  onBrushSizeChange,
  onTextureUpload,
  onBackgroundChange,
  onShare,
  onDownload,
  onMint,
  onReset,
  onInfo,
}) {
  return (
    <aside className="w-1/6 bg-transparent p-4 flex flex-col space-y-4">
      <div>
        <label className="block text-sm mb-2">Brush Sizes</label>
        <div className="flex flex-col space-y-2">
          {['large', 'medium', 'small'].map((size) => (
            <button
              key={size}
              onClick={() => onBrushSizeChange(size)}
              className={`w-${size === 'large' ? 8 : size === 'medium' ? 6 : 4} h-${
                size === 'large' ? 8 : size === 'medium' ? 6 : 4
              } bg-gray-100 rounded-full ${brushSize === size ? 'border-2 border-blue-500' : ''}`}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2">Textures</label>
        <input
          type="file"
          accept="image/*"
          onChange={onTextureUpload}
          className="mb-2"
        />
      </div>
      <div>
        <label htmlFor="backgroundPicker" className="block text-sm mb-2">Backgrounds</label>
        <input
          id="backgroundPicker"
          type="color"
          value={background}
          onChange={(e) => onBackgroundChange(e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <button onClick={onShare} className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <Share2 className="mr-2" /> Share
        </button>
        <button onClick={onDownload} className="px-2 py-2 bg-transparent rounded hover:bg-gray-100 flex items-center">
          <Download className="mr-2" /> Download
        </button>
        <button
          onClick={onMint}
          className={`px-2 py-2 flex items-center`}
        >
          <Save className="mr-2" /> Mint
        </button>
        <button onClick={onReset} className="px-2 py-2 bg-transparent rounded hover:bg-gray-100 flex items-center">
          <RefreshCw className="mr-2" /> Reset
        </button>
        <button onClick={onInfo} className="px-2 py-2 bg-transparent rounded hover:bg-gray-100 flex items-center">
          <Info className="mr-2" /> Info
        </button>
      </div>
    </aside>
  );
}