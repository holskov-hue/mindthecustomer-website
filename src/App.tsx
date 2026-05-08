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
  useNavigate,
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
      mindtell: "MindTell",
      clients: "Kunder",
      about: "Om Mind the Customer",
      contact: "Kontakt",
      international: "Internationale projekter",
    },
    hero: {
      title: "De fleste virksomheder ved, hvad deres kunder gør.",
      highlight: "Færre forstår hvorfor!",
      subtitle: "Mind the Customer afdækker det, der ligger bag kunders valg og fravalg — også når det ikke fremgår af synlige data.",
      cta: "Skal vi tage en snak?",
    },
    whatWeDo: {
      label: "Hvad vi gør",
      title: "Indsigt der forklarer — ikke bare beskriver",
      body: `Data fortæller, hvad der sker. Sjældnere hvorfor — og endnu sjældnere, hvad man skal gøre ved det.

Mind the Customer arbejder med kvalitative interviews, fokusgrupper, etnografiske studier og brugerstudier, der afdækker de holdninger, oplevelser og drivkræfter, som ligger bag kunders valg og fravalg.

Afhængigt af problemstillingen suppleres de kvalitative indsigter med kvantitative analyser eller mixed methods-tilgange — så du får både dybde, overblik og et stærkere beslutningsgrundlag.

AI indgår også som en integreret del af analysearbejdet, når det styrker kvalitet, hastighed eller skalerbarhed. Det gælder blandt andet MindTell, hvor AI-assisterede samtaler gør det muligt at indsamle kvalitative indsigter i langt større skala — uden at miste den menneskelige fortolkning.

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
            "Kvantitative analyser og mixed methods-tilgange, når opgaven kræver både overblik, statistisk tyngde og dybere forståelse.",
        },
        {
          label: "AI-assisteret indsigt",
          desc:
            "MindTell og AI-assisterede metoder bruges, når opgaven kræver større skala, hurtigere læring eller nye måder at arbejde med kvalitative indsigter på.",
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
      body: `Hos Mind the Customer arbejder du direkte med en erfaren specialist fra første briefing til færdig analyse – én der både behersker metoderne og forstår den forretningsmæssige kontekst, de skal fungere i.

Det giver kortere vej fra spørgsmål til brugbar indsigt. Og indsigter der faktisk passer til din virkelighed.`,
      bullets: [
        "Kort vej fra spørgsmål til indsigt – uden unødige lag",
        "Metoden tilpasses opgaven undervejs, ikke omvendt",
        "Resultater du kan handle på med det samme",
      ],
    },
    internationalProjects: {
      label: "Internationale projekter",
      title: "Vil du forstå danske forbrugere?\n\nEller sammenligne indsigter på tværs af markeder?",
      body: `Danske forbrugere har deres egne præferencer, kulturelle koder og måder at træffe beslutninger på. At forstå dem kræver lokal indsigt, kontekstforståelse og metoder, der kommer tættere på virkeligheden bag data.

Mind the Customer hjælper både internationale virksomheder med studier på det danske marked og danske virksomheder, der arbejder internationalt eller ønsker indsigter på tværs af lande og kulturer.

Studier gennemføres både lokalt og i samarbejde med internationale partnere, afhængigt af projektets omfang og geografiske behov.`,
      bullets: [
        "Fokusgrupper",
        "Dybdeinterviews",
        "Etnografiske studier",
        "Brugerstudier",
        "Mixed methods",
      ],
    },
    mindtellTeaser: {
      eyebrow: "",
      // UPDATED below per instructions
      title: "Kvalitativ dybde.\n\nI stor skala.",
      body: `MindTell kombinerer AI-assisterede samtaler, intelligent analyse og menneskelig fortolkning i én samlet platform for kundeindsigt.

Resultatet er dybere læring, hurtigere analyse og kvalitative indsigter i langt større skala.`,
      cta: "Læs mere om MindTell →",
      ctaHref: "/mindtell"
    },
    mindtellDetail: {
      hero: {
        eyebrow: "MindTell",
        // UPDATED below per instructions
        title: "Kvalitativ dybde.\nI stor skala.",
        subtitle:
          "Platformen til AI-assisteret kundeindsigt, hvor menneskelig analyse og teknologi mødes.",
        cta: "Book en demo",
        ctaHref: "https://calendly.com/holskov/30min",
      },
      problem: {
        title: "Stærkere indsigt kræver mere end tal og enkle spørgeskemaer",
        body: `Traditionelle surveys kan måle, hvad der sker. Men når du vil forstå, hvorfor kunder vælger til, vælger fra – eller hvorfor markedet bevæger sig – er klassiske undersøgelser ofte ikke nok. 
          
Personlige interviews giver dybde, men kræver tid og ressourcer, der sætter en naturlig grænse for, hvor mange kunder du når. Meget viden forbliver derfor skjult under overfladen.`,
      },
      solution: {
        title: "MindTell forener samtale, menneskelig analyse og AI",
        body: `Med MindTell inviteres mange kunder til at deltage i samtaler, hvor en AI-stemme stiller åbne og relevante spørgsmål. Svarene optages, transskriberes og bearbejdes hurtigt, så menneskelige analytikere kan fokusere på at fortolke nuancer og mønstre i det komplette datamateriale.

Resultatet er dybere læring, hurtigere analyse og kvalitative indsigter i langt større skala – uden at miste det menneskelige blik.`,
      },
      features: [
        {
          title: "AI-assisterede samtaler",
          desc: "Skalérbare interviews, hvor en AI-stemme stiller relevante spørgsmål til mange kunder parallelt.",
        },
        {
          title: "Automatisk transskription",
          desc: "Svarene konverteres lynhurtigt til tekst – og forberedes til analyse.",
        },
        {
          title: "Intelligent analyse",
          desc: "Tekstanalyse og clustering hjælper med at strukturere store mængder af kundecitater og indsigter.",
        },
        {
          title: "Menneskelig fortolkning",
          desc: "Erfarne analytikere trækker de afgørende mønstre og indsigter ud – så du får dybde og overblik.",
        },
        {
          title: "Handlingsrettet dashboard",
          desc: "Resultaterne præsenteres i et interaktivt dashboard, klar til at understøtte beslutninger.",
        },
      ],
      benefits: {
        title: "Fordele ved MindTell",
        bullets: [
          "Få kvalitative indsigter fra langt flere kunder hurtigere",
          "Behold dybden og nuancerne – tab ikke vigtig information i skemaer",
          "Kort vej fra dataindsamling til analyse",
          "Fleksibel opsætning til din målgruppe og problemstilling"
        ],
      },
      gdpr: {
        title: "Datasikkerhed og GDPR",
        body: `MindTell-platformen er udviklet med datasikkerhed og anonymitet som fundament. Deltagere informeres tydeligt om formål og databehandling, og alt håndteres i overensstemmelse med gældende lovgivning. Du har til enhver tid adgang til – eller kan få slettet – indsamlede data.`,
      },
      contact: {
        cta: "Book en intro eller spørg om mulighederne",
        ctaHref: "https://calendly.com/holskov/30min",
      }
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
      mindtell: "MindTell",
      clients: "Clients",
      about: "About Mind the Customer",
      contact: "Contact",
      international: "International projects",
    },
    hero: {
      title:
        "Most companies know what their customers do.\n\nFew understand why.",
      highlight: "",
      subtitle:
        "Mind the Customer uncovers what lies behind customers’ choices and non-choices — even when it does not appear in visible data.",
      cta: "Let’s talk",
    },
    whatWeDo: {
      label: "What we do",
      title: "Research that explains — not just describes",
      body: `Data tells you what is happening. Less often why — and even less often what to do about it.

Mind the Customer works with qualitative interviews, focus groups, ethnographic studies and user research that uncover the attitudes, experiences and underlying drivers behind customers’ choices and behaviour.

Depending on the problem, qualitative insights are complemented with quantitative analysis or mixed methods approaches — providing both depth, perspective and a stronger foundation for decision-making.

AI is also integrated into the research process when it improves quality, speed or scalability. This includes MindTell, where AI-assisted conversations make it possible to collect qualitative insights at a much larger scale — without losing human interpretation and contextual understanding.

The method is always chosen based on the problem. Never the other way around.`,
      methodCards: [
        {
          label: "Qualitative analysis",
          desc:
            "Interviews, focus groups and ethnographic studies that uncover the motivations, needs and decision processes behind customer behaviour.",
        },
        {
          label: "Mixed methods",
          desc:
            "Quantitative analysis and mixed methods approaches when the project requires both strategic overview, statistical rigour and deeper understanding.",
        },
        {
          label: "AI-assisted insight",
          desc:
            "MindTell and AI-assisted methods are used when the project requires greater scale, faster learning or new ways of working with qualitative insight.",
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
      body: `At Mind the Customer, you work directly with an experienced specialist from first briefing to finished analysis – someone who both masters the methods and understands the business context in which they must work.

That means a shorter path from question to actionable insight. And insights that truly fit your reality.`,
      bullets: [
        "Short path from question to insight – with no unnecessary layers",
        "The method adapts to the project as it develops, not the other way around",
        "Results you can act on right away",
      ],
    },
    internationalProjects: {
      label: "International projects",
      title:
        "Looking to understand Danish consumers?\n\nOr compare insights across markets?",
      body: `Danish consumers have their own preferences, cultural codes and ways of making decisions. Understanding them requires local insight, contextual understanding and methods that get closer to the reality behind the data.

Mind the Customer supports both international companies conducting studies in Denmark and Danish companies working internationally or seeking insights across countries and cultures.

Studies are conducted both locally and in collaboration with international partners, depending on the scope and geographic needs of the project.`,
      bullets: [
        "Focus groups",
        "In-depth interviews",
        "Ethnographic studies",
        "User research",
        "Mixed methods",
      ],
    },
    mindtellTeaser: {
      eyebrow: "",
      // UPDATED below per instructions
      title: "Qualitative depth.\n\nAt scale.",
      body: `MindTell combines AI-assisted conversations, intelligent analysis and human interpretation in one integrated customer insight platform.

The result is deeper learning, faster analysis and qualitative insight at a much larger scale.`,
      cta: "Learn more about MindTell →",
      ctaHref: "/mindtell"
    },
    mindtellDetail: {
      hero: {
        eyebrow: "MindTell",
        // UPDATED below per instructions
        title: "Qualitative depth.\nAt scale.",
        subtitle:
          "The platform for AI-assisted customer insight, combining human analysis and technology.",
        cta: "Book a demo",
        ctaHref: "https://calendly.com/holskov/30min",
      },
      problem: {
        title: "Deeper insight takes more than numbers and basic surveys",
        body: `Traditional surveys can measure what’s happening. But when you want to know why customers choose or leave – or why the market is shifting – classic questionnaires are often not enough. 

Personal interviews provide depth, but require resources that naturally limit how many customers you reach. Much insight is left hidden below the surface.`,
      },
      solution: {
        title: "MindTell unites AI, conversation and human analysis",
        body: `With MindTell, many customers are invited into conversations where an AI voice asks open, relevant questions. Answers are recorded, transcribed and rapidly prepared so human analysts can focus on interpreting the nuance and patterns in the complete data set.

The result is deeper learning, faster analysis and qualitative insights at far greater scale – without losing the crucial human perspective.`,
      },
      features: [
        {
          title: "AI-assisted interviews",
          desc: "Scalable interviews, with an AI voice conducting relevant conversations in parallel with many customers.",
        },
        {
          title: "Automatic transcription",
          desc: "Responses are instantly transcribed – and prepared for analysis.",
        },
        {
          title: "Intelligent analysis",
          desc: "Text analysis and clustering structure large volumes of quotes and insight.",
        },
        {
          title: "Human interpretation",
          desc: "Experienced analysts draw out patterns and key insights – ensuring both depth and overview.",
        },
        {
          title: "Actionable dashboard",
          desc: "Results are presented in an interactive dashboard, ready to support your decisions.",
        },
      ],
      benefits: {
        title: "MindTell – key advantages",
        bullets: [
          "Get qualitative insight from far more customers, faster",
          "Keep the depth and nuance – don’t lose crucial detail in forms",
          "Short path from data collection to insight",
          "Flexible for your target group and challenge",
        ],
      },
      gdpr: {
        title: "Data security & GDPR",
        body: `MindTell is designed from the ground up for privacy and GDPR compliance. Participants are fully informed about usage and handling, and all data is managed in strict accordance with regulations. You can access or have your collected data erased at any time.`,
      },
      contact: {
        cta: "Book an introduction or ask about possibilities",
        ctaHref: "https://calendly.com/holskov/30min",
      }
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
    { label: content.nav.international, href: "/#international", type: "a" },
    { label: content.nav.mindtell, href: "/mindtell", type: "link" },
    { label: content.nav.about, href: "/#about", type: "a" },
    { label: content.nav.contact, href: "/#contact", type: "a" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50 py-5">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-8 h-8 flex items-center justify-center text-white font-bold rounded transition-all hover:opacity-95"
            style={{ background: BRAND_NAVY }}
            aria-label="Goto homepage"
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
  // Render the Danish and English hero headlines so both use identical accent handling for the second line,
  // using the same styling, line break logic, and typography.
  const isDA = content.nav?.services === "Hvad vi gør";

  // For Danish: headline and highlight are separate fields, preserve as is.
  // For English: split at "\n\n" to match the DK accent styling.
  if (isDA) {
    const title = (content.hero.title || "").replace(/\n/g, " ").trim();
    const highlight = (content.hero.highlight || "").replace(/\n/g, " ").trim();
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
              {title}
              {highlight && (
                <>
                  <br />
                  <span style={{ color: BRAND_SECONDARY }}>
                    {highlight}
                  </span>
                </>
              )}
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
  }

  // --- English headline with Danish accent styling for second line ---
  // We'll split at the first double line break. The first part is the main title,
  // the second is the accent line.
  const rawTitle = content.hero.title || "";
  const [mainLine, accentLine] = rawTitle.split(/\n\s*\n/);

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
            {mainLine && mainLine.replace(/\n/g, " ").trim()}
            {accentLine && (
              <>
                <br />
                <span style={{ color: BRAND_SECONDARY }}>
                  {accentLine.replace(/\n/g, " ").trim()}
                </span>
              </>
            )}
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
const WhatWeDo = ({ content }: { content: any }) => {
  const isDanish =
    content.nav?.services === "Hvad vi gør" ||
    content.whatWeDo?.label === "Hvad vi gør";
  const isEnglish =
    content.nav?.services === "What we do" ||
    content.whatWeDo?.label === "What we do";

  const dkTitle = "Indsigt der forklarer — ikke bare beskriver";
  const dkBody = `Data fortæller, hvad der sker. Sjældnere hvorfor — og endnu sjældnere, hvad man skal gøre ved det.

Mind the Customer arbejder med kvalitative interviews, fokusgrupper, etnografiske studier og brugerstudier, der afdækker de holdninger, oplevelser og drivkræfter, som ligger bag kunders valg og fravalg.

Afhængigt af problemstillingen suppleres de kvalitative indsigter med kvantitative analyser eller mixed methods-tilgange — så du får både dybde, overblik og et stærkere beslutningsgrundlag.

AI indgår også som en integreret del af analysearbejdet, når det styrker kvalitet, hastighed eller skalerbarhed. Det gælder blandt andet MindTell, hvor AI-assisterede samtaler gør det muligt at indsamle kvalitative indsigter i langt større skala — uden at miste den menneskelige fortolkning.

Metoden vælges altid ud fra problemstillingen. Aldrig omvendt.`;

  const enTitle = "Research that explains — not just describes";
  const enBody = `Data tells you what is happening. Less often why — and even less often what to do about it.

Mind the Customer works with qualitative interviews, focus groups, ethnographic studies and user research that uncover the attitudes, experiences and underlying drivers behind customers’ choices and behaviour.

Depending on the problem, qualitative insights are complemented with quantitative analysis or mixed methods approaches — providing both depth, perspective and a stronger foundation for decision-making.

AI is also integrated into the research process when it improves quality, speed or scalability. This includes MindTell, where AI-assisted conversations make it possible to collect qualitative insights at a much larger scale — without losing human interpretation and contextual understanding.

The method is always chosen based on the problem. Never the other way around.`;

  function getMethodCardDesc(card: any, idx: number) {
    if (isDanish) {
      if (
        card.label === "Mixed methods" ||
        card.label?.toLocaleLowerCase().includes("mixed methods") ||
        idx === 1
      ) {
        return "Kvantitative analyser og mixed methods-tilgange, når opgaven kræver både overblik, statistisk tyngde og dybere forståelse.";
      }
    }
    if (isEnglish) {
      if (
        card.label === "Mixed methods" ||
        card.label?.toLocaleLowerCase().includes("mixed methods") ||
        idx === 1
      ) {
        return "Quantitative analysis and mixed methods approaches when the project requires both strategic overview, statistical rigour and deeper understanding.";
      }
    }
    return card.desc ?? "";
  }

  return (
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
          <h2 className={`${headingClass} mb-6 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
            {isDanish ? dkTitle : isEnglish ? enTitle : content.whatWeDo.title ?? ""}
          </h2>
          <div className={`${bodyClass} mb-8 whitespace-pre-line`}>
            {isDanish ? dkBody : isEnglish ? enBody : content.whatWeDo.body ?? ""}
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
                    {getMethodCardDesc(card, idx)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

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
const InternationalClients = ({ content }: { content: any }) => {
  // Replaced title/body/tags for both Danish and English with updated version
  const isDanish =
    content.nav?.services === "Hvad vi gør" ||
    content.internationalProjects?.label === "Internationale projekter";
  const isEnglish =
    content.nav?.services === "What we do" ||
    content.internationalProjects?.label === "International projects";
  const dkTitle =
    "Vil du forstå danske forbrugere?\n\nEller sammenligne indsigter på tværs af markeder?";
  const dkBody = `Danske forbrugere har deres egne præferencer, kulturelle koder og måder at træffe beslutninger på. At forstå dem kræver lokal indsigt, kontekstforståelse og metoder, der kommer tættere på virkeligheden bag data.

Mind the Customer hjælper både internationale virksomheder med studier på det danske marked og danske virksomheder, der arbejder internationalt eller ønsker indsigter på tværs af lande og kulturer.

Studier gennemføres både lokalt og i samarbejde med internationale partnere, afhængigt af projektets omfang og geografiske behov.`;
  const dkTags = [
    "Fokusgrupper",
    "Dybdeinterviews",
    "Etnografiske studier",
    "Brugerstudier",
    "Mixed methods",
  ];
  const enTitle =
    "Looking to understand Danish consumers?\n\nOr compare insights across markets?";
  const enBody = `Danish consumers have their own preferences, cultural codes and ways of making decisions. Understanding them requires local insight, contextual understanding and methods that get closer to the reality behind the data.

Mind the Customer supports both international companies conducting studies in Denmark and Danish companies working internationally or seeking insights across countries and cultures.

Studies are conducted both locally and in collaboration with international partners, depending on the scope and geographic needs of the project.`;
  const enTags = [
    "Focus groups",
    "In-depth interviews",
    "Ethnographic studies",
    "User research",
    "Mixed methods",
  ];

  return (
    <motion.section id="international" style={{ background: BRAND_NAVY, color: "#fff" }} {...fadeUp}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto py-10">
          <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
            {isDanish ? "Internationale projekter" : isEnglish ? "International projects" : (content.internationalProjects.label ?? "")}
          </span>
          <h2 className={`${headingClass} mb-6 leading-tight whitespace-pre-line`} style={{ color: "#fff" }}>
            {isDanish ? dkTitle : isEnglish ? enTitle : content.internationalProjects.title ?? ""}
          </h2>
          <div className={`text-xl font-normal text-[#B8C3D6] whitespace-pre-line mb-4`}>
            {isDanish ? dkBody : isEnglish ? enBody : content.internationalProjects.body ?? ""}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {(isDanish ? dkTags : isEnglish ? enTags : (content.internationalProjects.bullets ?? [])).map((tag: string, idx: number) => (
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
        </div>
      </div>
    </motion.section>
  );
};

// --- MINDTELL TEASER (for HOME only) ---
const MindTellTeaser = ({ content }: { content: any }) => {
  const navigate = useNavigate();
  const c = content.mindtellTeaser;
  return (
    <motion.section id="mindtell" className="section-container" {...fadeUp}>
      <div className="max-w-3xl">
        <h2 className={`${headingClass} mb-6 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
          {c.title ?? ""}
        </h2>
        <div className={`${bodyClass} mb-8 whitespace-pre-line`}>
          {c.body ?? ""}
        </div>
        <button
          onClick={() => navigate("/mindtell")}
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
        </button>
      </div>
    </motion.section>
  );
};

// --- DEDICATED MINDTELL PRODUCT PAGE ---
const MindTellPage = ({ content }: { content: any }) => {
  const mindtell = content.mindtellDetail;
  return (
    <main>
      {/* Hero Section */}
      <motion.section className="section-container mt-12 mb-0" {...fadeUp}>
        <div className="max-w-3xl mx-auto text-center">
          {mindtell.hero.eyebrow && (
            <span className="block text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: BRAND_NEUTRAL }}>
              {mindtell.hero.eyebrow}
            </span>
          )}
          <h1 className={`${headingClass} mb-4 whitespace-pre-line`} style={{ color: BRAND_NAVY }}>
            {mindtell.hero.title}
          </h1>
          {mindtell.hero.subtitle && (
            <div className={`${bodyClass} mb-7 text-gray-700`} style={{ opacity: 0.89 }}>
              {mindtell.hero.subtitle}
            </div>
          )}
          <a
            href={mindtell.hero.ctaHref}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-200 group hover:scale-[1.022] focus:outline-none"
            style={{ background: BRAND_SECONDARY, color: "#fff" }}
          >
            {mindtell.hero.cta}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
              <ArrowRight size={20} />
            </span>
          </a>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section className="section-container max-w-3xl mx-auto" {...fadeUp}>
        <div className="mb-8">
          <h2 className={`${headingClass} mb-4 text-2xl md:text-3xl`} style={{ color: BRAND_SECONDARY }}>
            {mindtell.problem.title}
          </h2>
          <div className={`${bodyClass} whitespace-pre-line`} style={{ color: BRAND_NAVY, opacity: 0.93 }}>
            {mindtell.problem.body}
          </div>
        </div>
      </motion.section>

      {/* Solution / Workflow */}
      <motion.section className="section-container max-w-3xl mx-auto py-12" {...fadeUp}>
        <div className="mb-8">
          <h2 className={`${headingClass} mb-4 text-2xl md:text-3xl`} style={{ color: BRAND_SECONDARY }}>
            {mindtell.solution.title}
          </h2>
          <div className={`${bodyClass} whitespace-pre-line`} style={{ color: BRAND_NAVY, opacity: 0.93 }}>
            {mindtell.solution.body}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {mindtell.features.map((f: any, idx: number) => (
            <div
              key={f.title}
              className="bg-white/90 border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col min-h-[140px]"
              style={{ borderColor: BRAND_BG_ACCENT }}
            >
              <div className="font-semibold text-lg mb-2" style={{ color: BRAND_NAVY }}>
                {f.title}
              </div>
              <div className="text-base text-gray-700" style={{ lineHeight: 1.5 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Benefits */}
      {mindtell.benefits && (
        <motion.section className="section-container max-w-3xl mx-auto py-8" {...fadeUp}>
          <h2 className={`${headingClass} mb-5 text-2xl md:text-3xl`} style={{ color: BRAND_SECONDARY }}>
            {mindtell.benefits.title}
          </h2>
          <ul className="list-none space-y-4">
            {mindtell.benefits.bullets.map((b: string, idx: number) => (
              <li key={idx} className={`${bodyClass} flex gap-3 items-start`} style={{ color: BRAND_NAVY }}>
                <span className="mt-2 w-3 h-3 rounded-full inline-block" style={{ background: BRAND_SECONDARY, marginRight: 8, minWidth: 12 }}></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* GDPR/Trust */}
      <motion.section className="section-container max-w-3xl mx-auto py-8" {...fadeUp}>
        <h2 className={`${headingClass} mb-4 text-2xl md:text-3xl`} style={{ color: BRAND_SECONDARY }}>
          {mindtell.gdpr.title}
        </h2>
        <div className={`${bodyClass} whitespace-pre-line`} style={{ color: BRAND_NAVY, opacity: 0.89 }}>
          {mindtell.gdpr.body}
        </div>
      </motion.section>

      {/* Contact CTA */}
      {mindtell.contact && (
        <motion.section className="section-container max-w-3xl mx-auto py-10 flex justify-center" {...fadeUp}>
          <a
            href={mindtell.contact.ctaHref}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-200 group hover:scale-[1.022] focus:outline-none"
            style={{ background: BRAND_SECONDARY, color: "#fff" }}
          >
            {mindtell.contact.cta}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
              <ArrowRight size={20} />
            </span>
          </a>
        </motion.section>
      )}
    </main>
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
    <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center">
      <div
        className="text-sm font-normal text-center"
        style={{ color: BRAND_SECONDARY, opacity: 0.93 }}
      >
        <span>Mind [maɪnd]</span>
        <br />
        <span>At være opmærksom på · observere · forstå</span>
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
      <MindTellTeaser content={content} />
      <About content={content} />
      <Clients content={content} />
      <Contact content={content} />
    </motion.main>
  </AnimatePresence>
);

// --- APP ROUTING & APP ---
export default function App() {
  const [lang, setLang] = useState<Language>("da");
  const content = translations[lang];

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar lang={lang} setLang={setLang} content={content} />

        <Routes>
          <Route path="/" element={<MainPage content={content} />} />
          <Route
            path="/mindtell"
            element={<MindTellPage content={content} />}
          />
        </Routes>

        <Footer content={content} />
      </div>
    </Router>
  );
}
