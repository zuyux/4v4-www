'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    router.push('/app');
  }, [router]);

  return <p>Redirecting...</p>;
}
