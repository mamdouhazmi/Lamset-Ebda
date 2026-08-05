'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Pair = { before: string; after: string; fallbackBefore?: string; fallbackAfter?: string }
type Category = { title: string; pairs: Pair[] }

const CATEGORIES: Category[] = [
  {
    title: 'تنظيف داخلي',
    pairs: Array.from({ length: 7 }, (_, index) => ({
      before: `/B${index + 1}.jpeg`,
      after: `/A${index + 1}.jpeg`,
    })),
  },
  {
    title: 'غسيل خارجي',
    pairs: Array.from({ length: 7 }, (_, index) => ({
      before: `/BO${index + 1}.jpeg`,
      after: `/AO${index + 1}.jpeg`,
      fallbackBefore: '/before-exterior.jpg',
      fallbackAfter: '/after-exterior.jpg',
    })),
  },
]

function GalleryImage({
  src,
  fallback,
  alt,
  priority = false,
  className = '',
}: {
  src: string
  fallback?: string
  alt: string
  priority?: boolean
  className?: string
}) {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className={className}
      onError={() => {
        if (fallback && imageSrc !== fallback) setImageSrc(fallback)
      }}
    />
  )
}

export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const category = CATEGORIES[activeTab]
  const selectedPair = selectedIndex === null ? null : category.pairs[selectedIndex]

  useEffect(() => {
    setSelectedIndex(null)
  }, [activeTab])

  useEffect(() => {
    if (selectedIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => (index === null ? 0 : (index + 1) % category.pairs.length))
      if (event.key === 'ArrowRight') setSelectedIndex((index) => (index === null ? 0 : (index - 1 + category.pairs.length) % category.pairs.length))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, category.pairs.length])

  const previous = () => setSelectedIndex((index) => (index === null ? 0 : (index - 1 + category.pairs.length) % category.pairs.length))
  const next = () => setSelectedIndex((index) => (index === null ? 0 : (index + 1) % category.pairs.length))

  return (
    <section id="before-after" className="section-alt py-20 lg:py-32" ref={ref} data-testid="section-before-after">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--color-light)] md:text-5xl">
            <span className="text-gradient">قبل وبعد</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-muted-blue)] md:text-xl">
            شاهد الفرق الذي نصنعه في كل سيارة نعتني بها
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center gap-3 sm:gap-4" role="tablist" aria-label="نوع الخدمة">
          {CATEGORIES.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={`rounded-lg px-5 py-3 font-semibold transition-all sm:px-6 ${
                activeTab === index
                  ? 'bg-[#415A77] text-[#E0E1DD] shadow-lg shadow-[#0D1B2A]/20'
                  : 'border border-[#415A77]/30 bg-[#1B263B] text-[#E0E1DD] hover:border-[#415A77] hover:bg-[#415A77]/20'
              }`}
              data-testid={`tab-${index}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="tabpanel"
        >
          {category.pairs.map((pair, index) => (
            <button
              key={`${pair.after}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-2xl border border-[#415A77]/30 bg-[#1B263B] text-right shadow-lg shadow-[#0D1B2A]/10 transition duration-300 hover:-translate-y-1 hover:border-[#778DA9]/70 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0E1DD]"
              aria-label={`عرض مقارنة ${category.title} ${index + 1}`}
              data-testid={`comparison-card-${activeTab}-${index}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0D1B2A]">
                <GalleryImage
                  src={pair.after}
                  fallback={pair.fallbackAfter}
                  alt={`${category.title} بعد - ${index + 1}`}
                  priority={activeTab === 0 && index < 2}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-transparent to-[#0D1B2A]/10 opacity-80" />
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-[#E0E1DD]/20 bg-[#0D1B2A]/75 px-2.5 py-1 text-xs font-semibold text-[#E0E1DD] backdrop-blur-sm">
                  <span>قبل</span>
                  <span className="text-[#778DA9]">/</span>
                  <span>بعد</span>
                </div>
                <div className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between text-sm font-semibold text-[#E0E1DD] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>عرض المقارنة</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0E1DD] text-[#0D1B2A]">
                    <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {selectedPair && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/85 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comparison-dialog-title"
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#415A77]/60 bg-[#1B263B] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#415A77]/30 px-4 py-3 sm:px-6">
              <div>
                <p id="comparison-dialog-title" className="font-semibold text-[#E0E1DD]">{category.title}</p>
                <p className="text-sm font-medium text-[#E0E1DD]" dir="ltr">{selectedIndex + 1} / {category.pairs.length}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#E0E1DD] transition hover:bg-[#415A77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0E1DD]"
                aria-label="إغلاق المقارنة"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
              <ComparisonSlider key={`${activeTab}-${selectedIndex}`} pair={selectedPair} title={category.title} index={selectedIndex} />
              {category.pairs.length > 1 && (
                <>
                  <button type="button" onClick={previous} aria-label="المقارنة السابقة" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#415A77]/50 bg-[#0D1B2A]/80 text-[#E0E1DD] transition hover:bg-[#415A77] sm:right-6 sm:h-12 sm:w-12">
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={next} aria-label="المقارنة التالية" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#415A77]/50 bg-[#0D1B2A]/80 text-[#E0E1DD] transition hover:bg-[#415A77] sm:left-6 sm:h-12 sm:w-12">
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ComparisonSlider({ pair, title, index }: { pair: Pair; title: string; index: number }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const updatePosition = (clientX: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect()
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div
      className="relative aspect-[3/4] h-[min(68vh,680px)] max-h-[68vh] w-full max-w-[510px] cursor-col-resize select-none overflow-hidden rounded-xl border border-[#415A77]/40 bg-[#0D1B2A] touch-none"
      onPointerDown={(event) => {
        setIsDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
        updatePosition(event.clientX, event.currentTarget)
      }}
      onPointerMove={(event) => {
        if (isDragging) updatePosition(event.clientX, event.currentTarget)
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null }}
      onTouchEnd={(event) => {
        const start = touchStartX.current
        const end = event.changedTouches[0]?.clientX
        if (start !== null && end !== undefined && Math.abs(end - start) > 60) {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: end > start ? 'ArrowRight' : 'ArrowLeft' }))
        }
        touchStartX.current = null
      }}
      data-testid={`comparison-${title}-${index}`}
    >
      <GalleryImage src={pair.after} fallback={pair.fallbackAfter} alt={`بعد - ${title}`} priority className="object-contain" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <GalleryImage src={pair.before} fallback={pair.fallbackBefore} alt={`قبل - ${title}`} priority className="object-contain" />
      </div>
      <div className="absolute bottom-0 top-0 w-1 bg-[#E0E1DD] shadow-lg" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E0E1DD] shadow-xl">
          <ArrowLeft className="h-4 w-4 text-[#0D1B2A]" aria-hidden="true" />
          <ArrowRight className="h-4 w-4 text-[#0D1B2A]" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-[#0D1B2A]/75 px-3 py-1 text-xs font-semibold text-[#E0E1DD]">بعد</div>
      <div className="absolute left-3 top-3 rounded-full bg-[#0D1B2A]/75 px-3 py-1 text-xs font-semibold text-[#E0E1DD]">قبل</div>
    </div>
  )
}
