import Link from 'next/link';
import { GraduationCap, BookOpen, TreePine, Building2 } from 'lucide-react';

const areas = [
  {
    slug: 'ruang-kelas',
    name: 'Ruang Kelas',
    subtitle: 'Meja kursi siswa, papan tulis, mading, rak sepatu & absensi',
    icon: GraduationCap,
    color: 'from-blue-600 to-blue-800',
  },
  {
    slug: 'ruang-guru-kepsek',
    name: 'Ruang Guru & Kepsek',
    subtitle: 'Meja biro, kursi direktur, lemari arsip, sofa tamu, UKS & bendera',
    icon: BookOpen,
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    slug: 'lapangan-pramuka',
    name: 'Lapangan & Pramuka',
    subtitle: 'Tenda kemah custom, ring basket, gawang futsal, velbed & misty fan',
    icon: TreePine,
    color: 'from-amber-600 to-amber-800',
  },
  {
    slug: 'gerbang-lingkungan',
    name: 'Gerbang & Lingkungan',
    subtitle: 'Gapura sekolah, huruf timbul 3D, papan visi misi, gazebo & tempat sampah',
    icon: Building2,
    color: 'from-slate-700 to-slate-900',
  },
];

export default function AreaGrid() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
            Belanja Berdasarkan Area Sekolah
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            Temukan produk sesuai kebutuhan area sekolah Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.slug}
                href={`/katalog?area=${area.slug}`}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${area.color} p-6 md:p-8 text-white group hover:shadow-xl transition-shadow min-h-[160px] flex flex-col justify-end`}
              >
                {/* Decorative */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Icon className="w-20 h-20 md:w-24 md:h-24" />
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl font-bold mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {area.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
