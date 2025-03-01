// pages/profile/[username].js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';

// Mock data (replace with API/blockchain data in production)
const mockUser = {
  username: 'fabohax', // Updated to match the intended username
  avatarUrl: '/images/default-avatar.png',
  socials: {
    twitter: 'https://twitter.com/fabohax',
    instagram: 'https://instagram.com/fabohax',
    facebook: 'https://facebook.com/fabohax',
  },
  nfts: [
    { id: '1', name: 'Cosmic Explorer #001', image: '/images/cosmic-explorer.png' },
    { id: '2', name: 'Cyber Hat', image: '/images/cyber-hat.png' },
  ],
};

export default function Profile({ user }) {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
          setIsConnected(true);
        } catch (error) {
          console.error('Wallet connection failed:', error);
        }
      }
    };

    if (!isConnected) connectWallet();
  }, [isConnected]);

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">User not found. Please check the username.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Head>
        <title>4V4 Profile - {user.username}</title>
        <meta name="description" content="4V4 User Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button className="mr-4 p-2 hover:bg-gray-700 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <div>
          {isConnected ? (
            <span className="text-sm">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          ) : (
            <button
              onClick={() => setIsConnected(true)}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <main className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-48 h-48 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={user.avatarUrl}
              alt={`${user.username}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-semibold mt-4">{user.username}</h2>
          <div className="flex space-x-4 mt-2">
            <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-blue-400 hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.585-.666 2.495 0 1.714.87 3.231 2.201 4.118-.813-.026-1.576-.249-2.246-.616v.061c0 2.358 1.676 4.327 3.903 4.771-.408.111-.837.17-1.281.17-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.068 2.175 1.395 4.76 2.215 7.537 2.215 9.054 0 14.001-7.496 14.001-13.986 0-.21-.005-.42-.014-.629.96-.694 1.795-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-pink-400 hover:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.95.072-1.315.065-2.598.349-3.538 1.289-1.288 1.288-1.224 2.223-1.289 3.538-.057 1.281-.072 1.69-.072 4.95s.015 3.67.072 4.95c.065 1.315.349 2.598 1.289 3.538 1.288 1.288 2.223 1.224 3.538 1.289 1.281.057 1.69.072 4.95.072s3.67-.015 4.95-.072c1.315-.065 2.598-.349 3.538-1.289 1.288-1.288 1.224-2.223 1.289-3.538.057-1.281.072-1.69.072-4.95s-.015-3.67-.072-4.95c-.065-1.315-.349-2.598-1.289-3.538-1.288-1.288-2.223-1.224-3.538-1.289-1.281-.057-1.69-.072-4.95-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href={user.socials.facebook} target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-blue-600 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </a>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-4">My NFTs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.nfts.map((nft) => (
              <div key={nft.id} className="bg-gray-700 p-4 rounded-lg">
                <img src={nft.image} alt={nft.name} className="w-full h-32 object-cover rounded" />
                <p className="mt-2 text-sm">{nft.name}</p>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={handleEditProfile}
          className="mt-6 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Edit Profile
        </button>
      </main>

      <footer className="mt-8 text-sm text-gray-400">
        <p>© 2025 4V4. All rights reserved.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const username = params?.username;

    if (!username) {
      return {
        props: {
          user: null,
        },
      };
    }

    // Normalize username (e.g., handle 'fabohax' as 'fabohax' if needed)
    const normalizedUsername = username === 'fabohax' ? 'fabohax' : username;

    // Fetch user data based on username (mock for now)
    const userData = mockUser.username === normalizedUsername ? mockUser : null;

    return {
      props: {
        user: userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        user: null,
      },
    };
  }
}