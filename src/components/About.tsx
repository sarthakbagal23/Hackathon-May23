import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import { AnimatedLetter } from './AnimatedLetter';
import { FRC_BLUE } from './Hero';

const ABOUT_TEXT =
  'Rookie teams show up at kickoff with no mentor, a manual they have never read, and a six-week build season. They burn hours on problems with known answers: illegal climbs, busted autonomous, scouting spreadsheets that nobody can read at alliance selection. Robotify is the mentor they cannot afford to hire.';

const STATS = [
  { value: '40%', label: 'rookie teams quit after year one' },
  { value: '3,800', label: 'FRC teams worldwide' },
  { value: '0–1', label: 'mentors per rookie team' },
  { value: '2+ hrs', label: 'saved per competition with AI scouting' },
];

export function About() {
  const paragraphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = ABOUT_TEXT.split('');
  const totalChars = chars.length;

  return (
    <section id="features" className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#0d0d0d] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-24 text-center border border-white/5">
          {/* Label */}
          <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-8 md:mb-10 font-bold" style={{ color: FRC_BLUE }}>
            The Problem
          </p>

          {/* Multi-style heading */}
          <div className="max-w-4xl mx-auto mb-10 sm:mb-14 md:mb-20">
            <WordsPullUpMultiStyle
              containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]"
              segments={[
                { text: '40% of rookie teams', className: 'font-normal text-white' },
                { text: 'quit after year one.', className: 'italic font-serif text-white' },
                {
                  text: 'The gap between rookie and veteran teams is massive.',
                  className: 'font-normal text-white',
                },
              ]}
            />
          </div>

          {/* Scroll-linked paragraph */}
          <div ref={paragraphRef} className="max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {chars.map((char, i) => (
                <AnimatedLetter
                  key={i}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  index={i}
                  totalChars={totalChars}
                />
              ))}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <p
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-none mb-2"
                  style={{ color: '#FFFFFF' }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
