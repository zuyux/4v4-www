'use client';

import { Share2, Download, Save, RefreshCw, Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RightPanelProps {
    texture: string;
    background: string;
    onTextureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBackgroundChange: (color: string) => void;
    onShare: () => void;
    onDownload: () => void;
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
    onBackgroundChange, onShare, onDownload, onMint, onReset, onInfo
}: RightPanelProps) {
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
                <Button onClick={onMint}>
                    <Save className="mr-2" /> Mint
                </Button>
                <Button onClick={onShare}>
                    <Share2 className="mr-2" /> Share
                </Button>
                <Button variant="outline" onClick={onDownload}>
                    <Download className="mr-2" /> Download
                </Button>
                <Button variant="outline" onClick={onReset}>
                    <RefreshCw className="mr-2" /> Reset
                </Button>
                <Button variant="outline" onClick={onInfo}>
                    <Info className="mr-2" /> Info
                </Button>
            </div>
        </aside>
    );
}