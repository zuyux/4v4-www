'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import DarkNav from '@/app/components/features/navigation/DarkNav';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const avatars = [
  {
    id: 1,
    style: 'Humanoid',
    image: 'bafybeihnx3r23526qawtsbxqryhmdbib5ln7c724fnolqjf44vjdtudtx4',
    label: 'H#001',
  },
  {
    id: 2,
    style: 'Humanoid',
    image: 'bafybeigukzetucpxsujjxhuzxubh5y5a2uzsfkdwzce675g6rbk36z7q2a',
    label: 'H#002',
  },
  {
    id: 3,
    style: 'Humanoid',
    image: 'bafybeie6wihrks7wsjf3cmzq6wqgjzc75flefuegqk4upuiems62y6y5ly',
    label: 'H#003',
  },
  {
    id: 4,
    style: 'Humanoid',
    image: 'bafybeidx4jriyrgi3lpmbnoxlxseykdppgtaynqkf2owhyve5lkf2igtwi',
    label: 'H#004',
  },
  {
    id: 5,
    style: 'Humanoid',
    image: 'bafybeihdy22szbvrgwsdzaw7gc6w5qtfok57xarjvt5rt5mxelkxu3555y',
    label: 'H#005',
  },
  {
    id: 6,
    style: 'Furry',
    image: 'bafybeifk5jhxxk6kyqwdcny3fibgzi4zop2hbkhwzmhibii6ozz2nx2kyq',
    label: 'F#001',
  },
  {
    id: 7,
    style: 'Furry',
    image: 'bafybeihn3ahpol4y33u5zu6kua5wyh5cpl4sswpsmrwwpl73g7y7b47wf4',
    label: 'F#002',
  },
  {
    id: 8,
    style: 'Furry',
    image: 'bafybeifxhsznol2roysbp5zvhv6ook6r35ceklmipdnldeiylq2dhxni3m',
    label: 'F#003',
  },
  {
    id: 9,
    style: 'Furry',
    image: 'bafybeia7ovuostg4uorcfryxgeullecpmlg7l7tsdvfdlt3ptrj6su47wi',
    label: 'F#004',
  },
  {
    id: 10,
    style: 'Furry',
    image: 'bafybeiet7gdeoxksztciltgb43tdityk2otjoqiatojbcyfacr3lfbyroy',
    label: 'F#005',
  },
];

const PINATA_GATEWAY_TOKEN = 'WDVkPJAmXmW1nurA6sGfTrCC1SYW0fFAof8iFvqQCkiWL2Ku3thexOLpUv_JyEI8';
const PINATA_GATEWAY_URL = 'https://scarlet-charming-caterpillar-527.mypinata.cloud/ipfs/';

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter avatars based on search term
  const filteredAvatars = avatars.filter(
    (avatar) =>
      avatar.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
      avatar.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (cid: string) => {
    return `${PINATA_GATEWAY_URL}${cid}?pinataGatewayToken=${PINATA_GATEWAY_TOKEN}`;
  };

  return (
    <div className="bg-[#111] text-white items-center p-4 overflow-y-auto main-scrollbar">
      <DarkNav />
      {/* Header with Search Bar */}
      <header className="w-full mt-16 mb-5">
        <div className="flex items-left bg-[#222] rounded-2xl px-3 py-2 shadow-lg">
          <Search className="w-6 h-6 text-gray-400 mr-4" />
          <input
            type="text"
            placeholder="search avatars for style or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
          />
        </div>
      </header>

      {/* Buttons */}
      <div className="flex space-x-4 mb-6">
        {/* ... (Select components remain the same) */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Voxel</SelectItem>
            <SelectItem value="dark">Anime</SelectItem>
            <SelectItem value="system">Low Poly</SelectItem>
            <SelectItem value="system">Stylized</SelectItem>
            <SelectItem value="system">Cartoon</SelectItem>
            <SelectItem value="system">Cartoon</SelectItem>
            <SelectItem value="system">Pixel</SelectItem>
            <SelectItem value="system">Victorian</SelectItem>
            <SelectItem value="system">Steam Punk</SelectItem>
            <SelectItem value="system">Gothic</SelectItem>
            <SelectItem value="system">Isometric</SelectItem>
            <SelectItem value="system">Grunch</SelectItem>
            <SelectItem value="system">Medieval</SelectItem>
            <SelectItem value="system">Fantasy</SelectItem>
            <SelectItem value="system">Cyberpunk</SelectItem>
            <SelectItem value="system">Minimalist</SelectItem>
            <SelectItem value="system">Ancient</SelectItem>
            <SelectItem value="system">Modern</SelectItem>
            <SelectItem value="system">Post Apocalyptic</SelectItem>
            <SelectItem value="system">Retro</SelectItem>
            <SelectItem value="system">Sci Fi</SelectItem>
            <SelectItem value="system">Abstract</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Technical Features" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Animated</SelectItem>
            <SelectItem value="dark">Rigged</SelectItem>
            <SelectItem value="system">PBR</SelectItem>
            <SelectItem value="system">Modular</SelectItem>
            <SelectItem value="system">Script</SelectItem>
            <SelectItem value="system">Procedural</SelectItem>
            <SelectItem value="system">Destructible</SelectItem>
            <SelectItem value="system">Seamless</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Formats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">UEFN</SelectItem>
            <SelectItem value="dark">Unity</SelectItem>
            <SelectItem value="system">3ds Max</SelectItem>
            <SelectItem value="system">Blender</SelectItem>
            <SelectItem value="system">Cinema 4D</SelectItem>
            <SelectItem value="system">Maya</SelectItem>
            <SelectItem value="system">ZBrush</SelectItem>
            <SelectItem value="system">FBX</SelectItem>
            <SelectItem value="system">GLB</SelectItem>
            <SelectItem value="system">GLTF</SelectItem>
            <SelectItem value="system">OBJ</SelectItem>
            <SelectItem value="system">USD</SelectItem>
            <SelectItem value="system">USDZ</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">#</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">-</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">1</SelectItem>
              <SelectItem value="dark">2</SelectItem>
              <SelectItem value="system">3</SelectItem>
              <SelectItem value="system">4</SelectItem>
              <SelectItem value="system">5</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Publishers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">-</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Published" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">-</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Licenses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">CC-BY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Avatar Grid with Scroll */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-h-[80vh]">
          {filteredAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="bg-[#222] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full pb-[100%]">
                <Image
                  src={getImageUrl(avatar.image)}
                  alt={`${avatar.style} avatar ${avatar.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{avatar.label}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-h-[80vh]">
          {filteredAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="bg-[#222] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full pb-[100%]">
                <Image
                  src={getImageUrl(avatar.image)}
                  alt={`${avatar.style} avatar ${avatar.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{avatar.label}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-h-[80vh]">
          {filteredAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="bg-[#222] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full pb-[100%]">
                <Image
                  src={getImageUrl(avatar.image)}
                  alt={`${avatar.style} avatar ${avatar.id}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{avatar.label}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Message */}
        {filteredAvatars.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No avatars found matching your search.
          </p>
        )}
        <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', () => {
              const images = document.querySelectorAll('[data-src]');
              images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              });
            });
          `,
        }}
      />
      </div>
    );
  }