'use client';

import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { Share2, Download, Save, RefreshCw, Info } from 'lucide-react';

// Dynamically import Three.js to avoid server-side issues
const { Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshStandardMaterial, AmbientLight, PointLight, Color } = await import('three');

export default function MainPage() {
  const [selectedStyle, setSelectedStyle] = useState('low-poly');
  const [color, setColor] = useState('#000000'); // Default primary color
  const [secondaryColor, setSecondaryColor] = useState('#ff4500'); // Default secondary color
  const [brushSize, setBrushSize] = useState('medium');
  const [texture, setTexture] = useState('default');
  const [background, setBackground] = useState('#d1d5db'); // Default background as hex (gray-300)
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for wallet connection
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const mountRef = useRef(null); // Ref for the 3D canvas
  const cubeRef = useRef(null); // Ref for the cube mesh
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  // Initialize 3D scene
  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshStandardMaterial({ color: color, roughness: texture === 'rough' ? 0.8 : texture === 'smooth' ? 0.2 : 0.5 });
    const cubeMesh = new Mesh(geometry, material);
    scene.add(cubeMesh);
    cubeRef.current = cubeMesh;

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    const pointLight = new PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    scene.background = new Color(background); // Set scene background color
    camera.position.z = 5;

    const handleMouseDown = (event) => {
      setIsDragging(true);
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
      if (isDragging && cubeRef.current) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        cubeRef.current.rotation.y += deltaX * 0.005;
        cubeRef.current.rotation.x += deltaY * 0.005;
        setPreviousMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    mountRef.current.addEventListener('mousedown', handleMouseDown);
    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('mouseup', handleMouseUp);
    mountRef.current.addEventListener('mouseleave', handleMouseUp); // Stop dragging if mouse leaves

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      mountRef.current?.removeEventListener('mousedown', handleMouseDown);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('mouseup', handleMouseUp);
      mountRef.current?.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [mountRef, isDragging]);

  // Update cube properties based on state
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.material.color.set(color);
      cubeRef.current.material.roughness = texture === 'rough' ? 0.8 : texture === 'smooth' ? 0.2 : 0.5;
    }
  }, [color, texture, cubeRef]);

  useEffect(() => {
    if (mountRef.current) {
      const scene = new Scene();
      scene.background = new Color(background); // Update scene background color
    }
  }, [background, mountRef]);

  // Define connectWallet function
  const connectWallet = async () => {
    let ethers;
    try {
      ethers = await import('ethers');
    } catch (err) {
      setErrorMessage('Failed to load Ethereum library. Please ensure the project is set up correctly.');
      return;
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      setErrorMessage('MetaMask is not detected. Please install it and reload the page.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned. Please approve the connection in MetaMask.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setIsConnected(true);
      window.ethereum.on('accountsChanged', (newAccounts) => {
        setWalletAddress(newAccounts[0] || '');
        setIsConnected(!!newAccounts.length);
        if (!newAccounts.length) setErrorMessage('Wallet disconnected or account changed.');
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      let message = 'Failed to connect wallet. ';
      if (error.code === 4001) message += 'You denied the connection request in MetaMask.';
      else if (error.code === -32002) message += 'Connection request is pending. Please check MetaMask.';
      else message += 'Please ensure MetaMask is installed, unlocked, and approved.';
      setErrorMessage(message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle mint action
  const handleMint = async () => {
    if (!isConnected && !isLoading) {
      await connectWallet();
      if (!isConnected) return;
    }

    if (isConnected) {
      setIsLoading(true);
      try {
        console.log('Minting NFT for address:', walletAddress);
        alert('NFT minted successfully! (Simulation)');
      } catch (error) {
        console.error('Minting failed:', error);
        setErrorMessage('Failed to mint NFT. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle menu item selection
  const handleMenuSelect = (item) => {
    setSelectedStyle(item);
  };

  // Handle color change
  const handleColorChange = (e) => setColor(e.target.value);

  // Handle secondary color change
  const handleSecondaryColorChange = (e) => setSecondaryColor(e.target.value);

  // Handle brush size change
  const handleBrushSize = (size) => setBrushSize(size);

  // Handle texture change
  const handleTexture = (newTexture) => setTexture(newTexture);

  // Handle background change
  const handleBackground = (newBg) => setBackground(newBg);

  // Mock actions for other buttons
  const handleShare = () => alert('Share functionality to be implemented');
  const handleDownload = () => alert('Download functionality to be implemented');
  const handleReset = () => {
    setColor('#000000');
    setSecondaryColor('#ff4500');
    setBrushSize('medium');
    setTexture('default');
    setBackground('#d1d5db');
    alert('Avatar reset');
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black flex flex-col">
      {/* Upper Navigation Menu */}
      <nav className="bg-gray-300 p-4 flex justify-between items-center shadow-md" role="navigation" aria-label="Avatar customization menu">
        <div className="flex space-x-4">
          <select
            value={selectedStyle}
            onChange={(e) => handleMenuSelect(e.target.value)}
            className="px-4 py-2 rounded bg-gray-400 text-black hover:bg-gray-500"
            aria-label="Select avatar style"
          >
            <option value="low-poly">Low-Poly</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
            <option value="anime">Anime</option>
            <option value="humanoid">Humanoid</option>
          </select>
          {['Hair', 'Eyes', 'Clothing', 'Accessories'].map((item) => (
            <button
              key={item}
              onClick={() => handleMenuSelect(item)}
              className="px-4 py-2 rounded bg-gray-400 text-black hover:bg-gray-500"
              aria-label={`Select ${item}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold" aria-label="Current avatar name">myavatar</span>
        </div>
      </nav>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 text-center">
          {errorMessage}
          <button onClick={() => setErrorMessage('')} className="ml-2 text-blue-500 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 p-4">
        {/* Left Panel - Color Pickers */}
        <aside className="w-1/6 bg-gray-100 p-4 flex flex-col space-y-4" role="complementary" aria-label="Color selection tools">
          <div>
            <label htmlFor="colorPicker" className="block text-sm mb-2">Primary Color</label>
            <input
              id="colorPicker"
              type="range"
              min="0"
              max="360"
              value={parseInt(color.slice(1), 1) % 360} // Simplified hue-based threshold
              onChange={(e) => setColor(`#${Math.floor(e.target.value / 360 * 0xffffff).toString(16).padStart(6, '0')}`)}
              className="w-72 h-32 bg-gradient-to-t from-red-600 via-green-500 to-blue-500 rounded cursor-pointer"
              aria-label="Select primary color threshold"
            />
          </div>
          <div>
            <label htmlFor="secondaryColorPicker" className="block text-sm mb-2">Secondary Color</label>
            <input
              id="secondaryColorPicker"
              type="range"
              min="0"
              max="360"
              value={parseInt(secondaryColor.slice(1), 16) % 360} // Simplified hue-based threshold
              onChange={(e) => setSecondaryColor(`#${Math.floor(e.target.value / 360 * 0xffffff).toString(16).padStart(6, '0')}`)}
              className="w-72 h-8 bg-gradient-to-t from-orange-500 via-yellow-500 to-red-500 rounded cursor-pointer"
              aria-label="Select secondary color threshold"
            />
          </div>
          <div>
            <label htmlFor="shadePicker" className="block text-sm mb-2">Shading</label>
            <input
              id="shadePicker"
              type="range"
              min="0"
              max="100"
              value={color === '#000000' ? 0 : 50}
              onChange={handleColorChange} // Note: This needs adjustment for range-based shading
              className="w-72 h-16 bg-gradient-to-b from-black to-white rounded cursor-pointer"
              aria-label="Adjust shading"
            />
          </div>
        </aside>

        {/* Center Panel - 3D Cube Display */}
        <main className="w-4/6 flex items-center justify-center bg-gray-300" role="main" aria-label="Avatar preview">
          <div ref={mountRef} className="w-96 h-96 rounded-lg flex items-center justify-center border-4 border-blue-300" />
        </main>

        {/* Right Panel - Tools and Options */}
        <aside className="w-1/6 bg-gray-100 p-4 flex flex-col space-y-4" role="complementary" aria-label="Editing tools">
          <div>
            <label className="block text-sm mb-2">Brush Sizes</label>
            <div className="flex flex-col space-y-2">
              {['large', 'medium', 'small'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleBrushSize(size)}
                  className={`w-${size === 'large' ? 8 : size === 'medium' ? 6 : 4}h-${
                    size === 'large' ? 8 : size === 'medium' ? 6 : 4
                  } bg-gray-300 rounded-full ${brushSize === size ? 'border-2 border-blue-500' : ''}`}
                  aria-label={`Select ${size} brush size`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2">Textures</label>
            <div className="flex flex-col space-y-2">
              {['default', 'rough', 'smooth'].map((tex) => (
                <button
                  key={tex}
                  onChange={() => handleTexture(tex)}
                  className={`w-8 h-8 bg-gray-${tex === 'default' ? 400 : tex === 'rough' ? 500 : 600} rounded ${
                    texture === tex ? 'border-2 border-blue-500' : ''
                  }`}
                  aria-label={`Select ${tex} texture`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2">Backgrounds</label>
            <div className="flex flex-col space-y-2">
              {['#bfdbfe', '#bbf7d0', '#fefcbf'].map((bg) => (
                <button
                  key={bg}
                  onClick={() => handleBackground(bg)}
                  className={`w-8 h-8 rounded ${background === bg ? 'border-2 border-blue-500' : ''}`}
                  style={{ backgroundColor: bg }}
                  aria-label={`Select ${bg} background`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={handleShare} className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center" aria-label="Share avatar">
              <Share2 className="mr-2" /> Share
            </button>
            <button onClick={handleDownload} className="px-2 py-2 bg-gray-400 rounded hover:bg-gray-500 flex items-center" aria-label="Download avatar">
              <Download className="mr-2" /> Download
            </button>
            <button
              onClick={handleMint}
              className={`px-2 py-2 ${isConnected ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'} ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              } flex items-center`}
              disabled={isLoading}
              aria-label="Mint as NFT"
            >
              <Save className="mr-2" /> {isLoading ? 'Minting...' : 'Mint'}
            </button>
            <button onClick={handleReset} className="px-2 py-2 bg-gray-400 rounded hover:bg-gray-500 flex items-center" aria-label="Reset avatar">
              <RefreshCw className="mr-2" /> Reset
            </button>
            <button className="px-2 py-2 bg-gray-400 rounded hover:bg-gray-500 flex items-center" aria-label="Show info">
              <Info className="mr-2" /> Info
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}