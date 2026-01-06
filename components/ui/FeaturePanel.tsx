"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function FeaturePanel({ onAdd }: { onAdd?: () => void }) {
  return (
    <div className="mt-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Feature Panel</h3>
        <div>
          <Button size="sm" onClick={() => (onAdd ? onAdd() : alert('Add feature placeholder'))}>Add Feature</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {["Chat UI", "Memory Store", "Tone Controls"].map((t) => (
          <div key={t} className="p-3 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/10">
            <div className="font-medium">{t}</div>
            <div className="text-xs text-muted-foreground mt-1">Placeholder for {t} — click Add Feature to customize.</div>
          </div>
        ))}
      </div>
    </div>
  );
}
