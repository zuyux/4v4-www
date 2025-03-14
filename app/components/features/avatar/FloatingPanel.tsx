'use client';

import { Share2, Upload, Save, Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FloatingPanelProps {
    texture: string;
    background: string;
    onTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBackgroundChange: (color: string) => void;
    onShare: () => void;
    onModelUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMint: () => void;
    onReset: () => void;
    onInfo: () => void;
    color: string;
    secondaryColor: string;
    onColorChange: (value: string) => void;
    onSecondaryColorChange: (value: string) => void;
}

export default function FloatingPanel({
    color, secondaryColor, onColorChange, onSecondaryColorChange,
    background, onTextureUpload,
    onBackgroundChange, onShare, onModelUpload, onMint, onInfo
}: FloatingPanelProps) {
    return (
        <aside className="fixed top-20 left-5 w-[220px] bg-transparent p-4 flex flex-col space-y-4 bg-white/50 rounded-xl backdrop-blur-lg transition-all shadow-sm">
            {/* Color Inputs */}
            <div>
                <Label htmlFor="colorPicker">Primary Color</Label>
                <Input
                    id="colorPicker"
                    type="color"
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                />
            </div>
            <div>
                <Label htmlFor="secondaryColorPicker">Secondary Color</Label>
                <Input
                    id="secondaryColorPicker"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => onSecondaryColorChange(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                />
            </div>

            {/* Texture Upload */}
            <div>
                <Label>Textures</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={onTextureUpload}
                    className="mb-2"
                />
            </div>

            {/* Background Picker */}
            <div>
                <Label htmlFor="backgroundPicker">Background</Label>
                <Input
                    id="backgroundPicker"
                    type="color"
                    value={background}
                    onChange={(e) => onBackgroundChange(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => document.getElementById('modelUpload')?.click()}>
                    <Upload className="mr-2" />
                    <Label htmlFor="modelUpload" className="cursor-pointer w-full">
                        Upload
                    </Label>
                    <Input
                        type="file"
                        id="modelUpload"
                        accept=".glb"
                        onChange={onModelUpload}
                        className="hidden"
                    />
                </Button>
                <Button onClick={onMint}>
                    <Save className="mr-2" /> Mint
                </Button>
                <Button onClick={onShare}>
                    <Share2 className="mr-2" /> Share
                </Button>
                <Button variant="outline" onClick={onInfo}>
                    <Info className="mr-2" /> Info
                </Button>
            </div>
        </aside>
    );
}