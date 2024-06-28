import {
  Home,
  Laptop,
  ShoppingCart,
  User,
  BookOpen,
  Camera,
  Coffee,
  Music,
  Film,
  Globe,
  Heart,
  Gift,
  Sun,
  Moon,
  Bell,
  Cloud,
  Star,
  Shield,
  Drill,
  Briefcase,
  Tv,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    title: "Home",
    slug: "home",
    icon: Home,
  },
  {
    id: 2,
    title: "Electronics",
    slug: "electronics",
    icon: Laptop,
  },
  {
    id: 3,
    title: "Groceries",
    slug: "groceries",
    icon: ShoppingCart,
  },
  {
    id: 4,
    title: "User",
    slug: "user",
    icon: User,
  },
  {
    id: 5,
    title: "Books",
    slug: "books",
    icon: BookOpen,
  },
  {
    id: 6,
    title: "Photography",
    slug: "photography",
    icon: Camera,
  },
  {
    id: 7,
    title: "Coffee",
    slug: "coffee",
    icon: Coffee,
  },
  {
    id: 8,
    title: "Music",
    slug: "music",
    icon: Music,
  },
  {
    id: 9,
    title: "Movies",
    slug: "movies",
    icon: Film,
  },
  {
    id: 10,
    title: "Travel",
    slug: "travel",
    icon: Globe,
  },
  {
    id: 11,
    title: "Health",
    slug: "health",
    icon: Heart,
  },
  {
    id: 12,
    title: "Gifts",
    slug: "gifts",
    icon: Gift,
  },
  {
    id: 13,
    title: "Weather",
    slug: "weather",
    icon: Sun,
  },
  {
    id: 14,
    title: "Night Life",
    slug: "night-life",
    icon: Moon,
  },
  {
    id: 15,
    title: "Notifications",
    slug: "notifications",
    icon: Bell,
  },
  {
    id: 16,
    title: "Cloud Services",
    slug: "cloud-services",
    icon: Cloud,
  },
  {
    id: 17,
    title: "Favorites",
    slug: "favorites",
    icon: Star,
  },
  {
    id: 18,
    title: "Security",
    slug: "security",
    icon: Shield,
  },
  {
    id: 19,
    title: "Tools",
    slug: "Tools",
    icon: Drill,
  },
  {
    id: 20,
    title: "Business",
    slug: "business",
    icon: Briefcase,
  },
];

export const products = [
  {
    id: 1,
    image: "/product/smart-led-tv50_1.webp",
    title: 'Smart LED TV 50"',
    price: 400.0,
    oldPrice: 500.0,
    totalReviews: 182,
    category: {
      title: "Electronics",
      slug: "electronics",
    },
    slug: "smart-led-tv-50",
    colors: [], // No color variants, so empty array
    sizes: [],
    shortDescription:
      "Experience stunning picture quality and vibrant colors with our 50-inch Smart LED TV.",
    imageGallery: [
      "/product/smart-led-tv50_1.webp",
      "/product/smart-led-tv50_2.webp",
      "/product/smart-led-tv50_3.webp",
      "/product/smart-led-tv50_4.webp",
      "/product/smart-led-tv50_5.webp",
      "/product/smart-led-tv50_6.webp",
    ],
  },
  {
    id: 2,
    image: "/product/gamingLaptop_1.webp",
    title: 'Gaming Laptop Pro 15"',
    price: 1200.0,
    oldPrice: 1500.0,
    totalReviews: 204,
    category: {
      title: "Computers",
      slug: "computers",
    },
    slug: "gaming-laptop-pro-15",
    colors: ["#000000", "#FF0000", "#0000FF"], // Black, Red, Blue
    sizes: [],
    shortDescription:
      'Gaming laptop - ASUS ROG G513RC-HN088W, 15.6" Full HD, AMD Ryzen™ 7 6800H, 16GB RAM, 512GB SSD, GeForce RTX™ 3050, Windows 11 Home 64-bit, Eclipse Gray',
    imageGallery: [
      "/product/gamingLaptop_1.webp",
      "/product/gamingLaptop_2.webp",
      "/product/gamingLaptop_3.webp",
      "/product/gamingLaptop_4.webp",
      "/product/gamingLaptop_5.webp",
      "/product/gamingLaptop_6.webp",
      "/product/gamingLaptop_7.webp",
    ],
  },
  {
    id: 3,
    image: "/product/GamingChairs_1.webp",
    title: "Gaming Chairs with Lumbar Cushion and Headrest",
    price: 150.0,
    oldPrice: 220.0,
    totalReviews: 98,
    category: {
      title: "Home Furniture",
      slug: "home-furniture",
    },
    slug: "ergonomic-office-chair",
    colors: ["#000000", "#808080", "#FFFFFF"], // Black, Gray, White
    sizes: ["Small", "Medium", "Large"],
    shortDescription:
      "Comfortable ergonomic office chair designed to provide excellent support for long working hours. Gaming Chairs with Lumbar Cushion and Headrest",
    imageGallery: [
      "/product/GamingChairs_1.webp",
      "/product/GamingChairs_2.webp",
      "/product/GamingChairs_3.webp",
      "/product/GamingChairs_4.webp",
      "/product/GamingChairs_5.webp",
    ],
  },
  {
    id: 4,
    image: "/product/ProGamingPad_1.webp",
    title: "Pro Gaming Pad",
    price: 35.0,
    oldPrice: 50.0,
    totalReviews: 150,
    category: { title: "Gaming", slug: "gaming" },
    slug: "pro-gaming-pad",
    colors: ["#008000", "#000000"], // Green, Black
    sizes: [],
    shortDescription:
      "Professional-grade gaming pad with enhanced precision and comfort.",
    imageGallery: [
      "/product/ProGamingPad_1.webp",
      "/product/ProGamingPad_2.webp",
      "/product/ProGamingPad_3.webp",
      "/product/ProGamingPad_4.webp",
      "/product/ProGamingPad_5.webp",
      "/product/ProGamingPad_6.webp",
    ],
  },
  {
    id: 5,
    image: "/product/PortableBluetoothSpeaker_1.webp",
    title: "Portable Bluetooth Speaker",
    price: 60.0,
    oldPrice: 80.0,
    totalReviews: 75,
    category: { title: "Electronics", slug: "electronics" },
    slug: "portable-bluetooth-speaker",
    colors: ["#FFA500", "#FFD700"], // Orange, Gold
    sizes: [],
    shortDescription:
      "Compact and powerful Bluetooth speaker with excellent sound quality. High-power speaker - Vieta Pro Mini Thunder, 100W, IPX6, True Wireless, Up to 15 hours, Black",
    imageGallery: [
      "/product/PortableBluetoothSpeaker_1.webp",
      "/product/PortableBluetoothSpeaker_2.webp",
      "/product/PortableBluetoothSpeaker_3.webp",
      "/product/PortableBluetoothSpeaker_4.webp",
      "/product/PortableBluetoothSpeaker_5.webp",
      "/product/PortableBluetoothSpeaker_6.webp",
    ],
  },
  {
    id: 6,
    image: "/product/WirelessMouse_1.webp",
    title: "Wireless Mouse",
    price: 25.0,
    oldPrice: 40.0,
    totalReviews: 137,
    category: { title: "Computers", slug: "computers" },
    slug: "wireless-mouse",
    colors: ["#FFFFFF", "#0000FF", "#FF0000"], // White, Blue, Red
    sizes: [],
    shortDescription:
      "Ergonomic wireless mouse with smooth tracking and multiple color options. Razer Viper Ultimate Wireless Gaming Mouse 20000DPI + Charging Base",
    imageGallery: [
      "/product/WirelessMouse_1.webp",
      "/product/WirelessMouse_2.webp",
      "/product/WirelessMouse_3.webp",
      "/product/WirelessMouse_4.webp",
      "/product/WirelessMouse_5.webp",
    ],
  },
  {
    id: 7,
    image: "/product/ModernCoffeeTable-1.webp",
    title: "Modern Coffee Table",
    price: 199.0,
    oldPrice: 299.0,
    totalReviews: 46,
    category: { title: "Home Furniture", slug: "home-furniture" },
    slug: "modern-coffee-table",
    colors: ["#8B4513", "#A0522D", "#D2691E", "#CD853F", "#A52A2A", "#BC8F8F"], // Dark Brown, Sienna
    sizes: [],
    shortDescription:
      "Stylish modern coffee table made from high-quality materials.",
    imageGallery: [
      "/product/ModernCoffeeTable-1.webp",
      "/product/ModernCoffeeTable-2.webp",
      "/product/ModernCoffeeTable-3.webp",
      "/product/ModernCoffeeTable-4.webp",
      "/product/ModernCoffeeTable-5.webp",
      "/product/ModernCoffeeTable-6.webp",
    ],
  },
  {
    id: 8,
    image: "/product/VR_1.webp",
    title: "VR Gaming Headset",
    price: 299.0,
    oldPrice: 349.0,
    totalReviews: 89,
    category: { title: "Gaming", slug: "gaming" },
    slug: "vr-gaming-headset",
    colors: ["#000000", "#FFFFFF"], // Black, White
    sizes: [],
    shortDescription:
      "Immersive VR gaming headset with high-resolution display and comfortable fit. Virtual Reality Glasses - Meta Quest 3, 128 GB, Revolutionary Mixed Reality, Powerful Performance, Asgard's Wrath 2 Bundle, White",
    imageGallery: [
      "/product/VR_1.webp",
      "/product/VR_2.webp",
      "/product/VR_3.webp",
      "/product/VR_4.webp",
      "/product/VR_5.webp",
      "/product/VR_6.webp",
    ],
  },
  {
    id: 9,
    image: "/product/4KActionCamera_1.webp",
    title: "4K Action Camera",
    price: 120.0,
    oldPrice: 200.0,
    totalReviews: 210,
    category: { title: "Electronics", slug: "electronics" },
    slug: "4k-action-camera",
    colors: ["#000000", "#FFD700"], // Black, Gold
    sizes: [],
    shortDescription:
      "Capture stunning 4K videos with this compact action camera. Sports camera - GoPro Hero 12, HyperSmooth, 27 megapixels, 5.3K, HDR, Waterproof up to 10m, Slow motion, Black",
    imageGallery: [
      "/product/4KActionCamera_1.webp",
      "/product/4KActionCamera_2.webp",
      "/product/4KActionCamera_3.webp",
      "/product/4KActionCamera_4.webp",
      "/product/4KActionCamera_5.webp",
      "/product/4KActionCamera_6.webp",
    ],
  },
  {
    id: 10,
    image: "/product/GraphicTablet_1.webp",
    title: "Graphic Tablet Ultra-Slim Portable Digital Tablet",
    price: 300.0,
    oldPrice: 450.0,
    totalReviews: 180,
    category: { title: "Computers", slug: "computers" },
    slug: "graphic-tablet",
    colors: ["#000000"], // Black
    sizes: [],
    shortDescription:
      "Professional graphic tablet with high sensitivity and accuracy for digital artists. UGEE S640 Graphics Tablet, Ultra-Slim Portable Digital Tablet, with Tilt Function, Custom Keys, Battery-Free Pen for Windows Mac Linux",
    imageGallery: [
      "/product/GraphicTablet_1.webp",
      "/product/GraphicTablet_2.webp",
      "/product/GraphicTablet_3.webp",
      "/product/GraphicTablet_4.webp",
      "/product/GraphicTablet_5.webp",
      "/product/GraphicTablet_6.webp",
    ],
  },
  {
    id: 11,
    image: "/product/SectionalSofa_1.webp",
    title: "Sectional Sofa",
    price: 899.0,
    oldPrice: 1100.0,
    totalReviews: 56,
    category: { title: "Home Furniture", slug: "home-furniture" },
    slug: "sectional-sofa",
    colors: ["#8B4513", "#FFFAFA"], // Saddle Brown, Snow
    sizes: [],
    shortDescription:
      "Spacious and comfortable sectional sofa, perfect for any living room.",
    imageGallery: [
      "/product/SectionalSofa_1.webp",
      "/product/SectionalSofa_2.webp",
      "/product/SectionalSofa_3.webp",
      "/product/SectionalSofa_4.webp",
    ],
  },
  {
    id: 12,
    image: "/product/WirelessGamingController_1.webp",
    title: "Sony DualSense White Wireless Mando for PS5",
    price: 59.0,
    oldPrice: 70.0,
    totalReviews: 134,
    category: { title: "Gaming", slug: "gaming" },
    slug: "wireless-gaming-controller",
    colors: ["#FF4500", "#000000"], // Orange Red, Black
    sizes: [],
    shortDescription:
      "Responsive and comfortable wireless gaming controller with customizable buttons.",
    imageGallery: [
      "/product/WirelessGamingController_1.webp",
      "/product/WirelessGamingController_2.webp",
      "/product/WirelessGamingController_3.webp",
      "/product/WirelessGamingController_4.webp",
      "/product/WirelessGamingController_5.webp",
    ],
  },
  {
    id: 13,
    image: "/product/HighResolutionMonitor_1.webp",
    title: "High-Resolution Monitor",
    price: 340.0,
    oldPrice: 400.0,
    totalReviews: 121,
    category: { title: "Electronics", slug: "electronics" },
    slug: "high-resolution-monitor",
    colors: ["#000000", "#FFFFFF"], // Black, White
    sizes: [],
    shortDescription:
      "Ultra-clear high-resolution monitor suitable for both work and gaming.",
    imageGallery: [
      "/product/HighResolutionMonitor_1.webp",
      "/product/HighResolutionMonitor_2.webp",
      "/product/HighResolutionMonitor_3.webp",
      "/product/HighResolutionMonitor_4.webp",
      "/product/HighResolutionMonitor_5.webp",
      "/product/HighResolutionMonitor_6.webp",
    ],
  },
  {
    id: 14,
    image: "/product/DesktopGamingPC_1.webp",
    title: "Desktop Gaming PC AMD Ryzen 7",
    price: 1500.0,
    oldPrice: 1800.0,
    totalReviews: 99,
    category: { title: "Computers", slug: "computers" },
    slug: "desktop-gaming-pc",
    colors: ["#000000", "#FF0000", "#0000FF"], // Black, Red, Blue
    sizes: [],
    shortDescription:
      "Gaming Pc designed for general use at home or in the office, the PcCom Ready is presented as a powerful computer in which its AMD Ryzen 7 processor, its 32GB of DDR4 RAM, the fast 1TB M.2 NVMe SSD disk and The powerful Nvidia RTX 4060 Ti graphics allow you to work comfortably on very different tasks, making it ideal for home or office environments.",
    imageGallery: [
      "/product/DesktopGamingPC_1.webp",
      "/product/DesktopGamingPC_2.webp",
      "/product/DesktopGamingPC_3.webp",
      "/product/DesktopGamingPC_4.webp",
      "/product/DesktopGamingPC_5.webp",
      "/product/DesktopGamingPC_6.webp",
    ],
  },
  {
    id: 15,
    image: "/product/AdjustableDesk_1.webp",
    title: "Adjustable Desk",
    price: 420.0,
    oldPrice: 550.0,
    totalReviews: 88,
    category: { title: "Home Furniture", slug: "home-furniture" },
    slug: "adjustable-desk",
    colors: ["#708090"], // Slate Gray
    sizes: [],
    shortDescription:
      "Versatile adjustable desk with height settings for optimal ergonomic comfort.",
    imageGallery: [
      "/product/AdjustableDesk_1.webp",
      "/product/AdjustableDesk_2.webp",
      "/product/AdjustableDesk_3.webp",
      "/product/AdjustableDesk_4.webp",
    ],
  },
  {
    id: 16,
    image: "/product/eSports-mouse-pad-1.webp",
    title: "eSports Mouse Pad",
    price: 22.0,
    oldPrice: 35.0,
    totalReviews: 200,
    category: { title: "Gaming", slug: "gaming" },
    slug: "esports-mouse-pad",
    colors: ["#000000", "#FFFF00"], // Black, Yellow
    sizes: [],
    shortDescription:
      "Durable and smooth eSports mouse pad designed for precision and speed.",
    imageGallery: [
      "/product/eSports-mouse-pad-1.webp",
      "/product/eSports-mouse-pad-2.webp",
      "/product/eSports-mouse-pad-3.webp",
      "/product/eSports-mouse-pad-4.webp",
    ],
  },
];

export const cartItems = [
  {
    id: 1,
    product: products[0],
    quantity: 1,
  },
  {
    id: 2,
    product: products[1],
    quantity: 1,
  },
  {
    id: 3,
    product: products[2],
    quantity: 1,
  },
];