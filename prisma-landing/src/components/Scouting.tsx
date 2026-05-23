import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Trophy, Zap } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import { APP_URL, FRC_BLUE, FRC_RED } from './Hero';

const cardEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ROBOT_IMAGES = {
  hero: '/DSC09950.JPG',
  pit: '/DSC09909.JPG',
  field: '/DSC09912.JPG',
  build: '/_DSC2094 copy.JPG',
  code: '/_DSC2096.JPG',
  action: '/_DSC2187.JPG',
  wide: '/DSC00205.JPG',
};

const PICK_LIST = [
  {
    rank: '#1',
    team: 'Team 254',
    why: 'Best shooter in pool. Hits Supercharged RP (360+ fuel). Reliability 5/5.',
    badge: 'Top pick',
    color: 'red',
  },
  {
    rank: '#2',
    team: 'Team 3476',
    why: 'L3 climber. Locks Traversal RP. One breakdown day 1, recovered fully.',
    badge: 'Endgame',
    color: 'blue',
  },
  {
    rank: '#3',
    team: 'Team 1690',
    why: 'Heavy defense specialist. Plays aggressive, low foul count.',
    badge: 'Defense',
    color: 'red',
  },
];

const FLOATING_SIDE_IMAGES = [
  { src: ROBOT_IMAGES.field, top: '8%',  right: '-2%', rotate: 4,  delay: 0.2, duration: 5.8 },
  { src: ROBOT_IMAGES.build, top: '38%', left:  '-2%', rotate: -3, delay: 0.6, duration: 6.4 },
  { src: ROBOT_IMAGES.wide,  top: '68%', right: '-2%', rotate: 2,  delay: 1.0, duration: 5.2 },
];

function FloatingSideImage({ img }: { img: typeof FLOATING_SIDE_IMAGES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="absolute hidden xl:block pointer-events-none z-0"
      style={{ top: img.top, right: img.right, left: img.left, width: 140 }}
      initial={{ opacity: 0, x: img.right ? 30 : -30, rotate: img.rotate * 2 }}
      animate={isInView ? {
        opacity: 0.75,
        x: 0,
        rotate: img.rotate,
        y: [0, -12, 0],
      } : { opacity: 0, x: img.right ? 30 : -30 }}
      transition={{
        opacity: { delay: img.delay, duration: 0.9, ease: cardEase },
        x: { delay: img.delay, duration: 0.9, ease: cardEase },
        rotate: { delay: img.delay, duration: 0.9, ease: cardEase },
        y: { delay: img.delay + 0.9, duration: img.duration, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <img src={img.src} alt="FRC robot" className="w-full h-24 object-cover" />
      </div>
    </motion.div>
  );
}

export function Scouting() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroImgRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section
      id="scouting"
      ref={sectionRef}
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Floating side images */}
      {FLOATING_SIDE_IMAGES.map((img, i) => (
        <FloatingSideImage key={i} img={img} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 sm:mb-16 md:py-24 text-center">
          <WordsPullUpMultiStyle
            containerClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            segments={[
              { text: 'Smart Scouting.', className: 'text-white' },
              { text: 'Wins alliances. Wins competitions.', className: 'italic font-serif text-white' },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: cardEase }}
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mt-8 font-medium leading-relaxed"
          >
            Most teams hand-compile scouting data on paper between matches.
            Robotify does it in 30 seconds and tells you{' '}
            <span className="font-bold" style={{ color: FRC_RED }}>why</span>{' '}
            each pick is ranked the way it is.
          </motion.p>
        </div>

        {/* Hero robot image with parallax */}
        <motion.div
          ref={heroImgRef}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isHeroInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.9, ease: cardEase }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-4 h-[320px] sm:h-[460px] md:h-[580px]"
        >
          <motion.img
            src={ROBOT_IMAGES.hero}
            alt="Team BEAN 1833 robot on the field"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: bgY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 noise-overlay opacity-[0.4] mix-blend-overlay pointer-events-none" />

          {/* FRC color accent stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(to right, ${FRC_RED}, ${FRC_BLUE})` }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-end">
              <div className="md:col-span-2">
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.7, ease: cardEase }}
                  className="text-[10px] sm:text-xs uppercase tracking-widest mb-3"
                  style={{ color: FRC_RED }}
                >
                  Live at competition
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55, duration: 0.8, ease: cardEase }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  Scouts tap. AI ranks. Drive team picks with confidence.
                </motion.p>
              </div>
              <div className="flex md:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.7, ease: cardEase }}
                  className="flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10"
                >
                  <Zap className="w-4 h-4" style={{ color: FRC_RED }} />
                  <span className="text-sm sm:text-base font-medium text-white">
                    30s analysis · 2+ hrs saved
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-column: AI Pick List + Process steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          {/* AI pick list mock */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: cardEase }}
            className="bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-8 sm:p-10 border border-white/8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5" style={{ color: FRC_RED }} />
                <span className="text-xs sm:text-sm uppercase tracking-widest font-bold" style={{ color: FRC_RED }}>
                  AI alliance pick list
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">Generated in 28s</span>
            </div>

            <div className="space-y-4">
              {PICK_LIST.map((pick, i) => (
                <motion.div
                  key={pick.rank}
                  initial={{ x: -24, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: cardEase }}
                  whileHover={{ x: 4 }}
                  className="bg-[#111] rounded-xl p-5 sm:p-6 border border-white/8 cursor-default"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      {pick.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-white font-semibold text-base sm:text-lg">{pick.team}</span>
                        {pick.color === 'red' ? (
                          <span
                            className="text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                            style={{
                              color: FRC_RED,
                              background: `${FRC_RED}18`,
                              borderColor: `${FRC_RED}40`,
                            }}
                          >
                            {pick.badge}
                          </span>
                        ) : (
                          <span
                            className="text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                            style={{
                              color: FRC_BLUE,
                              background: `${FRC_BLUE}18`,
                              borderColor: `${FRC_BLUE}40`,
                            }}
                          >
                            {pick.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{pick.why}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15, duration: 0.7, ease: cardEase }}
            className="bg-[#0d0d0d] rounded-2xl md:rounded-3xl p-8 sm:p-10 border border-white/8 flex flex-col"
          >
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold mb-8" style={{ color: FRC_BLUE }}>
              How it works
            </span>

            <div className="flex-1 space-y-7">
              {[
                {
                  step: '01',
                  title: 'Scouts tap data on a tablet',
                  body: 'BPS, climb level, fouls, reliability. Under 2 minutes per team, per match.',
                },
                {
                  step: '02',
                  title: "Enter your robot's capabilities",
                  body: "Can you shoot? Climb? What's your BPS? AI uses this to find complementary partners.",
                },
                {
                  step: '03',
                  title: 'Click "Analyze with AI"',
                  body: 'Get a ranked alliance pick list with the exact reasoning behind every choice.',
                },
                {
                  step: '04',
                  title: 'Pick with confidence',
                  body: 'Drive team sees the data before pick announcement. No more guesswork.',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: cardEase }}
                  className="flex gap-5"
                >
                  <span className="text-gray-600 text-sm sm:text-base font-medium pt-0.5 min-w-[2rem]">{s.step}</span>
                  <div>
                    <p className="text-white text-base sm:text-lg font-semibold mb-1.5">{s.title}</p>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FRC photo strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16 sm:mb-20">
          {[
            { src: ROBOT_IMAGES.wide,   label: 'Competition' },
            { src: ROBOT_IMAGES.pit,    label: 'Pit' },
            { src: ROBOT_IMAGES.field,  label: 'Field' },
            { src: ROBOT_IMAGES.build,  label: 'Build' },
            { src: ROBOT_IMAGES.code,   label: 'Match' },
            { src: ROBOT_IMAGES.action, label: 'Action' },
          ].map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: cardEase }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden h-36 sm:h-44 md:h-52 group"
            >
              <img
                src={img.src}
                alt={`Team BEAN 1833 ${img.label}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p
                className="absolute bottom-3 left-3 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white"
              >
                {img.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: cardEase }}
          className="relative bg-[#0d0d0d] rounded-2xl md:rounded-3xl px-8 sm:px-12 md:px-20 py-16 sm:py-20 md:py-24 text-center overflow-hidden border border-white/8"
        >
          <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none" />

          {/* FRC dual-color glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px]"
            style={{ background: `linear-gradient(to right, transparent, ${FRC_RED}80, ${FRC_BLUE}80, transparent)` }}
          />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[10px] sm:text-xs uppercase tracking-widest mb-5 font-bold"
              style={{ color: FRC_RED }}
            >
              Built by Team BEAN 1833 · 60-8-0 · #1 Peachtree District
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: cardEase }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8 max-w-4xl mx-auto text-white"
            >
              The AI mentor 90,000+ robotics teams can't afford to hire.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.7, ease: cardEase }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Free during 2026 REBUILT season. Open the app on any tablet,
              laptop, or phone. No install required.
            </motion.p>

            <motion.a
              href={APP_URL}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7, ease: cardEase }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-1 hover:gap-3 bg-white rounded-full pl-6 sm:pl-7 pr-1 py-1 transition-all duration-300"
            >
              <span className="text-black font-semibold text-base sm:text-lg">
                Launch the app
              </span>
              <span className="bg-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-14 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-3xl mx-auto"
            >
              {[
                { label: 'FRC teams', value: '3,800' },
                { label: 'Total robotics', value: '90K+' },
                { label: '2026 game', value: 'REBUILT' },
                { label: 'Team BEAN', value: '1833' },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: cardEase }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {m.value}
                  </p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mt-1">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-14 pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            © 2026 Robotify · Built at WaveHack by Team BEAN 1833
          </p>
          <div className="flex items-center gap-8">
            <a href="#features-detail" className="text-sm text-gray-500 hover:text-white transition-colors">Features</a>
            <a href="#scouting" className="text-sm text-gray-500 hover:text-white transition-colors">Scouting</a>
            <a href={APP_URL} className="text-sm text-gray-500 hover:text-white transition-colors">Launch app</a>
          </div>
        </div>

      </div>
    </section>
  );
}
