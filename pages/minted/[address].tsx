'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/features/navigation/MintedNav';
import ErrorMessage from '@/app/components/features/common/ErrorMessage';
import AvatarPanel from '@/components/AvatarPanel';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react"; 
import { useRouter, useParams } from 'next/navigation'; 
import { getTokenMetadata, convertIpfsUrl } from '@/utils/contract/avatarMinter';
import {Info} from 'lucide-react';

export default function MintedPage() {
  // Get the token ID from the URL
  const params = useParams();
  const tokenId = params?.address as string;
  
  const [mintedAddress, setMintedAddress] = useState<string>(tokenId || '');
  const [selectedStyle, setSelectedStyle] = useState<string>('low-poly');
  const [color, setColor] = useState<string>('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff');
  const [texture, setTexture] = useState<string>('default');
  const [background, setBackground] = useState<string>('#f5f5f5');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { connected, provider } = useSDK();
  const route = useRouter(); 

  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [lightIntensity] = useState<number>(11);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const savedTexture = localStorage.getItem('texture_current');
    if (savedTexture) {
      setTexture(savedTexture);
    }

    // Fetch metadata for the minted token
    const fetchMetadata = async () => {
      if (mintedAddress) {
        const data = await getTokenMetadata(mintedAddress, provider);
        if (data) {
          setMetadata(data);
          // Assuming the model URL is in the animation_url field of the metadata
          setModelUrl(convertIpfsUrl(data.animation_url));
        } else {
          setErrorMessage("Failed to fetch metadata.");
        }
      }
    };
    fetchMetadata();
  }, [mintedAddress, provider]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []);

  const handleMint = async () => {
    console.log('Mint button clicked in FloatingPanel'); // Add this line
    if (!connected) {
      setErrorMessage("Please connect your wallet to mint.");
      alert("Please connect your wallet to mint.");
      return false;
    }
    openMintModal(); // Open the Mint Modal after checking connection
    return true;
  };

  const handleMenuSelect = (item: string) => setSelectedStyle(item);
  const handleColorChange = (value: string) => setColor(value);
  const handleSecondaryColorChange = (value: string) => setSecondaryColor(value);
  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Texture File uploaded:', file);
       // For texture upload, keep existing logic if needed, or adapt for texture loading in CenterPanel
    }
  };

  const handleModelUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Model File uploaded:', file);
      const url = URL.createObjectURL(file); // Create URL for the file
      setModelUrl(url); // Update the modelUrl state
    }
  },[]);

  const handleBackground = (bg: string) => setBackground(bg);
  const handleShare = () => alert('Share functionality TBD');
  const handleUpload = () => alert('Download functionality TBD');
  const handleReset = () => {
    route.push('/'); // Use useRouter for navigation
  };
  const openModal = () => setIsModalOpen(true); // For Info Modal
  const closeModal = () => setIsModalOpen(false); // For Info Modal

  // Functions to open and close Mint Modal
  const openMintModal = () => {
    console.log('openMintModal called'); // Add this line
    setIsMintModalOpen(true);
    console.log('isMintModalOpen state:', isMintModalOpen); // Add this line
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false);
  };

  return (
    <div className="h-screen bg-white text-black m-0 p-0 overflow-hidden" id="__next">
      <Navigation />
      <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage('')} />
      <div className="flex flex-row h-screen">
        <AvatarPanel
          mintedAddress={mintedAddress}
          color={color}
          texture={texture}
          background={background}
          secondaryColor={secondaryColor}
          modelUrl={modelUrl}
          lightIntensity={lightIntensity}
        />
      </div>
      <div className='fixed bottom-4 left-4'>
        <Link href="#">
          <Info/>
        </Link>
      </div>
    </div>
  );
}
