// pages/app.tsx
'use client';

// Import necessary dependencies
import { useState, useEffect, useCallback } from 'react';
import Navigation from '@/app/components/features/navigation/Navigation';
import ErrorMessage from '@/app/components/features/common/ErrorMessage';
import CenterPanel from '@/app/components/features/avatar/CenterPanel';
import FloatingPanel from '@/app/components/features/avatar/FloatingPanel';
import ModalInfo from '@/app/components/features/common/ModalInfo';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react"; 
import { useRouter } from 'next/navigation'; 
import MintModal from '@/app/components/features/avatar/MintModal'; 

export default function AppPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>('low-poly');
  const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff');
  const [background, setBackground] = useState<string>('#f5f5f5');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(false); 
  const { connected } = useSDK();
  const route = useRouter(); 

  const [modelUrl, setModelUrl] = useState<string | null>("/models/default.glb");
  const [lightIntensity] = useState<number>(11); 

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const savedModel = localStorage.getItem('currentModel');
    if (savedModel && savedModel.startsWith("blob:")) {
      console.warn("Blob URL found in localStorage, ignoring:", savedModel);
    } else if (savedModel) {
      setModelUrl(savedModel);
      console.log("Model URL loaded from localStorage:", savedModel);
    }
  }, []);  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  },);

  const handleMint = async () => {
    console.log('Mint button clicked in FloatingPanel'); 
    if (!connected) {
      setErrorMessage("Please connect your wallet to mint.");
      alert("Please connect your wallet to mint.");
      return false;
    }
    openMintModal();
    return true;
  };

  const handleMenuSelect = (item: string) => setSelectedStyle(item);
  const handleSecondaryColorChange = (value: string) => setSecondaryColor(value);

  const handleModelUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Model File uploaded:', file);
      const url = URL.createObjectURL(file);
      setModelUrl(url);
      console.log("Model URL created:", url); // Show the created URL

      // Guardar en localStorage solo si es un archivo local
      if (!url.startsWith("blob:")) {
        localStorage.setItem('currentModel', url);
        console.log("Model URL saved to localStorage:", url);
      }
    } else {
      console.log('No file selected.');
    }
  }, []);  

  const handleBackground = (bg: string) => setBackground(bg);
  const handleShare = () => alert('Share functionality TBD');
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
      <Navigation selectedStyle={selectedStyle} onMenuSelect={handleMenuSelect} onModelUpload={handleModelUpload} />
      <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage('')} />
      <div className="flex flex-row h-screen">
        <CenterPanel
          background={background}
          secondaryColor={secondaryColor}
          modelUrl={modelUrl}
          lightIntensity={lightIntensity}
        />
        <FloatingPanel
          secondaryColor={secondaryColor}
          onSecondaryColorChange={handleSecondaryColorChange}
          background={background}
          onBackgroundChange={handleBackground}
          onShare={handleShare}
          onModelUpload={handleModelUpload}
          onMint={handleMint} 
          onReset={handleReset}
          onInfo={openModal}
        />
      </div>
      <ModalInfo isOpen={isModalOpen} onClose={closeModal} />
      <MintModal isOpen={isMintModalOpen} onClose={closeMintModal} />
    </div>
  );
}