/* eslint-disable react-hooks/purity */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

/* ---------------- TYPES ---------------- */

type PhaseType = {
  title: string;
  paragraphs: string[];
  highlight?: string;
};

type PhaseProps = {
  data: PhaseType;
  onNext: () => void;
  step: number;
  key: string;
};

/* ---------------- COMPONENT ---------------- */

const Phase: React.FC<PhaseProps> = ({ data, onNext, step, key }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (currentIndex < data.paragraphs.length - 1) {
      const currentText = data.paragraphs[currentIndex];

      const typingTime =
        currentText.length * 40 +
        currentText.split(",").length * 200 + // pause for commas
        currentText.split(".").length * 400; // match your typeSpeed
      const buffer = 800;

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, typingTime + buffer);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, data.paragraphs]);

  useEffect(() => {
    if (currentIndex === data.paragraphs.length - 1) {
      const lastText = data.paragraphs[currentIndex];

      const typingTime = lastText.length * 40; // match typeSpeed
      const buffer = 500;

      const doneTimer = setTimeout(() => {
        setIsTypingDone(true);
      }, typingTime + buffer);

      const nextTimer = setTimeout(
        () => {
          onNext();
        },
        typingTime + buffer + 24000,
      ); // extra time to read highlight

      return () => {
        clearTimeout(doneTimer);
        clearTimeout(nextTimer);
      };
    }
  }, [currentIndex, data.paragraphs, onNext]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsTypingDone(false);
  }, [data]);

  return (
    <div
      onClick={onNext}
      className="h-screen flex items-center justify-center p-6 text-center cursor-pointer relative overflow-hidden bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-200"
    >
      {/* 🧩 Doodle Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/doodle.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* 🌸 Glow blobs */}
      <div className="absolute w-72 h-72 bg-pink-300 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-yellow-300 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      {/* ❤️ Floating hearts (randomized) */}
      {[...Array(8)].map((_, i) => {
        const left = Math.random() * 100;
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute text-pink-400 text-xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -300, opacity: [0, 1, 0] }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
            style={{ left: `${left}%` }}
          >
            ❤️
          </motion.div>
        );
      })}

      {/* 📖 Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <div className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">
          {/* 📌 Title */}
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            {data.title}
          </h2>

          {/* ✍️ Story Content */}
          <div className="space-y-4 text-left whitespace-pre-line break-words">
            {data.paragraphs.slice(0, currentIndex + 1).map((p, i) => (
              //   <p key={i} className="leading-relaxed text-lg opacity-90">
              <p
                key={i}
                className={`leading-relaxed text-lg transition-opacity duration-500 ${
                  i < currentIndex ? "opacity-80" : "opacity-100"
                }`}
              >
                {i === currentIndex ? (
                  <Typewriter
                    key={`${step}-${i}-${key}`}
                    words={[p]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={40}
                    deleteSpeed={0}
                    delaySpeed={1500}
                  />
                ) : (
                  p
                )}
              </p>
            ))}

            {/* 💎 Highlight Quote */}
            {data.highlight && isTypingDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 relative"
              >
                {/* subtle glowing line */}
                <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-pink-400 to-yellow-400 rounded-full" />

                {/* text */}
                <p className="text-xl italic font-medium text-gray-800 leading-relaxed pl-4">
                  <span className="text-pink-500 text-2xl">“</span>
                  {data.highlight}
                  <span className="text-yellow-500 text-2xl">”</span>
                </p>

                {/* soft glow */}
                <div className="absolute inset-0 bg-pink-200 opacity-10 blur-2xl rounded-xl -z-10" />
              </motion.div>
            )}
          </div>

          {/* 👉 Hint */}
          <p className="mt-6 text-xs opacity-70 text-center">
            (Tap anywhere to continue)
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Phase;
