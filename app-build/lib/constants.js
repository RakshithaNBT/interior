export const siteConfig = {
  name: "ELEVA Interiors",
  tagline: "Where Luxury Meets Living",
  description: "Transform your space into an extraordinary experience. Premium interior design solutions crafted with precision, passion, and unparalleled artistry.",
  phone: "+91 98765 43210",
  email: "hello@elevainteriors.com",
  address: "42 Design District, Bandra West, Mumbai 400050",
  whatsapp: "919876543210",
  social: {
    instagram: "https://instagram.com/elevainteriors",
    facebook: "https://facebook.com/elevainteriors",
    pinterest: "https://pinterest.com/elevainteriors",
    linkedin: "https://linkedin.com/company/elevainteriors",
    youtube: "https://youtube.com/@elevainteriors",
  },
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#booking" },
];

export const services = [
  {
    title: "Living Room Design",
    description: "Create inviting living spaces that reflect your personality with custom furniture, lighting, and decor curated for comfort and elegance.",
    icon: "sofa",
  },
  {
    title: "Modular Kitchen",
    description: "Sleek, functional kitchens designed for the modern home chef. Premium materials, smart storage, and stunning aesthetics.",
    icon: "kitchen",
  },
  {
    title: "Bedroom Interiors",
    description: "Transform your bedroom into a serene retreat with bespoke wardrobes, premium furnishings, and ambient lighting design.",
    icon: "bed",
  },
  {
    title: "Bathroom Design",
    description: "Spa-inspired bathrooms featuring premium fixtures, natural stone, and intelligent layouts for ultimate relaxation.",
    icon: "bath",
  },
  {
    title: "Home Office",
    description: "Productive, inspiring workspaces designed for focus. Ergonomic furniture, smart technology integration, and refined aesthetics.",
    icon: "office",
  },
  {
    title: "Complete Home",
    description: "End-to-end interior solutions for your entire home. From concept to completion, we handle every detail with care.",
    icon: "home",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "We begin with an in-depth discussion to understand your vision, lifestyle, preferences, and budget. Every great design starts with listening.",
  },
  {
    step: 2,
    title: "Concept Design",
    description: "Our designers create mood boards, layouts, and material palettes tailored to your space. You'll see your vision taking shape.",
  },
  {
    step: 3,
    title: "3D Visualization",
    description: "Experience your future home through photorealistic 3D renders. Walk through every room before a single nail is hammered.",
  },
  {
    step: 4,
    title: "Execution",
    description: "Our expert craftsmen bring the design to life with precision and quality materials. Regular updates keep you informed throughout.",
  },
  {
    step: 5,
    title: "Handover",
    description: "Your dream home is ready. We conduct a thorough walkthrough ensuring every detail meets our exacting standards and your expectations.",
  },
];

export const portfolioItems = [
  // --- Living Room (4 items) ---
  {
    id: 1,
    title: "The Penthouse Suite",
    category: "Living Room",
    image: "/interior/images/living-1.png",
    description: "A grand living space with panoramic city views, featuring custom Italian velvet seating and high-end marble details.",
    area: "2,800 sq ft",
    location: "Mumbai",
  },
  {
    id: 2,
    title: "Modern Elegance",
    category: "Living Room",
    image: "/interior/images/living-2.png",
    description: "A contemporary living lounge blending warmth and sophistication with bespoke plaster walls and gold metallic detailing.",
    area: "1,800 sq ft",
    location: "Pune",
  },
  {
    id: 3,
    title: "Neoclassical Majesty",
    category: "Living Room",
    image: "/interior/images/living-3.png",
    description: "An exquisite neoclassical living space characterized by elegant cream paneled walls, custom gold metal frames, and polished marble fireplace mantel.",
    area: "3,200 sq ft",
    location: "Kolkata",
  },
  {
    id: 4,
    title: "Boucle Serenity",
    category: "Living Room",
    image: "/interior/images/living-4.png",
    description: "A warm, contemporary organic lounge featuring curved boucle armchairs, bespoke timber details, and ambient architectural cove lighting.",
    area: "2,100 sq ft",
    location: "Goa",
  },

  // --- Kitchen (4 items) ---
  {
    id: 5,
    title: "Chef's Paradise",
    category: "Kitchen",
    image: "/interior/images/kitchen-1.png",
    description: "A gourmet modular kitchen with Calacatta marble waterfall island, professional-grade appliances, and warm designer pendant drops.",
    area: "450 sq ft",
    location: "Bangalore",
  },
  {
    id: 6,
    title: "The Calacatta Oasis",
    category: "Kitchen",
    image: "/interior/images/kitchen-2.png",
    description: "An ultra-luxury modern kitchen featuring premium copper cookware, sleek ivory cabinetry, and dramatic natural stone backsplashes.",
    area: "380 sq ft",
    location: "Mumbai",
  },
  {
    id: 7,
    title: "Minimalist Dark Oak",
    category: "Kitchen",
    image: "/interior/images/kitchen-3.png",
    description: "A sleek handleless dark modular kitchen designed with dark oak panels, integrated smart technologies, and premium ambient LED tracks.",
    area: "420 sq ft",
    location: "Hyderabad",
  },
  {
    id: 8,
    title: "Classic Ivory Culinary",
    category: "Kitchen",
    image: "/interior/images/kitchen-4.png",
    description: "A timeless, classical modular kitchen adorned with intricate crown moldings, white marble counter spaces, and integrated storage panels.",
    area: "510 sq ft",
    location: "Delhi",
  },

  // --- Bedroom (4 items) ---
  {
    id: 9,
    title: "Serene Sanctuary",
    category: "Bedroom",
    image: "/interior/images/bedroom-1.png",
    description: "A master suite designed for tranquility with custom upholstered silk headboards, beige and gold linens, and soft cove lighting.",
    area: "600 sq ft",
    location: "Delhi",
  },
  {
    id: 10,
    title: "Plush Velvet Masterpiece",
    category: "Bedroom",
    image: "/interior/images/bedroom-2.png",
    description: "An elegant contemporary master suite detailed with warm backlit wood paneling, velvet bedding, and cozy integrated seating niches.",
    area: "650 sq ft",
    location: "Chennai",
  },
  {
    id: 11,
    title: "Minimalist Platform Suite",
    category: "Bedroom",
    image: "/interior/images/bedroom-3.png",
    description: "An ultra-minimalist platform bed chamber featuring a custom low-profile timber platform and textured raw architectural wall surfaces.",
    area: "580 sq ft",
    location: "Bangalore",
  },
  {
    id: 12,
    title: "Classic Modern Haven",
    category: "Bedroom",
    image: "/interior/images/bedroom-4.png",
    description: "A classic modern luxury bedroom showcasing soft ivory details, custom brass wall sconces, and an expansive hand-woven accent rug.",
    area: "520 sq ft",
    location: "Pune",
  },

  // --- Bathroom (4 items) ---
  {
    id: 13,
    title: "Spa Retreat",
    category: "Bathroom",
    image: "/interior/images/bathroom-1.png",
    description: "A spa-inspired master bathroom boasting freestanding oval tubs, luxury Calacatta stone finishes, and floating double vanities with under-glows.",
    area: "250 sq ft",
    location: "Hyderabad",
  },
  {
    id: 14,
    title: "Slate Travertine Spa",
    category: "Bathroom",
    image: "/interior/images/bathroom-2.png",
    description: "A dark travertine bath retreat utilizing polished slate slabs, custom copper fittings, and sophisticated dim architectural spotlights.",
    area: "280 sq ft",
    location: "Mumbai",
  },
  {
    id: 15,
    title: "Onyx Glow Bath",
    category: "Bathroom",
    image: "/interior/images/bathroom-3.png",
    description: "A bright, high-end bath oasis blending white onyx wall panels, custom floating vanities, and natural glass window exposures to a private green garden.",
    area: "220 sq ft",
    location: "Delhi",
  },
  {
    id: 16,
    title: "Onyx Backlit Sanctuary",
    category: "Bathroom",
    image: "/interior/images/bathroom-4.png",
    description: "An ultra-luxury minimalist bathroom design showcasing a custom backlit white onyx wall panel, brass hardware, and a freestanding circular soaking tub.",
    area: "300 sq ft",
    location: "Goa",
  },

  // --- Office (4 items) ---
  {
    id: 17,
    title: "Creative Studio",
    category: "Office",
    image: "/interior/images/about.png",
    description: "An inspiring, modular home creative workspace configured with sleek wooden furniture, layout organizers, and soft task glows.",
    area: "350 sq ft",
    location: "Chennai",
  },
  {
    id: 18,
    title: "The Executive Walnut",
    category: "Office",
    image: "/interior/images/office-1.png",
    description: "A premium business executive study featuring a bespoke solid walnut desk, high-back leather executive chairs, and backlit bookcases.",
    area: "400 sq ft",
    location: "Mumbai",
  },
  {
    id: 19,
    title: "Modernist Marble Bureau",
    category: "Office",
    image: "/interior/images/about-new.png",
    description: "A gorgeous modern workspace equipped with solid white marble desks, designer gold chairs, and floor-to-ceiling panoramic glass windows.",
    area: "380 sq ft",
    location: "Bangalore",
  },
  {
    id: 20,
    title: "Penthouse Tech Hub",
    category: "Office",
    image: "/interior/images/hero-bg.png",
    description: "An ergonomic, tech-forward home studio detailed with custom acoustic screens, automated workspaces, and elegant warm backlight grids.",
    area: "420 sq ft",
    location: "Delhi",
  },
];

export const roomCategories = [
  { name: "Living Room", image: "/interior/images/portfolio-living.png", count: "120+ Designs" },
  { name: "Kitchen", image: "/interior/images/portfolio-kitchen.png", count: "95+ Designs" },
  { name: "Bedroom", image: "/interior/images/portfolio-bedroom.png", count: "150+ Designs" },
  { name: "Bathroom", image: "/interior/images/portfolio-bathroom.png", count: "80+ Designs" },
  { name: "Home Office", image: "/interior/images/about.png", count: "60+ Designs" },
  { name: "Dining Room", image: "/interior/images/hero-bg.png", count: "70+ Designs" },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner, Mumbai",
    content: "ELEVA transformed our apartment into something we couldn't have imagined. Every corner tells a story. The attention to detail is extraordinary — from the custom lighting to the handpicked fabrics. Truly world-class.",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rajesh & Anita Gupta",
    role: "Villa Owners, Bangalore",
    content: "Working with ELEVA was an absolute pleasure. They understood our vision perfectly and exceeded every expectation. Our villa feels like a five-star resort. The 3D walkthrough was incredible!",
    rating: 5,
    avatar: "RG",
  },
  {
    id: 3,
    name: "Dr. Vikram Patel",
    role: "Penthouse, Delhi",
    content: "From consultation to handover, the experience was seamless. The team's professionalism and creativity are unmatched. My penthouse has become the talk of the building. Worth every penny.",
    rating: 5,
    avatar: "VP",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Apartment, Hyderabad",
    content: "I was amazed at how they maximized every inch of my compact apartment. The modular kitchen is a masterpiece, and the bedroom feels so serene. Highly recommend ELEVA for anyone looking for luxury design.",
    rating: 5,
    avatar: "SK",
  },
  {
    id: 5,
    name: "Arjun & Meera Nair",
    role: "Duplex, Pune",
    content: "ELEVA brought our Pinterest dreams to life — and then some. The quality of materials, the craftsmanship, the design sensibility — everything is top-notch. Our duplex feels like a magazine feature.",
    rating: 5,
    avatar: "AN",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 25, suffix: "+", label: "Design Awards" },
];

export const faqs = [
  {
    question: "How long does a typical interior design project take?",
    answer: "The timeline varies based on the scope. A single room typically takes 4-6 weeks, while a complete home transformation takes 8-16 weeks. We provide a detailed timeline during our consultation and keep you updated at every stage.",
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is transparent and project-based. We offer packages starting from ₹8 lakhs for a 2BHK and custom quotes for larger projects. Every quote includes design, materials, execution, and project management with no hidden costs.",
  },
  {
    question: "Do you provide 3D visualizations before starting?",
    answer: "Absolutely! We create photorealistic 3D renders of every room so you can experience your future space before any work begins. You can request revisions until you're completely satisfied with the design.",
  },
  {
    question: "What areas do you serve?",
    answer: "We currently serve Mumbai, Bangalore, Delhi NCR, Hyderabad, Pune, and Chennai. We're expanding to more cities soon. For projects in other locations, please contact us for a custom consultation.",
  },
  {
    question: "Do you handle the complete project including civil work?",
    answer: "Yes, we provide end-to-end solutions including civil modifications, electrical work, plumbing, false ceilings, furniture, decor, and styling. Our integrated approach ensures seamless coordination and quality control.",
  },
  {
    question: "What warranty do you offer?",
    answer: "We provide a comprehensive 10-year warranty on modular furniture and a 1-year warranty on all other work. Our after-sales support team is always available for any maintenance or adjustments you may need.",
  },
  {
    question: "Can I customize the designs from your portfolio?",
    answer: "Of course! Our portfolio serves as inspiration. Every project we undertake is completely customized to your preferences, lifestyle, and space. Your home will be uniquely yours — no cookie-cutter designs.",
  },
];

export const brandPartners = [
  "Hettich", "Hafele", "Asian Paints", "Kohler", "Grohe",
  "Bosch", "Siemens", "Philips", "Godrej", "Century Ply",
  "Saint-Gobain", "Somany", "Jaquar", "Havells", "Crompton",
];
