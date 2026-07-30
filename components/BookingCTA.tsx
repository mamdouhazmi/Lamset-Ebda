import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { Phone } from 'lucide-react';

export default function BookingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    location: '',
  });

  const services = [
    'غسيل السيارات',
    'تلميع السيارات',
    'غسيل بالبخار',
    'تنظيف المفروشات',
    'الحماية الفائقة',
    'باقة VIP',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً، أود حجز خدمة:\n\nالاسم: ${formData.name}\nرقم الجوال: ${formData.phone}\nالخدمة المطلوبة: ${formData.service}\nالموقع: ${formData.location}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="section-base py-20 lg:py-32" ref={ref} data-testid="section-booking">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            احجز <span className="text-gradient">الآن</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            املأ النموذج وسنتواصل معك فوراً عبر واتساب
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-[#1B263B] border border-[#415A77]/30 rounded-2xl p-8 space-y-6">
            <div>
              <label className="block text-[#E0E1DD] font-semibold mb-2">
                الاسم
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D1B2A] text-[#E0E1DD] rounded-lg border border-[#778DA9]/30 focus:border-[#415A77] focus:outline-none transition-colors placeholder-[#778DA9]"
                placeholder="أدخل اسمك الكامل"
                data-testid="input-name"
              />
            </div>

            <div>
              <label className="block text-[#E0E1DD] font-semibold mb-2">
                رقم الجوال
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D1B2A] text-[#E0E1DD] rounded-lg border border-[#778DA9]/30 focus:border-[#415A77] focus:outline-none transition-colors placeholder-[#778DA9]"
                placeholder="05xxxxxxxx"
                data-testid="input-phone"
              />
            </div>

            <div>
              <label className="block text-[#E0E1DD] font-semibold mb-2">
                الخدمة المطلوبة
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D1B2A] text-[#E0E1DD] rounded-lg border border-[#778DA9]/30 focus:border-[#415A77] focus:outline-none transition-colors"
                data-testid="select-service"
              >
                <option value="" className="bg-[#0D1B2A] text-[#E0E1DD]">اختر الخدمة</option>
                {services.map((service, index) => (
                  <option key={index} value={service} className="bg-[#0D1B2A] text-[#E0E1DD]">
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#E0E1DD] font-semibold mb-2">
                الموقع
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-[#0D1B2A] text-[#E0E1DD] rounded-lg border border-[#778DA9]/30 focus:border-[#415A77] focus:outline-none transition-colors placeholder-[#778DA9]"
                placeholder="الحي أو المنطقة في الرياض"
                data-testid="input-location"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-lg text-lg font-semibold hover:bg-[#20bd5a] transition-colors animate-pulse-glow"
                data-testid="button-submit-whatsapp"
              >
                <SiWhatsapp className="w-6 h-6" />
                أرسل عبر واتساب
              </button>
              <a
                href={`tel:+${whatsappNumber}`}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#415A77] text-[#E0E1DD] rounded-lg text-lg font-semibold hover:bg-[#415A77]/90 transition-all"
                data-testid="button-call-direct"
              >
                <Phone className="w-6 h-6" />
                اتصل مباشرة
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
