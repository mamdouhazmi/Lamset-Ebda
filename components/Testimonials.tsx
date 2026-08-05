'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'عبدالله السالم',
    text: 'خدمة ممتازة واحترافية عالية. سيارتي أصبحت كالجديدة تماماً. أنصح الجميع بتجربة لمسه ابداع.',
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

const carouselTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

type Direction = 1 | -1;

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const goTo = useCallback((nextIndex: number, nextDirection?: Direction) => {
    const normalizedIndex = (nextIndex + testimonials.length) % testimonials.length;
    setDirection(nextDirection ?? (normalizedIndex > activeIndex ? 1 : -1));
    setActiveIndex(normalizedIndex);
  }, [activeIndex]);

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrevious = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (!isInView || isPaused || isTouching) return;

    const timer = window.setTimeout(goNext, 5000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goNext, isInView, isPaused, isTouching]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goNext();
      if (event.key === 'ArrowRight') goPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={ref}
      className="section-alt overflow-hidden py-20 lg:py-32"
      data-testid="section-testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
    >
      <div className="container mx-auto mb-12 px-4 lg:px-8 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--color-light)] md:text-5xl">
            آراء <span className="text-gradient">عملائنا</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-light)] md:text-xl">
            ثقة عملائنا هي أكبر دليل على جودة خدماتنا
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-6" dir="ltr">
          <button
            type="button"
            onClick={goPrevious}
            aria-label="التقييم السابق"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#415A77] bg-[#1B263B] text-[#E0E1DD] transition-colors hover:bg-[#415A77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0E1DD]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="min-h-[300px] flex-1 overflow-hidden sm:min-h-[260px]">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.article
                key={activeIndex}
                custom={direction}
                variants={{
                  enter: (travelDirection: Direction) => ({
                    opacity: 0,
                    x: travelDirection * 28,
                    scale: 0.95,
                  }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (travelDirection: Direction) => ({
                    opacity: 0,
                    x: travelDirection * -28,
                    scale: 0.97,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={carouselTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragStart={() => setIsTouching(true)}
                onDragEnd={(_, info) => {
                  setIsTouching(false);
                  const shouldAdvance = info.offset.x < -60 || info.velocity.x < -500;
                  const shouldGoBack = info.offset.x > 60 || info.velocity.x > 500;
                  if (shouldAdvance) goNext();
                  else if (shouldGoBack) goPrevious();
                }}
                className="min-h-[300px] cursor-grab rounded-2xl border border-[#415A77]/40 bg-[#1B263B] p-6 shadow-xl active:cursor-grabbing sm:min-h-[260px] sm:p-8"
                data-testid={`testimonial-${activeIndex}`}
                dir="rtl"
              >
                <div className="mb-5 flex gap-1" aria-label={`${activeTestimonial.rating} نجوم`}>
                  {Array.from({ length: activeTestimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-[#C9A84C] text-[#C9A84C]" aria-hidden="true" />
                  ))}
                </div>
                <p className="mb-7 line-clamp-3 min-h-[84px] text-lg leading-relaxed text-[#E0E1DD]">
                  &quot;{activeTestimonial.text}&quot;
                </p>
                <p className="font-semibold text-[#E0E1DD]">{activeTestimonial.name}</p>
                <p className="mt-1 text-sm text-[#778DA9]">عميل موثوق</p>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="التقييم التالي"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#415A77] bg-[#1B263B] text-[#E0E1DD] transition-colors hover:bg-[#415A77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0E1DD]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" dir="ltr" aria-label="اختيار تقييم العميل">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => goTo(index, index >= activeIndex ? 1 : -1)}
              aria-label={`عرض تقييم ${testimonial.name}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0E1DD] ${
                index === activeIndex ? 'w-8 bg-[#415A77]' : 'w-2.5 bg-[#778DA9]/50 hover:bg-[#778DA9]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
