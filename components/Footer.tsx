import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966500000000';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'خدماتنا', id: 'services' },
    { label: 'قبل وبعد', id: 'before-after' },
    { label: 'تواصل معنا', id: 'contact' },
  ];

  return (
    <footer className="bg-[#0D1B2A] border-t border-[#778DA9]/20" data-testid="section-footer">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold text-[#E0E1DD] mb-4">
              لمسه ابداع
            </h3>
            <p className="text-[#778DA9] leading-relaxed">
              خدمات تنظيف وتلميع احترافية متنقلة. نعيد إلى سيارتك بريقها الأصيل بأيدي خبراء ومواد عالمية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-[#E0E1DD] mb-4">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[#778DA9] hover:text-[#415A77] transition-colors"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-[#E0E1DD] mb-4">
              تواصل معنا
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#778DA9] hover:text-[#415A77] transition-colors"
                  data-testid="footer-whatsapp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                  <span>واتساب</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="flex items-center gap-3 text-[#778DA9] hover:text-[#415A77] transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone className="w-5 h-5" />
                  <span>+{whatsappNumber}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#778DA9]">
                <Mail className="w-5 h-5" />
                <span>info@lamsetebda.sa</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-xl font-bold text-[#E0E1DD] mb-4">
              أوقات العمل
            </h4>
            <div className="flex items-start gap-3 text-[#778DA9]">
              <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#E0E1DD] mb-1">
                  متاحون 24/7
                </p>
                <p className="text-sm">
                  نعمل على مدار الساعة طوال أيام الأسبوع لخدمتك
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#778DA9]/20">
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1B263B] flex items-center justify-center text-[#778DA9] hover:text-[#415A77] hover:bg-[#415A77]/20 transition-colors border border-[#415A77]/30"
              data-testid="social-instagram"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1B263B] flex items-center justify-center text-[#778DA9] hover:text-[#415A77] hover:bg-[#415A77]/20 transition-colors border border-[#415A77]/30"
              data-testid="social-tiktok"
            >
              <SiTiktok className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1B263B] flex items-center justify-center text-[#778DA9] hover:text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#415A77]/30"
              data-testid="social-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </a>
          </div>

          <p className="text-[#778DA9] text-center md:text-right">
            © 2026 لمسه ابداع. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
