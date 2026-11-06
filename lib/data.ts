// Sample catalogue, account and article data for the design build.
// Everything here is placeholder content until Melody's real data and backend are connected.

export type Product = {
  slug: string;
  name: string;
  weightG: number;
  weightLabel: string;
  type: "Minted" | "Cast" | "Gift set";
  premium: number; // per-gram price as a multiple of the sell price
  stock: "in" | "low" | "pre";
  stockLabel: string;
  tag?: string;
  nameAr: string;
  weightLabelAr: string;
  stockLabelAr: string;
  tagAr?: string;
  image: string;
  imagePos: string;
  refiner: string;
};

export const PRODUCTS: Product[] = [
  { slug: "1g-gold-bar", nameAr: "سبيكة ذهب 1 غرام", weightLabelAr: "1 غ", stockLabelAr: "متوفر", tagAr: "الأكثر طلباً", name: "1 g Gold Bar", weightG: 1, weightLabel: "1 g", type: "Minted", premium: 158 / 151.7, stock: "in", stockLabel: "In stock", tag: "Most popular", image: "/img/bars-steps.jpg", imagePos: "50% 70%", refiner: "[Refiner A]" },
  { slug: "5g-gold-bar", nameAr: "سبيكة ذهب 5 غرامات", weightLabelAr: "5 غ", stockLabelAr: "متوفر", name: "5 g Gold Bar", weightG: 5, weightLabel: "5 g", type: "Minted", premium: 154.5 / 151.7, stock: "in", stockLabel: "In stock", image: "/img/bars-scatter.jpg", imagePos: "40% 50%", refiner: "[Refiner A]" },
  { slug: "10g-gold-bar", nameAr: "سبيكة ذهب 10 غرامات", weightLabelAr: "10 غ", stockLabelAr: "متوفر", name: "10 g Gold Bar", weightG: 10, weightLabel: "10 g", type: "Minted", premium: 153.7 / 151.7, stock: "in", stockLabel: "In stock", image: "/img/bars-three.jpg", imagePos: "50% 55%", refiner: "[Refiner B]" },
  { slug: "1oz-gold-bar", nameAr: "سبيكة ذهب أونصة واحدة", weightLabelAr: "1 أونصة", stockLabelAr: "بقي 6 فقط", name: "1 oz Gold Bar", weightG: 31.1035, weightLabel: "1 oz", type: "Minted", premium: 152.85 / 151.7, stock: "low", stockLabel: "Only 6 left", image: "/img/bars-stack-dark.jpg", imagePos: "50% 50%", refiner: "[Refiner B]" },
  { slug: "50g-gold-bar", nameAr: "سبيكة ذهب 50 غراماً", weightLabelAr: "50 غ", stockLabelAr: "متوفر", name: "50 g Gold Bar", weightG: 50, weightLabel: "50 g", type: "Minted", premium: 152.2 / 151.7, stock: "in", stockLabel: "In stock", image: "/img/bar-marble.jpg", imagePos: "50% 50%", refiner: "[Refiner A]" },
  { slug: "100g-gold-bar", nameAr: "سبيكة ذهب 100 غرام", weightLabelAr: "100 غ", stockLabelAr: "متوفر", tagAr: "أفضل قيمة", name: "100 g Gold Bar", weightG: 100, weightLabel: "100 g", type: "Minted", premium: 1, stock: "in", stockLabel: "In stock", tag: "Best value", image: "/img/bars-fine.jpg", imagePos: "50% 40%", refiner: "[Refiner C]" },
  { slug: "250g-cast-bar", nameAr: "سبيكة مصبوبة 250 غراماً", weightLabelAr: "250 غ", stockLabelAr: "بالطلب · 5 أيام", name: "250 g Cast Bar", weightG: 250, weightLabel: "250 g", type: "Cast", premium: 151.2 / 151.7, stock: "pre", stockLabel: "To order · 5 days", image: "/img/bar-burgundy.jpg", imagePos: "50% 50%", refiner: "[Refiner C]" },
  { slug: "1kg-gold-bar", nameAr: "سبيكة ذهب 1 كيلوغرام", weightLabelAr: "1 كغ", stockLabelAr: "بالطلب · 5 أيام", tagAr: "خيار المستثمرين", name: "1 kg Gold Bar", weightG: 1000, weightLabel: "1 kg", type: "Minted", premium: 150.9 / 151.7, stock: "pre", stockLabel: "To order · 5 days", tag: "Investor choice", image: "/img/bar-stand.jpg", imagePos: "50% 45%", refiner: "[Refiner C]" },
  { slug: "gift-set-3x10g", nameAr: "طقم هدية 3 × 10 غرامات", weightLabelAr: "3 × 10 غ", stockLabelAr: "بقي 4 فقط", tagAr: "هدية", name: "3 × 10 g Gift Set", weightG: 30, weightLabel: "3 × 10 g", type: "Gift set", premium: 154 / 151.7, stock: "low", stockLabel: "Only 4 left", tag: "Gift", image: "/img/bars-wall.jpg", imagePos: "50% 50%", refiner: "[Refiner A]" },
];

export const TYPE_AR: Record<Product["type"], string> = { Minted: "مسكوكة", Cast: "مصبوبة", "Gift set": "طقم هدية" };

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

/** Price per gram and total for a product at a given sell price. */
export function productPrice(p: Product, sellPerGram: number) {
  const perGram = Math.round(sellPerGram * p.premium * 100) / 100;
  return { perGram, total: Math.round(perGram * p.weightG * 100) / 100 };
}

export const VAULT = {
  clientName: "[Client name]",
  clientNameAr: "[اسم العميل]",
  melodyId: "MG-10 482",
  cash: 2340,
  holdings: [
    { label: "50 g Gold Bar", labelAr: "سبيكة ذهب 50 غراماً", detail: "Serial MG-[serial]", detailAr: "الرقم التسلسلي MG-[serial]", grams: 50, image: "/img/bar-marble.jpg" },
    { label: "Saved gold", labelAr: "ذهب مدَّخر", detail: "Share of MG-[serial]", detailAr: "حصة من MG-[serial]", grams: 38.6, image: "/img/leaf.jpg" },
  ],
  startedValue: 12137.8,
  activity: [
    { kind: "send", title: "Sent to Sara A.", titleAr: "أُرسل إلى سارة أ.", when: "Today, 09:12", whenAr: "اليوم، 09:12", grams: -10 },
    { kind: "buy", title: "Bought gold", titleAr: "شراء ذهب", when: "3 Nov, 10:42", whenAr: "3 تشرين الثاني، 10:42", grams: 10 },
    { kind: "receive", title: "Received from Omar K.", titleAr: "استُلم من عمر ك.", when: "30 Oct, 18:20", whenAr: "30 تشرين الأول، 18:20", grams: 5 },
    { kind: "deliver", title: "10 g bar delivered", titleAr: "تسليم سبيكة 10 غرامات", when: "22 Oct · signed by [name]", whenAr: "22 تشرين الأول · وقّع [الاسم]", grams: -10 },
  ],
  trades: [
    { date: "3 Nov, 10:42", dateAr: "3 تشرين الثاني، 10:42", side: "Buy", grams: 10, price: 151.7 },
    { date: "28 Oct, 16:05", dateAr: "28 تشرين الأول، 16:05", side: "Sell", grams: 5, price: 145.2 },
    { date: "21 Oct, 09:18", dateAr: "21 تشرين الأول، 09:18", side: "Buy", grams: 20, price: 149.8 },
    { date: "14 Oct, 13:30", dateAr: "14 تشرين الأول، 13:30", side: "Limit · open", grams: 5, price: 145.0 },
  ],
  transfers: [
    { date: "Today, 09:12", dateAr: "اليوم، 09:12", client: "Sara A.", clientAr: "سارة أ.", dir: "Sent", grams: 10, value: 1480.2, status: "Completed" },
    { date: "30 Oct, 18:20", dateAr: "30 تشرين الأول، 18:20", client: "Omar K.", clientAr: "عمر ك.", dir: "Received", grams: 5, value: 728.5, status: "Completed" },
    { date: "12 Oct, 11:05", dateAr: "12 تشرين الأول، 11:05", client: "Layla H.", clientAr: "ليلى ح.", dir: "Sent", grams: 2.5, value: 359.75, status: "Cancelled" },
  ],
};

export const CONTACTS = [
  { id: "MG-20 917", name: "Sara A.", nameAr: "سارة أ.", phone: "4417", verified: true },
  { id: "MG-31 204", name: "Omar K.", nameAr: "عمر ك.", phone: "0932", verified: true },
  { id: "MG-18 556", name: "Layla H.", nameAr: "ليلى ح.", phone: "7781", verified: true },
];

export const vaultGrams = () => VAULT.holdings.reduce((s, h) => s + h.grams, 0);

export type Article = { slug: string; cat: string; catAr: string; mins: number; title: string; titleAr: string; blurb: string; blurbAr: string; image: string; pos?: string };

export const ARTICLES: Article[] = [
  { slug: "minted-or-cast", cat: "Guides", catAr: "أدلّة", mins: 4, title: "Minted or cast: choosing the right gold bar", titleAr: "مسكوكة أم مصبوبة: كيف تختار سبيكة الذهب المناسبة", blurb: "How the two are made, priced and resold.", blurbAr: "كيف تُصنع كلٌّ منهما، وكيف تُسعَّر وتُعاد بيعها.", image: "/img/bars-pattern.jpg" },
  { slug: "inside-the-vault", cat: "Vault & security", catAr: "الخزنة والأمان", mins: 5, title: "Inside the vault: how your gold is stored and insured", titleAr: "داخل الخزنة: كيف يُحفظ ذهبك ويُؤمَّن", blurb: "Allocation, audits and what happens on delivery.", blurbAr: "التخصيص والتدقيق وما يحدث عند التسليم.", image: "/img/vault-door.jpg" },
  { slug: "why-999-9", cat: "Guides", catAr: "أدلّة", mins: 6, title: "Why 999.9 fine gold holds its value", titleAr: "لماذا يحافظ الذهب الخالص 999.9 على قيمته", blurb: "Purity, certificates and what buyers check.", blurbAr: "النقاء والشهادات وما يتحقق منه المشترون.", image: "/img/leaf.jpg" },
  { slug: "buy-monthly", cat: "Market outlook", catAr: "نظرة على السوق", mins: 3, title: "Should you buy in one go, or a little each month?", titleAr: "هل تشتري دفعة واحدة أم قليلاً كل شهر؟", blurb: "The case for saving in grams.", blurbAr: "لماذا يستحق الادخار بالغرام.", image: "/img/advisor-phone.jpg", pos: "60% 40%" },
  { slug: "giving-gold", cat: "Guides", catAr: "أدلّة", mins: 4, title: "Giving gold: transfers, gift sets and messages", titleAr: "إهداء الذهب: التحويلات وأطقم الهدايا والرسائل", blurb: "Three ways to give gold to family.", blurbAr: "ثلاث طرق لإهداء الذهب للعائلة.", image: "/img/bars-wall.jpg" },
  { slug: "melody-online", cat: "Company news", catAr: "أخبار الشركة", mins: 2, title: "Melody is now online, in English and Arabic", titleAr: "ميلودي الآن على الإنترنت بالعربية والإنجليزية", blurb: "Everything in the app, now on the web.", blurbAr: "كل ما في التطبيق، الآن على الموقع.", image: "/img/lobby.jpg", pos: "50% 60%" },
];
