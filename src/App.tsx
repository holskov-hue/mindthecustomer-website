import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import ulrikImg from "./assets/ulrikholskov..png";
import shadowImg from "./assets/shadows.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

// Winter Chill palette
const BRAND_NAVY = "#1A2745";
const BRAND_SECONDARY = "#4F7C82";
const BRAND_BG_ACCENT = "#B8E3E9";
const BRAND_NEUTRAL = "#93B1B5";

type Language = "da" | "en";
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

// --- DATA ---

const translations = {
  da: {
    nav: {
      services: "Hvad vi gør",
      howWeWork: "Sådan arbejder vi",
      mindcalls: "MindCalls",
      clients: "Kunder",
      about: "Om Mind the Customer",
      contact: "Kontakt",
    },
    hero: {
      title: "De fleste virksomheder ved, hvad deres kunder gør. Færre forstår hvorfor.",
      highlight: "Færre forstår hvorfor.",
      subtitle:
        "Mind the Customer afdækker de holdninger, oplevelser og beslutningsprocesser, der driver kunders valg og fravalg – også når de ikke fremgår af data.",
      cta: "Skal vi tage en snak?",
    },
    whatWeDo: {
      label: "Hvad vi gør",
      title: "Indsigt der forklarer – ikke bare beskriver",
      body: `Data fortæller, hvad der sker. Sjældnere hvorfor – og endnu sjældnere hvad man skal gøre ved det.

Mind the Customer arbejder med kvalitative interviews, fokusgrupper, etnografiske studier og brugerstudier, der kommer tættere på den virkelighed, kunder træffer beslutninger i.

Når det skaber værdi, kombineres de kvalitative indsigter med kvantitative data i en mixed methods-tilgang – så du får både dybde og et stærkere beslutningsgrundlag.

Vi arbejder også med AI som en integreret del af analyseprocessen, når det styrker kvaliteten, hastigheden eller skalerbarheden. Det gælder blandt andet MindCalls, hvor AI-assisterede samtaler gør det muligt at indsamle kvalitative indsigter i langt større skala – uden at miste den menneskelige fortolkning.

Metoden vælges altid ud fra problemstillingen. Aldrig omvendt.`,
      methodCards: [
        {
          label: "Kvalitative analyser",
          desc:
            "Interviews, fokusgrupper og etnografiske studier, der afdækker drivkræfter, behov og beslutningsprocesser bag kunders adfærd.",
        },
        {
          label: "Mixed methods",
          desc:
            "Kvalitativ dybde kombineret med kvantitativ bredde, når opgaven kræver både forståelse og data, der kan bære beslutninger.",
        },
        {
          label: "AI-assisteret indsigt",
          desc:
            "MindCalls og AI-assisterede metoder bruges, når opgaven kræver større skala, hurtigere læring eller nye måder at arbejde med kvalitative indsigter på.",
        },
        {
          label: "Strategisk rådgivning",
          desc:
            "Indsigter formidlet med forretningsmæssig forståelse – tilpasset de beslutninger, de skal understøtte.",
        },
      ],
    },
    howWeWork: {
      label: "Sådan arbejder vi",
      title: "Direkte samarbejde. Fra spørgsmål til indsigt.",
      body: `Hos Mind the Customer er der ingen lange leverandørkæder, ingen juniors der overtager, og ingen standardskabeloner der presses ned over opgaven.

Du arbejder direkte med en erfaren specialist fra første briefing til færdig analyse – én der både behersker metoderne og forstår den forretningsmæssige kontekst, de skal fungere i.

Det giver kortere vej fra spørgsmål til brugbar indsigt. Og indsigter der faktisk passer til din virkelighed.`,
      bullets: [
        "Kort vej fra spørgsmål til indsigt – uden unødige lag",
        "Metoden tilpasses opgaven undervejs, ikke omvendt",
        "Resultater du kan handle på med det samme",
      ],
    },
    internationalProjects: {
      label: "Internationale projekter",
      title: "Vil du forstå danske forbrugere?\nDu har brug for mere end en oversætter.",
      body: `Danske forbrugere har deres egne præferencer, kulturelle koder og måder at træffe beslutninger på. At forstå dem kræver lokal indsigt – ikke bare lokalt sprog.

Mind the Customer hjælper internationale virksomheder med kvalitative studier på det danske marked og leverer indsigter på engelsk, der er præcise, kontekstualiserede og direkte anvendelige.`,
      bullets: [
        "Fokusgrupper",
        "Dybdeinterviews",
        "Etnografiske studier",
        "Brugerstudier",
        "Mixed methods",
      ],
    },
    mindCallsTeaser: {
      eyebrow: "MindCalls",
      title: "Kvalitativ dybde. I større skala.",
      paragraphs: [
        "Traditionelle interviews giver dybde, men er svære at skalere. Spørgeskemaer når mange mennesker, men mister ofte nuancerne undervejs.",
        "MindCalls er udviklet til at bygge bro mellem de to verdener. Gennem AI-assisterede samtaler indsamles kvalitative indsigter fra mange kunder – struktureret, analyseret og leveret i et dashboard, der er til at arbejde med.",
        "Teknologien erstatter ikke den menneskelige analyse. Den gør det muligt at gennemføre den i langt større skala.",
      ],
      cta: "Vil du vide mere om MindCalls?",
      ctaHref: "#mindcalls-detail",
    },
    mindCallsDetail: {
      eyebrow: "MindCalls",
      title: "Dybde og skalérbarhed – uden kompromis",
      intro:
        "Med MindCalls forenes den kvalitative dybde fra interviews med den skalerbarhed, du ellers kun finder i surveys. Gennem AI-assisterede samtaler indsamles nuancerede svar fra mange kunder på én gang – altid med den menneskelige analyse som sidste led.",
      sections: [
        {
          title: "Hvordan fungerer MindCalls?",
          body:
            "Kunder inviteres til at deltage i en samtale, hvor en AI-stemme stiller åbne, relevante spørgsmål udviklet specifikt til din problemstilling. Svarene optages og transskriberes automatisk, hvorefter de analyseres af erfarne analytikere. Resultatet leveres i et interaktivt dashboard, som gør det let at finde mønstre og nøglecitater.",
        },
        {
          title: "Hvornår giver MindCalls mest værdi?",
          body:
            "MindCalls er særligt værdifuldt, når du har brug for kvalitative indsigter fra mange kunder hurtigt – fx til at afprøve nye koncepter, forstå barrierer ved churn eller få et bredere billede af adfærdsændringer på markedet.",
        },
        {
          title: "Tryghed og GDPR",
          body:
            "Datasikkerhed og anonymitet er tænkt ind fra start. Deltagere informeres tydeligt, og data behandles sikkert og efter gældende lovgivning. Du kan til enhver tid få adgang til eller få slettet indsamlede data.",
        },
      ],
      cta: "Tag kontakt for at høre mere",
      ctaHref: "#contact",
    },
    about: {
      label: "Om Mind the Customer",
      title: "Kundeindsigt med dybde – siden 2013",
      body:
        "Mind the Customer er grundlagt af Ulrik Holskov, der har arbejdet med kundeindsigt og analyse siden begyndelsen af 00’erne.\n\nBag hvert projekt ligger mere end 20 års erfaring med kvalitative og kvantitative metoder – og en grundlæggende overbevisning om, at indsigt kun skaber værdi, når den bliver brugt.\n\nDerfor stopper arbejdet ikke ved analysen. Det stopper, når du har et klart billede af dine kunder og ved, hvad du skal gøre ved det.",
      mind: {
        word: "Mind [maɪnd]",
        lines: [
          "At være opmærksom på",
          "tage hensyn til",
          "passe på",
          "observere",
          "forstå",
        ],
      },
      name: "Ulrik Holskov",
    },
    clients: {
      label: "Kunder",
      title: "Eksempler på virksomheder Mind the Customer har arbejdet med",
      logos: [
        "Forsvaret",
        "Scandlines",
        "Domino's",
        "Coop",
        "Team Danmark",
        "Better Being",
        "Scandinavian Tobacco Group",
        "Chr. Hansen",
        "Haveselskabet",
        "Idrættens Analyseinstitut",
        "Audio Nova",
        "Seas NVE",
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Lad os tage en snak om din problemstilling",
      body:
        "Uanset om du har en konkret opgave klar eller bare vil undersøge mulighederne, er du velkommen til at række ud. Vi vender hurtigt tilbage.",
      name: "Ulrik Holskov",
      email: "ulrik@mindthecustomer.dk",
      phone: "+45 42 31 01 01",
    },
    footer: "© 2025 Mind the Customer",
  },
  en: {
    nav: {
      services: "What we do",
      howWeWork: "How we work",
      mindcalls: "MindCalls",
      clients: "Clients",
      about: "About Mind the Customer",
      contact: "Contact",
    },
    hero: {
      title: "Most companies know what their customers do. Few understand why.",
      highlight: "Few understand why.",
      subtitle:
        "Mind the Customer uncovers the attitudes, experiences and decision-making processes that drive customer choices and rejections – even when they do not appear in the data.",
      cta: "Get in touch",
    },
    whatWeDo: {
      label: "What we do",
      title: "Insight that explains – not just describes",
      body: `Data tells you what is happening. Rarer is the why – and rarer still what to do about it.

Mind the Customer works with qualitative interviews, focus groups, ethnographic studies and user research that get closer to the real decisions your customers are making.

Where it creates value, qualitative insights are combined with quantitative data in a mixed methods approach – so you get both depth and a stronger foundation for decisions.

We also work with AI as an integrated part of the analysis process, when it strengthens quality, speed or scalability. This includes MindCalls, where AI-assisted conversations make it possible to collect qualitative insights at far greater scale – without losing human interpretation.

The method is always chosen to fit the challenge. Never the other way around.`,
      methodCards: [
        {
          label: "Qualitative analysis",
          desc:
            "Interviews, focus groups and ethnographic studies that uncover the motivations, needs and decision processes behind customer behaviour.",
        },
        {
          label: "Mixed methods",
          desc:
            "Qualitative depth combined with quantitative breadth when the project requires both understanding and data you can make decisions on.",
        },
        {
          label: "AI-assisted insight",
          desc:
            "MindCalls and AI-assisted methods are used when the project requires greater scale, faster learning or new ways of working with qualitative insight.",
        },
        {
          label: "Strategic advisory",
          desc:
            "Insights delivered with business understanding – tailored to the decisions they need to support.",
        },
      ],
    },
    howWeWork: {
      label: "How we work",
      title: "Direct collaboration. From question to insight.",
      body: `At Mind the Customer, there are no long agency chains, no juniors taking over, and no standard templates pushed onto your project.

You work directly with an experienced specialist from first briefing to finished analysis – someone who both masters the methods and understands the business context in which they must work.

That means a shorter path from question to actionable insight. And insights that truly fit your reality.`,
      bullets: [
        "Short path from question to insight – with no unnecessary layers",
        "The method adapts to the project as it develops, not the other way around",
        "Results you can act on right away",
      ],
    },
    internationalProjects: {
      label: "International projects",
      title: "Want to understand Danish consumers?\nYou’ll need more than a translator.",
      body: `Danish consumers have their own preferences, cultural codes and ways of making decisions. Understanding them takes local insight – not just local language.

Mind the Customer helps international companies with qualitative studies on the Danish market, delivering insights in English that are precise, contextualized and directly actionable.`,
      bullets: [
        "Focus groups",
        "In-depth interviews",
        "Ethnographic studies",
        "User studies",
        "Mixed methods",
      ],
    },
    mindCallsTeaser: {
      eyebrow: "MindCalls",
      title: "Qualitative depth. At greater scale.",
      paragraphs: [
        "Traditional interviews provide depth, but are hard to scale. Surveys reach many people, but often lose the nuance along the way.",
        "MindCalls is developed to bridge the two worlds. Through AI-assisted conversations, qualitative insights are gathered from many customers – structured, analysed and delivered in a dashboard you can work with.",
        "The technology does not replace human analysis. It makes it possible to conduct it at far greater scale.",
      ],
      cta: "Want to know more about MindCalls?",
      ctaHref: "#mindcalls-detail",
    },
    mindCallsDetail: {
      eyebrow: "MindCalls",
      title: "Depth and scalability – without compromise",
      intro:
        "With MindCalls, you get the qualitative richness of interviews with the scalability you’d expect only from surveys. AI-assisted conversations provide nuanced feedback from many customers at once – always with human analysis as the final step.",
      sections: [
        {
          title: "How does MindCalls work?",
          body:
            "Customers are invited to take part in a conversation where an AI voice asks open, relevant questions developed for your specific challenge. Responses are recorded and transcribed automatically, before being analysed by experienced researchers. The output is delivered in an interactive dashboard, making it easy to find patterns and key quotes.",
        },
        {
          title: "When is MindCalls most valuable?",
          body:
            "MindCalls is especially valuable when you need qualitative insight from many customers quickly – for example, to test new concepts, understand churn barriers, or get a broader picture of market shifts.",
        },
        {
          title: "Trust & GDPR",
          body:
            "Data security and anonymity are core. Participants are fully informed, and all data is handled securely and in compliance with regulations. You can access or delete your data at any time.",
        },
      ],
      cta: "Contact us to learn more",
      ctaHref: "#contact",
    },
    about: {
      label: "About Mind the Customer",
      title: "Customer insight with depth – since 2013",
      body:
        "Mind the Customer was founded by Ulrik Holskov, who has worked with customer insight and analysis since the early 2000s.\n\nBehind every project are more than 20 years of experience with qualitative and quantitative methods – and a fundamental conviction that insight only creates value when it gets used.\n\nThat’s why the work does not stop with the analysis. It stops when you have a clear picture of your customers and know what to do about it.",
      mind: {
        word: "Mind [maɪnd]",
        lines: [
          "To be aware of",
          "to take into account",
          "to care for",
          "to observe",
          "to understand",
        ],
      },
      name: "Ulrik Holskov",
    },
    clients: {
      label: "Clients",
      title: "Examples of companies Mind the Customer has worked with",
      logos: [
        "Forsvaret",
        "Scandlines",
        "Domino's",
        "Coop",
        "Team Danmark",
        "Better Being",
        "Scandinavian Tobacco Group",
        "Chr. Hansen",
        "Haveselskabet",
        "Idrættens Analyseinstitut",
        "Audio Nova",
        "Seas NVE",
      ],
    },
    contact: {
      label: "Contact",
      title: "Let’s talk about your project",
      body:
        "Whether you have a concrete assignment ready or just want to explore the possibilities, you are welcome to reach out. We respond quickly.",
      name: "Ulrik Holskov",
      email: "ulrik@mindthecustomer.dk",
      phone: "+45 42 31 01 01",
    },
    footer: "© 2025 Mind the Customer",
  },
};

// --- DESIGN SYSTEM CLASSES ---
const headingClass = `text-4xl md:text-5xl font-medium tracking-tight`;
const bodyClass = "text-xl text-gray-700 font-normal";
const secondaryClass = "text-lg font-normal";

// --- NAVBAR ---
const Navbar = ({
  lang,
  setLang,
  content,
}: {
  lang: Language;
  setLang: (l: Language) => void;
  content: any;
}) => {
  const mainLinks = [
    { label: content.nav.services, href: "/#services", type: "a" },
    { label: content.nav.howWeWork, href: "/#how", type: "a" },
    { label: content.nav.mindcalls, href: "#mindcalls", type: "a" },
    { label: content.nav.about, href: "/#about", type: "a" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50 py-5">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-8 h-8 flex items-center justify-center text-white font-bold rounded transition-all hover:opacity-95"
            style={{ background: BRAND_NAVY }}
          >
            M
          </Link>
          <div
            className={`${secondaryClass} font-medium`}
            style={{ color: BRAND_NAVY }}
          >
            Mind the Customer
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8" style={{ color: BRAND_SECONDARY, fontWeight: 500 }}>
            {mainLinks.map(({ label, href, type }) =>
              type === "link" ? (
                <Link
                  key={href}
                  to={href}
                  className="opacity-90 hover:opacity-100 hover:-translate-y-1 transition-all duration-200"
                  style={{ WebkitTapHighlightColor: "transparent", color: BRAND_SECONDARY }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={href}
                  href={href}
                  className="opacity-90 hover:opacity-100 hover:-translate-y-1 transition-all duration-200"
                  style={{ WebkitTapHighlightColor: "transparent", color: BRAND_SECONDARY }}
                >
                  {label}
                </a>
              )
            )}
          </div>
          <div className="flex items-center gap-4 text-xs font-bold border-l border-gray-100 pl-8" style={{ color: BRAND_NEUTRAL }}>
            <button
              onClick={() => setLang("da")}
              className={`hover:text-brand-black transition-colors ${
                lang === "da"
                  ? "underline underline-offset-4"
                  : ""
              }`}
              aria-label="Skift til dansk"
              style={lang === "da" ? { color: BRAND_SECONDARY } : { color: BRAND_NEUTRAL, opacity: 0.7 }}
            >
              DA
            </button>
            <button
              onClick={() => setLang("en")}
              className={`hover:text-brand-black transition-colors ${
                lang === "en"
                  ? "underline underline-offset-4"
                  : ""
              }`}
              aria-label="Switch to English"
              style={lang === "en" ? { color: BRAND_SECONDARY } : { color: BRAND_NEUTRAL, opacity: 0.7 }}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero = ({ content }: { content: any }) => {
  // Remove line breaks in title, then split at the highlight (if present).
  const rawTitle = (content.hero.title || "").replace(/\n/g, " ").trim();
  const highlight = (content.hero.highlight || "").replace(/\n/g, " ").trim();

  // Find highlight at end of string (if present) and separate.
  let mainText = rawTitle;
  if (
    highlight &&
    rawTitle.endsWith(highlight)
  ) {
    mainText = rawTitle.slice(0, -highlight.length).trim();
    // Remove leading . , ; etc from leftover text if necessary
    if (mainText.endsWith(".") || mainText.endsWith(",") || mainText.endsWith(";") || mainText.endsWith(":")) {
      mainText = mainText.slice(0, -1).trim();
    }
  }
  // Render mainText + highlight (highlight colored same as CTA)
  return (
    <motion.section
      className="section-container min-h-[80vh] flex flex-col justify-center"
      {...fadeUp}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className={`${headingClass} mb-6 leading-[1.1]`} style={{ color: BRAND_NAVY }}>
            {mainText}{" "}
            <span style={{ color: BRAND_SECONDARY }}>
              {highlight}
            </span>
          </h1>
          <p className={`${bodyClass} mb-6 whitespace-pre-line`}>
            {content.hero.subtitle}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-200 group hover:scale-[1.022] focus:outline-none"
            style={{
              background: BRAND_SECONDARY,
              color: "#fff",
              transition: "transform 0.2s, background 0.2s",
            }}
          >
            {content.hero.cta}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
              <ArrowRight size={20} />
            </span>
          </a>
        </motion.div>
        <div>
          <img
            src={shadowImg}
            alt="Shadows representing human behaviour"
            className="w-full h-auto max-h-[520px] object-contain rounded-md grayscale contrast-125 transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </div>
    </motion.section>
  );
};

// --- WHAT WE DO / METHODS ---
const WhatWeDo = ({ content }: { content: any }) => (
  <motion.section
    id="services"
    style={{ background: BRAND_BG_ACCENT, transition: "background 0.3s" }}
    {...fadeUp}
  >
    <div className="section-container">
      <div className="max-w-3xl">
        <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
          {content.whatWeDo.label ?? ""}
        </span>
        <h2 className={`${headingClass} mb-6`} style={{ color: BRAND_NAVY }}>
          {content.whatWeDo.title ?? ""}
        </h2>
        <div className={`${bodyClass} mb-8 whitespace-pre-line`}>
          {content.whatWeDo.body ?? ""}
        </div>
        {Array.isArray(content.whatWeDo.methodCards) && (
          <div
            className="grid gap-8 mt-8 grid-cols-1 md:grid-cols-2"
          >
            {content.whatWeDo.methodCards.map((card: any, idx: number) => (
              <div
                key={idx}
                className="rounded-xl bg-white/80 border border-gray-100 p-10 shadow-sm flex flex-col min-h-[240px]"
                style={{
                  borderColor: BRAND_BG_ACCENT,
                  boxSizing: "border-box",
                }}
              >
                <div className="font-semibold mb-3 text-lg" style={{ color: BRAND_NAVY }}>
                  {card.label ?? ""}
                </div>
                <div className="text-gray-700 text-base" style={{ lineHeight: 1.6 }}>
                  {card.desc ?? ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.section>
);

// --- HOW WE WORK ---
const HowWeWork = ({ content }: { content: any }) => (
  <motion.section id="how" className="section-container" {...fadeUp}>
    <div className="max-w-3xl">
      <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
        {content.howWeWork.label ?? ""}
      </span>
      <h2 className={`${headingClass} mb-6 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
        {content.howWeWork.title ?? ""}
      </h2>
      {content.howWeWork.body && (
        <div className={`${bodyClass} mb-8 whitespace-pre-line`}>
          {content.howWeWork.body}
        </div>
      )}
      <div className="space-y-4 mt-8">
        {(content.howWeWork.bullets ?? []).map((point: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex items-start gap-4 ${secondaryClass} whitespace-pre-line`}
            style={{ color: BRAND_NEUTRAL }}
          >
            <div className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-full shrink-0 mt-1" style={{ borderColor: BRAND_NEUTRAL }}>
              <div className="w-1.5 h-1.5" style={{ background: BRAND_SECONDARY, borderRadius: "50%" }} />
            </div>
            <span>{point}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// --- INTERNATIONAL PROJECTS ---
const InternationalClients = ({ content }: { content: any }) => (
  <motion.section style={{ background: BRAND_NAVY, color: "#fff" }} {...fadeUp}>
    <div className="section-container">
      <div className="max-w-3xl mx-auto py-10">
        <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
          {content.internationalProjects.label ?? ""}
        </span>
        <h2 className={`${headingClass} mb-6 leading-tight whitespace-pre-line`} style={{ color: "#fff" }}>
          {content.internationalProjects.title ?? ""}
        </h2>
        <div className={`text-xl font-normal text-[#B8C3D6] whitespace-pre-line mb-4`}>
          {content.internationalProjects.body ?? ""}
        </div>
        {Array.isArray(content.internationalProjects.bullets) && (
          <div className="flex flex-wrap gap-3 mt-4">
            {content.internationalProjects.bullets.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs"
                style={{
                  background: BRAND_SECONDARY,
                  color: "#fff",
                  borderRadius: "9999px",
                  padding: "3px 16px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.section>
);

// --- MINDCALLS TEASER ---
const MindCallsTeaser = ({ content }: { content: any }) => {
  const c = content.mindCallsTeaser;
  return (
    <motion.section id="mindcalls" className="section-container" {...fadeUp}>
      <div className="max-w-3xl">
        <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
          {c.eyebrow ?? ""}
        </span>
        <h2 className={`${headingClass} mb-6 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
          {c.title ?? ""}
        </h2>
        {(Array.isArray(c.paragraphs) ? c.paragraphs : []).map((p: string, i: number) => (
          <div key={i} className={`${bodyClass} mb-4 whitespace-pre-line`}>
            {p}
          </div>
        ))}
        <a
          href={c.ctaHref}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-200 group hover:scale-[1.022] focus:outline-none"
          style={{
            background: BRAND_SECONDARY,
            color: "#fff",
            transition: "transform 0.2s, background 0.2s",
          }}
        >
          {c.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
            <ArrowRight size={20} />
          </span>
        </a>
      </div>
    </motion.section>
  );
};

// --- MINDCALLS EXPANDED SECTION ---
const MindCallsDetail = ({ content }: { content: any }) => {
  const c = content.mindCallsDetail;
  return (
    <motion.section id="mindcalls-detail" className="section-container" {...fadeUp}>
      <div className="max-w-3xl">
        <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
          {c.eyebrow ?? ""}
        </span>
        <h2 className={`${headingClass} mb-6 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
          {c.title ?? ""}
        </h2>
        <div className={`${bodyClass} mb-6 whitespace-pre-line`}>
          {c.intro}
        </div>
        {Array.isArray(c.sections) && c.sections.map((section: any, idx: number) => (
          <div key={idx} className="mb-6">
            <div className="font-semibold text-lg mb-2" style={{ color: BRAND_SECONDARY }}>
              {section.title}
            </div>
            <div className="text-base text-gray-700 whitespace-pre-line">{section.body}</div>
          </div>
        ))}
        <a
          href={c.ctaHref}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-200 group hover:scale-[1.022] focus:outline-none"
          style={{
            background: BRAND_SECONDARY,
            color: "#fff",
            transition: "transform 0.2s, background 0.2s",
          }}
        >
          {c.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
            <ArrowRight size={20} />
          </span>
        </a>
      </div>
    </motion.section>
  );
};

// --- ABOUT ---
const About = ({ content }: { content: any }) => (
  <motion.section id="about" style={{ background: BRAND_BG_ACCENT }} {...fadeUp}>
    <div className="section-container">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-3/5">
          <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
            {content.about.label ?? ""}
          </span>
          <h2 className={`${headingClass} mb-6 leading-tight`} style={{ color: BRAND_NAVY }}>
            {content.about.title ?? ""}
          </h2>
          <div className={`${bodyClass} mb-8 whitespace-pre-line`} style={{ color: BRAND_NAVY, opacity: 0.88 }}>
            {content.about.body ?? ""}
          </div>
        </div>
        <div className="md:w-2/5 flex flex-col justify-end items-start">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 w-full">
            <img
              src={ulrikImg}
              alt="Ulrik Holskov"
              className="w-full max-w-[300px] h-auto object-contain rounded-xl mb-2"
              style={{ background: "#ececec" }}
            />
            <span className="text-sm" style={{ color: BRAND_NEUTRAL }}>
              {content.about.name}
            </span>
          </div>
          {content.about.mind && (
            <div className="border-t border-gray-200 pt-6 w-full">
              <span className="text-sm font-medium block mb-3" style={{ color: BRAND_NAVY }}>
                {content.about.mind.word}
              </span>
              <div className="space-y-1">
                {content.about.mind.lines.map((line: string, i: number) => (
                  <motion.p
                    key={i}
                    className={
                      secondaryClass +
                      " cursor-pointer transition-transform duration-200"
                    }
                    whileHover={{ x: 6 }}
                    style={{ color: BRAND_NEUTRAL }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.section>
);

// --- CLIENTS ---
const Clients = ({ content }: { content: any }) => (
  <motion.section id="clients" className="section-container pt-0 pb-24" {...fadeUp}>
    <div className="border-t border-gray-100 pt-10">
      <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
        {content.clients.label ?? ""}
      </span>
      <h2 className={`${headingClass} mb-8 text-center`} style={{ color: BRAND_NAVY }}>
        {content.clients.title ?? ""}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 justify-items-center mt-8">
        {(content.clients.logos ?? []).map((client: string, i: number) => (
          <motion.div
            key={i}
            className={
              "rounded-xl bg-white/80 border p-4 text-center " +
              secondaryClass +
              " tracking-tight cursor-pointer transition-all"
            }
            whileHover={{ opacity: 1, y: -2, scale: 1.05 }}
            transition={{ type: "tween", duration: 0.18 }}
            style={{
              opacity: 0.82,
              minWidth: "8rem",
              color: BRAND_NEUTRAL,
              fontWeight: 500,
              borderColor: BRAND_BG_ACCENT,
            }}
          >
            {client}
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// --- CONTACT ---
const Contact = ({ content }: { content: any }) => (
  <motion.section id="contact" className="section-container" {...fadeUp}>
    <div className="max-w-4xl py-16">
      <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
        {content.contact.label ?? ""}
      </span>
      <h2 className={`${headingClass} mb-6`} style={{ color: BRAND_NAVY }}>
        {content.contact.title ?? ""}
      </h2>
      <div className={`${bodyClass} mb-8 whitespace-pre-line`} style={{ color: BRAND_NAVY, opacity: 0.88 }}>
        {content.contact.body ?? ""}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`${bodyClass} flex items-center gap-4 font-medium`} style={{ color: BRAND_NAVY }}>
          <span className="block">{content.contact.name}</span>
        </div>
        <a
          href={`mailto:${content.contact.email}`}
          className={`${bodyClass} flex items-center gap-4 hover:underline underline-offset-8 transition-transform duration-200 hover:scale-[1.025] focus:outline-none`}
          style={{ color: BRAND_SECONDARY }}
        >
          <Mail size={28} />
          {content.contact.email}
        </a>
        <a
          href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
          className={`${bodyClass} flex items-center gap-4 hover:underline underline-offset-8 transition-transform duration-200 hover:scale-[1.025] focus:outline-none`}
          style={{ color: BRAND_SECONDARY }}
        >
          <Phone size={28} />
          {content.contact.phone}
        </a>
      </div>
    </div>
  </motion.section>
);

// --- FOOTER ---
const Footer = ({ content }: { content: any }) => (
  <footer className="py-8 bg-white">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm font-normal" style={{ color: BRAND_SECONDARY, opacity: 0.93 }}>
        {content.footer}
      </div>
      <div className="flex gap-8 text-sm font-normal" style={{ color: BRAND_NEUTRAL }}>
        <a href="#" className="hover:text-black transition-colors">
          LinkedIn
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Cookies
        </a>
      </div>
    </div>
  </footer>
);

// --- PAGE WRAPPERS ---
const MainPage = ({ content }: { content: any }) => (
  <AnimatePresence mode="wait">
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero content={content} />
      <WhatWeDo content={content} />
      <HowWeWork content={content} />
      <InternationalClients content={content} />
      <MindCallsTeaser content={content} />
      <MindCallsDetail content={content} />
      <About content={content} />
      <Clients content={content} />
      <Contact content={content} />
    </motion.main>
  </AnimatePresence>
);

const MindCallsPage = () => {
  const loc = useLocation();
  const [lang, setLang] = useState<Language>(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.pathname.startsWith("/en") ||
        window.location.pathname.endsWith("/en"))
    )
      return "en";
    return "da";
  });

  useEffect(() => {
    if (loc.pathname.startsWith("/en")) setLang("en");
    else setLang("da");
  }, [loc.pathname]);
  const content = translations[lang];

  return <MindCallsDetail content={content} />;
};

export default function App() {
  const [lang, setLang] = useState<Language>("da");
  const content = translations[lang];

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar lang={lang} setLang={setLang} content={content} />

        <Routes>
          <Route path="/" element={<MainPage content={content} />} />
          <Route path="/mindcalls" element={<MindCallsPage />} />
        </Routes>

        <Footer content={content} />
      </div>
    </Router>
  );
}
