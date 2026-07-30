import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function ServiceArea() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const areas = [
    'العليا',
    'الملقا',
    'النرجس',
    'الياسمين',
    'الربوة',
    'الصحافة',
    'الملز',
    'السليمانية',
    'المروج',
    'النخيل',
    'الورود',
    'الريان',
    'المعذر',
    'الفلاح',
    'الحمراء',
    'الخليج',
  ];

  return (
    <section className="section-alt py-20 lg:py-32" ref={ref} data-testid="section-service-area">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#415A77]">
            <MapPin className="w-8 h-8 text-[#E0E1DD]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            نخدم الرياض <span className="text-gradient">وضواحيها</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            نصلك في جميع أحياء الرياض والمناطق المحيطة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="px-6 py-3 bg-[#1B263B] border border-[#415A77]/30 rounded-full text-[#E0E1DD] hover:border-[#415A77] hover:bg-[#415A77]/10 transition-all cursor-default"
                data-testid={`area-${index}`}
              >
                {area}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[#778DA9] mt-8">
            لا تجد منطقتك؟ تواصل معنا وسنصلك أينما كنت في الرياض
          </p>
        </motion.div>
      </div>
    </section>
  );
}
