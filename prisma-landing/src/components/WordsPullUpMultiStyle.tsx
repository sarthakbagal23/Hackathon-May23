import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Build a flat list of words, each carrying its segment's className
  const words: { word: string; className: string }[] = [];
  segments.forEach((segment) => {
    const segmentWords = segment.text.split(' ').filter(Boolean);
    segmentWords.forEach((word) => {
      words.push({ word, className: segment.className || '' });
    });
  });

  return (
    <div ref={ref} className={containerClassName}>
      <div className="inline-flex flex-wrap justify-center">
        {words.map((item, i) => (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className}`}
          >
            {item.word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
