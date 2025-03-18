// pages/mint.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/app/components/features/navigation/MintedNav';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import MintModal from '@/app/components/features/avatar/MintModal'; 

export default function Mint() {
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(true); 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  },);

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