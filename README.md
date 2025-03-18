# 4V4 - Web Interface

## 🚀 Introduction
**4V4** is a **Next.js-powered web interface** designed for **creating, customizing, and exporting 3D avatars**. This dApp utilizes **Scroll zkEVM** to ensure **fast, low-cost, and scalable transactions** for minting avatars as NFTs. The application is built with **Babylon.js** for real-time 3D rendering, offering a seamless user experience.

## 🛠 Tech Stack
- **Frontend**: Next.js (React + TailwindCSS)
- **3D Rendering**: Babylon.js
- **Blockchain**: Scroll zkEVM (ERC-721 NFTs)
- **Storage**: IPFS / Arweave for 3D models and metadata
- **Backend**: Node.js + Express

## 🎨 Features
- **3D Avatar Customization**: Edit body, clothing, accessories, and animations.
- **NFT Minting**: Convert avatars into NFTs stored on Scroll.
- **Interoperability**: Export avatars in `.glb`, `.fbx`, and `.vrm` formats.
- **Marketplace**: Buy, sell, and trade avatars within the dApp.
- **Web3 Authentication**: Connect using MetaMask, WalletConnect, or other Web3 wallets.

## 🏗 Setup & Installation
### Prerequisites
- Node.js v16+
- Yarn or npm
- MetaMask or another Web3 wallet

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/zuyux/4V4-www.git
   cd 4V4
   ```
2. Install dependencies:
   ```sh
   yarn install  # or npm install
   ```
3. Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_SCROLL_RPC_URL=<your_scroll_rpc_url>
   NEXT_PUBLIC_IPFS_GATEWAY=<your_ipfs_gateway>
   ```
4. Start the development server:
   ```sh
   yarn dev  # or npm run dev
   ```

## 🔗 Deployment
- **Local Development**: `yarn dev`
- **Production Build**: `yarn build && yarn start`
- **Hosting Options**: Vercel, Netlify, or any Next.js-compatible hosting.

## 📜 Smart Contract Integration
The dApp interacts with a **custom ERC-721 contract** deployed on **Scroll zkEVM**. The contract handles:
- NFT minting
- Metadata storage on IPFS
- Trading and ownership transfers

## 📌 Roadmap
- [ ] **Testnet deployment on Scroll**
- [ ] **UI improvements for 3D customization**
- [ ] **Marketplace launch**
- [ ] **Mobile support for avatar generation**

Check Contracts here: [github.com/zuyux/4v4-contracts](https://github.com/zuyux/4v4-contracts)

---
💡 **Want to contribute?** Open an issue or submit a pull request!

