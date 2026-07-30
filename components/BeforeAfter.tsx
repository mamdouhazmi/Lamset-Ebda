import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);

  const comparisons = [
    {
      title: 'تنظيف داخلي',
      before: '/before-interior.jpg',
      after: '/after-interior.jpg',
    },
    {
      title: 'غسيل خارجي',
      before: '/before-exterior.jpg',
      after: '/after-exterior.jpg',
    },
  ];

  return (
    <section id="before-after" className="section-alt py-20 lg:py-32" ref={ref} data-testid="section-before-after">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            <span className="text-gradient">قبل وبعد</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            شاهد الفرق الذي نصنعه في كل سيارة نعتني بها
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {comparisons.map((comp, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === index
                  ? 'bg-[#415A77] text-[#E0E1DD]'
                  : 'bg-[#1B263B] border border-[#415A77]/30 text-[#778DA9] hover:text-[#E0E1DD]'
              }`}
              data-testid={`tab-${index}`}
            >
              {comp.title}
            </button>
          ))}
        </div>

        {/* Comparison Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <ComparisonSlider
            before={comparisons[activeTab].before}
            after={comparisons[activeTab].after}
            title={comparisons[activeTab].title}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = (x / containerRect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const containerRect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, containerRect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const containerRect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, containerRect);
  };

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none bg-[#1B263B] border border-[#415A77]/30 p-2"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      data-testid={`comparison-${title}`}
    >
      {/* After Image (Full) */}
      <img
        src={after}
        alt={`بعد - ${title}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt={`قبل - ${title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#E0E1DD] shadow-lg"
        style={{ right: `${100 - sliderPosition}%` }}
      >
        <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-[#E0E1DD] shadow-xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-6 bg-[#0D1B2A]" />
            <div className="w-0.5 h-6 bg-[#0D1B2A]" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="ba-tag absolute top-4 right-4">
        قبل
      </div>
      <div className="ba-tag absolute top-4 left-4">
        بعد
      </div>
    </div>
  );
}
