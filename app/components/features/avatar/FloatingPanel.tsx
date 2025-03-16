//components/features/avatar/FloatingPanel.tsx
'use client';

import { Share2, Upload, Save, Info } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FloatingPanelProps {
    background: string;
    onBackgroundChange: (color: string) => void;
    onShare: () => void;
    onModelUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMint: () => void;
    onReset: () => void;
    onInfo: () => void;
    secondaryColor: string;
    onSecondaryColorChange: (value: string) => void;
}

export default function FloatingPanel({
    secondaryColor, onSecondaryColorChange,
    background,
    onBackgroundChange, onShare, onModelUpload, onMint, onInfo
}: FloatingPanelProps) {
    return (
        <aside className="fixed top-20 left-5 w-[220px] bg-transparent p-4 flex flex-col space-y-4 bg-white/50 rounded-xl backdrop-blur-lg transition-all shadow-sm">
            {/* Color Inputs */}
            <div>
                <Label htmlFor="secondaryColorPicker">Lighting:</Label>
                <Input
                    id="secondaryColorPicker"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => onSecondaryColorChange(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
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