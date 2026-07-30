import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Wrench, CheckCircle } from 'lucide-react';

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: Calendar,
      title: 'احجز',
      description: 'احجز موعدك عبر واتساب أو الهاتف',
    },
    {
      number: '02',
      icon: MapPin,
      title: 'نصلك أينما كنت',
      description: 'فريقنا يأتي إلى موقعك في الرياض',
    },
    {
      number: '03',
      icon: Wrench,
      title: 'تنظيف احترافي',
      description: 'خدمة متقنة بأيدي خبراء ومواد عالمية',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'استلم سيارتك بلمسة إبداع',
      description: 'سيارة نظيفة تتألق كأنها جديدة',
    },
  ];

  return (
    <section className="section-base py-20 lg:py-32" ref={ref} data-testid="section-process">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            كيف <span className="text-gradient">نعمل</span>؟
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            أربع خطوات بسيطة للحصول على سيارة نظيفة ولامعة
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-24 left-0 right-0 h-1 bg-[#778DA9]/20" />
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative text-center"
                  data-testid={`step-${index}`}
                >
                  <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-[#415A77] flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-[#E0E1DD]" />
                  </div>
                  <div className="text-5xl font-bold text-[#415A77]/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-light)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-muted-blue)]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden relative">
          <div className="absolute right-10 top-0 bottom-0 w-1 bg-[#778DA9]/20" />
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative flex items-start gap-6"
                  data-testid={`step-mobile-${index}`}
                >
                  <div className="relative z-10 w-20 h-20 flex-shrink-0 rounded-full bg-[#415A77] flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-[#E0E1DD]" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="text-4xl font-bold text-[#415A77]/20 mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-light)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted-blue)]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
