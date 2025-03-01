import { useState } from 'react';
import { Search, Eye } from 'lucide-react';

const avatars = [
  { id: 1, style: 'Humanoid', image: '/avatars/humanoid1.png', label: 'Humanoid' },
  { id: 2, style: 'Humanoid', image: '/avatars/humanoid2.png', label: 'Humanoid' },
  { id: 3, style: 'Humanoid', image: '/avatars/humanoid3.png', label: 'Humanoid' },
  { id: 4, style: 'Humanoid', image: '/avatars/humanoid4.png', label: 'Humanoid' },
  { id: 5, style: 'Humanoid', image: '/avatars/humanoid5.png', label: 'Humanoid' },
  { id: 6, style: 'Furry', image: '/avatars/furry1.png', label: 'Furry' },
  { id: 7, style: 'Furry', image: '/avatars/furry2.png', label: 'Furry' },
  { id: 8, style: 'Furry', image: '/avatars/furry3.png', label: 'Furry' },
  { id: 9, style: 'Furry', image: '/avatars/furry4.png', label: 'Furry' },
  { id: 10, style: 'Furry', image: '/avatars/furry5.png', label: 'Furry' },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter avatars based on search term
  const filteredAvatars = avatars.filter((avatar) =>
    avatar.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
    avatar.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center p-4">
      {/* Header with Search Bar */}
      <header className="w-full mb-8">
        <div className="flex items-left bg-[#222] rounded-full px-4 py-2 shadow-lg">
          <Search className="w-6 h-6 text-gray-400 mx-4" />
          <input
            type="text"
            placeholder="search avatars for style or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          />
        </div>
      </header>

      {/* Avatar Grid */}
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredAvatars.map((avatar) => (
          <div
            key={avatar.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={avatar.image}
              alt={`${avatar.style} avatar ${avatar.id}`}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold">{avatar.label}</h3>
            </div>
          </div>
        ))}
      </main>

      {/* Fallback Message */}
      {filteredAvatars.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No avatars found matching your search.</p>
      )}
    </div>
  );
}