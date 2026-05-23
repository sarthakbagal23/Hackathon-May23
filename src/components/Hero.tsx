import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';

const HERO_VIDEO_URL = 'https://www.youtube.com/embed/FGxDIam5cf4';

export const APP_URL = 'http://localhost:5173';

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FRC_BLUE = '#006DB7';
const FRC_RED  = '#ED1C24';

const FLOATING_IMAGES = [
  { src: '/DSC09950.JPG', delay: 0,   x: -20, rotate: -4, top: '18%', right: '3%', duration: 5.2 },
  { src: '/_DSC2187.JPG', delay: 0.8, x:  15, rotate:  3, top: '42%', right: '2%', duration: 6.1 },
  { src: '/DSC09909.JPG', delay: 0.4, x: -10, rotate: -2, top: '28%', left:  '2%', duration: 5.7 },
];

export function Hero() {
  return (
    <section id="hero" className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* YouTube Video */}
        <iframe
          className="absolute inset-0 w-full h-full"
          src={HERO_VIDEO_URL}
          title="Robotify — AI Mentor for FRC"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Noise + gradient overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.5] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/85 pointer-events-none" />

        {/* Floating robot image cards */}
        {FLOATING_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            className="absolute z-10 hidden lg:block pointer-events-none"
            style={{ top: img.top, right: img.right, left: img.left, width: 130 }}
            initial={{ opacity: 0, x: img.x * 2, rotate: img.rotate * 2 }}
            animate={{ opacity: 1, x: 0, rotate: img.rotate, y: [0, -10, 0] }}
            transition={{
              opacity: { delay: img.delay + 1, duration: 0.9, ease: customEase },
              x:       { delay: img.delay + 1, duration: 0.9, ease: customEase },
              rotate:  { delay: img.delay + 1, duration: 0.9, ease: customEase },
              y: { delay: img.delay + 1.5, duration: img.duration, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 backdrop-blur-sm">
              <img src={img.src} alt="FRC robot" className="w-full h-24 object-cover" />
            </div>
          </motion.div>
        ))}

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Left: big wordmark */}
            <div className="col-span-12 lg:col-span-8">
              <WordsPullUp
                text="Robotify"
                showAsterisk={false}
                className="text-[24vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[17vw] 2xl:text-[18vw] font-bold leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#FFFFFF' }}
              />
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: customEase }}
                className="text-xs sm:text-sm uppercase tracking-[0.3em] mt-3 font-bold"
                style={{ color: FRC_BLUE }}
              >
                The AI mentor for rookie FRC teams
              </motion.p>
            </div>

            {/* Right: description + CTA */}
            <div className="col-span-12 lg:col-span-4 pb-2 lg:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
                className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-medium leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                40% of rookie FRC teams quit after year one. Robotify answers
                rule questions, writes WPILib code, builds match strategy, and
                runs scouting analysis — so your team survives season one and
                wins season two.
              </motion.p>

              <motion.a
                href={APP_URL}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ delay: 0.7, duration: 0.8, ease: customEase }}
                className="group inline-flex items-center gap-1 hover:gap-3 bg-white rounded-full pl-4 sm:pl-5 pr-1 py-1 transition-all duration-300"
              >
                <span className="text-black font-semibold text-sm sm:text-base">
                  Launch the app
                </span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* FRC color stripe at bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.2, ease: customEase }}
          className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background: `linear-gradient(to right, ${FRC_RED}, ${FRC_BLUE})`, transformOrigin: 'left' }}
        />
      </div>
    </section>
  );
}

export { FRC_BLUE, FRC_RED };
