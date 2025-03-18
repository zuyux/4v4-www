import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Connect from '../../wallet/connect';

const Navigation: React.FC = () => { 
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all shadow-sm">
            <div className="container flex items-center justify-between h-16 px-6">
                <div className='inline-block'>
                    <Button className='font-bold'>
                        <Link href="/">4v4</Link>
                    </Button>
                    <div className='inline-block ml-4 text-sm'>Build It - Own It - Play It</div>
                </div>
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