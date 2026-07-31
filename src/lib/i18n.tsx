import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "hi", label: "हिन्दी" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.careers": "Careers",
  "nav.privacy": "Privacy",
  "nav.terms": "Terms",
  "hero.badge": "A modern software studio",
  "hero.title.a": "Engineering",
  "hero.title.b": "tomorrow's software",
  "hero.title.c": ", today.",
  "hero.desc": "Alaiya Technologies (Sole Proprietorship) partners with founders and enterprises to design, build, and scale digital products that move their business forward.",
  "hero.cta.services": "Explore services",
  "hero.cta.call": "Call +91 91061 58544",
  "services.title": "What we do",
  "services.sub": "Focused capabilities, delivered by a small senior team.",
  "s1.t": "Cloud Engineering",
  "s1.d": "Scalable infrastructure on AWS, GCP, and Azure built for reliability.",
  "s2.t": "AI & Data Products",
  "s2.d": "From model integration to data pipelines that drive real outcomes.",
  "s3.t": "Custom Software",
  "s3.d": "Web and mobile applications tailored to your operations.",
  "s4.t": "Platform Modernization",
  "s4.d": "Refactor legacy systems into resilient, future-ready platforms.",
  "cta.title": "Built with care, shipped with confidence.",
  "cta.desc": "We bring together engineers, designers, and product thinkers who care about craft. Every project is an opportunity to solve a real problem and ship something we're proud of.",
  "stat.exp": "Years combined experience",
  "stat.ship": "Products shipped",
  "stat.country": "Countries served",
  "stat.uptime": "Average uptime delivered",
  "footer.tag": "Building reliable, modern software for ambitious teams.",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "theme.toggle": "Toggle theme",
  "lang.select": "Language",
};

const dict: Record<LangCode, Dict> = {
  en,
  es: {
    "nav.home": "Inicio", "nav.careers": "Empleo", "nav.privacy": "Privacidad", "nav.terms": "Términos",
    "hero.badge": "Un estudio de software moderno",
    "hero.title.a": "Diseñando", "hero.title.b": "el software del mañana", "hero.title.c": ", hoy.",
    "hero.desc": "Alaiya Technologies (Propietario Único) colabora con fundadores y empresas para diseñar, construir y escalar productos digitales que impulsan su negocio.",
    "hero.cta.services": "Ver servicios", "hero.cta.call": "Llamar +91 91061 58544",
    "services.title": "Qué hacemos", "services.sub": "Capacidades enfocadas, entregadas por un equipo senior.",
    "s1.t": "Ingeniería en la nube", "s1.d": "Infraestructura escalable en AWS, GCP y Azure diseñada para la fiabilidad.",
    "s2.t": "IA y Datos", "s2.d": "Desde integración de modelos hasta pipelines de datos con resultados reales.",
    "s3.t": "Software a medida", "s3.d": "Aplicaciones web y móviles adaptadas a tus operaciones.",
    "s4.t": "Modernización de plataformas", "s4.d": "Transformamos sistemas heredados en plataformas resilientes.",
    "cta.title": "Hecho con cuidado, entregado con confianza.",
    "cta.desc": "Reunimos ingenieros, diseñadores y pensadores de producto que aman su oficio.",
    "stat.exp": "Años de experiencia combinada", "stat.ship": "Productos lanzados", "stat.country": "Países servidos", "stat.uptime": "Tiempo activo promedio",
    "footer.tag": "Construyendo software moderno y confiable para equipos ambiciosos.",
    "footer.contact": "Contacto", "footer.rights": "Todos los derechos reservados.",
    "theme.toggle": "Cambiar tema", "lang.select": "Idioma",
  },
  fr: {
    "nav.home": "Accueil", "nav.careers": "Carrières", "nav.privacy": "Confidentialité", "nav.terms": "Conditions",
    "hero.badge": "Un studio logiciel moderne",
    "hero.title.a": "Concevoir", "hero.title.b": "le logiciel de demain", "hero.title.c": ", aujourd'hui.",
    "hero.desc": "Alaiya Technologies (Entreprise individuelle) accompagne fondateurs et entreprises pour concevoir, construire et faire évoluer leurs produits numériques.",
    "hero.cta.services": "Découvrir les services", "hero.cta.call": "Appeler +91 91061 58544",
    "services.title": "Ce que nous faisons", "services.sub": "Des compétences ciblées, livrées par une équipe senior.",
    "s1.t": "Ingénierie cloud", "s1.d": "Infrastructure évolutive sur AWS, GCP et Azure conçue pour la fiabilité.",
    "s2.t": "IA & Données", "s2.d": "De l'intégration de modèles aux pipelines de données à impact réel.",
    "s3.t": "Logiciels sur mesure", "s3.d": "Applications web et mobiles adaptées à vos opérations.",
    "s4.t": "Modernisation", "s4.d": "Nous transformons les systèmes hérités en plateformes robustes.",
    "cta.title": "Fait avec soin, livré avec confiance.",
    "cta.desc": "Ingénieurs, designers et penseurs produit qui aiment leur métier.",
    "stat.exp": "Années d'expérience cumulée", "stat.ship": "Produits livrés", "stat.country": "Pays servis", "stat.uptime": "Disponibilité moyenne",
    "footer.tag": "Un logiciel moderne et fiable pour des équipes ambitieuses.",
    "footer.contact": "Contact", "footer.rights": "Tous droits réservés.",
    "theme.toggle": "Changer de thème", "lang.select": "Langue",
  },
  de: {
    "nav.home": "Start", "nav.careers": "Karriere", "nav.privacy": "Datenschutz", "nav.terms": "AGB",
    "hero.badge": "Ein modernes Software-Studio",
    "hero.title.a": "Wir entwickeln", "hero.title.b": "die Software von morgen", "hero.title.c": " — heute.",
    "hero.desc": "Alaiya Technologies (Einzelunternehmen) unterstützt Gründer und Unternehmen beim Entwerfen, Bauen und Skalieren digitaler Produkte.",
    "hero.cta.services": "Leistungen ansehen", "hero.cta.call": "Anrufen +91 91061 58544",
    "services.title": "Was wir tun", "services.sub": "Fokussierte Fähigkeiten, geliefert von einem Senior-Team.",
    "s1.t": "Cloud-Engineering", "s1.d": "Skalierbare Infrastruktur auf AWS, GCP und Azure.",
    "s2.t": "KI & Daten", "s2.d": "Von Modellintegration bis zu wirkungsvollen Daten-Pipelines.",
    "s3.t": "Individuelle Software", "s3.d": "Web- und Mobile-Apps, zugeschnitten auf Ihre Prozesse.",
    "s4.t": "Modernisierung", "s4.d": "Wir überführen Alt-Systeme in robuste Plattformen.",
    "cta.title": "Sorgfältig gebaut, sicher ausgeliefert.",
    "cta.desc": "Ingenieure, Designer und Produkt-Denker, die ihr Handwerk lieben.",
    "stat.exp": "Jahre Erfahrung gesamt", "stat.ship": "Produkte veröffentlicht", "stat.country": "Länder bedient", "stat.uptime": "Durchschnittliche Verfügbarkeit",
    "footer.tag": "Zuverlässige, moderne Software für ambitionierte Teams.",
    "footer.contact": "Kontakt", "footer.rights": "Alle Rechte vorbehalten.",
    "theme.toggle": "Theme wechseln", "lang.select": "Sprache",
  },
  pt: {
    "nav.home": "Início", "nav.careers": "Carreiras", "nav.privacy": "Privacidade", "nav.terms": "Termos",
    "hero.badge": "Um estúdio de software moderno",
    "hero.title.a": "Projetando", "hero.title.b": "o software de amanhã", "hero.title.c": ", hoje.",
    "hero.desc": "Alaiya Technologies (Empresário Individual) faz parceria com fundadores e empresas para projetar, construir e escalar produtos digitais.",
    "hero.cta.services": "Ver serviços", "hero.cta.call": "Ligar +91 91061 58544",
    "services.title": "O que fazemos", "services.sub": "Capacidades focadas, entregues por um time sênior.",
    "s1.t": "Engenharia em nuvem", "s1.d": "Infra escalável em AWS, GCP e Azure.",
    "s2.t": "IA & Dados", "s2.d": "Da integração de modelos a pipelines com resultados reais.",
    "s3.t": "Software sob medida", "s3.d": "Apps web e mobile adaptados à sua operação.",
    "s4.t": "Modernização", "s4.d": "Refatoramos sistemas legados em plataformas resilientes.",
    "cta.title": "Feito com cuidado, entregue com confiança.",
    "cta.desc": "Engenheiros, designers e product thinkers apaixonados pelo ofício.",
    "stat.exp": "Anos de experiência combinada", "stat.ship": "Produtos entregues", "stat.country": "Países atendidos", "stat.uptime": "Uptime médio",
    "footer.tag": "Software moderno e confiável para times ambiciosos.",
    "footer.contact": "Contato", "footer.rights": "Todos os direitos reservados.",
    "theme.toggle": "Alternar tema", "lang.select": "Idioma",
  },
  hi: {
    "nav.home": "होम", "nav.careers": "करियर", "nav.privacy": "गोपनीयता", "nav.terms": "शर्तें",
    "hero.badge": "एक आधुनिक सॉफ्टवेयर स्टूडियो",
    "hero.title.a": "बना रहे हैं", "hero.title.b": "कल का सॉफ्टवेयर", "hero.title.c": ", आज।",
    "hero.desc": "अलाया टेक्नोलॉजीज (एकल स्वामित्व) संस्थापकों और उद्यमों के साथ मिलकर डिजिटल उत्पाद डिज़ाइन, निर्माण और स्केल करती है।",
    "hero.cta.services": "सेवाएँ देखें", "hero.cta.call": "कॉल करें +91 91061 58544",
    "services.title": "हम क्या करते हैं", "services.sub": "केंद्रित क्षमताएँ, अनुभवी टीम द्वारा।",
    "s1.t": "क्लाउड इंजीनियरिंग", "s1.d": "AWS, GCP और Azure पर विश्वसनीय स्केलेबल इन्फ्रा।",
    "s2.t": "एआई और डेटा", "s2.d": "मॉडल एकीकरण से लेकर प्रभावशाली डेटा पाइपलाइन तक।",
    "s3.t": "कस्टम सॉफ्टवेयर", "s3.d": "आपके संचालन के अनुरूप वेब और मोबाइल ऐप।",
    "s4.t": "प्लेटफ़ॉर्म आधुनिकीकरण", "s4.d": "लीगेसी सिस्टम को लचीले प्लेटफ़ॉर्म में बदलें।",
    "cta.title": "ध्यान से बनाया, विश्वास से डिलीवर किया।",
    "cta.desc": "इंजीनियर, डिज़ाइनर और प्रोडक्ट थिंकर जो अपने काम से प्यार करते हैं।",
    "stat.exp": "संयुक्त अनुभव के वर्ष", "stat.ship": "उत्पाद डिलीवर किए", "stat.country": "देशों में सेवा", "stat.uptime": "औसत अपटाइम",
    "footer.tag": "महत्वाकांक्षी टीमों के लिए विश्वसनीय आधुनिक सॉफ्टवेयर।",
    "footer.contact": "संपर्क", "footer.rights": "सर्वाधिकार सुरक्षित।",
    "theme.toggle": "थीम बदलें", "lang.select": "भाषा",
  },
  ja: {
    "nav.home": "ホーム", "nav.careers": "採用情報", "nav.privacy": "プライバシー", "nav.terms": "利用規約",
    "hero.badge": "モダンなソフトウェアスタジオ",
    "hero.title.a": "築くのは", "hero.title.b": "明日のソフトウェア", "hero.title.c": "、今日。",
    "hero.desc": "Alaiya Technologies（個人事業主）は、創業者や企業と共にデジタル製品を設計・構築・拡大します。",
    "hero.cta.services": "サービスを見る", "hero.cta.call": "電話 +91 91061 58544",
    "services.title": "私たちの仕事", "services.sub": "少数精鋭のシニアチームによる集中した能力。",
    "s1.t": "クラウド エンジニアリング", "s1.d": "AWS, GCP, Azure 上の堅牢でスケーラブルな基盤。",
    "s2.t": "AI & データ", "s2.d": "モデル統合から成果を生むデータパイプラインまで。",
    "s3.t": "カスタムソフトウェア", "s3.d": "業務に合わせたWeb・モバイルアプリ。",
    "s4.t": "プラットフォーム刷新", "s4.d": "レガシーを堅牢な次世代基盤へ。",
    "cta.title": "丁寧に作り、自信を持って届ける。",
    "cta.desc": "職人気質のエンジニア、デザイナー、プロダクト思考者。",
    "stat.exp": "累計経験年数", "stat.ship": "リリース製品数", "stat.country": "対応国数", "stat.uptime": "平均稼働率",
    "footer.tag": "野心的なチームのための、信頼できるモダンソフトウェア。",
    "footer.contact": "連絡先", "footer.rights": "全著作権所有。",
    "theme.toggle": "テーマ切替", "lang.select": "言語",
  },
  zh: {
    "nav.home": "首页", "nav.careers": "招聘", "nav.privacy": "隐私", "nav.terms": "条款",
    "hero.badge": "现代软件工作室",
    "hero.title.a": "构建", "hero.title.b": "明日的软件", "hero.title.c": "，就在今天。",
    "hero.desc": "Alaiya Technologies（个人独资）与创始人和企业携手设计、构建并扩展数字产品。",
    "hero.cta.services": "查看服务", "hero.cta.call": "致电 +91 91061 58544",
    "services.title": "我们的工作", "services.sub": "由资深小团队交付的专注能力。",
    "s1.t": "云端工程", "s1.d": "AWS、GCP、Azure 上稳定可扩展的基础设施。",
    "s2.t": "AI 与数据", "s2.d": "从模型集成到驱动业务的数据管道。",
    "s3.t": "定制软件", "s3.d": "契合业务的 Web 与移动应用。",
    "s4.t": "平台现代化", "s4.d": "将遗留系统重构为面向未来的平台。",
    "cta.title": "用心构建，自信交付。",
    "cta.desc": "热爱手艺的工程师、设计师与产品人。",
    "stat.exp": "累计经验年数", "stat.ship": "已交付产品", "stat.country": "服务国家", "stat.uptime": "平均可用性",
    "footer.tag": "为雄心团队打造可靠的现代软件。",
    "footer.contact": "联系", "footer.rights": "版权所有。",
    "theme.toggle": "切换主题", "lang.select": "语言",
  },
  ar: {
    "nav.home": "الرئيسية", "nav.careers": "الوظائف", "nav.privacy": "الخصوصية", "nav.terms": "الشروط",
    "hero.badge": "استوديو برمجيات حديث",
    "hero.title.a": "نصنع", "hero.title.b": "برمجيات الغد", "hero.title.c": "، اليوم.",
    "hero.desc": "تتعاون Alaiya Technologies (مؤسسة فردية) مع المؤسسين والشركات لتصميم وبناء وتوسيع المنتجات الرقمية.",
    "hero.cta.services": "استكشف الخدمات", "hero.cta.call": "اتصل +91 91061 58544",
    "services.title": "ما نقوم به", "services.sub": "قدرات مركّزة يقدمها فريق أول محترف.",
    "s1.t": "هندسة السحابة", "s1.d": "بنية قابلة للتوسع على AWS و GCP و Azure.",
    "s2.t": "الذكاء الاصطناعي والبيانات", "s2.d": "من دمج النماذج إلى خطوط بيانات مؤثرة.",
    "s3.t": "برمجيات مخصصة", "s3.d": "تطبيقات ويب وموبايل مصممة لعملياتك.",
    "s4.t": "تحديث المنصات", "s4.d": "نحوّل الأنظمة القديمة إلى منصات مرنة.",
    "cta.title": "مصنوع بعناية، مُسلّم بثقة.",
    "cta.desc": "مهندسون ومصممون ومفكرو منتج يعشقون الحرفة.",
    "stat.exp": "سنوات خبرة مجمعة", "stat.ship": "منتجات مُسلَّمة", "stat.country": "دول مخدومة", "stat.uptime": "متوسط الجاهزية",
    "footer.tag": "برمجيات حديثة موثوقة للفرق الطموحة.",
    "footer.contact": "اتصال", "footer.rights": "جميع الحقوق محفوظة.",
    "theme.toggle": "تبديل السمة", "lang.select": "اللغة",
  },
  ru: {
    "nav.home": "Главная", "nav.careers": "Карьера", "nav.privacy": "Приватность", "nav.terms": "Условия",
    "hero.badge": "Современная софтверная студия",
    "hero.title.a": "Создаём", "hero.title.b": "программы завтрашнего дня", "hero.title.c": ", уже сегодня.",
    "hero.desc": "Alaiya Technologies (ИП) сотрудничает с основателями и компаниями, чтобы проектировать, строить и масштабировать цифровые продукты.",
    "hero.cta.services": "Смотреть услуги", "hero.cta.call": "Позвонить +91 91061 58544",
    "services.title": "Что мы делаем", "services.sub": "Сфокусированные компетенции от небольшой сильной команды.",
    "s1.t": "Облачная инженерия", "s1.d": "Масштабируемая инфраструктура на AWS, GCP и Azure.",
    "s2.t": "ИИ и данные", "s2.d": "От интеграции моделей до эффективных пайплайнов данных.",
    "s3.t": "Кастомный софт", "s3.d": "Веб- и мобильные приложения под ваши процессы.",
    "s4.t": "Модернизация платформ", "s4.d": "Превращаем легаси в устойчивые платформы будущего.",
    "cta.title": "Сделано с заботой, поставлено с уверенностью.",
    "cta.desc": "Инженеры, дизайнеры и продуктовые мыслители, влюблённые в ремесло.",
    "stat.exp": "Суммарных лет опыта", "stat.ship": "Выпущено продуктов", "stat.country": "Стран обслуживания", "stat.uptime": "Средний аптайм",
    "footer.tag": "Надёжный современный софт для амбициозных команд.",
    "footer.contact": "Контакт", "footer.rights": "Все права защищены.",
    "theme.toggle": "Сменить тему", "lang.select": "Язык",
  },
};

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: (k: string) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as LangCode | null;
    if (saved && dict[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => dict[lang]?.[k] ?? en[k] ?? k;

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}
