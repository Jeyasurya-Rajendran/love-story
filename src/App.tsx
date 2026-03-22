import { useState, useEffect, useRef } from "react";
import Phase from "./component/Phase";
import Gallery from "./component/Gallery";

/* ---------------- TYPES ---------------- */
type PhaseType = {
  title: string;
  paragraphs: string[];
  highlight?: string;
};

type NavigationProps = {
  onNext: () => void;
};

/* ---------------- DATA ---------------- */
const phases: PhaseType[] = [
  {
    title: "The Day Everything Changed",
    paragraphs: [
      "It was just another day. Nothing special. Nothing planned.",
      "And then… there you were.",
      "Not the kind of fancy, flashy the world stops for. But the kind my world quietly chose.",
      "Somehow, in that moment, everything felt… different.",
    ],
    highlight: "You didn’t stand out to the world… but you became my world.",
  },
  {
    title: "Between Messages and Silences",
    paragraphs: [
      "We didn’t really talk. Not properly.",
      "Just texts. Small conversations. Awkward pauses,",
      "Some unwanted vaanga ponga formal distance msgs,",
      "But somehow… I could feel your presence in those chats.",
      "I would type, erase, type again… afraid to say too much.",
    ],
    highlight:
      "I was already talking to you in my head more than in real life.",
  },
  {
    title: "Falling Quietly",
    paragraphs: [
      "Somewhere between those chats… I fell.",
      "No noise. No announcement. Just… deeper every day.",
      "Your messages became my favorite part of the day.",
      "And your birthday… felt like something I was emotionally part of.",
    ],
    highlight:
      "I was already in love… long before I had the courage to admit it.",
  },
  {
    title: "Loving You in Silence",
    paragraphs: [
      "But love didn’t make me brave.",
      "It made me question everything about myself.",
      "My looks. My awkwardness. My luck.",
      "And slowly… I convinced myself you deserved better.",
    ],
    highlight:
      "So I chose silence… not because I didn’t love you, but because I did.",
  },
  {
    title: "The Years That Didn’t Change Anything",
    paragraphs: [
      "Life moved forward.",
      "Work. Stability. Distractions.",
      "I tried everything to move on… even pretending to.",
      "But somehow, you stayed… in every quiet moment.",
    ],
    highlight:
      "Some people don’t leave your heart… even when they’re not in your life.",
  },
  {
    title: "When Destiny Stopped Waiting",
    paragraphs: [
      "And then… we found our way back.",
      "A little older. A little different. But still… us.",
      "This time, I spoke more. Felt more. Risked more.",
      "And somehow… everything aligned.",
    ],
    highlight:
      "What I was afraid to say for years… finally found its way to you.",
  },
  {
    title: "The Story We’re Writing Now",
    paragraphs: [
      "And now… here we are.",
      "No more guessing. No more holding back.",
      "Just love. Real, deep, overwhelming love.",
      "The kind we both waited for… without knowing.",
    ],
    highlight:
      "This isn’t where the story ends… this is where it finally begins.",
  },
];

/* ---------------- COMPONENTS ---------------- */

const Greeting: React.FC<NavigationProps> = ({ onNext }) => {
  // useEffect(() => {
  //   const timer = setTimeout(onNext, 5000);
  //   return () => clearTimeout(timer);
  // }, [onNext]);

  return (
    <div
      onClick={onNext}
      className="h-screen flex items-center justify-center relative overflow-hidden cursor-pointer bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-200"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/doodle1.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="bg-white/60 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/30">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Hey Harhini kuttyyy ❤️
        </h1>

        <p className="text-lg leading-relaxed">
          I never really said this the right way…
          <br />
          So I built something instead.
        </p>

        <p className="mt-4 italic text-sm">A story… that starts with you.</p>

        <p className="mt-6 text-xs opacity-70">(Tap anywhere to begin)</p>
      </div>
    </div>
  );
};

type EndingProps = {
  onRestart: () => void;
};

const Ending: React.FC<EndingProps> = ({ onRestart }) => {
  return (
    <div
      onClick={onRestart}
      className="h-screen flex items-center justify-center relative cursor-pointer bg-gradient-to-br from-yellow-200 to-pink-300 text-center overflow-hidden"
    >
      {/* Doodle */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/doodle1.png')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">
          The Greatest Story Ever Written
        </h1>
        <p>
          And the best part?
          <br />
          This story doesn’t end.
          <br />
          <br />
          It only gets better…
          <br />
          <br />
          With you ❤️
        </p>

        <p className="mt-6 text-sm">(Tap to relive our story)</p>
      </div>
    </div>
  );
};

/* ---------------- MAIN APP ---------------- */
const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/music.mp3");
      audio.volume = 0.6;
      audio.loop = true;

      audioRef.current = audio;
    }
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }

      // remove after first interaction
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  const restart = () => setStep(0);
  const next = () => {
    setStep((prev) => prev + 1);
  };

  if (step === 0) return <Greeting onNext={next} />;
  if (step >= 1 && step <= phases.length)
    return (
      <Phase
        data={phases[step - 1]}
        onNext={next}
        step={step}
        key={phases[step - 1].title + phases[step - 1].paragraphs}
      />
    );
  if (step === phases.length + 1) return <Gallery onNext={next} />;
  return <Ending onRestart={restart} />;
};

export default App;
