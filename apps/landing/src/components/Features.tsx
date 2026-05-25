import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import { FRC_BLUE, FRC_RED } from './Hero';


interface FeatureCardData {
  title: string;
  number: string;
  emoji: string;
  items: string[];
}

const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: 'Game Rules Q&A',
    number: '01',
    emoji: '📖',
    items: [
      'Ask any 2026 REBUILT rule in plain English',
      'AI cites the exact rule section',
      'Live during kickoff weekend',
    ],
  },
  {
    title: 'Strategy Builder',
    number: '02',
    emoji: '🎯',
    items: [
      'Input your robot\'s real capabilities',
      'Auto, teleop, endgame plan in seconds',
      'Targets the right Ranking Points',
    ],
  },
  {
    title: 'Code Snippets',
    number: '03',
    emoji: '⚙️',
    items: [
      'WPILib code in Java or Python',
      'Tank drive, PID, autonomous, climber',
      'Copy-paste ready with inline comments',
    ],
  },
  {
    title: 'Rookie Checklist',
    number: '04',
    emoji: '✅',
    items: [
      'Chairman\'s Award prep walkthrough',
      'Pit setup, match day, scouting basics',
      'Alliance selection playbook',
    ],
  },
];

const cardEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FeatureInfoCard({ card, index }: { card: FeatureCardData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const accentColor = index % 2 === 0 ? FRC_RED : FRC_BLUE;

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0, y: 16 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.95, opacity: 0, y: 16 }}
      transition={{ delay: (index + 1) * 0.12, duration: 0.7, ease: cardEase }}
      whileHover={{ y: -4 }}
      className="bg-[#111] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full"
    >
      <div>
        {/* Emoji icon */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 border"
          style={{ background: `${accentColor}18`, borderColor: `${accentColor}30` }}
        >
          {card.emoji}
        </div>

        {/* Title with number */}
        <div className="mb-4 sm:mb-5">
          <h3 className="text-white text-base sm:text-lg font-semibold">{card.title}</h3>
          <span className="text-xs font-bold" style={{ color: accentColor }}>{card.number}</span>
        </div>

        {/* Checklist */}
        <ul className="space-y-2 sm:space-y-3">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
              <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#scouting"
        className="inline-flex items-center gap-1 text-xs sm:text-sm mt-5 sm:mt-6 hover:opacity-80 transition-opacity"
        style={{ color: accentColor }}
      >
        See it in action
        <ArrowRight className="w-3.5 h-3.5" style={{ transform: 'rotate(-45deg)' }} />
      </a>
    </motion.div>
  );
}

function VideoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0, y: 16 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.95, opacity: 0, y: 16 }}
      transition={{ delay: 0.15, duration: 0.7, ease: cardEase }}
      className="relative rounded-2xl overflow-hidden h-full min-h-[280px] sm:min-h-[320px] md:col-span-2 lg:col-span-2 bg-[#0d0d0d]"
    >
      <img
        src="/DSC09912.JPG"
        alt="FRC robot on field"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      {/* FRC color stripe at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(to right, ${FRC_RED}, ${FRC_BLUE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-3 font-bold" style={{ color: FRC_BLUE }}>
          Always-on AI mentor
        </p>
        <motion.img
          src="/_DSC2096.JPG"
          alt="Five tools every rookie team needs in one tablet app"
          className="w-full max-h-48 object-cover rounded-lg shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: cardEase }}
        />
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features-detail" className="relative min-h-screen bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-14 md:mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs uppercase tracking-widest mb-4 font-bold"
            style={{ color: FRC_BLUE }}
          >
            What's inside
          </motion.p>
          <WordsPullUpMultiStyle
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
            segments={[
              { text: 'Studio-grade tools for first-season teams.', className: 'text-white' },
            ]}
          />
          <WordsPullUpMultiStyle
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            segments={[
              { text: 'Built by FRC kids. Powered by AI.', className: 'text-gray-500' },
            ]}
          />
        </div>

        {/* Card grid: video spans 2 cols, then 4 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 lg:auto-rows-fr">
          <VideoCard />
          {FEATURE_CARDS.map((card, i) => (
            <FeatureInfoCard key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
