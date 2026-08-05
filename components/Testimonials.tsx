import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'عبدالله السالم',
      text: 'خدمة ممتازة واحترافية عالية. سيارتي أصبحت كالجديدة تماماً. أنصح الجميع بتجربة لمسة ابداع.',
      rating: 5,
    },
    {
      name: 'محمد العتيبي',
      text: 'فريق محترف ومتعاون. وصلوا في الموعد المحدد وأنجزوا العمل بإتقان. سأكرر التجربة بالتأكيد.',
      rating: 5,
    },
    {
      name: 'خالد الدوسري',
      text: 'أفضل خدمة تنظيف سيارات جربتها في الرياض. الاهتمام بالتفاصيل والجودة لا مثيل لهما.',
      rating: 5,
    },
    {
      name: 'فهد القحطاني',
      text: 'تجربة رائعة من البداية للنهاية. التواصل سهل والخدمة سريعة ونتيجة مبهرة.',
      rating: 5,
    },
    {
      name: 'سلطان المطيري',
      text: 'استخدمت خدمة الغسيل بالبخار وكانت النتيجة فوق التوقعات. سيارتي نظيفة ومعقمة تماماً.',
      rating: 5,
    },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-alt py-20 lg:py-32 overflow-hidden" ref={ref} data-testid="section-testimonials">
      <div className="container mx-auto px-4 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            آراء <span className="text-gradient">عملائنا</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            ثقة عملائنا هي أكبر دليل على جودة خدماتنا
          </p>
        </motion.div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee">
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: (index % testimonials.length) * 0.1 }}
              className="flex-shrink-0 w-80 bg-[#1B263B] border border-[#415A77]/30 rounded-2xl p-6"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <p className="text-[#E0E1DD] mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <p className="text-[#415A77] font-semibold">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
