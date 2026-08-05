import { motion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowDown, Star, Users, Clock, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966561930521';
  const [counts, setCounts] = useState({ clients: 0, cars: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const clientsTarget = 500;
    const carsTarget = 2000;
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCounts({
        clients: Math.floor((clientsTarget / steps) * step),
        cars: Math.floor((carsTarget / steps) * step),
      });
      
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, value: `${counts.clients}+`, label: 'عملاء راضون' },
    { icon: Award, value: `${counts.cars}+`, label: 'سيارة تم تخديمها' },
    { icon: Clock, value: '24/7', label: 'خدمة' },
    { icon: Star, value: '5 نجوم', label: 'تقييم' },
  ];

  return (
    <section
      id="hero"
      className="section-base relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-car.jpg"
          alt="سيارة فاخرة"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/90 via-[var(--color-navy)]/70 to-[var(--color-navy)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#415A77] bg-[rgba(65,90,119,0.15)] px-6 py-2"
          >
            <span className="text-sm font-medium text-[#E0E1DD] lg:text-base">
              خدمة متنقلة | الرياض
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-light)] mb-6 leading-tight"
          >
            نحن لا نغسل سيارتك
            <br />
            <span className="text-gradient">نعيد إليها بريقها الأصيل</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-[var(--color-muted-blue)] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            خدمة تنظيف وتلميع احترافية تأتيك أينما كنت في الرياض. نمنح سيارتك العناية التي تستحقها بأيدي خبراء ومواد عالمية.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('مرحباً، أود حجز خدمة تنظيف السيارة')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-[#25D366] text-white rounded-lg text-lg font-semibold flex items-center gap-3 hover:scale-105 transition-transform animate-pulse-glow"
              data-testid="button-book-now"
            >
              <SiWhatsapp className="w-6 h-6" />
              احجز الآن
            </a>
            <button
              onClick={scrollToServices}
              className="px-8 py-4 border-2 border-[var(--color-accent-blue)] text-[var(--color-light)] rounded-lg text-lg font-semibold hover:bg-[var(--color-accent-blue)]/10 transition-colors"
              data-testid="button-learn-more"
            >
              تعرف علينا
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass-effect rounded-xl p-6 text-center"
                  data-testid={`stat-${index}`}
                >
                  <Icon className="w-8 h-8 text-[var(--color-accent-blue)] mx-auto mb-3" />
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--color-light)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-[#E0E1DD] lg:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-20 left-8 hidden lg:block glass-effect rounded-2xl p-6 animate-float"
        >
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-[#C9A84C] fill-[#C9A84C]" />
            <div>
              <div className="text-[var(--color-light)] font-bold">تقييم 5 نجوم</div>
              <div className="text-sm text-[#E0E1DD]">من عملائنا</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-6 h-6 text-[var(--color-muted-blue)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
