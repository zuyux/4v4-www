// app/page.tsx
'use client';
import { Button } from "@/components/ui/button";

export default function MainPage() {

  return (
    <div className="s-full h-screen bg-white text-black m-0 p-0 overflow-hidden text-center py-72" id="__next">
      <h1>LANDIN PAGE</h1>
      <br/>
      <Button>Launch App</Button>
    </div>
  );
}