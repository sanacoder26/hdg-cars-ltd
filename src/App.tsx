import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BRAND_LOGOS = [
  { name: "Audi", file: "/img/brand/audi.svg" },
  { name: "Ford", file: "/img/brand/ford.svg" },
  { name: "Hummer", file: "/img/brand/hummer.svg" },
  { name: "Kia", file: "/img/brand/kia.svg" },
  { name: "Land Rover", file: "/img/brand/landrover.svg" },
  { name: "Mercedes-Benz", file: "/img/brand/mercedes.svg" },
  { name: "MINI", file: "/img/brand/mini.svg" },
  { name: "Toyota", file: "/img/brand/toyota.svg" },
  { name: "Volkswagen", file: "/img/brand/volkswagen.svg" },
  { name: "Volvo", file: "/img/brand/volvo.svg" },
];

// ---------------------------------------------------------------------------
// Make / model search options
// ---------------------------------------------------------------------------
const MODELS_BY_MAKE: Record<string, string[]> = {
  Audi: ["A3", "S5"],
  Ford: ["EcoSport"],
  Hummer: ["H3"],
  Kia: ["Rio"],
  "Land Rover": ["Range Rover Evoque"],
  "Mercedes-Benz": ["GLA", "S Class"],
  MINI: ["Hatch"],
  Toyota: ["C-HR", "Estima", "Prius", "Prius+", "Sienta", "Yaris"],
  Volkswagen: ["Arteon", "Golf", "Polo", "up!"],
  Volvo: ["V60", "V70"],
};

// ---------------------------------------------------------------------------
// Latest stock (carousel) data - Ordered to match Screenshot (61) exactly
// ---------------------------------------------------------------------------
const VEHICLES = [
  {
    tag: "faoOFmnH",
    slug: "/vehicles/faoOFmnH/Toyota-C-HR-1-8-SUV-2019-2023/",
    title: "Toyota C-HR 1.8 VVT-h Dynamic SUV 5dr Petrol Hybrid CVT Euro 6 (s/s) (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-faoOFmnH/HNYSVfEs-600x450-0x0.jpg?1780833981",
    price: "£14,950",
    make: "Toyota",
    model: "C-HR",
    year: "2020",
    mileage: "65,244 mi",
    acceleration: "11 seconds",
    mpg: "58.85 mpg",
    reserved: false,
  },
  {
    tag: "QGbMAdEM",
    slug: "/vehicles/QGbMAdEM/Volkswagen-Polo-1-0-Hatchback-2013-2017/",
    title: "Volkswagen Polo 1.0 Hatchback (2013 - 2017)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-QGbMAdEM/XPofj7C7-600x450-0x0.jpg?1785416790",
    price: "£6,850",
    make: "Volkswagen",
    model: "Polo",
    year: "2014",
    mileage: "67,729 mi",
    acceleration: "14.3 seconds",
    mpg: "60.1 mpg",
    reserved: false,
  },
  {
    tag: "FG4etgym",
    slug: "/vehicles/FG4etgym/Volkswagen-Polo-1-0-Hatchback-2017-2021/",
    title: "Volkswagen Polo 1.0 TSI SE Hatchback 5dr Petrol DSG Euro 6 (s/s) (95 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-FG4etgym/Pjk8kLh2-600x450-0x0.jpg?1785755675",
    price: "£10,450",
    make: "Volkswagen",
    model: "Polo",
    year: "2019",
    mileage: "22,000 mi",
    acceleration: "10.8 seconds",
    mpg: "61.4 mpg",
    reserved: true,
  },
  {
    tag: "v4qXHCEB",
    slug: "/vehicles/v4qXHCEB/Land-Rover-Range-Rover-Evoque-2-0-TD4-SE-SUV-5dr-Diesel-Auto-4WD-Euro-6-s-s-180-ps/",
    title: "Land Rover Range Rover Evoque 2.0 TD4 SE SUV 5dr Diesel Auto 4WD Euro 6 (s/s) (180 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-v4qXHCEB/AL158U8y-600x450-0x0.jpg?1782484144",
    price: "£12,250",
    make: "Land Rover",
    model: "Range Rover Evoque",
    year: "2018",
    mileage: "60,273 mi",
    acceleration: "8.6 seconds",
    mpg: "45.6 mpg",
    reserved: false,
  },
  {
    tag: "35sJ4QgZ",
    slug: "/vehicles/35sJ4QgZ/Audi-S5-3-0-TFSI-V6-Sportback-5dr-Petrol-Tiptronic-quattro-Euro-6-s-s-354-ps/",
    title: "Audi S5 3.0 TFSI V6 Sportback 5dr Petrol Tiptronic quattro Euro 6 (s/s) (354 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-35sJ4QgZ/oZgOv3vs-600x450-0x0.jpg?1786548880",
    price: "£21,450",
    make: "Audi",
    model: "S5",
    year: "2019",
    mileage: "53,500 mi",
    acceleration: "4.7 seconds",
    mpg: "38.2 mpg",
    reserved: false,
  },
  {
    tag: "ZzTJKBfz",
    slug: "/vehicles/ZzTJKBfz/Toyota-Prius-1-5-Saloon-4dr-Petrol-Hybrid-CVT-120-g-km-70-bhp/",
    title: "Toyota Prius 1.8 VVT-h T4 Hatchback 5dr Petrol Hybrid CVT Euro 5 (s/s) (136 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-ZzTJKBfz/BJCBqglw-600x450-0x0.jpg?1785074814",
    price: "£7,995",
    make: "Toyota",
    model: "Prius",
    year: "2016",
    mileage: "80,000 mi",
    acceleration: "10.4 seconds",
    mpg: "70.6 mpg",
    reserved: false,
  },
  {
    tag: "7dat94mB",
    slug: "/vehicles/7dat94mB/Volkswagen-Golf-1-4-TSI-Match-Hatchback-5dr-Petrol-Manual-Euro-5-122-ps/",
    title: "Volkswagen Golf 1.4 TSI Match Hatchback 5dr Petrol Manual Euro 5 (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-7dat94mB/RoCUfrLs-600x450-0x0.jpg?1786535955",
    price: "£1,850",
    make: "Volkswagen",
    model: "Golf",
    year: "2012",
    mileage: "180,000 mi",
    acceleration: "9.5 seconds",
    mpg: "45.6 mpg",
    reserved: false,
  },
];

// ---------------------------------------------------------------------------
// FAQ data - Matching Screenshot (62) & (63)
// ---------------------------------------------------------------------------
const FAQS = [
  {
    q: "Why Sell Your Car To Us?",
    a: "At HDG CARS LTD, we offer competitive prices and a hassle-free process, making it easy and rewarding to sell your car in the West Midlands area. Our experienced team ensures a fair valuation and immediate payment.",
  },
  {
    q: "What Types Of Cars Do You Sell?",
    a: "We specialize in a variety of used cars including economy, family, and hybrid models. Our selection is perfect for anyone looking to buy a reliable car in Rowley Regis, Dudley, Birmingham, and surrounding areas.",
  },
  {
    q: "Why Part Exchange Your Car With Us?",
    a: "Part exchanging your car with HDG CARS LTD allows you to trade in your current vehicle toward the purchase of a new one, simplifying the process and helping you save time and money.",
  },
  {
    q: "How Do I Find The Right Car For Me At HDG CARS LTD?",
    a: "Our friendly team is here to guide you. You can browse our wide online inventory with advanced filters by make, model, budget, and features, or visit our showroom to speak directly with an expert.",
  },
  {
    q: "Can I Test Drive A Car Before Purchasing?",
    a: "Yes! We encourage test drives so you can experience the performance, comfort, and reliability of our vehicles firsthand before making your final decision.",
  },
  {
    q: "How Do You Ensure The Quality Of The Cars You Sell?",
    a: "Every car in our inventory undergoes a comprehensive mechanical and safety inspection, complete HPI history check, and full valeting to ensure you drive away with total peace of mind.",
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [compares, setCompares] = useState<Record<string, boolean>>({});
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const models = selectedMake ? MODELS_BY_MAKE[selectedMake] || [] : [];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % VEHICLES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + VEHICLES.length) % VEHICLES.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleFavorite = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const toggleCompare = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    setCompares((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const totalFavorites = Object.values(favorites).filter(Boolean).length;
  const totalCompares = Object.values(compares).filter(Boolean).length;

  // Window of visible vehicles for the multi-card carousel
  const visibleVehicles = [];
  for (let i = 0; i < 4; i++) {
    const idx = (activeSlide + i) % VEHICLES.length;
    visibleVehicles.push({ vehicle: VEHICLES[idx], originalIndex: idx });
  }

  const navMenuItems = [
    { label: "HOME", href: "/" },
    { label: "BROWSE VEHICLES", href: "/vehicles/" },
    { label: "SELL YOUR CAR", href: "/sell-your-car/" },
    { label: "REVIEWS", href: "/reviews/" },
    { label: "CONTACT US", href: "/contact/" },
  ];

  return (
    <div id="cm_wrapper" className="wrapper">
      {/* Top banner (Screenshot 60) */}
      <div className="top-announcement-dark text-center py-2 px-3 d-flex align-items-center justify-content-center">
        <b style={{ letterSpacing: "2px", fontSize: "0.86rem" }}>WE ARE OPEN 7 DAYS A WEEK</b>
      </div>

      {/* Primary nav header (Screenshot 60) */}
      <nav className="navbar header-primary-bg" aria-label="Navigation">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Hamburger toggle - Golden as before */}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setNavOpen(true)}
          >
            <svg viewBox="0 0 100 80" width="28" height="28" fill="#f6ac00">
              <rect y="0" width="100" height="12" rx="2"></rect>
              <rect y="34" width="100" height="12" rx="2"></rect>
              <rect y="68" width="100" height="12" rx="2"></rect>
            </svg>
          </button>

          {/* Center Logo */}
          <div className="navbar-brand-center">
            <a href="/" title="HDG CARS LTD">
              <img
                src="https://media-cloud.motordesk.com/NTKWOB/logo/200x200-0x0.png"
                title="HDG CARS LTD"
                alt="HDG CARS LTD"
                width="160"
              />
            </a>
          </div>

          {/* Right Header Tools (Heart / Favourites) - Golden outline heart exact as screenshot */}
          <ul className="navbar-nav tools">
            <li>
              <a
                href="/vehicles/favourites/"
                title="Saved Vehicles"
                className="position-relative"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="#f6ac00"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="navbar-heart-icon"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {totalFavorites > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {totalFavorites}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Full-Screen Overlay Navigation - Exact as Screenshot 2026-08-16 163019 */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="exact-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setNavOpen(false)}
          >
            {/* Left gold toggle bar indicator / Close toggle */}
            <button
              type="button"
              className="exact-nav-toggle-indicator"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
              title="Close menu"
            >
              <span className="gold-toggle-line"></span>
            </button>

            {/* Centered Navigation Content */}
            <motion.div
              className="exact-nav-content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu items list */}
              <ul className="exact-nav-list">
                {navMenuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="exact-nav-link"
                      onClick={() => setNavOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Horizontal divider line */}
              <div className="exact-nav-divider"></div>

              {/* Phone section with large handset icon and stacked numbers */}
              <div className="exact-nav-phone-block d-flex align-items-center">
                <div className="exact-nav-phone-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="exact-nav-phone-numbers">
                  <a href="tel:07778391254" className="exact-phone-link d-block">
                    07778391254
                  </a>
                  <a href="tel:07778391254" className="exact-phone-link d-block">
                    07778391254
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section with Search Inputs (Screenshot 2026-08-16 000529.png Reference) */}
        <div
          id="module_hero_search"
          className="module module_hero_search text-center d-flex align-items-center justify-content-center"
          style={{
            backgroundImage:
              "url('https://media-cloud.motordesk.com/NTKWOB/ferrari-car-grey-exterior-street-strong-powerful-e17kS7/1920x1080-28x375.jpg')",
          }}
        >
          <div className="w-100">
            {/* Title exact as screenshot */}
            <h1 className="text-center">HDG CARS LTD</h1>

            {/* Translucent container for search inputs */}
            <form
              action="/vehicles/"
              method="GET"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Searching for ${selectedMake || "All Makes"} ${selectedModel || ""}`);
              }}
              className="cm_search_block_wrapper"
            >
              <div className="cm_search_block p-3 p-md-3">
                <div className="row g-2 g-md-3 align-items-center">
                  {/* Any Make dropdown */}
                  <div className="col-12 col-md-5">
                    <select
                      name="make"
                      className="form-control"
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel("");
                      }}
                    >
                      <option value="">Any Make</option>
                      {Object.keys(MODELS_BY_MAKE).map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Any Model dropdown */}
                  <div className="col-12 col-md-5">
                    <select
                      className="form-control"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedMake}
                    >
                      <option value="">Any Model</option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rectangular Gold Search Button */}
                  <div className="col-12 col-md-2">
                    <button type="submit" className="btn btn-search-hero w-100">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Manufacturer Browse Strip (Screenshot 2026-08-15 142730 Reference: White background & centered black button) */}
        <div className="module module_manufacturer_browse_content bg-white">
          <div className="container position-relative">
            <div className="module_manufacturer_browse_manufacturers">
              {BRAND_LOGOS.map((brand) => (
                <a
                  key={brand.name}
                  href={`/vehicles/?make=${encodeURIComponent(brand.name)}`}
                  className="module_manufacturer_browse_item"
                  title={brand.name}
                >
                  <img src={brand.file} alt={brand.name} height="42" />
                </a>
              ))}
            </div>

            <div className="module_manufacturer_browse_button text-center w-100">
              <div className="browse-btn-wrapper">
                <a href="/vehicles/" className="btn btn-browse-black mb-0">
                  Browse Vehicles
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="module module_hero_image_text body-bg">
          <div className="container-custom">
            <div className="row align-items-center">
              <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                <div className="pe-lg-4">
                  <h1>Welcome to HDG Cars Ltd - Your Trusted Source for Used Cars</h1>
                  <p>
                    At HDG Cars Ltd, we are proud to be your premier destination for quality used cars in Rowley Regis, Dudley, Blackheath, Cradley Heath, Birmingham, and beyond. Whether you're in the market for an economical hatchback, a spacious family car, or a cutting-edge hybrid, our extensive selection is sure to meet your needs and exceed your expectations.
                  </p>
                  <p>
                    Located conveniently in the heart of the West Midlands, HDG Cars Ltd serves a diverse community of car buyers from Birmingham to Wolverhampton, Dudley to Sandwell, and everywhere in between. Our commitment to providing top-notch customer service and unbeatable value shines through in every interaction.
                  </p>
                  <p>
                    We understand that choosing the right car can be a daunting task, but our friendly and knowledgeable team is here to guide you every step of the way. Browse our user-friendly website to view our current inventory of used cars, or visit us in person for a closer look and a test drive. At HDG Cars Ltd, we're here to help you drive away with confidence and a smile.
                  </p>
                  <div className="mt-4">
                    <a href="/vehicles/" className="btn btn-lg btn-fill-accent">
                      Browse Vehicles
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <img
                  src="https://media-cloud.motordesk.com/NTKWOB/bmw-car-exterior-white-silver-sunset-powerful-moody-NkBbVz/1660x1107-0x0.jpg"
                  className="cm-img-fill shadow"
                  alt="HDG Cars Ltd Showroom"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Latest Stock Section (Screenshot 61 Reference) */}
        <div className="module module_new_arrivals_content">
          <div className="container position-relative">
            <h3>Our Latest Stock</h3>

            <div className="row g-3 g-md-4">
              {visibleVehicles.map(({ vehicle: v }) => (
                <div key={v.tag} className="col-12 col-sm-6 col-lg-3">
                  <div className="cm-vehicle-result h-100 d-flex flex-column justify-content-between">
                    <div>
                      {/* Vehicle Image (No warranty text, no heart icon, no reserved badge as requested) */}
                      <div className="position-relative overflow-hidden">
                        <img
                          src={v.image}
                          alt={v.title}
                          className="w-100"
                        />
                      </div>

                      {/* Make & Price Row */}
                      <div className="p-3 pb-0">
                        <div className="d-flex justify-content-between align-items-baseline mb-1">
                          <span className="fw-bold text-white fs-5">{v.make}</span>
                          <span className="fw-bold text-white fs-5">{v.price}</span>
                        </div>
                        <h4 className="fw-bold text-white mb-2 fs-5">{v.model}</h4>

                        {/* Specs Grid with Gold Icons */}
                        <div className="row g-2 cm_vehicle_highlight pt-2">
                          <div className="col-6">
                            <div className="cm-spec-badge">
                              <span className="cm-spec-icon-box">
                                <i className="bi bi-calendar-event"></i>
                              </span>
                              <span>{v.year}</span>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="cm-spec-badge">
                              <span className="cm-spec-icon-box">
                                <i className="bi bi-speedometer2"></i>
                              </span>
                              <span>{v.mileage}</span>
                            </div>
                          </div>

                          {v.acceleration && (
                            <div className="col-6">
                              <div className="cm-spec-badge">
                                <span className="cm-spec-icon-box">
                                  <i className="bi bi-stopwatch"></i>
                                </span>
                                <span>{v.acceleration}</span>
                              </div>
                            </div>
                          )}

                          {v.mpg && (
                            <div className="col-6">
                              <div className="cm-spec-badge">
                                <span className="cm-spec-icon-box">
                                  <i className="bi bi-fuel-pump"></i>
                                </span>
                                <span>{v.mpg}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Vehicle Solid White Button */}
                    <div className="p-3 pt-2">
                      <a
                        href={v.slug}
                        className="btn cm-vehicle-design-button-view-vehicle w-100 text-center"
                      >
                        View Vehicle
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Control Arrows */}
            <button
              type="button"
              className="carousel-control-prev"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <i className="bi bi-chevron-left fs-5"></i>
            </button>
            <button
              type="button"
              className="carousel-control-next"
              onClick={nextSlide}
              aria-label="Next"
            >
              <i className="bi bi-chevron-right fs-5"></i>
            </button>
          </div>
        </div>

        {/* 3 Call to Action Boxes (Screenshot 62 Reference) */}
        <div className="module module_call_to_action_boxes">
          <div className="row g-0">
            {/* Box 1: Wheel */}
            <div className="col-12 col-md-4">
              <div
                className="cta-card"
                style={{
                  backgroundImage:
                    "url('https://media-cloud.motordesk.com/NTKWOB/bmw-car-exterior-classic-m-car-alloy-wheel-close-up-black-powerful-iyaVI3/512x384-31x963.jpg')",
                }}
              >
                <a href="/vehicles/" className="btn cta-btn-white">
                  Browse Vehicles
                </a>
              </div>
            </div>

            {/* Box 2: Steering Wheel */}
            <div className="col-12 col-md-4">
              <div
                className="cta-card"
                style={{
                  backgroundImage:
                    "url('https://media-cloud.motordesk.com/NTKWOB/bmw-car-interior-steering-wheel-strong-xZEdfi/512x384-27x2310.jpg')",
                }}
              >
                <a href="/sell-your-car/" className="btn cta-btn-white">
                  Sell Your Car
                </a>
              </div>
            </div>

            {/* Box 3: Lamborghini */}
            <div className="col-12 col-md-4">
              <div
                className="cta-card"
                style={{
                  backgroundImage:
                    "url('https://media-cloud.motordesk.com/NTKWOB/lamborghini-car-exterior-black-powerful-close-up-front-DJCWws/512x384-21x702.jpg')",
                }}
              >
                <a href="/contact/" className="btn cta-btn-white">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion (Screenshot 2026-08-16 163913 Reference) */}
        <div className="module module_auto_faq">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="faq-container" id="faqAccordion">
                  {FAQS.map((faq, i) => {
                    const isOpen = !!openFaqs[i];
                    return (
                      <div className={`faq-item ${isOpen ? "active" : ""}`} key={i}>
                        <button
                          className={`faq-header-btn ${isOpen ? "is-open" : ""}`}
                          type="button"
                          onClick={() => toggleFaq(i)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-question-text">{faq.q}</span>
                          {isOpen && (
                            <span className="faq-chevron-blue">
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </span>
                          )}
                        </button>
                        {isOpen && (
                          <div className="faq-body-content">
                            <p className="mb-0">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer: Exact Replica of Screenshot 2026-08-16 171256.png */}
      <footer className="exact-hdg-footer">
        <div className="container-fluid px-4 px-lg-5 pt-5 pb-3">
          {/* Top 3 Columns Row */}
          <div className="row align-items-stretch mb-4">
            {/* Left Column: Yellow Social Icons + Family Owned Business */}
            <div className="col-12 col-lg-4 footer-col-family pe-lg-4">
              <div className="logo-block-social">
                <a
                  href="https://www.instagram.com/HDGcars/"
                  title="Find us on Instagram!"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@HDGcars"
                  title="Find us on TikTok!"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon"
                >
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>

              {/* Family Owned Business heading */}
              <div className="footer-family-block">
                <h2 className="footer-family-heading">
                  Family Owned<br />Business
                </h2>
              </div>
            </div>

            {/* Middle Column: Viewing by appointment only with clean vertical dividers */}
            <div className="col-12 col-lg-4 footer-center-divider px-lg-4">
              <p className="footer-appointment-text">
                <em>Viewing by appointment only.</em>
              </p>
            </div>

            {/* Right Column: Contact Details + Postcode Form */}
            <div className="col-12 col-lg-4 ps-lg-4 footer-contact-col">
              {/* Phone numbers */}
              <div className="footer-contact-item">
                <span className="footer-gold-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6ac00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <div className="footer-text-block">
                  <p><a href="tel:+447778391254">07778391254</a></p>
                  <p><a href="tel:+447778391254">07778391254</a></p>
                </div>
              </div>

              {/* Email */}
              <div className="footer-contact-item">
                <span className="footer-gold-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6ac00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
                <div className="footer-text-block">
                  <p><a href="mailto:contact@hdgcars.com">contact@hdgcars.com</a></p>
                </div>
              </div>

              {/* Address */}
              <div className="footer-contact-item">
                <span className="footer-gold-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6ac00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <div className="footer-text-block">
                  <p>
                    UNIT 14 Powke Lane INDUSTRIAL<br />
                    ESTATE, Rowley Regis, B65 0AH
                  </p>
                </div>
              </div>

              {/* Directions Form */}
              <div className="footer-contact-item">
                <span className="footer-gold-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f6ac00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M18 6h-6V2"></path>
                    <path d="M6 14h6v-4H6l-3 2 3 2z"></path>
                    <path d="M18 10h-6"></path>
                    <path d="M6 10h6"></path>
                    <path d="M18 6l3 2-3 2v-4z"></path>
                  </svg>
                </span>
                <div className="footer-text-block w-100">
                  <span className="footer-directions-label">Get Directions</span>
                  <form
                    action="https://maps.google.com/maps"
                    method="get"
                    target="_blank"
                    className="footer-direction-box d-flex mt-1"
                  >
                    <input
                      type="text"
                      name="saddr"
                      placeholder="Enter your postcode..."
                      className="form-control"
                    />
                    <input
                      type="hidden"
                      name="daddr"
                      value="UNIT 14 Powke Lane INDUSTRIAL ESTATE, Rowley Regis, B65 0AH, GB"
                    />
                    <input type="submit" value="Go!" />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Powered by MotorDesk right-aligned row */}
          <div className="row mb-3 pt-2">
            <div className="col-12 text-end">
              <div className="d-inline-flex align-items-center gap-2 text-white">
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Powered by</span>
                <img
                  src="https://motordesk.com/motordesk-logo/motordesk-car-dealer-software-logo-ffffff.svg"
                  alt="MotorDesk"
                  width="140"
                  style={{ filter: "brightness(1.1)" }}
                />
              </div>
            </div>
          </div>

          {/* Cookie banner bottom row */}
          {!cookiesAccepted && (
            <div className="footer-cookie-row pt-2 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <span className="text-white fw-normal" style={{ fontSize: "0.92rem" }}>
                  We use cookies to improve your experience.
                </span>
                <a href="/privacy/" className="btn-cookie-policy">
                  View Privacy Policy
                </a>
                <button
                  className="btn-cookie-accept"
                  onClick={() => setCookiesAccepted(true)}
                >
                  Accept Cookies
                </button>
              </div>

              <div className="cookie-disclaimer-text text-white-50 d-none d-lg-block">
                ent, some errors may occur. It is important that you do not rely solely on this information or images,
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
