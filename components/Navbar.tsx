```javascript
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [glassy, setGlassy] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = prevScroll;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setGlassy(true);
    } else {
      setGlassy(false);
    }
    
    setPrevScroll(latest);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top - 0 w - full z - 50 transition - colors duration - 500 ${
    glassy
        ? "bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100/50 py-2"
        : "bg-transparent py-4 border-transparent"
} `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">AI</div>
          <span className={`transition - colors duration - 300 ${ glassy ? "text-slate-900" : "text-white/90" } `}>
            Counsellor
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={`text - sm font - medium hover: opacity - 80 transition - all duration - 300 ${
    glassy ? "text-slate-600" : "text-white/80 hover:text-white"
} `}
          >
            Log in
          </Link>
          <Link
            href="/onboarding"
            className={`px - 5 py - 2.5 text - sm font - medium rounded - full transition - all duration - 300 shadow - lg hover: shadow - xl hover: -translate - y - 0.5 ${
    glassy
        ? "bg-slate-900 text-white hover:bg-slate-800"
        : "bg-white text-emerald-900 hover:bg-emerald-50"
} `}
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
```
