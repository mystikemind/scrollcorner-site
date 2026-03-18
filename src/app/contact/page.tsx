export const metadata = {
  title: 'Contact Us — ScrollCorner',
  description: 'Get in touch with ScrollCorner for enquiries, corrections, or partnership requests.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-black text-white mb-8">Contact Us</h1>

      <div className="space-y-8">
        <p className="text-white/60 leading-relaxed">
          We&apos;d love to hear from you. Whether you have a question, a correction to report, or a partnership enquiry, reach out and we&apos;ll get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0f1623] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">General Enquiries</p>
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] font-semibold hover:underline">
              contact@scrollcorner.com
            </a>
          </div>
          <div className="bg-[#0f1623] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">Corrections</p>
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] font-semibold hover:underline">
              contact@scrollcorner.com
            </a>
          </div>
          <div className="bg-[#0f1623] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">Partnerships</p>
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] font-semibold hover:underline">
              contact@scrollcorner.com
            </a>
          </div>
          <div className="bg-[#0f1623] border border-white/5 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">Advertising</p>
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] font-semibold hover:underline">
              contact@scrollcorner.com
            </a>
          </div>
        </div>

        <p className="text-white/30 text-sm">
          We aim to respond to all messages within 2 business days.
        </p>
      </div>
    </div>
  );
}
