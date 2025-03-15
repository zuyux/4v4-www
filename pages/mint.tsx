// pages/mint.tsx
'use client';

// Import necessary dependencies
import { useState, useEffect, useCallback } from 'react';
import Navigation from '@/app/components/features/navigation/MintedNav';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react"; 
import { useRouter } from 'next/navigation'; 
import MintModal from '@/app/components/features/avatar/MintModal'; 

export default function Mint() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(true); 
  const { connected } = useSDK();
  const route = useRouter(); 

  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [lightIntensity] = useState<number>(11); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  },);

  const handleModelUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Model File uploaded:', file);
      const url = URL.createObjectURL(file); // Create URL for the file
      setModelUrl(url); // Update the modelUrl state
    }
  },[]);


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
      <MintModal isOpen={isMintModalOpen} onClose={closeMintModal} />
    </div>
  );
}