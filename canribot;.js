import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Globe, Home, Info, Map } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const translations = {
  en: {
    home: 'Home',
    gallery: 'Gallery',
    description: 'Description',
    availability: 'Availability',
    recommendations: 'Recommendations',
    faq: 'FAQ',
    welcomeTitle: 'Welcome to Our Summer Home',
    welcomeText: 'Enjoy your stay in our cozy apartment, available for 10 months of the year.',
    amenities: 'Amenities',
    amenitiesList: ['2 bedrooms', 'Fully equipped kitchen', 'Spacious living room', 'High-speed Wi-Fi', 'Air conditioning', 'Close to beach and local attractions'],
    contact: 'Contact',
    contactText: 'For bookings and inquiries, please email: your@email.com',
    galleryTitle: 'Photo Gallery',
    availabilityTitle: 'Check Availability',
    availabilityText: 'Select a date to check availability.',
    recommendationsTitle: 'Local Recommendations',
    recommendationsText: 'Coming soon: Our top picks for restaurants, activities, and attractions in the area.',
    faqTitle: 'Frequently Asked Questions',
    faqText: 'Coming soon: Answers to common questions about your stay.',
  },
  ca: {
    // Catalan translations (to be filled)
  },
  es: {
    // Spanish translations (to be filled)
  }
};

const NavItem = ({ icon: Icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded ${
      active ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      <img
        src={images[currentImage]}
        alt={`Apartment view ${currentImage + 1}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  const images = [
    "/api/placeholder/800/600?text=Living+Room",
    "/api/placeholder/800/600?text=Kitchen",
    "/api/placeholder/800/600?text=Bedroom",
    "/api/placeholder/800/600?text=Bathroom"
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.welcomeTitle}</h2>
            <p className="mb-4">{t.welcomeText}</p>
            <h3 className="text-xl font-semibold mb-2">{t.amenities}</h3>
            <ul className="list-disc pl-5 mb-4">
              {t.amenitiesList.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">{t.contact}</h3>
            <p>{t.contactText}</p>
          </div>
        );
      case 'gallery':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.galleryTitle}</h2>
            <ImageGallery images={images} />
          </div>
        );
      case 'availability':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.availabilityTitle}</h2>
            <p className="mb-4">{t.availabilityText}</p>
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                This is a placeholder for the availability calendar. You'll need to integrate a real calendar component here.
              </AlertDescription>
            </Alert>
          </div>
        );
      case 'recommendations':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.recommendationsTitle}</h2>
            <p>{t.recommendationsText}</p>
          </div>
        );
      case 'faq':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.faqTitle}</h2>
            <p>{t.faqText}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Summer Home Rental</h1>
        </div>
      </header>
      <nav className="bg-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <NavItem icon={Home} label={t.home} onClick={() => setCurrentPage('home')} active={currentPage === 'home'} />
            <NavItem icon={Map} label={t.gallery} onClick={() => setCurrentPage('gallery')} active={currentPage === 'gallery'} />
            <NavItem icon={Calendar} label={t.availability} onClick={() => setCurrentPage('availability')} active={currentPage === 'availability'} />
            <NavItem icon={Map} label={t.recommendations} onClick={() => setCurrentPage('recommendations')} active={currentPage === 'recommendations'} />
            <NavItem icon={Info} label={t.faq} onClick={() => setCurrentPage('faq')} active={currentPage === 'faq'} />
          </div>
          <div className="flex items-center space-x-2">
            <Globe size={20} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="ca">Català</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
Last edited 38 minutes ago


