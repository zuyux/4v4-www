import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Connect from '../../wallet/connect';

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
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all shadow-md">
            <div className="container flex items-center justify-between h-16 px-6">
                <Button className='font-bold'>
                    <Link href="/">4v4</Link>
                </Button>
                {/* User & Wallet Actions */}
                <div className="fixed right-0 flex items-center space-x-4 mr-4">
                    <div className='grid grid-cols-3 text-sm font-semibold text-center space-x-4'>
                        <Link href="/create" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Create
                        </Link>
                        <Link href="/mint" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Mint
                        </Link>
                        <Link href="/explore" className='bg-[#f5f5f5] px-4 py-2 rounded-md transition-colors'>
                            Explore
                        </Link>
                    </div>
                    <Connect />
                </div>
            </div>
        </header>
    );
};

export default Navigation;