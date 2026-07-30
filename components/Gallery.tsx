import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const images = [
    { src: '/gallery-1.jpg', alt: 'تلميع العجلات' },
    { src: '/gallery-2.jpg', alt: 'تنظيف داخلي' },
    { src: '/gallery-3.jpg', alt: 'تلميع الطلاء' },
    { src: '/hero-car.jpg', alt: 'سيارة فاخرة نظيفة' },
    { src: '/after-exterior.jpg', alt: 'غسيل خارجي' },
    { src: '/after-interior.jpg', alt: 'تنظيف المقاعد' },
  ];

  return (
    <section className="section-alt py-20 lg:py-32" ref={ref} data-testid="section-gallery">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            <span className="text-gradient">معرض الأعمال</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            لمحة من أعمالنا اليومية في العناية بالسيارات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-[#415A77]/30 hover:border-[#415A77]"
              onClick={() => setLightboxImage(image.src)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-[var(--color-light)] font-semibold">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0D1B2A]/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
            data-testid="lightbox"
          >
            <button
              className="absolute top-4 left-4 p-2 rounded-full bg-[#E0E1DD]/10 hover:bg-[#E0E1DD]/20 transition-colors"
              onClick={() => setLightboxImage(null)}
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6 text-[#E0E1DD]" />
          </button>
          <img
            src={lightboxImage}
            alt="معاينة"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </motion.div>
      )}
    </section>
  );
}
