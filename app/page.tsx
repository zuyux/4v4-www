'use client';

// Import necessary dependencies
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ErrorMessage from './components/ErrorMessage';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import ModalInfo from './components/ModalInfo';
import Modal from 'react-modal'; // Ensure Modal is imported

export default function MainPage() {
  const [selectedStyle, setSelectedStyle] = useState<string>('low-poly');
  const [color, setColor] = useState<string>('#ffffff'); // Default primary color to white
  const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff'); // Default secondary color to black (now for lighting)
  const [brushSize, setBrushSize] = useState<string>('medium');
  const [texture, setTexture] = useState<string>('default'); // Default texture, will be updated from localStorage if available
  const [background, setBackground] = useState<string>('#ffffff');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal

  // Load texture from localStorage on mount
  useEffect(() => {
    const savedTexture = localStorage.getItem('texture_current');
    if (savedTexture) {
      setTexture(savedTexture);
    }
  }, []);

  // Set appElement only on client-side after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }, []); // Empty dependency array is fine since Modal is a constant; suppress warning if needed

  // Mint NFT
  const handleMint = async () => {
    return true
  };

  const handleMenuSelect = (item: string) => setSelectedStyle(item);
  const handleColorChange = (value: string) => setColor(value);
  const handleSecondaryColorChange = (value: string) => setSecondaryColor(value);
  const handleBrushSize = (size: string) => setBrushSize(size);
  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file);
    }
  };
  const handleBackground = (bg: string) => setBackground(bg);
  const handleShare = () => alert('Share functionality TBD');
  const handleDownload = () => alert('Download functionality TBD');
  const handleReset = () => {
    setColor('#ffffff');
    setSecondaryColor('#ffffff');
    setBrushSize('medium');
    setTexture('default');
    setBackground('#ffffff');
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col" id="__next">
      <Navigation selectedStyle={selectedStyle} onMenuSelect={handleMenuSelect} />
      <ErrorMessage message={errorMessage} onDismiss={() => setErrorMessage('')} />
      <div className="flex flex-1 p-4">
        <LeftPanel
          color={color}
          secondaryColor={secondaryColor}
          onColorChange={handleColorChange}
          onSecondaryColorChange={handleSecondaryColorChange}
        />
        <CenterPanel
          color={color}
          texture={texture}
          background={background}
          secondaryColor={secondaryColor} // Pass secondaryColor as a prop
        />
        <RightPanel
          brushSize={brushSize}
          texture={texture}
          background={background}
          onBrushSizeChange={handleBrushSize}
          onTextureUpload={handleTextureUpload}
          onBackgroundChange={handleBackground}
          onShare={handleShare}
          onDownload={handleDownload}
          onMint={handleMint}
          onReset={handleReset}
          onInfo={openModal}
        />
      </div>
      <ModalInfo isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}