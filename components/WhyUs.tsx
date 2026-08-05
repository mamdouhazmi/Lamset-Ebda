import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trophy, CheckCircle, Shield, TrendingUp } from 'lucide-react';

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState({ experience: 0, cars: 0, satisfaction: 0, guarantee: 0 });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const targets = { experience: 5, cars: 2000, satisfaction: 99, guarantee: 100 };
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCounts({
        experience: Math.min(Math.floor((targets.experience / steps) * step), targets.experience),
        cars: Math.floor((targets.cars / steps) * step),
        satisfaction: Math.floor((targets.satisfaction / steps) * step),
        guarantee: Math.floor((targets.guarantee / steps) * step),
      });
      
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isInView]);

  const pillars = [
    {
      icon: Trophy,
      value: `${counts.experience}+`,
      label: 'سنوات الخبرة',
      description: 'خبرة مُثبتة في العناية بالسيارات الفاخرة',
    },
    {
      icon: TrendingUp,
      value: `${counts.cars}+`,
      label: 'سيارة مخدومة',
      description: 'ثقة آلاف العملاء في الرياض',
    },
    {
      icon: CheckCircle,
      value: `${counts.satisfaction}%`,
      label: 'رضا العملاء',
      description: 'تقييمات استثنائية من عملائنا',
    },
    {
      icon: Shield,
      value: `${counts.guarantee}%`,
      label: 'ضمان الخدمة',
      description: 'التزام كامل بالجودة والإتقان',
    },
  ];

  return (
    <section className="section-base py-20 lg:py-32" ref={ref} data-testid="section-why-us">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            لماذا تختار <span className="text-gradient">لمسة ابداع</span>؟
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            أرقام تتحدث عن نفسها وتعكس التزامنا بالتميز
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1B263B] border border-[#415A77]/30 hover:border-[#415A77] rounded-2xl p-8 text-center hover:scale-105 transition-all"
                data-testid={`pillar-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#415A77] flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#E0E1DD]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[var(--color-light)] mb-2">
                  {pillar.value}
                </div>
                <div className="text-xl font-semibold text-[var(--color-light)] mb-3">
                  {pillar.label}
                </div>
                <p className="text-[var(--color-muted-blue)]">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
