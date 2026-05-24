import { PlusIcon, ShieldCheckIcon, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { BorderTrail } from './border-trail';

const FREE_FEATURES = [
  'Game rules Q&A (unlimited)',
  'WPILib code snippets',
  'Rookie checklist & pit guide',
  'Basic strategy builder',
];

const PRO_FEATURES = [
  'Everything in Free',
  'AI alliance pick list (Smart Scouting)',
  'Full match scouting analytics',
  'Export pick lists to CSV',
  'Priority support & early access',
];

const ease = [0.16, 1, 0.3, 1] as const;

export function RobotifyPricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 bg-black">
      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl space-y-14 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-4 text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-1 font-mono text-xs uppercase tracking-widest text-white">
              Pricing
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl lg:text-5xl">
            Free to start. Upgrade when you're ready.
          </h2>
          <p className="text-sm text-gray-400 md:text-base">
            Basic features are always free. Unlock Smart Scouting and full analytics
            with Scout Pro — built for teams that want to win, not just show up.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="relative grid md:grid-cols-2 border border-white/10 bg-[#060606]">
            {/* Corner plus icons */}
            <PlusIcon className="absolute -top-3 -left-3 size-5 text-white/30" />
            <PlusIcon className="absolute -top-3 -right-3 size-5 text-white/30" />
            <PlusIcon className="absolute -bottom-3 -left-3 size-5 text-white/30" />
            <PlusIcon className="absolute -bottom-3 -right-3 size-5 text-white/30" />

            {/* Free tier */}
            <div className="w-full px-6 pt-8 pb-7 border-b md:border-b-0 md:border-r border-white/10">
              <div className="space-y-1 mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-lg leading-none">Free</h3>
                  <Badge variant="secondary">Always free</Badge>
                </div>
                <p className="text-gray-500 text-sm">Everything a rookie team needs to get started.</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-0.5 text-gray-400 text-xl">
                  <span>$</span>
                  <span className="text-white -mb-0.5 text-5xl font-extrabold tracking-tighter">0</span>
                  <span>/month</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button className="w-full" variant="outline" asChild>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">Launch the app</a>
              </Button>
            </div>

            {/* Scout Pro tier */}
            <div className="relative w-full px-6 pt-8 pb-7 bg-[#040d18]">
              <BorderTrail
                style={{
                  boxShadow:
                    '0px 0px 40px 15px rgba(237,28,36,0.35), 0 0 80px 40px rgba(0,109,183,0.2)',
                }}
                size={90}
              />
              <div className="space-y-1 mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-lg leading-none">Scout Pro</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-500 text-sm line-through">$15</span>
                    <Badge>33% off</Badge>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Advanced scouting & analytics for serious teams.</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-0.5 text-gray-400 text-xl">
                  <span>$</span>
                  <span className="text-white -mb-0.5 text-5xl font-extrabold tracking-tighter">10</span>
                  <span>/month&nbsp;</span>
                  <span className="text-xs self-end mb-1 text-gray-500">per team</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ED1C24' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button className="w-full" asChild>
                <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">Get Scout Pro</a>
              </Button>
            </div>
          </div>

          {/* Trust line */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheckIcon className="size-4" />
            <span>No hidden fees · Cancel any time · Free during 2026 REBUILT season</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
