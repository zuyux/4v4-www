'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import Navigation from '@/app/components/features/navigation/MintedNav';
import ErrorMessage from '@/app/components/features/common/ErrorMessage';
import AvatarPanel from '@/components/AvatarPanel';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react";
import { useParams } from 'next/navigation';
import { getTokenMetadata } from '@/utils/contract/avatarMinter';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MintedPage() {
  const params = useParams();
  const txHash = params?.address as string;
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [background, setBackground] = useState<string>('#f5f5f5');
  const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { provider } = useSDK();
  const [lightIntensity] = useState<number>(11);
  const [metadata, setMetadata] = useState<any | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fetchTokenId = async () => {
      if (txHash && typeof window.ethereum !== 'undefined') {
        try {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum);
          const transaction = await ethersProvider.getTransactionReceipt(txHash);
          if (transaction && transaction.logs && transaction.logs.length > 0) {
            const log = transaction.logs[0];
            const iface = new ethers.Interface([
              "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
            ]);
            const decodedLog = iface.parseLog(log);
            const tokenIdFromLog = decodedLog?.args?.tokenId?.toString();

            if (tokenIdFromLog) {
              setTokenId(tokenIdFromLog);
            } else {
              setErrorMessage("Token ID not found in transaction logs.");
            }
          } else {
            setErrorMessage("Transaction logs not found.");
          }
        } catch (error) {
          console.error("Error fetching transaction:", error);
          setErrorMessage("Error fetching transaction details.");
        }
      }
    };

    fetchTokenId();
  }, [txHash]);

  useEffect(() => {
    if (tokenId && provider) {
      const fetchMetadata = async () => {
        try {
          const data = await getTokenMetadata(tokenId, provider);
          console.log("Data Fetched:", data);
          if (data) {
            setMetadata(data);
          } else {
            setErrorMessage("Failed to fetch metadata.");
          }
        } catch (error) {
          console.error("Error fetching metadata:", error);
          setErrorMessage("Error fetching metadata.");
        }
      };
      fetchMetadata();
    }
  }, [tokenId, provider]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []);

  return (
    <div className="h-screen bg-white text-black m-0 p-0 overflow-hidden" id="__next">
      <Navigation />
      <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage('')} />

      <div className="grid grid-cols-2 h-screen">
        <div>
          <AvatarPanel
            background={background}
            secondaryColor={secondaryColor}
            metadata={metadata}
            lightIntensity={lightIntensity}
          />
        </div>
        {metadata && (
          <div className='m-36 space-y-8'>
            <h1 className='text-3xl font-bold mb-4'>{metadata.name}</h1>
            {metadata.description && <p><b>Description:</b> {metadata.description}</p>}
            {metadata.external_url && <p><b>External URL:</b> {metadata.external_url}</p>}
            {metadata.attributes && <p><b>Attributes:</b> {JSON.stringify(metadata.attributes)}</p>}
            {metadata.interoperabilityFormats && <p><b>Formats:</b> {JSON.stringify(metadata.interoperabilityFormats)}</p>}
            {metadata.customizationData && <p><b>Customization:</b> {JSON.stringify(metadata.customizationData)}</p>}
            {metadata.edition && <p><b>Edition:</b> {metadata.edition}</p>}
            {metadata.royalties && <p><b>Royalties:</b> {metadata.royalties}</p>}
            {metadata.properties && <p><b>Properties:</b> {JSON.stringify(metadata.properties)}</p>}
            {metadata.location && <p><b>Location:</b> {JSON.stringify(metadata.location)}</p>}
            {metadata.soulbound !== undefined && <p><b>Soulbounded:</b> {metadata.soulbound ? 'Yes' : 'No'}</p>}
            {metadata.image && <p><b>Image:</b> {metadata.image}</p>}

            <div>
              <Button>Buy</Button>
            </div>
          </div>
        )}
      </div>
      <div className='fixed bottom-4 left-4'>
        <Link href="#">
          <Info />
        </Link>
      </div>
    </div>
  );
}