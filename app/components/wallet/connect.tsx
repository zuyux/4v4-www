"use client";

import { useState, useEffect } from 'react';
import { useSDK } from "@metamask/sdk-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from 'lucide-react';
import { shortenAddress } from "@/utils/addressUtils";

export default function Connect() {
    const { sdk, connected, account } = useSDK();
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState<string>('');

    const handleConnect = async () => {
        if (!window.ethereum) {
            setError("MetaMask is not installed or not active.");
            return;
        }
    
        setConnecting(true);
        setError('');
    
        try {
            // Remove the params field
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            }) as string; // It returns an array of accounts
    
            if (accounts && accounts.length > 0) {
                console.debug('Connected accounts:', accounts);
                // The useSDK hook should automatically update the 'connected' and 'account' states
            }
        } catch (err: unknown) {
            console.error('Failed to connect:', err);
            setError((err instanceof Error) ? err.message : 'Failed to connect to MetaMask.');
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = () => {
        if (sdk) {
            sdk.terminate();
        }
    };

    useEffect(() => {
        const initialize = async () => {
            if (!sdk) {
                console.error("SDK not initialized");
                return;
            }
            // You can add any additional initialization logic here if needed
        };

        initialize();
    }, [sdk]);

    if (connected) {
        return (
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative border border-1 border-gray-500 rounded-full h-9 w-9 p-0 mr-4">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback><User/></AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2">
                        <DropdownMenuItem asChild>
                            <span className='text-sm'>{account && shortenAddress(account)}</span> 
                        </DropdownMenuItem>
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
                <Button onClick={handleDisconnect}><LogOut/></Button>
            </div>
        );
    }

    return (
        <div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Button onClick={handleConnect} disabled={connecting}>
                {connecting ? "Connecting..." : "Connect"}
            </Button>
        </div>
    );
}