// Uzum Market mahsulotlar bazasi
const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Smartfon Apple iPhone 15 Pro Max 256GB Natural Titanium",
    category: "elektronika",
    subCategory: "smartfonlar",
    price: 15499000,
    oldPrice: 17200000,
    installment: 1650000,
    rating: 4.9,
    reviewsCount: 384,
    badge: "Super narx",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Apple iPhone 15 Pro Max - titan korpus, kuchli A17 Pro chipi va 5 karra optik zumga ega ilg'or kamera tizimi. Batareya 29 soatgacha video ko'rish imkonini beradi.",
    specs: {
      "Xotira": "256 GB",
      "Ekran": "6.7\" Super Retina XDR OLED 120Hz",
      "Protsessor": "Apple A17 Pro (3 nm)",
      "Kamera": "48 MP + 12 MP + 12 MP",
      "Kafolat": "1 yil rasmiy"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 2,
    title: "Smartfon Samsung Galaxy S24 Ultra 12/256GB Titanium Gray",
    category: "elektronika",
    subCategory: "smartfonlar",
    price: 13890000,
    oldPrice: 15600000,
    installment: 1478000,
    rating: 4.8,
    reviewsCount: 219,
    badge: "Hafta tovari",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Galaxy AI imkoniyatlari bilan jihozlangan Samsung Galaxy S24 Ultra. S Pen qalami, 200 MP ultra tiniq kamera va eng quvvatli Snapdragon 8 Gen 3 protsessori.",
    specs: {
      "Xotira": "256 GB / 12 GB RAM",
      "Ekran": "6.8\" Dynamic LTPO AMOLED 2X",
      "Protsessor": "Snapdragon 8 Gen 3 for Galaxy",
      "Kamera": "200 MP + 50 MP + 12 MP + 10 MP",
      "Akkumulyator": "5000 mAh"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 3,
    title: "Simsiz quloqchinlar Apple AirPods Pro 2 (USB-C)",
    category: "elektronika",
    subCategory: "quloqchinlar",
    price: 2690000,
    oldPrice: 3200000,
    installment: 289000,
    rating: 5.0,
    reviewsCount: 890,
    badge: "Top savdo",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Faol shovqinni bekor qilish (ANC) tizimi 2 baravar kuchaytirilgan. Shafofflik rejimi va moslashuvchan audio tinglash imkoniyati bilan qulaylik ta'minlaydi.",
    specs: {
      "Ulanish": "Bluetooth 5.3",
      "Ishlash vaqti": "Keys bilan 30 soatgacha",
      "Zaryadlash": "USB-C, MagSafe, Qi",
      "Suvdan himoya": "IP54"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 4,
    title: "Noutbuk Apple MacBook Air 13 M3 8/256GB Space Gray",
    category: "elektronika",
    subCategory: "noutbuklar",
    price: 13200000,
    oldPrice: 14800000,
    installment: 1410000,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Kafolat 1 yil",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Yengil, nozik va nihoyatda kuchli. Apple M3 chipi kundalik ishlar va ijodiy vazifalarni chaqmoqdek tez bajarishga mo'ljallangan.",
    specs: {
      "Ekran": "13.6\" Liquid Retina",
      "Protsessor": "Apple M3 (8 yadroli)",
      "RAM": "8 GB yagona xotira",
      "SSD": "256 GB tezkor",
      "Vazni": "1.24 kg"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 5,
    title: "Smart soat Apple Watch Series 9 GPS 45mm Midnight",
    category: "elektronika",
    subCategory: "smart-soatlar",
    price: 4950000,
    oldPrice: 5600000,
    installment: 529000,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Yangi",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "S9 SiP chipi, Double Tap innovatsion imo-ishora bilan boshqaruv, yanada yorqinroq ekran va sog'liq ko'rsatkichlarini doimiy nazorat qilish tizimi.",
    specs: {
      "O'lchami": "45 mm",
      "Ekran": "Always-On Retina OLED (2000 nit)",
      "Sensorlar": "EKG, puls, qon kislorodi, tana harorati",
      "Suvga chidamlilik": "50 metrgacha"
    },
    popular: false,
    isDeal: false
  },
  {
    id: 6,
    title: "Simsiz quloqchinlar Sony WH-1000XM5 Black",
    category: "elektronika",
    subCategory: "quloqchinlar",
    price: 4100000,
    oldPrice: 4700000,
    installment: 439000,
    rating: 4.9,
    reviewsCount: 167,
    badge: "Premium audio",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dunyoning eng yaxshi shovqin bekor qiluvchi quloqchinlaridan biri. 8 ta mikrofon, 2 ta protsessor va Hi-Res Audio qo'llab-quvvatlovi bilan sof tovush.",
    specs: {
      "Turi": "To'liq quloq qoplovchi",
      "Ishlash vaqti": "ANC bilan 30 soat",
      "Ulanish": "Bluetooth 5.2 / 3.5mm Aux",
      "Zaryadlash": "3 daqiqada 3 soatlik zaryad"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 7,
    title: "Soch fen-styler Dyson Supersonic HD08 Nikel/Mis",
    category: "texnika",
    subCategory: "gozallik-texnikasi",
    price: 5490000,
    oldPrice: 6300000,
    installment: 588000,
    rating: 4.9,
    reviewsCount: 520,
    badge: "Super narx",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sochni haddan tashqari qizdirmasdan tez va sifatli quritish hamda turmaklash uchun professional fen. 5 ta magnitli nozul to'plamda mavjud.",
    specs: {
      "Quvvat": "1600 Vt",
      "Tezlik rejimlari": "3 ta",
      "Harorat rejimlari": "4 ta (28°C dan 100°C gacha)",
      "Og'irligi": "659 g"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 8,
    title: "Robot changyutgich Xiaomi Robot Vacuum S10 White",
    category: "texnika",
    subCategory: "tozalash-texnikasi",
    price: 2350000,
    oldPrice: 2800000,
    installment: 251000,
    rating: 4.8,
    reviewsCount: 412,
    badge: "Hafta tovari",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "LDS lazerli navigatsiya tizimi, 4000 Pa kuchli so'rish qobiliyati va namlab tozalash (mop) funksiyasiga ega aqlli changyutgich. Mi Home ilovasi orqali to'liq nazorat.",
    specs: {
      "So'rish kuchi": "4000 Pa",
      "Batareya": "3200 mAh",
      "Suv idishi": "170 ml",
      "Chang idishi": "300 ml"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 9,
    title: "Qahva mashinasi DeLonghi Magnifica S ECAM 22.110.B",
    category: "texnika",
    subCategory: "oshxona-texnikasi",
    price: 4890000,
    oldPrice: 5700000,
    installment: 523000,
    rating: 4.9,
    reviewsCount: 198,
    badge: "Top brend",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Italiyaning afsonaviy avtomat qahva mashinasi. Bir tugma orqali espresso, kapuchino va amerikano tayyorlang. Qahva donlarini o'zida yangi maydalaydi.",
    specs: {
      "Bosim": "15 bar",
      "Suv idishi": "1.8 litr",
      "Qahva doni sig'imi": "250 g",
      "Kapuchinator": "Qo'lda boshqariladigan ko'pirtirgich"
    },
    popular: false,
    isDeal: true
  },
  {
    id: 10,
    title: "Elektr choynak Tefal Glass Kettle 1.7L BJ750D",
    category: "texnika",
    subCategory: "oshxona-texnikasi",
    price: 499000,
    oldPrice: 650000,
    installment: 54000,
    rating: 4.7,
    reviewsCount: 680,
    badge: "Chegirma",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Mustahkam issiqlikka chidamli shisha korpus va ko'k rangli LED yoritish. Avtomatik o'chish va zanglamas po'lat taglik.",
    specs: {
      "Hajmi": "1.7 litr",
      "Quvvati": "2200 Vt",
      "Material": "Shisha va po'lat",
      "Himoya": "Suvsiz yoqishdan himoya"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 11,
    title: "Erkaklar krossovkasi Nike Air Max Terrascape 90 Black",
    category: "poyabzal",
    subCategory: "erkaklar-poyabzali",
    price: 1350000,
    oldPrice: 1750000,
    installment: 144000,
    rating: 4.8,
    reviewsCount: 345,
    badge: "Original",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Klassik Air Max dizayni yangilangan ekologik materiallar bilan. Amortizatsiya yostig'i kun davomida oyoqlaringiz charchamasligini ta'minlaydi.",
    specs: {
      "O'lchamlar": "40, 41, 42, 43, 44",
      "Tepa qismi": "To'qimachilik / Eko-charm",
      "Taglik": "Kauchuk Air Max kapsulasi bilan",
      "Mavsum": "Bahor-Yoz-Kuz"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 12,
    title: "Ayollar sport poyabzali Adidas Originals Stan Smith White/Green",
    category: "poyabzal",
    subCategory: "ayollar-poyabzali",
    price: 990000,
    oldPrice: 1300000,
    installment: 106000,
    rating: 4.9,
    reviewsCount: 512,
    badge: "Klassika",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dunyo bo'ylab mashhur timsolga aylangan qulay oq krossovka. Har qanday libos bilan ajoyib mos tushadi.",
    specs: {
      "O'lchamlar": "36, 37, 38, 39, 40",
      "Material": "Tabiiy va eko charm",
      "Taglik": "Mustahkam vulkanizatsiyalangan rezina"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 13,
    title: "Erkaklar zamonaviy qishki kurtkasi (Puxovik) Qora",
    category: "kiyim",
    subCategory: "erkaklar-kiyimi",
    price: 680000,
    oldPrice: 950000,
    installment: 73000,
    rating: 4.7,
    reviewsCount: 189,
    badge: "Issiq tanlov",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sovuq shamol va yomg'ir-qordan himoya qiluvchi sifatli qishki kurtka. Ichki qismi qalin bio-par bilan to'ldirilgan.",
    specs: {
      "O'lcham": "M, L, XL, XXL, 3XL",
      "Harorat": "-20°C gacha bardoshli",
      "Material": "Suv o'tkazmaydigan poliester",
      "Kapshon": "Ajraladigan qulay kapshon"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 14,
    title: "Ayollar nozik ipak ko'ylagi bej rangli Premium",
    category: "kiyim",
    subCategory: "ayollar-kiyimi",
    price: 450000,
    oldPrice: 620000,
    installment: 48000,
    rating: 4.8,
    reviewsCount: 224,
    badge: "Yangi mavsum",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Kechki va tantanali tadbirlar uchun nihoyatda nazokatli, sifatli matodan tikilgan ayollar ko'ylagi. Yengil va tanaga yoqimli.",
    specs: {
      "O'lcham": "S, M, L",
      "Mato": "Sun'iy va tabiiy ipak aralashmasi",
      "Fason": "A-siluet, kamarli"
    },
    popular: false,
    isDeal: false
  },
  {
    id: 15,
    title: "Erkaklar parfyumi Dior Sauvage Eau de Parfum 100ml",
    category: "gozallik",
    subCategory: "parfyumeriya",
    price: 1850000,
    oldPrice: 2200000,
    installment: 198000,
    rating: 5.0,
    reviewsCount: 760,
    badge: "100% Original",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sharqona va yangi tusdagi xushbo'y hid: kalabriya bergamoti, vanil va ambroksanning mukammal uyg'unligi. Yuqori darajadagi turg'unlik.",
    specs: {
      "Hajm": "100 ml",
      "Turi": "Eau de Parfum (EDP)",
      "Davomiyligi": "24 soatgacha",
      "Ishlab chiqarilgan": "Fransiya"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 16,
    title: "Yuz parvarishi to'plami L'Oreal Paris Revitalift Laser X3",
    category: "gozallik",
    subCategory: "yuz-parvarishi",
    price: 360000,
    oldPrice: 480000,
    installment: 39000,
    rating: 4.9,
    reviewsCount: 430,
    badge: "Xit sotuv",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ajinlarga qarshi kuchli ta'sirga ega kunduzgi va tungi krem kompleksi. Terini namlantiradi, elastikligini oshiradi.",
    specs: {
      "Tarkibi": "Pro-Xylane, gialuron kislotasi",
      "Hajmi": "50 ml + 50 ml",
      "Yosh toifasi": "35+"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 17,
    title: "Oshxona pichoqlar to'plami stend bilan 6 dona Zepter",
    category: "uy-rozgor",
    subCategory: "oshxona-idishlari",
    price: 280000,
    oldPrice: 420000,
    installment: 30000,
    rating: 4.7,
    reviewsCount: 310,
    badge: "Aksiya",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Zanglamas po'latdan lazerli o'tkirlash usulida yasalgan pichoqlar to'plami. Ergonomik qulay tutqichlar va chiroyli akril stend.",
    specs: {
      "Soni": "6 ta buyum (5 ta pichoq + stend)",
      "Material": "Yuqori uglerodli po'lat",
      "Pichoq turlari": "Oshpaz pichog'i, non pichog'i, sabzavot pichog'i"
    },
    popular: false,
    isDeal: true
  },
  {
    id: 18,
    title: "Ortopedik xotirali uyqu yostig'i Memory Foam 50x30 sm",
    category: "uy-rozgor",
    subCategory: "yotoqxona",
    price: 195000,
    oldPrice: 280000,
    installment: 21000,
    rating: 4.8,
    reviewsCount: 540,
    badge: "Tavsiya etiladi",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bo'yin va umurtqa pog'onasi anatomik shaklini takrorlovchi xotirali material. Bo'yin og'riqlarini bartaraf etadi va qulay uyqu beradi.",
    specs: {
      "O'lchami": "50 x 30 x 10/7 sm",
      "G'ilof": "Yuviladigan paxtali antiallergen g'ilof",
      "Toldiruvchi": "100% poliuretan ko'pigi (Memory foam)"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 19,
    title: "Zanglamas po'latdan vakuumli termos 1000 ml harorat displeyli",
    category: "uy-rozgor",
    subCategory: "oshxona-idishlari",
    price: 145000,
    oldPrice: 210000,
    installment: 16000,
    rating: 4.7,
    reviewsCount: 420,
    badge: "Smart",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Qopqog'ida sensorli harorat ko'rsatkichi bor zamonaviy termos. Issiq ichimlikni 24 soat, sovuqni 12 soat saqlaydi.",
    specs: {
      "Hajmi": "1000 ml",
      "Harorat saqlash": "24 soatgacha",
      "Material": "Oziq-ovqat po'lati 304"
    },
    popular: false,
    isDeal: true
  },
  {
    id: 20,
    title: "Avtomobil videoregistratori 70mai Dash Cam Pro Plus A500S",
    category: "elektronika",
    subCategory: "avtoelektronika",
    price: 920000,
    oldPrice: 1150000,
    installment: 98000,
    rating: 4.9,
    reviewsCount: 380,
    badge: "Eng ko'p sotilgan",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
    ],
    description: "2.7K yuqori aniqlikdagi tasvir, o'rnatilgan GPS va Wi-Fi moduli, tungi aniq suratga olish (Sony IMX335 sensori) hamda to'qnashuv datchigi.",
    specs: {
      "Ruxsat": "2592x1944 (2.7K Ultra HD)",
      "Ko'rish burchagi": "140 daraja",
      "Ekran": "2.0 dyuym IPS",
      "Funksiyalar": "ADAS tizimi, 24 soatlik to'xtash joyi nazorati"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 21,
    title: "Geymerlar uchun o'yin sichqonchasi Razer DeathAdder Essential",
    category: "elektronika",
    subCategory: "noutbuklar",
    price: 320000,
    oldPrice: 450000,
    installment: 35000,
    rating: 4.8,
    reviewsCount: 610,
    badge: "Geymerlar tanlovi",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Afsonaviy ergonomik dizayn, 6400 DPI optik sensor va 10 million bosishga chidamli mexanik tugmalar. Yashil rangli chiroyli orqa yoritish.",
    specs: {
      "Sensor": "6400 DPI optik",
      "Tugmalar": "5 ta dasturlanadigan tugma",
      "Sim uzunligi": "1.8 m",
      "Og'irligi": "96 g"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 22,
    title: "Aqlli televizor Xiaomi TV A2 43\" 4K UHD Smart Android TV",
    category: "elektronika",
    subCategory: "televizorlar",
    price: 3890000,
    oldPrice: 4400000,
    installment: 415000,
    rating: 4.8,
    reviewsCount: 290,
    badge: "Xit savdo",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Yupqa romsiz dizayn, Dolby Vision, 4K Ultra HD aniqlik va Google TV operatsion tizimi. YouTube, Netflix va o'zbek milliy telekanallari o'rnatilgan.",
    specs: {
      "Ekran": "43\" 4K UHD (3840x2160)",
      "Ovoz": "24 Vt (Dolby Audio + DTS-HD)",
      "Operatsion tizim": "Android TV / Google TV",
      "Portlar": "3x HDMI, 2x USB, Wi-Fi 5GHz, Bluetooth 5.0"
    },
    popular: true,
    isDeal: true
  },
  {
    id: 23,
    title: "Air Fryer issiq havoli frityurnitsa Philips HD9252/90 4.1L",
    category: "texnika",
    subCategory: "oshxona-texnikasi",
    price: 1590000,
    oldPrice: 1950000,
    installment: 170000,
    rating: 4.9,
    reviewsCount: 340,
    badge: "Sog'lom taomlar",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Rapid Air texnologiyasi bilan 90% kamroq yog' ishlatib, qarsildoq kartoshka fri, tovuq go'shti va pishiriqlar tayyorlash uchun aerogrill.",
    specs: {
      "Hajmi": "4.1 litr (0.8 kg taom)",
      "Quvvati": "1400 Vt",
      "Sensorli ekran": "7 ta avtomatik dastur",
      "Harorat": "80°C - 200°C"
    },
    popular: true,
    isDeal: false
  },
  {
    id: 24,
    title: "Klassik charm kamar erkaklar uchun qora (Haqiqiy charm)",
    category: "kiyim",
    subCategory: "aksessuarlar",
    price: 120000,
    oldPrice: 190000,
    installment: 13000,
    rating: 4.7,
    reviewsCount: 480,
    badge: "100% Charm",
    delivery: "1 kunda yetkazish",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Haqiqiy tabiiy charmdan ishlangan yuqori sifatli erkaklar kamari. Chidamli metall qisqich va chiroyli sovg'abop quti bilan birga.",
    specs: {
      "Uzunligi": "115 - 130 sm (qisqartirish mumkin)",
      "Kengligi": "3.5 sm",
      "Material": "100% buqa charmi",
      "Rangi": "Klassik qora"
    },
    popular: false,
    isDeal: true
  }
];

// Bannerlar ma'lumotlari
const BANNERS_DATA = [
  {
    id: 1,
    title: "Katta bahorgi sotuvlar!",
    subtitle: "70% gacha chegirmalar va 1 kunda bepul yetkazib berish",
    bgColor: "linear-gradient(135deg, #7000ff 0%, #3f0099 100%)",
    buttonText: "Xarid qilish",
    categoryFilter: "all",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    title: "Yangi smartfonlar — 0% muddatli to'lov",
    subtitle: "Boshlang'ich to'lovsiz 12 oyga teng taqsimlang",
    bgColor: "linear-gradient(135deg, #182848 0%, #4b6cb7 100%)",
    buttonText: "Ko'rish",
    categoryFilter: "elektronika",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    title: "Oshxona va uy-ro'zg'or mahsulotlari",
    subtitle: "Uyingiz uchun barcha qulayliklar arzon narxlarda",
    bgColor: "linear-gradient(135deg, #e52d27 0%, #b31217 100%)",
    buttonText: "Tanlash",
    categoryFilter: "texnika",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    title: "Go'zallik va parvarish vositalari",
    subtitle: "Original jahon brendlari kafolat bilan",
    bgColor: "linear-gradient(135deg, #d80064 0%, #7000ff 100%)",
    buttonText: "Kashf etish",
    categoryFilter: "gozallik",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
  }
];

// Katalog kategoriyalari
const CATEGORIES_DATA = [
  {
    id: "elektronika",
    name: "Elektronika",
    icon: "smartphone",
    items: [
      { name: "Smartfonlar", subId: "smartfonlar" },
      { name: "Quloqchinlar va audio", subId: "quloqchinlar" },
      { name: "Noutbuklar va kompyuterlar", subId: "noutbuklar" },
      { name: "Smart soatlar va bilaguzuklar", subId: "smart-soatlar" },
      { name: "Televizorlar va proyektorlar", subId: "televizorlar" },
      { name: "Avtoelektronika", subId: "avtoelektronika" }
    ]
  },
  {
    id: "texnika",
    name: "Maishiy texnika",
    icon: "tv",
    items: [
      { name: "Oshxona texnikasi", subId: "oshxona-texnikasi" },
      { name: "Tozalash texnikasi", subId: "tozalash-texnikasi" },
      { name: "Go'zallik texnikasi", subId: "gozallik-texnikasi" },
      { name: "Katta maishiy texnika", subId: "katta-texnika" },
      { name: "Iqlim texnikasi", subId: "iqlim" }
    ]
  },
  {
    id: "kiyim",
    name: "Kiyim",
    icon: "shirt",
    items: [
      { name: "Erkaklar kiyimi", subId: "erkaklar-kiyimi" },
      { name: "Ayollar kiyimi", subId: "ayollar-kiyimi" },
      { name: "Bolalar kiyimi", subId: "bolalar-kiyimi" },
      { name: "Aksessuarlar", subId: "aksessuarlar" }
    ]
  },
  {
    id: "poyabzal",
    name: "Poyabzallar",
    icon: "footprints",
    items: [
      { name: "Erkaklar poyabzali", subId: "erkaklar-poyabzali" },
      { name: "Ayollar poyabzali", subId: "ayollar-poyabzali" },
      { name: "Sport poyabzallari", subId: "sport-poyabzali" },
      { name: "Krossovkalar", subId: "krossovkalar" }
    ]
  },
  {
    id: "gozallik",
    name: "Go'zallik va parvarish",
    icon: "sparkles",
    items: [
      { name: "Parfyumeriya", subId: "parfyumeriya" },
      { name: "Yuz parvarishi", subId: "yuz-parvarishi" },
      { name: "Soch parvarishi", subId: "soch-parvarishi" },
      { name: "Makiyaj", subId: "makiyaj" }
    ]
  },
  {
    id: "uy-rozgor",
    name: "Uy-ro'zg'or buyumlari",
    icon: "home",
    items: [
      { name: "Oshxona idishlari", subId: "oshxona-idishlari" },
      { name: "Yotoqxona anjomlari", subId: "yotoqxona" },
      { name: "Tozalash vositalari", subId: "tozalash" },
      { name: "Dekor va interyer", subId: "dekor" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, BANNERS_DATA, CATEGORIES_DATA };
}
