"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-24 h-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 border-2 border-primary rounded-full"
          />
          <motion.div
            animate={{ rotate: 360, borderRadius: ["50%", "30%", "50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-2 border-ice border-t-transparent rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bebas text-4xl text-white tracking-widest">
              A<span className="text-primary">.</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-[1px] bg-linear-to-r from-transparent via-primary to-transparent"
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-orbitron text-[10px] text-primary tracking-[0.4em] uppercase"
          >
            Initializing_System
          </motion.span>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-ice/20 to-transparent" />
      </div>
    </motion.div>
  );
}
