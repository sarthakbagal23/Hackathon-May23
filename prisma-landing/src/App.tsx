import { motion } from 'framer-motion';
import { BarChart3, BookOpen, ClipboardList, Code2, Target, Wifi } from 'lucide-react';
import { About } from './components/About';
import { Features } from './components/Features';
import { Hero } from './components/Hero';
import { Scouting } from './components/Scouting';
import { BentoGrid, type BentoItem } from './components/ui/bento-grid';
import { RobotifyHeader } from './components/ui/header-2';
import { RobotifyPricing } from './components/ui/single-pricing-card-1';

const BENTO_ITEMS: BentoItem[] = [
  {
    title: 'Smart Scouting',
    meta: '30s analysis',
    description:
      'AI-ranked alliance pick lists with reasoning. From raw scout data to alliance selection in under a minute.',
    icon: <BarChart3 className="w-4 h-4" style={{ color: '#ED1C24' }} />,
    status: 'Pro',
    tags: ['AI', 'Scouting'],
    colSpan: 2,
    hasPersistentHover: true,
    cta: 'See it →',
  },
  {
    title: 'Game Rules Q&A',
    meta: '2026 REBUILT',
    description:
      'Ask any rule in plain English. Robotify cites the exact section so you never get penalized for guessing.',
    icon: <BookOpen className="w-4 h-4" style={{ color: '#006DB7' }} />,
    status: 'Live',
    tags: ['Rules', 'AI'],
    cta: 'Try it →',
  },
  {
    title: 'Strategy Builder',
    meta: 'Auto · Teleop · Endgame',
    description:
      'Input your robot capabilities and get a full match strategy targeting the right Ranking Points.',
    icon: <Target className="w-4 h-4" style={{ color: '#006DB7' }} />,
    status: 'Live',
    tags: ['Strategy'],
    cta: 'Build →',
  },
  {
    title: 'WPILib Code Snippets',
    meta: 'Java · Python',
    description:
      'Tank drive, PID loops, autonomous routines, climbers — copy-paste ready with inline comments.',
    icon: <Code2 className="w-4 h-4" style={{ color: '#ED1C24' }} />,
    status: 'Live',
    tags: ['Code', 'WPILib'],
    colSpan: 2,
    cta: 'Copy →',
  },
  {
    title: 'Rookie Checklist',
    meta: "Chairman's · Pit · Match day",
    description:
      'Step-by-step walkthrough from kickoff to alliance selection. Nothing falls through the cracks.',
    icon: <ClipboardList className="w-4 h-4" style={{ color: '#006DB7' }} />,
    status: 'Live',
    tags: ['Checklist'],
    cta: 'Open →',
  },
  {
    title: 'Always-On Mentor',
    meta: '24 / 7',
    description:
      'Available during build season, competition week, and every practice in between. No mentor required.',
    icon: <Wifi className="w-4 h-4" style={{ color: '#ED1C24' }} />,
    status: 'Online',
    tags: ['AI', 'Support'],
    cta: 'Learn →',
  },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function PlatformSection() {
  return (
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-10"
        >
          <p
            className="text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-3"
            style={{ color: '#006DB7' }}
          >
            The platform
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[0.95]">
            Six tools. One app. Zero excuses.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8, ease }}
        >
          <BentoGrid items={BENTO_ITEMS} />
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <RobotifyHeader />
      <Hero />
      <About />
      <PlatformSection />
      <Features />
      <Scouting />
      <RobotifyPricing />
    </div>
  );
}
