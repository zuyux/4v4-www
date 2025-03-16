'use client';

import Link from 'next/link';
import Navigation from '@/app/components/features/navigation/Navigation';
import { useParams } from 'next/navigation';
import { Info } from 'lucide-react';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const address = params?.address as string;

  return (
    <div className="h-screen bg-white text-black m-0 p-0 overflow-hidden" id="__next">
      <Navigation />
      <div className="flex flex-col items-center justify-center h-full">
        <User className='h-36'/>
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg">{address}</p>
        <p className="mt-4 text-accent">
          This is a default profile page. More features will be added soon.
        </p>
      </div>
      <div className="fixed bottom-4 left-4">
        <Link href="#">
          <Info />
        </Link>
      </div>
    </div>
  );
}