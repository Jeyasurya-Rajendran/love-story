/* eslint-disable react-hooks/purity */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- CONFIG ---------------- */

const TOTAL_IMAGES = 8;

const imageList = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/memories/img${i + 1}.jpg`,
);

/* ---------------- COMPONENT ---------------- */

type Props = {
  onNext: () => void;
};

const Gallery: React.FC<Props> = ({ onNext }) => {
  const [open, setOpen] = useState(false);

  /* ✅ Generate stable positions ONCE */
  const stackLayout = useMemo(() => {
    return imageList.map(() => ({
      rotate: -15 + Math.random() * 30,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120,
    }));
  }, []);

  const layoutPattern = [
    "normal",
    "normal",
    "wide",
    "normal",
    "tall",
    "normal",
    "normal",
    "wide",
  ];

  return (
    <div
      onClick={() => !open && onNext()}
      className="h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-200 flex items-center justify-center cursor-pointer"
    >
      {/* 🧩 Doodle */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/doodle.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* 📸 Stable Stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        {imageList.map((src, i) => {
          const pos = stackLayout[i];

          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                zIndex: i, // stable stacking
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <div className="w-52 md:w-60 p-[3px] bg-white/50 rounded-2xl shadow-xl">
                <img
                  src={src}
                  className="w-full h-auto rounded-xl object-cover object-center"
                />
              </div>
            </motion.div>
          );
        })}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-16 z-50 text-center pointer-events-none"
        >
          <p className="text-pink-400 text-2xl font-bold tracking-wider drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
            A few moments… that became everything 💖
          </p>
        </motion.div>
      </div>

      {/* 💥 MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* 💖 Modal Card */}
            <motion.div
              className="w-[85%] h-[75%] bg-gradient-to-br from-pink-100/80 to-yellow-100/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-3 gap-3 h-full overflow-y-auto p-2 no-scrollbar">
                {imageList.map((img, i) => {
                  const type = layoutPattern[i % layoutPattern.length];

                  return (
                    <motion.div
                      key={i}
                      className={`relative ${
                        type === "wide" ? "col-span-2" : ""
                      }`}
                      style={{
                        aspectRatio:
                          type === "wide"
                            ? "3 / 2" // 🔥 reduced from 4/3 (less stretched)
                            : type === "tall"
                              ? "3 / 4"
                              : "1 / 1",
                      }}
                    >
                      <motion.img
                        src={img}
                        className="absolute inset-0 w-full h-full object-cover object-center rounded-xl shadow-md"
                        whileHover={{ scale: 1.05 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👉 hint */}
      {!open && (
        <p className="absolute bottom-6 text-sm opacity-70">
          (Tap anywhere to continue)
        </p>
      )}
    </div>
  );
};

export default Gallery;
