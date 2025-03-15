import '@/app/globals.css';
import ClientLayout from '@/app/ClientLayout';

export default function App({ Component, pageProps }) {
  return (
    <ClientLayout>
      <main>
        <Component {...pageProps} />
      </main>
    </ClientLayout>
  );
}
