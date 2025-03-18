// pages/app.tsx
'use client';

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

import { saveModelToDB, getModelFromDB } from '@/utils/IDB'; 

export default function AppPage() {
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

    //Load Model from IndexedDB
    const loadModelFromDB = async () => {
      const modelDataObj = await getModelFromDB('currentModel');
      if (modelDataObj && modelDataObj.modelData) {
          const blob = new Blob([modelDataObj.modelData], { type: 'model/gltf-binary' });
          const url = URL.createObjectURL(blob);
          setModelUrl(url);
          console.log("Model loaded from IndexedDB:", url);
      } else {
          setModelUrl("/models/default.glb");
          console.log("Default model loaded.");
      }
    };

    loadModelFromDB();
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

  const handleSecondaryColorChange = (value: string) => setSecondaryColor(value);

  const handleModelUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        console.log('Model File uploaded:', file);
        const arrayBuffer = await file.arrayBuffer();
        await saveModelToDB(arrayBuffer, file.name, 'currentModel'); // Pass filename
        const url = URL.createObjectURL(file);
        setModelUrl(url);
        console.log("Model URL created:", url);
    } else {
        console.log('No file selected.');
    }
  }, []);

  const handleBackground = (bg: string) => setBackground(bg);
  const handleShare = () => alert('Share functionality TBD');
  const handleReset = () => {
    route.push('/');
  };
  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  // Functions to open and close Mint Modal
  const openMintModal = () => {
    console.log('openMintModal called'); 
    setIsMintModalOpen(true);
    console.log('isMintModalOpen state:', isMintModalOpen);
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false);
  };

  return (
    <div className="h-screen bg-white text-black m-0 p-0 overflow-hidden" id="__next">
      <Navigation />
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