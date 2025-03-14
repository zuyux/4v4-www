//wallet/connect.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";

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
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
                params:"",
            }) as string;

            if (accounts && accounts.length > 0) {
                console.debug('Connected accounts:', accounts);
                // The useSDK hook should automatically update the 'connected' and 'account' states
            }
        } catch (err: any) {
            console.error('Failed to connect:', err);
            setError(err.message || 'Failed to connect to MetaMask.');
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
                <span className='mr-4'>{account}</span>
                <Button onClick={handleDisconnect}>Disconnect</Button>
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