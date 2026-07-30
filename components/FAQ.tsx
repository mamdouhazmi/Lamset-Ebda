import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'هل تأتون إلى منزلي أو مكان عملي؟',
      answer: 'نعم، نحن نقدم خدمة متنقلة تصل إليك في أي مكان داخل الرياض. سواء في منزلك أو مكتبك أو أي موقع تختاره.',
    },
    {
      question: 'كم تستغرق مدة الخدمة؟',
      answer: 'تختلف المدة حسب نوع الخدمة. الغسيل العادي يستغرق من 30-45 دقيقة، بينما التلميع الكامل قد يستغرق 2-3 ساعات. سنحدد المدة بدقة عند الحجز.',
    },
    {
      question: 'ما المواد التي تستخدمونها؟',
      answer: 'نستخدم منتجات عالمية معتمدة وآمنة على الطلاء والمفروشات. جميع موادنا صديقة للبيئة وتحافظ على سيارتك.',
    },
    {
      question: 'هل الخدمة متاحة 24 ساعة؟',
      answer: 'نعم، نعمل على مدار الساعة طوال أيام الأسبوع. يمكنك حجز موعد في الوقت الذي يناسبك.',
    },
    {
      question: 'كيف أحجز الخدمة؟',
      answer: 'يمكنك الحجز عبر واتساب أو الاتصال المباشر. املأ النموذج في الموقع أو تواصل معنا مباشرة وسنرتب كل شيء.',
    },
    {
      question: 'هل يوجد ضمان على الخدمة؟',
      answer: 'نعم، نقدم ضمان رضا 100%. إذا لم تكن راضياً عن الخدمة، سنعيد العمل مجاناً حتى نحقق رضاك الكامل.',
    },
    {
      question: 'ما المناطق التي تغطونها في الرياض؟',
      answer: 'نغطي جميع أحياء الرياض والضواحي القريبة. سواء كنت في شمال الرياض أو جنوبها أو شرقها أو غربها، نصلك.',
    },
    {
      question: 'ما الفرق بين الغسيل العادي والبخاري؟',
      answer: 'الغسيل بالبخار يستخدم ماء ساخن بدرجة عالية للتنظيف العميق والتعقيم بدون مواد كيماوية، وهو أكثر فعالية وأماناً للسيارة والبيئة.',
    },
  ];

  return (
    <section className="section-base py-20 lg:py-32" ref={ref} data-testid="section-faq">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-light)] mb-4">
            <span className="text-gradient">الأسئلة الشائعة</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-muted-blue)] max-w-2xl mx-auto">
            أجوبة سريعة على أكثر الأسئلة شيوعاً
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-[#1B263B] border border-[#415A77]/30 hover:border-[#415A77] rounded-xl overflow-hidden"
              data-testid={`faq-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-[#415A77]/10 transition-colors"
                data-testid={`faq-question-${index}`}
              >
                <span className="text-lg font-semibold text-[#E0E1DD] flex-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#415A77] transition-transform flex-shrink-0 mr-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-[#778DA9] leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
