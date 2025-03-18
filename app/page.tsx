'use client'
import Link from "next/link"
import { ArrowRight, CuboidIcon as Cube, Download, Repeat, ShoppingCart, Users } from "lucide-react"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have your Button component
import axios, { AxiosResponse } from 'axios';

interface WaitlistSectionProps {} // eslint-disable-line @typescript-eslint/no-empty-object-type

interface WaitlistResponse {
  message?: string;
  error?: string;
}

const MainPage: React.FC<WaitlistSectionProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response: AxiosResponse<WaitlistResponse> = await axios.post('/api/waitlist', { email });
      if (response.status === 200) {
        setSuccessMessage('Successfully added to the waitlist!');
        setEmail('');
      } else {
        setErrorMessage('Failed to join the waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="overflow-y-auto">
        {/* Navigation */}
        <header className="fixed mx-auto top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto">
            <div className="flex gap-6 md:gap-10">
              <Link href="/" className="flex items-center space-x-2">
                <Cube className="h-6 w-6" />
                <span className="inline-block font-bold">4V4</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1">
                <Link href="#features">
                  <Button variant="ghost" size="sm">
                    Features
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="ghost" size="sm">
                    Marketplace
                  </Button>
                </Link>
                <Link href="/docs" target="_blank">
                  <Button variant="ghost" size="sm">
                    Docs
                  </Button>
                </Link>
                <Link href="#">
                  <Button variant="ghost" size="sm">
                    Community
                  </Button>
                </Link>
                <Link href="/app"><Button size="sm">Launch App</Button></Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 mx-auto mt-16 md:mt-0">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Digital Identity Across the Metaverse
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    4V4 is a dApp for generating interoperable 3D avatars that can be used across games and metaverses.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/app">
                    <Button size="lg" className="h-12">
                      Create Your Avatar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button size="lg" variant="outline" className="h-12">
                      Explore Marketplace
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-[450px] rounded-2xl overflow-hidden">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/vids/voxelbot.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-200 to-pink-200 rounded-3xl"
        >          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                <p className="max-w-[900px] text-foreground md:text-xl">
                  4V4 provides everything you need to create, own, and use your digital identity across virtual worlds
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Cube className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Create & Customize</h3>
                <p className="text-center text-foreground">
                  Design unique 3D avatars with extensive customization options
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Buy & Sell</h3>
                <p className="text-center text-foreground">
                  Trade avatars and accessories on our decentralized marketplace
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Download & Export</h3>
                <p className="text-center text-foreground">
                  Export avatars in standard formats compatible with various platforms
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Repeat className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Interoperability</h3>
                <p className="text-center text-foreground">
                  Seamlessly use your avatars across different games and metaverses
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Digital Ownership</h3>
                <p className="text-center text-foreground">
                  True ownership of your digital assets secured by blockchain technology
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community Hub</h3>
                <p className="text-center text-foreground">
                  Connect with creators and gamers in our growing community
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  4V4 leverages blockchain technology for asset verification and decentralized transactions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Create or Purchase</h3>
                <p className="text-center text-muted-foreground">
                  Design your own avatar or purchase one from our marketplace
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Secure on Blockchain</h3>
                <p className="text-center text-muted-foreground">
                  Your avatar is minted as an NFT, providing verifiable ownership
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Use Everywhere</h3>
                <p className="text-center text-muted-foreground">
                  Export and use your avatar across compatible games and metaverses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-200 to-blue-500 border-t rounded-3xl -mb-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Use Cases</h2>
                <p className="max-w-[900px] text-foreground md:text-xl">
                  4V4 enhances virtual identity and gaming experiences across multiple platforms
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">Gaming</h3>
                <p className="text-foreground">
                  Use the same avatar across multiple games, maintaining your unique identity and appearance
                </p>
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">Virtual Events</h3>
                <p className="text-foreground">
                  Attend virtual conferences, concerts, and social gatherings with your personalized avatar
                </p>
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">Social Platforms</h3>
                <p className="text-foreground">
                  Connect with friends in social VR spaces using your consistent digital identity
                </p>
              </div>
              <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">Digital Creators</h3>
                <p className="text-foreground">
                  Design and sell avatar assets, earning rewards for your creativity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-foreground text-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Join the Future?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Create your first interoperable 3D avatar and take it anywhere in the metaverse
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row ">
                <Link href="/app">
                  <Button size="lg" className="h-12 border border-gray-500">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="h-12 text-foreground">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col gap-4 mb-8 w-full max-w-md mt-16">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="flex-1 px-4 py-2 border border-gray-500 rounded-xl text-background bg-foreground placeholder:text-background text-md"
                  />
                  <Button type="submit" disabled={loading} className="rounded-xl px-4 py-2 h-12 font-bold text-md border border-[.5px] border-gray-500">
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </Button>
                </form>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-gray-900 py-6 md:py-12 bg-foreground text-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center space-x-2">
                <Cube className="h-6 w-6" />
                <span className="font-bold">4V4</span>
              </div>
              <p className="text-muted-foreground">
                Build it - Own it - Play it
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/zuyux/4v4-www">
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">🄯 2025 4V4. Open Source Software.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default MainPage; 
