// app/page.tsx
'use client';

// Import necessary dependencies
import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/features/navigation/Navigation';
import ErrorMessage from './components/features/common/ErrorMessage';
import CenterPanel from './components/features/avatar/CenterPanel';
import FloatingPanel from './components/features/avatar/FloatingPanel';
import ModalInfo from './components/features/common/ModalInfo';
import Modal from 'react-modal';
import 'babylonjs-loaders';
import { useSDK } from "@metamask/sdk-react"; //import useSDK
import { useRouter } from 'next/navigation'; // Import useRouter
import MintModal from './components/features/avatar/MintModal'; // Import MintModal

export default function MainPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>('low-poly');
  const [color, setColor] = useState<string>('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff');
  const [texture, setTexture] = useState<string>('default');
  const [background, setBackground] = useState<string>('#f5f5f5');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // For Info Modal
  const [isMintModalOpen, setIsMintModalOpen] = useState<boolean>(false); // For Mint Modal
  const { connected } = useSDK(); // use useSDK hook
  const route = useRouter(); // Initialize useRouter

  // Camera state - REMOVED from page.tsx
  // New state for storing the uploaded model URL
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  // New state for light intensity
  const [lightIntensity] = useState<number>(11); // Initial intensity - match initial value in CenterPanel

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const savedTexture = localStorage.getItem('texture_current');
    if (savedTexture) {
      setTexture(savedTexture);
    }
  },);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  },);

  const handleMint = async () => {
    console.log('Mint button clicked in FloatingPanel'); // Add this line
    if (!connected) {
      setErrorMessage("Please connect your wallet to mint.");
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
  const handleDownload = () => alert('Download functionality TBD');
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
          color={color}
          texture={texture}
          background={background}
          secondaryColor={secondaryColor}
          modelUrl={modelUrl}
          lightIntensity={lightIntensity}
        />
        <FloatingPanel
          color={color}
          secondaryColor={secondaryColor}
          onColorChange={handleColorChange}
          onSecondaryColorChange={handleSecondaryColorChange}
          texture={texture}
          background={background}
          onTextureUpload={handleTextureUpload}
          onBackgroundChange={handleBackground}
          onShare={handleShare}
          onDownload={handleDownload}
          onMint={handleMint} // The handleMint function now opens the MintModal
          onReset={handleReset}
          onInfo={openModal}
        />
      </div>
      <ModalInfo isOpen={isModalOpen} onClose={closeModal} />
      <MintModal isOpen={isMintModalOpen} onClose={closeMintModal} />
    </div>
  );
}