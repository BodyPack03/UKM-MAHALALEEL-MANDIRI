import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryStrip from '@/components/home/CategoryStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AreaGrid from '@/components/home/AreaGrid';
import CorporateBanner from '@/components/home/CorporateBanner';
import PortfolioSection from '@/components/home/PortfolioSection';
import { BRAND, CONTACTS } from '@/config/contacts';

  export default function HomePage() {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: BRAND.name,
      description: BRAND.tagline,
      areaServed: BRAND.areas.map((area) => ({
        '@type': 'AdministrativeArea',
        name: `${area}, Sumatera Selatan`,
      })),
      telephone: CONTACTS.dina.phone_display,
      priceRange: 'Rp 95.000 - Rp 35.000.000',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Sumatera Selatan',
        addressCountry: 'ID',
      },
      openingHours: 'Mo-Sa 08:00-17:00',
    };

    return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col">
        {/* 1. Full-Width Hero Carousel */}
        <HeroCarousel />

        {/* 2. 9 Category Strip */}
        <CategoryStrip />

        {/* 3. Featured Products */}
        <FeaturedProducts />

        {/* 4. Activity / School Area Grid */}
        <AreaGrid />

        {/* 5. Corporate / BOS Order Banner */}
        <CorporateBanner />

        {/* 6. Real Installation Portfolio & 3 Pillars */}
        <PortfolioSection />
      </div>
    </>
    );
  }
