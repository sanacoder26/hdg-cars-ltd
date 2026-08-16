import React, { useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BRAND_LOGOS = [
  { name: "Audi", file: "/img/brand/a.png" },
  { name: "Ford", file: "/img/brand/b.png" },
  { name: "Hummer", file: "/img/brand/c.png" },
  { name: "Kia", file: "/img/brand/d.png" },
  { name: "Land Rover", file: "/img/brand/e.png" },
  { name: "MINI", file: "/img/brand/f.png" },
  { name: "Mercedes-Benz", file: "/img/brand/g.png" },
  { name: "Toyota", file: "/img/brand/h.png" },
  { name: "Volkswagen", file: "/img/brand/i.png" },
  { name: "Volvo", file: "/img/brand/j.png" },
];

// ---------------------------------------------------------------------------
// Make / model search options
// ---------------------------------------------------------------------------
const MODELS_BY_MAKE = {
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
// Latest stock (carousel) data
// ---------------------------------------------------------------------------
const VEHICLES = [
  {
    tag: "7dat94mB",
    slug: "/vehicles/7dat94mB/Volkswagen-Golf-1-4-TSI-Match-Hatchback-5dr-Petrol-Manual-Euro-5-122-ps/",
    title: "Volkswagen Golf 1.4 TSI Match Hatchback 5dr Petrol Manual Euro 5 (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-7dat94mB/RoCUfrLs-600x450-0x0.jpg?1786535955",
    price: "£1,850",
    make: "Volkswagen",
    model: "Golf",
    year: "2012",
    mileage: "180,000 miles",
    acceleration: "9.5 seconds",
    mpg: "45.6 mpg",
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
    mileage: "80,000 miles",
    acceleration: "10.4 seconds",
    mpg: "70.6 mpg",
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
    mileage: "53,500 miles",
  },
  {
    tag: "gNDKJ2rs",
    slug: "/vehicles/gNDKJ2rs/Volkswagen-Arteon-2-0-TSI-R-Line-Fastback-5dr-Petrol-DSG-4Motion-Euro-6-s-s-280-ps/",
    title: "Volkswagen Arteon 2.0 TSI R-Line Fastback 5dr Petrol DSG 4Motion Euro 6 (s/s) (280 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-gNDKJ2rs/WscLCqAh-600x450-0x0.jpg?1785940666",
    price: "£18,450",
    make: "Volkswagen",
    model: "Arteon",
    year: "2017",
    mileage: "30,500 miles",
    acceleration: "5.6 seconds",
    mpg: "38.7 mpg",
  },
  {
    tag: "Iy5FTaPJ",
    slug: "/vehicles/Iy5FTaPJ/Volkswagen-Golf-2-0-TSI-GTI-Performance-Hatchback-5dr-Petrol-DSG-Euro-6-s-s-245-ps/",
    title: "Volkswagen Golf 2.0 TSI GTI Performance Hatchback 5dr Petrol DSG Euro 6 (s/s) (245 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-Iy5FTaPJ/rXTcs7V8-600x450-0x0.jpg?1782564492",
    price: "£17,500",
    make: "Volkswagen",
    model: "Golf",
    year: "2019",
    mileage: "62,758 miles",
    acceleration: "6 seconds",
    mpg: "44.8 mpg",
  },
  {
    tag: "pYKNSdoZ",
    slug: "/vehicles/pYKNSdoZ/Toyota-Prius-1-5-Saloon-4dr-Petrol-Hybrid-CVT-120-g-km-70-bhp/",
    title: "Toyota Prius 1.8 VVT-h GPF Excel Hatchback 5dr Petrol Hybrid CVT Euro 6 (s/s) (15in Alloy) (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-pYKNSdoZ/5UodfT0j-600x450-0x0.jpg?1782502824",
    price: "£14,850",
    make: "Toyota",
    model: "Prius",
    year: "2022",
    mileage: "72,500 miles",
    acceleration: "10.8 seconds",
    mpg: "67.26 mpg",
  },
  {
    tag: "7pefh6Po",
    slug: "/vehicles/7pefh6Po/Volkswagen-Golf-2-0-R-Hatchback-2012-2017/",
    title: "Volkswagen Golf 2.0 R Hatchback (2012 - 2017)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-7pefh6Po/XicblU5F-600x450-0x0.jpg?1785934631",
    price: "£14,500",
    make: "Volkswagen",
    model: "Golf",
    year: "2015",
    mileage: "69,594 miles",
  },
  {
    tag: "4tjmYWEk",
    slug: "/vehicles/4tjmYWEk/Kia-Rio-1-4-CRDi-EcoDynamics-2-Hatchback-5dr-Diesel-Manual-Euro-5-s-s-89-bhp/",
    title: "Kia Rio 1.4 CRDi EcoDynamics 2 Hatchback 5dr Diesel Manual Euro 5 (s/s) (89 bhp)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-4tjmYWEk/k11oQDE0-450x600-0x0.jpg?1781802432",
    price: "£500",
    make: "Kia",
    model: "Rio",
    year: "2013",
    mileage: "116,500 miles",
    acceleration: "13.7 seconds",
    mpg: "70.6 mpg",
  },
  {
    tag: "GBweIeJQ",
    slug: "/vehicles/GBweIeJQ/Toyota-Prius-1-5-Saloon-4dr-Petrol-Hybrid-CVT-120-g-km-70-bhp/",
    title: "Toyota Prius+ 1.8 VVT-h Excel MPV 5dr Petrol Hybrid CVT Euro 6 (s/s) (136 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-GBweIeJQ/jcnaTz6J-600x450-0x0.jpg?1781192374",
    price: "£11,850",
    make: "Toyota",
    model: "Prius+",
    year: "2016",
    mileage: "73,943 miles",
    acceleration: "11.3 seconds",
    mpg: "47.08 mpg",
  },
  {
    tag: "hCR7M5DS",
    slug: "/vehicles/hCR7M5DS/Volkswagen-Golf/",
    title: "Volkswagen Golf 2.0 TSI BlueMotion Tech GTI Hatchback 5dr Petrol DSG Euro 6 (s/s) (220 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-hCR7M5DS/koiKz8Q6-600x450-0x0.jpg?1779708490",
    price: "£9,995",
    make: "Volkswagen",
    model: "Golf",
    year: "2013",
    mileage: "76,000 miles",
    acceleration: "6.5 seconds",
    mpg: "44.1 mpg",
  },
  {
    tag: "WBvCAZNj",
    slug: "/vehicles/WBvCAZNj/Volkswagen-Golf-1-3/",
    title: "Volkswagen Golf 1.4 TSI Match Hatchback 5dr Petrol DSG Euro 5 (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-WBvCAZNj/QTs3QB5q-600x450-0x0.jpg?1780836663",
    price: "£6,450",
    make: "Volkswagen",
    model: "Golf",
    year: "2012",
    mileage: "68,000 miles",
    acceleration: "9.5 seconds",
    mpg: "47.1 mpg",
  },
  {
    tag: "4aRRkfx9",
    slug: "/vehicles/4aRRkfx9/Volvo/",
    title: "Volvo V60 1.6 T4 SE Lux Premium Estate 5dr Petrol Powershift Euro 5 (180 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-4aRRkfx9/c4P3YpUH-600x450-0x0.jpg?1785416627",
    price: "£5,950",
    make: "Volvo",
    model: "V60",
    year: "2014",
    mileage: "67,700 miles",
    acceleration: "9.2 seconds",
    mpg: "37.2 mpg",
  },
  {
    tag: "NsEFOZnE",
    slug: "/vehicles/NsEFOZnE/Volkswagen-Polo/",
    title: "Volkswagen Polo",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-NsEFOZnE/W4seJFtM-600x450-0x0.jpg?1777913057",
    price: "£7,250",
    make: "Volkswagen",
    model: "Polo",
    year: "2014",
    mileage: "75,186 miles",
  },
  {
    tag: "faoOFmnH",
    slug: "/vehicles/faoOFmnH/Toyota-C-HR-1-8-SUV-2019-2023/",
    title: "Toyota C-HR 1.8 VVT-h Dynamic SUV 5dr Petrol Hybrid CVT Euro 6 (s/s) (122 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-faoOFmnH/HNYSVfEs-600x450-0x0.jpg?1780833981",
    price: "£14,950",
    make: "Toyota",
    model: "C-HR",
    year: "2020",
    mileage: "65,244 miles",
    acceleration: "11 seconds",
    mpg: "58.85 mpg",
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
    mileage: "67,729 miles",
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
    mileage: "22,000 miles",
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
    mileage: "60,273 miles",
    acceleration: "8.6 seconds",
    mpg: "45.6 mpg",
  },
  {
    tag: "hcnxvrL8",
    slug: "/vehicles/hcnxvrL8/Mercedes-Benz-S-Class-5-5-S63L-V8-AMG-Executive-Saloon-4dr-Petrol-SpdS-7GT-Euro-6-s-s-585-ps/",
    title: "Mercedes-Benz S Class 5.5 S63L V8 AMG (Executive) Saloon 4dr Petrol SpdS+7GT Euro 6 (s/s) (585 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-hcnxvrL8/V60nX0qP-600x450-0x0.jpg?1783262131",
    price: "£36,950",
    make: "Mercedes-Benz",
    model: "S Class",
    year: "2016",
    mileage: "37,000 miles",
    acceleration: "4.4 seconds",
    mpg: "28 mpg",
  },
  {
    tag: "2mkj7EvC",
    slug: "/vehicles/2mkj7EvC/Toyota-Estima-2-4-Excel-2018/",
    title: "Toyota Estima 2.4 Excel 2018",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-2mkj7EvC/doqgn4E9-600x450-0x0.jpg?1785069016",
    price: "£14,750",
    make: "Toyota",
    model: "Estima",
    year: "2018",
    mileage: "64,000 miles",
  },
  {
    tag: "eqNgTnpu",
    slug: "/vehicles/eqNgTnpu/Toyota-Yaris-1-5-VVT-h-Excel-Hatchback-5dr-Petrol-Hybrid-E-CVT-Euro-6-s-s-116-ps/",
    title: "Toyota Yaris 1.5 VVT-h Excel Hatchback 5dr Petrol Hybrid E-CVT Euro 6 (s/s) (116 ps)",
    image: "https://media-cloud.motordesk.com/NTKWOB/vehicle-eqNgTnpu/0MU496ny-600x450-0x0.jpg?1785068789",
    price: "£9,999",
    make: "Toyota",
    model: "Yaris",
    year: "2020",
    mileage: "63,000 miles",
    acceleration: "9.7 seconds",
    mpg: "65.69 mpg",
  },
];

// ---------------------------------------------------------------------------
// FAQ data
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
    a: "Part exchanging your car at HDG CARS LTD allows you to seamlessly transition from your old vehicle to a new one. It's convenient, reduces paperwork, and you can offset the cost of your next car with the value of your current one.",
  },
  {
    q: "How Do I Find The Right Car For Me At HDG CARS LTD?",
    a: "Our friendly team is here to help you find the perfect car that fits your needs and budget. You can browse our extensive range online or visit us in person for a test drive and personalised advice.",
  },
  {
    q: "Can I Test Drive A Car Before Purchasing?",
    a: "Absolutely! We encourage you to test drive any car you're interested in to ensure it meets your expectations and driving comfort. Just contact us to schedule a convenient time.",
  },
  {
    q: "How Do You Ensure The Quality Of The Cars You Sell?",
    a: "Each car undergoes a thorough inspection by our qualified mechanics to ensure safety, reliability, and performance. We also provide a detailed history report for transparency and peace of mind.",
  },
];

const AREA_LINKS = [
  "Rowley Regis",
  "Dudley",
  "Blackheath",
  "Cradley heath",
  "Birmingham",
  "Small Heath",
  "Oldbury",
  "Smethwick",
  "Sandwell",
  "Wolverhampton",
  "West Midlands",
  "Solihull",
];

const BRAND_FOOTER_LINKS = [
  "Audi",
  "Ford",
  "Hummer",
  "Kia",
  "Land Rover",
  "Mercedes-Benz",
  "MINI",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HDGCars() {
  const [selectedMake, setSelectedMake] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState({});
  const [favorites, setFavorites] = useState({});
  const [compares, setCompares] = useState({});

  const models = selectedMake ? MODELS_BY_MAKE[selectedMake] || [] : [];

  const goTo = (path) => {
    window.location.href = path;
  };

  const nextSlide = () =>
    setActiveSlide((s) => (s + 1) % VEHICLES.length);
  const prevSlide = () =>
    setActiveSlide((s) => (s - 1 + VEHICLES.length) % VEHICLES.length);

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleFavorite = (e, tag) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const toggleCompare = (e, tag) => {
    e.stopPropagation();
    setCompares((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const totalFavorites = Object.values(favorites).filter(Boolean).length;
  const totalCompares = Object.values(compares).filter(Boolean).length;

  const visibleVehicles = [];
  for (let i = 0; i < 4; i++) {
    const idx = (activeSlide + i) % VEHICLES.length;
    visibleVehicles.push({ vehicle: VEHICLES[idx], originalIndex: idx });
  }

  return (
    <div id="cm_wrapper" className="wrapper">
      {/* Top banner */}
      <div className="palette-bg-2 text-center p-3">
        <b>WE ARE OPEN 7 DAYS A WEEK</b>
      </div>

      {/* Primary nav */}
      <nav className="navbar header-primary-bg" aria-label="Navigation">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbar-content"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg viewBox="0 0 100 80" width="30" height="30" fill="#f6ac00">
              <rect y="0" width="100" height="10"></rect>
              <rect y="35" width="100" height="10"></rect>
              <rect y="70" width="100" height="10"></rect>
            </svg>
          </button>

          <div className="navbar-brand navbar-brand-center navbar-brand-center-tool">
            <a href="/" title="HDG CARS LTD">
              <img
                src="https://media-cloud.motordesk.com/NTKWOB/logo/200x200-0x0.png"
                title="HDG CARS LTD"
                alt="HDG CARS LTD"
                width="250"
              />
            </a>
          </div>

          <ul className="navbar-nav tools">
            <li>
              <a href="/vehicles/compare/" title="Compare Vehicles" className="position-relative">
                <i className="bi bi-collection cm_vehicle_tool_compare_total bix125 ms-2"></i>
                {totalCompares > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: "0.65rem" }}>
                    {totalCompares}
                  </span>
                )}
              </a>
            </li>
            <li>
              <a href="/vehicles/favourites/" title="Saved Vehicles" className="position-relative">
                <i className="bi bi-heart cm_vehicle_tool_favourite_total bix125 ms-2"></i>
                {totalFavorites > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: "0.65rem" }}>
                    {totalFavorites}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Secondary nav / collapsible menu */}
      <nav className="navbar p-0 m-0 nav-line-above">
        <div className="container position-relative">
          <div>
            <div
              className={`header-secondary-bg position-absolute ${navOpen ? "d-block" : "d-none d-lg-none"}`}
              style={{ width: "100%", maxWidth: 350, zIndex: 1050 }}
            >
              <div className="navbar-collapse show" id="navbar-content">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item active">
                    <a className="nav-link active" aria-current="page" href="/" title="Performante">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/vehicles/">
                      Browse Vehicles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/sell-your-car/">
                      Sell Your Car
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/reviews/">
                      Reviews
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contact/">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item separator my-3"></li>
                  <li className="nav-item py-0">
                    <div className="logo-block d-block">
                      <div>
                        <i className="bi bi-telephone bix25"></i>
                      </div>
                      <div>
                        <a href="tel:07778391254">07778391254</a>
                        <br />
                        <a href="tel:07778391254">07778391254</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="aos-init" data-aos="fade" data-aos-duration="500">
        {/* Hero search */}
        <div
          id="module_hero_search"
          className="module module_hero_search text-center d-flex align-items-center justify-content-center"
          style={{
            backgroundImage:
              "url('https://media-cloud.motordesk.com/NTKWOB/ferrari-car-grey-exterior-street-strong-powerful-e17kS7/1920x1080-28x375.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            minHeight: "60vw",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              className="d-inline-block primary-bg p-5 search rounded mb-5 text-center cm_text_block"
              style={{ backgroundColor: "#00000000" }}
            >
              <h1>HDG CARS LTD</h1>
              <h5 className="mb-0">
                <p></p>
              </h5>
            </div>

            <form
              action="/vehicles/"
              method="GET"
              onSubmit={(e) => {
                e.preventDefault();
                goTo(`/vehicles/?make=${encodeURIComponent(selectedMake)}`);
              }}
            >
              <div
                className="primary-bg d-inline-block p-4 search cm_search_block shadow rounded"
                style={{ backgroundColor: "#00000066" }}
              >
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-5 mb-3 mb-lg-0">
                    <select
                      name="make"
                      className="form-control"
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                    >
                      <option value="">Any Make</option>
                      {Object.keys(MODELS_BY_MAKE).map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6 col-lg-5 mb-3 mb-lg-0">
                    <select
                      disabled={!selectedMake}
                      data-none-selected-text="All"
                      className="form-control"
                      name={selectedMake ? `model_${selectedMake.toLowerCase()}[]` : undefined}
                    >
                      <option value="">Any Model</option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-lg-2">
                    <input
                      type="submit"
                      value="Search"
                      className="btn btn-fill-accent w-100"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Manufacturer browse strip */}
        <div className="module module_manufacturer_browse_content palette-bg-1">
          <div className="container">
            <div className="row pt-3">
              <div
                className="module_manufacturer_browse_manufacturers text-center w-100 pt-5 px-4 pb-0"
                onClick={() => goTo("/vehicles/")}
              >
                {BRAND_LOGOS.map((brand) => (
                  <img key={brand.name} src={brand.file} alt={brand.name} title={brand.name} />
                ))}

                <div
                  className="module_manufacturer_browse_button text-center w-100"
                  style={{ position: "relative", top: "-55%" }}
                >
                  <div style={{ boxShadow: "0 0 2em 7em #ffffffdd" }}>
                    <a href="/vehicles/" className="btn btn-lg btn-fill mb-0">
                      Browse Vehicles
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image + text */}
        <div className="module module_hero_image_text module_hero_image_text_right module_hero_image_text_breakpoint_sm body-bg">
          <div className="container-custom">
            <div className="row align-items-center">
              <div className="col-12 col-sm-6">
                <div className="contain-left h-100">
                  <div className="module-text-left body-bg p-5 ps-sm-0 h-100 d-flex align-items-center">
                    <div className="module-text-left">
                      <div className="pb-0">
                        <h1>Welcome to HDG Cars Ltd - Your Trusted Source for Used Cars</h1>
                        <p>
                          At HDG Cars Ltd, we are proud to be your premier destination for
                          quality <a href="/used/cars/in-rowley-regis/">used cars in Rowley Regis</a>,
                          Dudley, Blackheath, Cradley Heath, Birmingham, and beyond. Whether
                          you're in the market for an economical hatchback, a spacious family
                          car, or a cutting-edge hybrid, our extensive selection is sure to meet
                          your needs and exceed your expectations.
                        </p>
                        <p>
                          Located conveniently in the heart of the West Midlands, HDG Cars Ltd
                          serves a diverse community of car buyers from Birmingham to
                          Wolverhampton, <a href="/used/cars/in-dudley/">Dudley</a> to Sandwell,
                          and everywhere in between. Our commitment to providing top-notch
                          customer service and unbeatable value shines through in every
                          interaction.
                        </p>
                        <p>
                          We understand that choosing the right car can be a daunting task, but
                          our friendly and knowledgeable team is here to guide you every step of
                          the way. Browse our user-friendly website to view our current
                          inventory of <a href="/used/cars/">used cars</a>, or visit us in
                          person for a closer look and a test drive. At HDG Cars Ltd, we're here
                          to help you drive away with confidence and a smile.
                        </p>
                      </div>
                      <a href="/vehicles/" className="btn btn-lg-sm btn-fill-accent m-1">
                        Browse Vehicles
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 stretch-right" style={{ maxHeight: 600 }}>
                <img
                  src="https://media-cloud.motordesk.com/NTKWOB/bmw-car-exterior-white-silver-sunset-powerful-moody-NkBbVz/1660x1107-0x0.jpg"
                  className="shadow cm-img-fill"
                  alt="HDG Cars Ltd Showroom"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Latest stock carousel */}
        <div className="module module_new_arrivals_content primary-bg overflow-hidden module_new_arrivals_content__default">
          <div className="container">
            <div className="row pt-3 pb-3">
              <div className="col-12 module-text-center">
                <h3 className="mt-4">Our Latest Stock</h3>
              </div>

              <div className="carousel slide carousel-multi col-12">
                <div className="carousel-inner row w-100 m-0">
                  {visibleVehicles.map(({ vehicle: v }) => (
                    <div
                      key={v.tag}
                      className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 pb-4 pt-4 active d-block"
                    >
                      <div
                        className="cm-vehicle-result h-100 primary-bg primary-bg-text shadow rounded border border-1 pointer"
                        style={{ overflowX: "hidden" }}
                        onClick={() => goTo(v.slug)}
                      >
                        <div className="h-100 position-relative d-flex justify-content-between flex-column">
                          <div>
                            <figure className="figure m-0 p-0 w-100 cm-overflow-hidden">
                              {v.reserved && (
                                <button className="btn btn-fill position-absolute cm-vehicle-status-reserve">
                                  RESERVED
                                </button>
                              )}
                              <a href={v.slug} title={v.title} onClick={(e) => e.preventDefault()}>
                                <img
                                  src={v.image}
                                  className="figure-img img-fluid m-0 rounded w-100"
                                  alt={v.title}
                                />
                              </a>
                              <i
                                className={`bi bi-collection bix15 position-absolute cm_vehicle_tool_compare ${
                                  compares[v.tag] ? "text-warning" : ""
                                }`}
                                data-vehicle-tag={v.tag}
                                title="Compare this vehicle"
                                onClick={(e) => toggleCompare(e, v.tag)}
                              ></i>
                              <i
                                className={`bi bi-heart${
                                  favorites[v.tag] ? "-fill text-warning" : ""
                                } bix15 position-absolute cm_vehicle_tool_favourite`}
                                data-vehicle-tag={v.tag}
                                title="Save to favourites"
                                onClick={(e) => toggleFavorite(e, v.tag)}
                              ></i>
                            </figure>

                            <div className="p-3 cm-text-smaller">
                              <span className="float-end text-end primary-bg-text d-none d-md-block">
                                <h4 className="m-0 text-nowrap primary-bg-text">{v.price}</h4>
                              </span>

                              <div className="d-block pb-0">
                                <div>
                                  <b className="primary-bg-text text-truncate">{v.make}</b>
                                  <h3 className="text-truncate mb-0">
                                    <a href={v.slug} title={v.title} className="primary-bg-text">
                                      {v.model}
                                    </a>
                                  </h3>
                                </div>
                              </div>

                              <span className="primary-bg-text d-block d-md-none mb-0 mb-sm-1">
                                <h4 className="primary-bg-text d-inline-block m-0 my-1 text-nowrap">
                                  {v.price}
                                </h4>
                              </span>

                              <div className="primary-bg-text text-truncate">
                                <div className="row cm_vehicle_highlight mt-2">
                                  <div className="primary-bg-text col-6 col-sm-12 col-lg-6 mt-2 mb-1 d-flex align-items-center">
                                    <i className="primary-bg-icon cmi cmi-year me-2 pm2 cmi-small"></i>
                                    <span className="primary-bg-text d-inline-block text-truncate">
                                      {v.year}
                                    </span>
                                  </div>

                                  <div className="primary-bg-text col-6 col-sm-12 col-lg-6 mt-2 mb-1 d-flex align-items-center">
                                    <i className="primary-bg-icon cmi cmi-mileage me-2 pm2 cmi-small"></i>
                                    <span className="primary-bg-text d-inline-block text-truncate">
                                      {v.mileage}
                                    </span>
                                  </div>

                                  {v.acceleration && (
                                    <div className="primary-bg-text col-6 col-sm-12 col-lg-6 mt-2 mb-1 d-flex align-items-center">
                                      <i className="primary-bg-icon cmi cmi-acceleration me-2 pm2 cmi-small"></i>
                                      <span className="primary-bg-text d-inline-block text-truncate">
                                        {v.acceleration}
                                      </span>
                                    </div>
                                  )}

                                  {v.mpg && (
                                    <div className="primary-bg-text col-6 col-sm-12 col-lg-6 mt-2 mb-1 d-flex align-items-center">
                                      <i className="primary-bg-icon cmi cmi-mpg me-2 pm2 cmi-small"></i>
                                      <span className="primary-bg-text d-inline-block text-truncate">
                                        {v.mpg}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="actions">
                            <div className="m-3 mt-0 mb-0">
                              <div className="border-top pt-1">
                                <div className="primary-bg primary-bg-text row pb-3 rounded">
                                  <div className="pt-2 col-12 primary-bg primary-bg-text">
                                    <a
                                      href={v.slug}
                                      className="btn btn-fill h-100 w-100 d-flex align-items-center justify-content-center cm-vehicle-design-button-view-vehicle"
                                    >
                                      View Vehicle
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="carousel-control-prev"
                  onClick={prevSlide}
                  aria-label="Previous"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  type="button"
                  className="carousel-control-next"
                  onClick={nextSlide}
                  aria-label="Next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action boxes */}
        <div className="module module_call_to_action_boxes body-bg" style={{ width: "100%" }}>
          <div className="h-100">
            <div className="row h-100 pb-0 gx-0">
              <div className="col-12 col-lg-4 h-100 pt-0">
                <div
                  className="body-bg shadow p-4 w-100 h-100 d-flex align-items-end pointer"
                  style={{
                    minHeight: 350,
                    backgroundImage:
                      "url('https://media-cloud.motordesk.com/NTKWOB/bmw-car-exterior-classic-m-car-alloy-wheel-close-up-black-powerful-iyaVI3/512x384-31x963.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  onClick={() => goTo("/vehicles/")}
                >
                  <div className="body-bg-text w-100 module-text-center">
                    <a href="/vehicles/" className="btn btn-lg-sm btn-fill mt-1 w-100">
                      Browse Vehicles
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 h-100 pt-0">
                <div
                  className="body-bg shadow p-4 w-100 h-100 d-flex align-items-end pointer"
                  style={{
                    minHeight: 350,
                    backgroundImage:
                      "url('https://media-cloud.motordesk.com/NTKWOB/bmw-car-interior-steering-wheel-strong-xZEdfi/512x384-27x2310.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  onClick={() => goTo("/sell-your-car/")}
                >
                  <div className="body-bg-text w-100 module-text-center">
                    <a href="/sell-your-car/" className="btn btn-lg-sm btn-fill mt-1 w-100">
                      Sell Your Car
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4 h-100 pt-0">
                <div
                  className="body-bg shadow p-4 w-100 h-100 d-flex align-items-end pointer"
                  style={{
                    minHeight: 350,
                    backgroundImage:
                      "url('https://media-cloud.motordesk.com/NTKWOB/lamborghini-car-exterior-black-powerful-close-up-front-DJCWws/512x384-21x702.jpg')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  onClick={() => goTo("/contact/")}
                >
                  <div className="body-bg-text w-100 module-text-center">
                    <a href="/contact/" className="btn btn-lg-sm btn-fill mt-1 w-100">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="module module_auto_faq body-bg">
          <div className="container">
            <div className="row pt-4 pb-4">
              <div className="col-12 col-lg-10 col-xl-8 mx-auto my-4">
                <div className="accordion accordion-flush" id="cm_module_auto_faq_accordion">
                  {FAQS.map((faq, i) => (
                    <div className="accordion-item" key={i}>
                      <h2 className="accordion-header body-bg-text" id={`faq_heading_${i}`}>
                        <button
                          className={`accordion-button ${openFaqs[i] ? "" : "collapsed"} body-bg-text`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq_content_${i}`}
                          aria-expanded={!!openFaqs[i]}
                          aria-controls={`faq_content_${i}`}
                          onClick={() => toggleFaq(i)}
                        >
                          <h2 className="h4 pt-2 body-bg-text">{faq.q}</h2>
                        </button>
                      </h2>
                      <div
                        id={`faq_content_${i}`}
                        className={`accordion-collapse collapse ${openFaqs[i] ? "show" : ""} body-bg-text`}
                        aria-labelledby={`faq_heading_${i}`}
                        data-bs-parent="#cm_module_auto_faq_accordion"
                      >
                        <div className="accordion-body mb-3 body-bg-text">
                          <small>{faq.a}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-tertiary-bg cm_footer_seo_link">
          <div className="container pt-4 pb-1">
            <div className="cm_footer_seo_link_content mb-3">
              <h3 className="h6 mb-0">Used Cars in Rowley Regis</h3>
              {BRAND_FOOTER_LINKS.map((brand, i) => (
                <React.Fragment key={brand}>
                  <a href={`/used/cars/${brand.toLowerCase().replace(/\s+/g, "-")}/`}>
                    Used {brand} Cars in Rowley Regis
                  </a>
                  {i < BRAND_FOOTER_LINKS.length - 1 && " • "}
                </React.Fragment>
              ))}
            </div>

            <div className="cm_footer_seo_link_content mb-3">
              <h3 className="h6 mb-0">Used Cars Near You</h3>
              {AREA_LINKS.map((area, i) => (
                <React.Fragment key={area}>
                  <a href={`/used/cars/in-${area.toLowerCase().replace(/\s+/g, "-")}/`}>
                    Used Car Dealership in {area}
                  </a>
                  {i < AREA_LINKS.length - 1 && " • "}
                </React.Fragment>
              ))}
            </div>

            <div className="cm_footer_seo_link_content mb-3">
              <h3 className="h6 mb-0">Used Cars Finance</h3>
              {AREA_LINKS.map((area, i) => (
                <React.Fragment key={area}>
                  <a href={`/used/cars/finance/in-${area.toLowerCase().replace(/\s+/g, "-")}/`}>
                    Used Car Finance in {area}
                  </a>
                  {i < AREA_LINKS.length - 1 && " • "}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-primary-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="logo-block-social">
                  <a href="https://www.instagram.com/HDGcars/" title="Find us on Instagram!" target="_blank" rel="noreferrer">
                    <i className="bi bi-instagram bix25 me-2"></i>
                  </a>
                  <a href="https://www.tiktok.com/@HDGcars" title="Find us on TikTok!" target="_blank" rel="noreferrer">
                    <i className="bi bi-tiktok bix25 me-2"></i>
                  </a>
                </div>
                <div>
                  <h2>Family Owned Business</h2>
                </div>
              </div>

              <div className="col-md-4">
                <p>
                  <em>Viewing by appointment only.</em>
                </p>
              </div>

              <div className="col-md-4">
                <div className="logo-block">
                  <div>
                    <i className="bi bi-telephone bix25"></i>
                  </div>
                  <div>
                    <p>
                      <a href="tel:+447778391254">07778391254</a>
                      <br />
                      <a href="tel:+447778391254">07778391254</a>
                    </p>
                  </div>
                </div>
                <div className="logo-block">
                  <div>
                    <i className="bi bi-envelope bix25"></i>
                  </div>
                  <div>
                    <a href="mailto:contact@hdgcars.com">contact@hdgcars.com</a>
                  </div>
                </div>
                <div className="logo-block">
                  <div>
                    <i className="bi bi-geo-alt bix25"></i>
                  </div>
                  <div>
                    <p>
                      UNIT 14 Powke Lane INDUSTRIAL ESTATE, Rowley Regis,{" "}
                      <span className="text-nowrap">B65 0AH</span>
                    </p>
                  </div>
                </div>
                <div className="direction logo-block">
                  <div>
                    <i className="bi bi-signpost bix25"></i>
                  </div>
                  <div className="pm2">
                    <form action="https://maps.google.com/maps" method="get" target="_blank">
                      <label htmlFor="saddr">
                        <small>Get Directions</small>
                      </label>
                      <br />
                      <div className="input-group input-group-sm flex-nowrap">
                        <input
                          type="text"
                          id="saddr"
                          name="saddr"
                          placeholder="Enter your postcode..."
                          className="form-control form-control-sm"
                        />
                        <input
                          type="hidden"
                          name="daddr"
                          value="UNIT 14 Powke Lane INDUSTRIAL ESTATE, Rowley Regis, B65 0AH, GB"
                        />
                        <input type="submit" value="Go!" className="btn btn-sm btn-outline" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-secondary-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mt-3">
                <p className="mb-1">
                  <small>
                    &copy; 2026 HDG CARS LTD | <a href="/privacy/">Privacy Policy</a> |{" "}
                    <a href="/contact/">Contact Us</a>
                  </small>
                </p>
              </div>
              <div className="col-lg-4 mt-3 d-flex justify-content-end align-items-end">
                <p>
                  <small>
                    Powered by{" "}
                    <a href="https://motordesk.com/" title="MotorDesk" target="_blank" rel="noreferrer">
                      <img
                        src="https://motordesk.com/motordesk-logo/motordesk-car-dealer-software-logo-ffffff.svg"
                        width="135"
                        alt="MotorDesk Car Dealer Software"
                        className="ms-1 pm1"
                      />
                    </a>
                  </small>
                </p>
              </div>
              <div className="col-12">
                <p className="tiny mb-4">
                  Content may be computer generated, whilst every effort has been made to
                  ensure the accuracy of the website content, some errors may occur. It is
                  important that you do not rely solely on this information or images, but
                  check with your supplying dealer any items that may affect your decision to
                  purchase this vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
