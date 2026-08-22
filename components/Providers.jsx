"use client";

import { MotionConfig } from "framer-motion";

export default function Providers({ children }) {
  // Honours the OS-level "reduce motion" setting for every animation on the page.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
