"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-400/30 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <main className="relative flex-1 flex flex-col items-center px-4 py-14 gap-24 z-10">

        {/* ================= HERO ================= */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-6xl text-center"
        >
          <motion.h1
            initial={{ rotateX: -20 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              From Small Talk
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              To Real Bonds.
            </span>
          </motion.h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Jelly is an AI companion that understands your mood, adapts to your
            personality, and turns conversations into meaningful connections.
          </p>

          <SignedOut>
            <div className="mt-10 flex justify-center">
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform shadow-xl"
                >
                  Start Talking 🚀
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
        </motion.section>

        {/* ================= LIVE AI DEMO ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Say Anything. Jelly Understands.
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            A preview of emotionally-aware conversation.
          </p>

          <div className="space-y-5">
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-2xl max-w-xs shadow-lg">
                I don’t know why I feel stuck lately.
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
              <span>Jelly is thinking…</span>
            </div>

            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-2xl max-w-sm shadow-md">
                Feeling stuck usually means something inside you wants to change.
                Want to figure out what that is together?
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= STATS ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-10 text-center"
        >
          {[
            { value: "50k+", label: "Active Users" },
            { value: "1M+", label: "Messages" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.08 }} className="p-4">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* ================= FEATURES ================= */}
        <section className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Jelly Feels Different
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Not just chat — an evolving emotional intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1200px]">
            {[
              {
                title: "Smart Ice-Breakers",
                desc: "Conversation starters crafted uniquely for you.",
              },
              {
                title: "Emotion-Aware AI",
                desc: "Jelly senses tone and adapts in real-time.",
              },
              {
                title: "Memory That Matters",
                desc: "Remembers context, preferences, and vibes.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= AI CAPABILITIES ================= */}
        <section className="max-w-6xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What Jelly Actually Does
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Not just replies — intelligent conversation behavior.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mood Awareness",
                desc: "Understands emotional tone and adjusts how it speaks.",
              },
              {
                title: "Conversation Flow",
                desc: "Knows when to listen, ask, or guide the discussion.",
              },
              {
                title: "Meaningful Memory",
                desc: "Remembers what matters — nothing more.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
