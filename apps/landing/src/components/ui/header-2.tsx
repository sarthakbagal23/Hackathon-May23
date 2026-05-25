import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

const FRC_RED  = '#ED1C24';
const FRC_BLUE = '#006DB7';

const LINKS = [
  { label: 'Features', href: '#features-detail' },
  { label: 'Scouting', href: '#scouting' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'About',    href: '#features' },
];

function RobotifyWordmark() {
  return (
    <a href="#hero" className="flex items-center gap-2.5 group">
      {/* FRC-coloured dot */}
      <span className="relative flex h-3 w-3">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: FRC_RED }}
        />
        <span
          className="relative inline-flex h-3 w-3 rounded-full"
          style={{ background: FRC_RED }}
        />
      </span>
      <span
        className="text-xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity"
        style={{ letterSpacing: '-0.03em' }}
      >
        Robotify
        <span style={{ color: FRC_BLUE }}>.</span>
      </span>
    </a>
  );
}

export function RobotifyHeader() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300 ease-out',
        scrolled && !open
          ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent',
        open && 'bg-black/95',
      )}
    >
      {/* FRC stripe at very top */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(to right, ${FRC_RED}, ${FRC_BLUE})` }}
      />

      <nav
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 ease-out',
          scrolled ? 'h-16' : 'h-20',
        )}
      >
        <RobotifyWordmark />

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-[15px] text-gray-300 hover:text-white hover:bg-white/8 px-4',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            className="border-white/20 text-[#DEDBC8] hover:bg-white/8 hover:border-white/30 h-11 px-5 text-[15px]"
            asChild
          >
            <a href="#pricing">Sign In</a>
          </Button>
          <Button
            className="h-11 px-6 text-[15px] font-semibold"
            style={{ background: FRC_BLUE, color: '#fff' }}
            asChild
          >
            <a href="https://robotify-dashboard.vercel.app" target="_blank" rel="noopener noreferrer">Launch App</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="border-white/20 text-white hover:bg-white/10 md:hidden h-11 w-11"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 top-[calc(3px+var(--header-h,80px))] z-50 bg-black/97 backdrop-blur-xl border-t border-white/10 md:hidden',
          'flex flex-col overflow-hidden transition-all duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex h-full flex-col justify-between gap-4 p-6">
          <div className="grid gap-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start text-lg text-gray-200 hover:text-white hover:bg-white/8 h-12',
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full h-12 text-base border-white/20 text-[#DEDBC8]" asChild>
              <a href="#pricing" onClick={() => setOpen(false)}>Sign In</a>
            </Button>
            <Button
              className="w-full h-12 text-base font-semibold"
              style={{ background: FRC_BLUE, color: '#fff' }}
              asChild
            >
              <a href="https://robotify-dashboard.vercel.app" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Launch App</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
