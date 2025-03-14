import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Connect from '../../wallet/connect';
import { User } from 'lucide-react';

interface NavigationProps {
    selectedStyle: string;
    onMenuSelect: (item: string) => void;
    onModelUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onMenuSelect, onModelUpload }) => {
    const navigationStyles = [
        { title: 'Low Poly', style: 'low-poly' },
        { title: 'Med Poly', style: 'med-poly' },
        { title: 'High Poly', style: 'high-poly' },
        { title: 'Anime', style: 'anime' },
        { title: 'Fantastic', style: 'fantastic' },
        { title: 'Realistic', style: 'realistic' },
        { title: 'Sketched', style: 'sketched' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-lg transition-all shadow-sm">
            <div className="container flex items-center justify-between h-16 px-6">
                {/* Style Selection Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="bg-[#f5f5f5] px-4 py-2 rounded-md font-medium">
                            Mod <span className="ml-1">▼</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2 **bg-white**"> {/* Added bg-white to DropdownMenuContent */}
                        {navigationStyles.map((item) => (
                            <DropdownMenuItem
                                key={item.style}
                                className="cursor-pointer px-2 py-1 rounded-md hover:bg-accent **bg-white**" // Added bg-white to DropdownMenuItem
                                onSelect={() => onMenuSelect(item.style)}
                            >
                                {item.title}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem className="flex items-center justify-between mt-2 border-t pt-2 bg-white"> {/* Added bg-white to "Upload Model" item too, for consistency */}
                            <Label htmlFor="modelUpload" className="cursor-pointer w-full">
                                Upload .glb Model
                            </Label>
                            <Input
                                type="file"
                                id="modelUpload"
                                accept=".glb"
                                onChange={onModelUpload}
                                className="hidden"
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                {/* User & Wallet Actions */}
                <div className="fixed right-0 flex items-center space-x-4 mr-4">
                    <div className='grid grid-cols-3 text-sm font-semibold text-center space-x-4'>
                        <Link href="/" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Create
                        </Link>
                        <Link href="/mint" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Mint
                        </Link>
                        <Link href="/explore" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Explore
                        </Link>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative border border-1 border-gray-500 rounded-full h-9 w-9 p-0">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/vercel.svg" alt="User Avatar" />
                                    <AvatarFallback><User/></AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 p-2">
                            <DropdownMenuItem asChild>
                                <Link href="/examples/dashboard" className="w-full px-2 py-1 rounded-md hover:bg-accent">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/examples/settings" className="w-full px-2 py-1 rounded-md hover:bg-accent">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/auth/login" className="w-full px-2 py-1 rounded-md hover:bg-accent">
                                    Logout
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Connect />
                </div>
            </div>
        </header>
    );
};

export default Navigation;