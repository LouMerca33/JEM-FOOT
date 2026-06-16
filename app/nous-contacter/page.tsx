import type { Metadata } from 'next';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — J.E.M Mérignac',
  description: 'Contactez les Jeunes Espoirs Mérignacais pour une inscription ou toute demande.',
};

const contactSections = [
  {
    title: 'Secrétariat',
    email: 'secretariat.jem@gmail.com',
    tel: '06.67.42.03.73',
  },
  {
    title: 'Partenariat',
    email: 'sponsor.jem@gmail.com',
    tel: '07.62.80.71.00',
  },
  {
    title: 'Communication',
    email: 'communication.jem.33700@gmail.com',
    tel: '06.51.05.41.78',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#0d1429] min-h-screen">
      {/* Hero */}
      <div className="bg-[#141d3f] py-32 relative overflow-hidden">
        <div className="absolute inset-0 pitch-bg" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionEyebrow label="Écrivez-nous" />
          <h1 className="font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl tracking-[0.04em] text-[#f8f6f2]">
            Nous Contacter
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <ContactForm />

          {/* Infos */}
          <div className="space-y-5">
            {contactSections.map((s) => (
              <div key={s.title} className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.06em] text-[#e8d5a3] mb-4">
                  {s.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8a96b8] mb-1">Email</p>
                    <a href={`mailto:${s.email}`} className="text-sm text-[#f8f6f2] hover:text-[#e8d5a3] transition-colors">
                      {s.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8a96b8] mb-1">Téléphone</p>
                    <a href={`tel:${s.tel.replace(/\./g, '')}`} className="text-sm text-[#f8f6f2] hover:text-[#e8d5a3] transition-colors">
                      {s.tel}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Adresse */}
            <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.06em] text-[#e8d5a3] mb-4">
                Adresse
              </h3>
              <p className="text-sm text-[#f8f6f2]">Stade Marie Houdré</p>
              <p className="text-sm text-[#8a96b8]">2 rue Maréchal Foch, 33700 Mérignac</p>
            </div>

            {/* Réseaux */}
            <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.06em] text-[#e8d5a3] mb-4">
                Réseaux sociaux
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100089656322113' },
                  { label: 'Instagram', href: 'https://instagram.com/jeunes.espoirs.merignacais' },
                  { label: 'YouTube', href: 'https://youtube.com/@communication.jem.33700' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#8a96b8] hover:text-[#e8d5a3] transition-colors">
                    <span className="w-8 h-8 rounded bg-[#2a3d6e] flex items-center justify-center text-xs font-bold text-[#e8d5a3]">
                      {label[0]}
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Maps */}
            <div className="rounded-[10px] overflow-hidden border border-[rgba(232,213,163,0.08)] aspect-video">
              <iframe
                src="https://maps.google.com/maps?q=Stade+Marie+Houdr%C3%A9%2C+2+rue+Mar%C3%A9chal+Foch%2C+33700+M%C3%A9rignac&output=embed&hl=fr"
                className="w-full h-full"
                loading="lazy"
                title="Stade Marie Houdré"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
