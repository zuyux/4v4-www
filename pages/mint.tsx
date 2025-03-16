// pages/mint.tsx
'use client';

// Import necessary dependencies
import { useState, useEffect, useCallback } from 'react';
import Navigation from '@/app/components/features/navigation/MintedNav';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react"; 
import MintModal from '@/app/components/features/avatar/MintModal'; 

export default function Mint() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(true); 
  const { connected } = useSDK();

  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [lightIntensity] = useState<number>(11); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  },);

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