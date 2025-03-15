import '@/app/globals.css';
import { MetaMaskProvider } from '@metamask/sdk-react'; 

export default function App({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </MetaMaskProvider>
  );
}
