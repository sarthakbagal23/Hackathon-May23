import React from 'react';
import { cn } from '@/lib/utils';

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'group relative p-5 rounded-xl overflow-hidden transition-all duration-300',
            'border border-white/10 bg-[#0d0d0d]',
            'hover:shadow-[0_2px_20px_rgba(255,255,255,0.04)]',
            'hover:-translate-y-0.5 will-change-transform',
            item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
            item.hasPersistentHover && 'shadow-[0_2px_20px_rgba(255,255,255,0.04)] -translate-y-0.5',
          )}
        >
          {/* Dot-grid overlay */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-300',
              'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]',
              item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            )}
          />

          <div className="relative flex flex-col space-y-3">
            {/* Icon + status */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/8 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                {item.icon}
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/8 text-gray-400 border border-white/8 group-hover:bg-white/12 transition-colors duration-300">
                {item.status ?? 'Active'}
              </span>
            </div>

            {/* Title + meta + description */}
            <div className="space-y-1.5">
              <h3 className="font-semibold text-[#E1E0CC] tracking-tight text-[15px]">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-gray-500 font-normal">{item.meta}</span>
                )}
              </h3>
              <p className="text-sm text-gray-400 leading-snug">{item.description}</p>
            </div>

            {/* Tags + CTA */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/6 border border-white/8 hover:bg-white/10 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.cta ?? 'Explore →'}
              </span>
            </div>
          </div>

          {/* Border gradient on hover */}
          <div
            className={cn(
              'absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/8 to-transparent transition-opacity duration-300',
              item.hasPersistentHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            )}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
