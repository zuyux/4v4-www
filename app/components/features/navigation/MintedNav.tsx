import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Connect from '../../wallet/connect';

interface NavigationProps {
}

const Navigation: React.FC<NavigationProps> = ({ }) => {

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-lg transition-all shadow-sm">
            <div className="container flex items-center justify-between h-16 px-6">


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
                    <Connect />
                </div>
            </div>
        </header>
    );
};

export default Navigation;