/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Gift, Mail, MessageSquare, ChevronRight, X, ScrollText } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'greeting' | 'letter'>('greeting');
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const reasons = useMemo(() => [
    { icon: '🌟', title: 'Energy', text: 'You always bring the best vibes.' },
    { icon: '👂', title: 'Listener', text: 'Thanks for actually listening when things get heavy.' },
    { icon: '🔥', title: 'Support', text: 'I know I can count on you to have my back.' },
    { icon: '🧁', title: 'Kindness', text: 'You have always been kind and supportive.' }
  ], []);

  const handleCelebrate = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#ffffff']
    });
  }, []);

  const onOpen = () => {
    setIsOpen(true);
    handleCelebrate();
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="mesh-bg" />
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <motion.div 
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
            >
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="relative w-32 h-32 glass-card rounded-full flex items-center justify-center animate-float">
                <Gift className="w-12 h-12 text-[#38bdf8] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </motion.div>
            
            <div className="space-y-4">
              <div className="pill mx-auto">From Your Friend</div>
              <h1 className="text-2xl font-bold tracking-tight text-[#f8fafc]">
                Hey Preetham!
              </h1>
              <p className="text-sm text-[#94a3b8] italic">
                A little something for your birthday...
              </p>
            </div>
          </motion.div>
        ) : view === 'greeting' ? (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[800px]"
          >
            <div className="glass-card min-h-[500px] p-8 md:p-12 rounded-[32px] flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="pill">from Meghana</div>
                  <div className="text-[#38bdf8] text-xs font-bold uppercase tracking-widest opacity-60">April 20</div>
                </div>
                
                <div className="space-y-4">
                  <h1 className="title-theme !text-5xl md:!text-6xl">Happy Birthday,<br />Preetham.</h1>
                  <p className="message-theme">
                    Hope your day was as great as you are. Just wanted to share a few reasons why you're a top-tier best friend.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {reasons.map((reason, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveReason(activeReason === idx ? null : idx)}
                      className={`small-card text-left transition-all duration-300 ${activeReason === idx ? 'ring-2 ring-[#38bdf8] bg-white/10' : ''}`}
                    >
                      <div className="text-2xl mb-2">{reason.icon}</div>
                      <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-tighter mb-1">{reason.title}</div>
                      <div className="text-[10px] md:text-xs text-[#cbd5e1] leading-tight">
                        {activeReason === idx ? reason.text : 'Click to see why...'}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setView('letter')}
                  className="flex items-center gap-3 group text-[#38bdf8] font-semibold hover:text-white transition-colors"
                >
                  <ScrollText className="w-5 h-5" />
                  <span>Read my digital letter</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="footer flex justify-between items-center border-t border-white/10 pt-6 mt-8">
                <div className="user-badge flex items-center gap-3">
                  <div className="avatar w-10 h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">Best Wishes</div>
                    <div className="text-[#64748b] text-xs">Always your friend</div>
                  </div>
                </div>
                <button onClick={handleCelebrate} className="btn-cta !px-4 !py-2 !text-xs">🎊 Celebrate</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-[650px] h-[85vh] md:h-[750px] flex"
          >
            <div className="bg-[#f8fafc] text-[#0f172a] p-8 md:p-12 rounded-lg shadow-2xl relative font-serif overflow-hidden flex flex-col w-full">
              {/* Stationery details */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[#38bdf8]" />
              <div className="absolute top-6 right-8 opacity-20 rotate-12 pointer-events-none">
                <Mail className="w-16 h-16" />
              </div>
              
              {/* Letter Header - Fixed */}
              <div className="flex justify-between items-center mb-8 font-sans flex-shrink-0">
                <button 
                  onClick={() => setView('greeting')}
                  className="text-xs uppercase tracking-widest text-[#64748b] hover:text-[#0f172a] flex items-center gap-2 transition-colors group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Close Letter
                </button>
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-widest">Digital Stationery</div>
              </div>

              {/* Scrollable Letter Body */}
              <div className="flex-grow overflow-y-auto space-y-6 text-lg leading-relaxed pr-4 letter-scroll">
                <p className="font-bold text-xl mb-4 font-sans">Dear Preetham,</p>
                
                <p>
                  I wanted to write something a bit more lasting than a simple text. 
                  Happy belated birthday!, I was supposed to send this yesterday but i dont know where it disappeared suddenly and also i ran out of daily limit so i couldnt do this again yesterday!!! But, I hope your 20th of April was filled with 
                  exactly what you wanted with all good people.
                </p>
                
                <p>
                  Being friends for these last few years has been really great. 
                  Friendship is a weird thing, isn't it? One day you're just strangers, 
                  and the next, you're the person someone can rely on for a solid talk 
                  or a good laugh. I'm really glad we've become the kind of friends 
                  who can just "be" without needing to constantly perform.<br>
                  </br>

                  I may not always be a great friend, but remember if u ever need anything, I'm just a call away. These years of engineering was fun because of you!!
                  We have fought alot, we were angry at eachother , but still we are best friends and thats all it matters.....
                </p>
                
                <p>
                  Thanks for being such a good listener. It's rare to find people 
                  who truly hear what you're saying. You've been a steady presence, 
                  and I'm lucky to have you in my corner.
                </p>

                <p>
                  So, here's to you on your birthday. I hope this next year brings you 
                  everything you're working toward. I know you've got big goals, and 
                  I have no doubt you'll hit them. Stay exactly as you are—don't 
                  change the parts that make you, you.
                </p>

                <p>
                  Looking forward to more hangouts, more laughs, and just moving 
                  through life with a solid friend like you by my side.
                </p>

                {/* Closing Signature - Scrolled with content */}
                <div className="mt-12 mb-8 space-y-2 border-t border-[#e2e8f0] pt-6 font-sans">
                  <p className="text-sm text-[#64748b]">With best wishes,</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-bold font-sans">
                      F
                    </div>
                    <p className="font-bold text-lg">Your Friend</p>
                  </div>
                </div>
              </div>

              {/* Texture overlays - Fixed */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
