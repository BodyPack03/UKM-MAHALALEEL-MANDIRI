'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACTS } from '@/config/contacts';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONTACTS.dina.wa_number}?text=${encodeURIComponent('Halo, saya ingin konsultasi pengadaan fasilitas sekolah.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all print:hidden group"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline text-sm font-medium">Konsultasi WA</span>
    </a>
  );
}
