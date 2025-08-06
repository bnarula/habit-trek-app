
"use client";

import React from 'react';
import { useHabits } from "@/contexts/HabitContext";
import { CreateHikeDialog } from '@/components/CreateHikeDialog';
import { HikeView } from '@/components/HikeView';
import { Mountain } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const { activeHike } = useHabits();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="w-full bg-primary text-primary-foreground py-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Mountain className="h-10 w-10" />
            <h1 className="text-4xl font-bold tracking-tight">HabitHike</h1>
          </div>
          {/* Future: Could add a button to view all hikes */}
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:px-8 flex-grow w-full">
        {activeHike ? (
          <HikeView hike={activeHike} />
        ) : (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <Image 
              src="https://placehold.co/400x300.png" 
              alt="No active hike" 
              width={400} 
              height={300}
              className="mx-auto mb-6 rounded-lg shadow-xl"
              data-ai-hint="nature trail adventure"
            />
            <h2 className="text-3xl font-bold text-primary mb-3">Your Next Adventure Awaits!</h2>
            <p className="text-muted-foreground mb-6 max-w-lg">
              A Hike is a journey with a clear goal. Create a new Hike, add habits to it, and watch your progress as you ascend the mountain!
            </p>
            <CreateHikeDialog />
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} HabitHike. All rights reserved.</p>
        <p className="text-xs mt-1">Every great journey begins with a single step.</p>
      </footer>
    </div>
  );
}
