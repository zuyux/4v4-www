// app/components/features/avatar/MintModal.tsx
'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from 'ethers';
import AvatarMinterABI from '@/app/abi/AvatarMinterABI.json';
import { useRouter } from 'next/navigation';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintModal: React.FC<MintModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [attributes, setAttributes] = useState<string>('');
  const [interoperabilityFormats, setInteroperabilityFormats] = useState<string>('');
  const [customizationData, setCustomizationData] = useState<string>('');
  const [edition, setEdition] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>('');
  const [properties, setProperties] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const [soulbound, setSoulbound] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { sdk, account } = useSDK();
  const router = useRouter();

  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  const contractABI = AvatarMinterABI.abi;

  const handleModelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setModelFile(e.target.files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleMint = async () => {
    if (!sdk || !account) {
      setError("Please connect your wallet.");
      return;
    }

    if (!name || !description || !modelFile) {
      setError("Please fill in all the essential information and upload your model.");
      return;
    }

    setMinting(true);
    setError('');
    setTransactionHash('');

    try {
      const formData = new FormData();
      formData.append('file', modelFile); // Use 'file' as the key for the model file [cite: 16, 24]
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
      formData.append('name', name);
      formData.append('description', description);
      formData.append('externalUrl', externalUrl);
      formData.append('attributes', JSON.stringify(attributes ? attributes.split(',').map(attr => ({ trait_type: attr.trim() })) :[]));
      formData.append('interoperabilityFormats', JSON.stringify(interoperabilityFormats ? interoperabilityFormats.split(',').map(format => format.trim()) :[]));
      formData.append('customizationData', customizationData);
      formData.append('edition', edition);
      formData.append('royalties', royalties);
      formData.append('properties', properties);
      formData.append('location', location);
      formData.append('soulbound', soulbound.toString());

      const uploadRequest = await fetch("/api/files", { // Use "/api/files" endpoint [cite: 16, 21]
        method: "POST",
        body: formData,
      });

      if (!uploadRequest.ok) {
        alert("Trouble uploading file");
        throw new Error("Failed to upload file");
      }

      const signedUrl = await uploadRequest.json(); // Get the URL from the response [cite: 16]
      setTokenURI(signedUrl.url); // Assuming the response has a 'url' property [cite: 25, 28]

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner(account);
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const mintingPrice = await contract.mintPrice();
      const tx = await contract.mintAvatar(account, tokenURI, soulbound, {
        value: mintingPrice,
      });

      setTransactionHash(tx.hash);
      await tx.wait();
      alert('Avatar minted successfully! Transaction Hash: ' + tx.hash);
      onClose();
      router.push('/minted');
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Trouble uploading file");
    } finally {
      setMinting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mint Avatar Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-lg font-semibold mb-4">Mint Your Avatar</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {transactionHash && <p className="text-green-500 mb-2">Transaction Hash: {transactionHash}</p>}

      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Avatar Name"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Avatar Description"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="modelFile">Upload 3D Model (.glb)</Label>
        <Input
          type="file"
          id="modelFile"
          accept=".glb,.gltf"
          onChange={handleModelFileChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="imageFile">Upload Image (Optional)</Label>
        <Input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={handleImageFileChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="externalUrl">External URL (Optional)</Label>
        <Input
          type="text"
          id="externalUrl"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="attributes">Attributes (Optional, comma-separated)</Label>
        <Input
          type="text"
          id="attributes"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          placeholder="e.g., style: futuristic, rarity: Rare"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="interoperabilityFormats">Interoperability Formats (Optional, comma-separated)</Label>
        <Input
          type="text"
          id="interoperabilityFormats"
          value={interoperabilityFormats}
          onChange={(e) => setInteroperabilityFormats(e.target.value)}
          placeholder="e.g., glb, fbx"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="customizationData">Customization Data (Optional, JSON)</Label>
        <Input
          type="textarea"
          id="customizationData"
          value={customizationData}
          onChange={(e) => setCustomizationData(e.target.value)}
          placeholder='e.g., {"color": "blue", "accessory": "hat"}'
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="edition">Edition (Optional)</Label>
        <Input
          type="text"
          id="edition"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          placeholder="e.g., 100"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="royalties">Royalties (Optional)</Label>
        <Input
          type="text"
          id="royalties"
          value={royalties}
          onChange={(e) => setRoyalties(e.target.value)}
          placeholder="e.g., 10%"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="properties">Properties (Optional, JSON)</Label>
        <Input
          type="textarea"
          id="properties"
          value={properties}
          onChange={(e) => setProperties(e.target.value)}
          placeholder='e.g., {"polygonCount": 5000}'
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="location">Location (Optional, comma-separated)</Label>
        <Input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., lat: -12.72596, lon: -77.89962"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="soulbound"
          checked={soulbound}
          onChange={(e) => setSoulbound(e.target.checked)}
          className="mr-2"
        />
        <Label htmlFor="soulbound">Soulbound (Non-transferable)</Label>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleMint} disabled={minting}>
          {minting ? 'Minting...' : 'Mint Avatar'}
        </Button>
      </div>
    </Modal>
  );
};

export default MintModal;