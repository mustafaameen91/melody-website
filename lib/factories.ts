// Sample gold factories for the design build. Names, figures and descriptions are made up
// until Melody's real partner factories are added. Photos: Pexels (free licence).

export type Bi = { en: string; ar: string };

export type Factory = {
  slug: string;
  name: Bi;
  city: Bi;
  country: Bi;
  image: string;
  imagePos: string;
  specialty: Bi;
  about: Bi;
  founded: number;
  capacityKg: number; // per month
  purity: string;
  minInvestUsd: number;
  replyHours: number;
  products: Bi[];
};

export const FACTORIES: Factory[] = [
  {
    slug: "rafidain-refinery",
    name: { en: "Al-Rafidain Gold Refinery", ar: "مصفاة الرافدين للذهب" },
    city: { en: "Baghdad", ar: "بغداد" }, country: { en: "Iraq", ar: "العراق" },
    image: "/img/factories/melting.jpg", imagePos: "50% 55%",
    specialty: { en: "Refining to 999.9 fine gold", ar: "تكرير الذهب إلى نقاوة 999.9" },
    about: { en: "Refines scrap and mined gold into 999.9 fine bars, with an in-house assay lab that certifies every batch.", ar: "تكرّر الذهب الخام والكسر إلى سبائك بنقاوة 999.9، مع مختبر فحص داخلي يصدر شهادة لكل دفعة." },
    founded: 2009, capacityKg: 120, purity: "999.9", minInvestUsd: 10000, replyHours: 24,
    products: [{ en: "1 kg cast bar", ar: "سبيكة مصبوبة 1 كغ" }, { en: "100 g minted bar", ar: "سبيكة مسكوكة 100 غ" }, { en: "Refining service", ar: "خدمة التكرير" }],
  },
  {
    slug: "basra-bullion",
    name: { en: "Basra Bullion Works", ar: "مصنع البصرة للسبائك" },
    city: { en: "Basra", ar: "البصرة" }, country: { en: "Iraq", ar: "العراق" },
    image: "/img/factories/pouring.jpg", imagePos: "50% 50%",
    specialty: { en: "Large cast bars, 250 g to 1 kg", ar: "سبائك مصبوبة كبيرة من 250 غ إلى 1 كغ" },
    about: { en: "Casts large investment bars for vaults and traders, with serial numbers stamped at the pour.", ar: "تصبّ سبائك استثمارية كبيرة للخزائن والتجّار، وتُختم الأرقام التسلسلية عند الصب." },
    founded: 2014, capacityKg: 80, purity: "999.9", minInvestUsd: 25000, replyHours: 48,
    products: [{ en: "250 g cast bar", ar: "سبيكة مصبوبة 250 غ" }, { en: "500 g cast bar", ar: "سبيكة مصبوبة 500 غ" }, { en: "1 kg cast bar", ar: "سبيكة مصبوبة 1 كغ" }],
  },
  {
    slug: "erbil-casting",
    name: { en: "Erbil Casting House", ar: "دار أربيل للصب" },
    city: { en: "Erbil", ar: "أربيل" }, country: { en: "Iraq", ar: "العراق" },
    image: "/img/factories/casting.jpg", imagePos: "40% 50%",
    specialty: { en: "Minted and cast bars", ar: "سبائك مسكوكة ومصبوبة" },
    about: { en: "Produces both minted small bars and cast bars, and buys back gold from traders across the north.", ar: "تنتج السبائك الصغيرة المسكوكة والسبائك المصبوبة، وتشتري الذهب من التجّار في أنحاء الشمال." },
    founded: 2017, capacityKg: 60, purity: "999.9", minInvestUsd: 5000, replyHours: 24,
    products: [{ en: "10 g minted bar", ar: "سبيكة مسكوكة 10 غ" }, { en: "50 g minted bar", ar: "سبيكة مسكوكة 50 غ" }, { en: "250 g cast bar", ar: "سبيكة مصبوبة 250 غ" }],
  },
  {
    slug: "doha-precious-metals",
    name: { en: "Doha Precious Metals", ar: "الدوحة للمعادن الثمينة" },
    city: { en: "Doha", ar: "الدوحة" }, country: { en: "Qatar", ar: "قطر" },
    image: "/img/factories/furnace.jpg", imagePos: "50% 45%",
    specialty: { en: "Induction melting and bar production", ar: "الصهر بالحث وإنتاج السبائك" },
    about: { en: "A Melody Gold Group facility producing bars for the Gulf market, with export paperwork handled on site.", ar: "منشأة تابعة لمجموعة ميلودي جولد تنتج السبائك لسوق الخليج، وتُنجز أوراق التصدير في الموقع." },
    founded: 2012, capacityKg: 150, purity: "999.9", minInvestUsd: 50000, replyHours: 24,
    products: [{ en: "1 oz minted bar", ar: "سبيكة مسكوكة أونصة واحدة" }, { en: "100 g minted bar", ar: "سبيكة مسكوكة 100 غ" }, { en: "1 kg cast bar", ar: "سبيكة مصبوبة 1 كغ" }],
  },
  {
    slug: "najaf-goldsmiths",
    name: { en: "Najaf Goldsmiths Workshop", ar: "ورشة النجف للصياغة" },
    city: { en: "Najaf", ar: "النجف" }, country: { en: "Iraq", ar: "العراق" },
    image: "/img/factories/workshop.jpg", imagePos: "50% 40%",
    specialty: { en: "Jewellery and gift bars", ar: "المصوغات وسبائك الهدايا" },
    about: { en: "Hand-finishes jewellery and engraved gift bars, and buys old jewellery by weight and karat.", ar: "تصوغ المجوهرات وسبائك الهدايا المنقوشة يدوياً، وتشتري المصوغات القديمة حسب الوزن والعيار." },
    founded: 2003, capacityKg: 15, purity: "21K – 24K", minInvestUsd: 2000, replyHours: 12,
    products: [{ en: "1 g gift bar", ar: "سبيكة هدية 1 غ" }, { en: "5 g gift bar", ar: "سبيكة هدية 5 غ" }, { en: "21K jewellery", ar: "مصوغات عيار 21" }],
  },
  {
    slug: "casablanca-smelter",
    name: { en: "Casablanca Gold Smelter", ar: "مصهر الدار البيضاء للذهب" },
    city: { en: "Casablanca", ar: "الدار البيضاء" }, country: { en: "Morocco", ar: "المغرب" },
    image: "/img/factories/smelter.jpg", imagePos: "50% 50%",
    specialty: { en: "Smelting and recycling", ar: "الصهر وإعادة التدوير" },
    about: { en: "A Melody Gold Group smelter that recycles scrap gold into certified bars for North Africa.", ar: "مصهر تابع لمجموعة ميلودي جولد يعيد تدوير كسر الذهب إلى سبائك معتمدة لشمال أفريقيا." },
    founded: 2015, capacityKg: 90, purity: "999.9", minInvestUsd: 20000, replyHours: 48,
    products: [{ en: "Scrap recycling", ar: "إعادة تدوير الكسر" }, { en: "100 g cast bar", ar: "سبيكة مصبوبة 100 غ" }, { en: "1 kg cast bar", ar: "سبيكة مصبوبة 1 كغ" }],
  },
];

export const getFactory = (slug: string) => FACTORIES.find((f) => f.slug === slug);

export const ACTIONS = ["invest", "buy", "sell"] as const;
export type Action = (typeof ACTIONS)[number];
export const isAction = (v: unknown): v is Action => ACTIONS.includes(v as Action);
