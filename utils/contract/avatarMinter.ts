// utils/contract/avatarMinter.ts
import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = "0x02EF301d55F89564b617419f32C5862BA7a98c3b";

// ABI for the functions we need
export const CONTRACT_ABI = [
  "function getMetadata(uint256 tokenId) external view returns (tuple(string name, string description, string image, string external_url, tuple(string trait_type, string value)[] attributes, string animation_url, address creator, bool soulbound, uint256 timestamp))",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function totalSupply() external view returns (uint256)"
];

export interface AvatarAttribute {
  trait_type: string;
  value: string;
}

export interface AvatarMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: AvatarAttribute[];
  animation_url: string;
  creator: string;
  soulbound: boolean;
  timestamp: number;
}

export async function getTokenMetadata(
  tokenId: string,
  provider: any
): Promise<AvatarMetadata | null> {
  try {
    // Create a provider
    const ethersProvider = provider 
      ? new ethers.BrowserProvider(provider)
      : new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    
    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);
    
    // Get token URI
    const uri = await contract.tokenURI(tokenId);
    
    // Parse IPFS URI
    let ipfsUrl = uri;
    if (ipfsUrl.startsWith('ipfs://')) {
      ipfsUrl = ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    // Fetch metadata from IPFS
    const response = await fetch(ipfsUrl);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return null;
  }
}

export async function getContractMetadata(
  provider: any
): Promise<{ totalSupply: number }> {
  try {
    // Create a provider
    const ethersProvider = provider 
      ? new ethers.BrowserProvider(provider)
      : new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    
    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);
    
    // Get total supply
    const totalSupply = await contract.totalSupply();
    
    return {
      totalSupply: Number(totalSupply)
    };
  } catch (error) {
    console.error("Error fetching contract metadata:", error);
    return {
      totalSupply: 0
    };
  }
}

export function convertIpfsUrl(url: string): string {
  if (!url) return '';
  
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  
  return url;
}