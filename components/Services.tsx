import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Droplets, Sparkles, Wind, Sofa, Shield, Crown } from 'lucide-react';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Droplets,
      title: 'غسيل السيارات',
      description: 'تنظيف خارجي وداخلي شامل بدقة عالية واهتمام بكل التفاصيل',
      features: ['غسيل خارجي كامل', 'تنظيف داخلي شامل', 'تلميع الإطارات والجنوط'],
    },
    {
      icon: Sparkles,
      title: 'تلميع السيارات',
      description: 'استعادة البريق الأصلي للسيارة وإزالة الخدوش الخفيفة',
      features: ['تلميع الطلاء', 'إزالة الخدوش السطحية', 'حماية من الأشعة فوق البنفسجية'],
    },
    {
      icon: Wind,
      title: 'غسيل بالبخار',
      description: 'تنظيف عميق وصحي بدون مواد كيماوية ضارة',
      features: ['تنظيف بيئي آمن', 'تعقيم شامل', 'إزالة الروائح الكريهة'],
    },
    {
      icon: Sofa,
      title: 'تنظيف المفروشات',
      description: 'عناية فائقة بالمقاعد والسقف والأرضيات بنظافة فندقية',
      features: ['تنظيف المقاعد الجلدية والقماشية', 'تنظيف السقف والأرضيات', 'إزالة البقع العنيدة'],
    },
    {
      icon: Shield,
      title: 'الحماية الفائقة',
      description: 'طبقة سيراميك وPPF للحماية طويلة المدى',
      features: ['طلاء سيراميك احترافي', 'حماية PPF للطلاء', 'مقاومة للخدوش والعوامل البيئية'],
    },
    {
      icon: Crown,
      title: 'باقة VIP',
      description: 'تجربة شاملة تجمع جميع الخدمات بلمسة ملكية',
      features: ['جميع خدماتنا في باقة واحدة', 'خدمة ذات أولوية', 'ضمان ممتد'],
    },
  ];

  return (
    <section id="services" className="section-alt py-20 lg:py-32" ref={ref} data-testid="section-services">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            خدماتنا <span className="text-gradient">المتميزة</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            مجموعة متكاملة من الخدمات الاحترافية لتلبية كل احتياجات سيارتك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-effect rounded-2xl p-8 group cursor-pointer bg-[#1B263B] border border-[#415A77]/30 hover:border-[#415A77]"
                data-testid={`service-${index}`}
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-[#415A77] flex items-center justify-center transition-all">
                  <Icon className="w-8 h-8 text-[#E0E1DD]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-light)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-muted-blue)] mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-2 text-[var(--color-light)] text-sm"
                    >
                      <span className="text-[var(--color-accent-blue)] mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
