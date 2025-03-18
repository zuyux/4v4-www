'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    router.push('https://4v4.gitbook.io/4v4');
  }, [router]);

  return <p>Redirecting...</p>;
}
