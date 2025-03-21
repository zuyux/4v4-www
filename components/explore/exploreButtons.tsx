import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ExploreButtons = () => {
  return (
    <div className="flex space-x-4 mb-6">
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
  );
};

export default ExploreButtons;
