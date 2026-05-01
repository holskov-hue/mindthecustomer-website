import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Globe, Phone } from "lucide-react";

type Language = "da" | "en";

const translations = {
  da: {
    nav: {
      services: "Hvad vi gør",
      howWeWork: "Hvordan vi arbejder",
      mindcalls: "MindCalls",
      clients: "Kunder",
      about: "Om os",
      contact: "Kontakt",
    },
    hero: {
      title: "Forstå dine kunder bedre",
      subtitle:
        "Specialist i kvalitativ kundeindsigt og mixed methods – med fokus på reel forståelse, der kan bruges i praksis.",
      cta: "Skal vi tage en snak?",
    },
    whatWeDo: {
      title: "Hvad vi gør",
      intro: "Vi hjælper virksomheder med at forstå deres kunder i dybden.",
      why: "Ikke kun hvad de gør – men hvorfor.",
      methods:
        "Arbejdet tager udgangspunkt i kvalitative metoder – og suppleres med kvantitative data, når det er relevant.",
      custom: "Hver opgave tilpasses den konkrete problemstilling.",
    },
    howWeWork: {
      title: "Hvordan vi arbejder",
      intro: "Samarbejdet er direkte, enkelt og uden unødige lag.",
      direct: "Du arbejder med én erfaren rådgiver – fra design til analyse.",
      label: "Det giver:",
      benefits: [
        "kort vej fra spørgsmål til indsigt",
        "fleksibilitet undervejs",
        "resultater, der er til at handle på",
      ],
    },
    international: {
      tag: "Internationale projekter",
      title:
        "Vi hjælper internationale virksomheder med at forstå danske forbrugere – deres adfærd, præferencer og valg.",
      desc:
        "Gennem interviews, fokusgrupper og brugerstudier omsætter vi lokale perspektiver til klare og anvendelige indsigter.",
    },
    mindcalls: {
      title: "MindCalls",
      desc:
        "MindCalls er en ny måde at arbejde med kundeindsigt på. Gennem AI-assisterede samtaler kan vi indsamle kvalitative indsigter i større skala – uden at miste dybden.",
      note:
        "Teknologien bruges som et supplement til klassiske metoder – ikke som erstatning.",
    },
    about: {
      title: "Om Mind the Customer",
      p1:
        "Siden 2013 har Mind the Customer hjulpet virksomheder med at forstå deres kunder – og omsætte indsigt til handling.",
      p2:
        "Arbejdet bygger på en enkel tilgang: Indsigt skal være relevant, forståelig og anvendelig.",
      mind: {
        word: "Mind [maind]",
        lines: [
          "At være opmærksom på",
          "tage hensyn til",
          "passe på",
          "observere",
          "forstå",
        ],
      },
    },
    contact: {
      title: "Kontakt",
      desc: "Skal vi tage en snak om din problemstilling?",
      cta: "Skriv til os",
    },
    clients: {
      title: "Udvalgte kunder",
      list: [
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
  },
  en: {
    nav: {
      services: "What we do",
      howWeWork: "How we work",
      mindcalls: "MindCalls",
      clients: "Clients",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Understand your customers better",
      subtitle:
        "Specialist in qualitative customer insight and mixed methods – creating real understanding that can be used in practice.",
      cta: "Let's talk",
    },
    whatWeDo: {
      title: "What we do",
      intro: "We help companies understand their customers in depth.",
      why: "Not just what they do – but why.",
      methods:
        "Our work is grounded in qualitative methods – supported by quantitative data when relevant.",
      custom: "Every project is tailored to the specific challenge.",
    },
    howWeWork: {
      title: "How we work",
      intro: "Collaboration is direct, simple, and without unnecessary layers.",
      direct: "You work with one experienced advisor – from design to analysis.",
      label: "This gives you:",
      benefits: [
        "a short path from question to insight",
        "flexibility throughout the process",
        "results that can be acted on",
      ],
    },
    international: {
      tag: "International projects",
      title:
        "We help international companies understand Danish consumers – their behaviour, preferences and choices.",
      desc:
        "Through interviews, focus groups and user studies, we translate local perspectives into clear and useful insights.",
    },
    mindcalls: {
      title: "MindCalls",
      desc:
        "MindCalls is a new way to work with customer insight. Through AI-assisted conversations, we can collect qualitative insight at scale – without losing depth.",
      note:
        "The technology is used as a supplement to classic methods – not as a replacement.",
    },
    about: {
      title: "About Mind the Customer",
      p1:
        "Since 2013, Mind the Customer has helped companies understand their customers – and turn insight into action.",
      p2:
        "The work is built on a simple approach: insight must be relevant, understandable and useful.",
      mind: {
        word: "Mind [maɪnd]",
        lines: [
          "To pay attention to",
          "to take into account",
          "to care for",
          "to observe",
          "to understand",
        ],
      },
    },
    contact: {
      title: "Contact",
      desc: "Ready to discuss your challenge?",
      cta: "Get in touch",
    },
    clients: {
      title: "Selected clients",
      list: [
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
  },
};

const Navbar = ({
  lang,
  setLang,
  content,
}: {
  lang: Language;
  setLang: (l: Language) => void;
  content: any;
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50 py-6">
    <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-black flex items-center justify-center text-white font-bold rounded">
          M
        </div>
        <div className="font-semibold text-lg tracking-tight">Mind the Customer</div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-gray">
          <a href="#services" className="hover:text-brand-black transition-colors">
            {content.nav.services}
          </a>
          <a href="#how" className="hover:text-brand-black transition-colors">
            {content.nav.howWeWork}
          </a>
          <a href="#mindcalls" className="hover:text-brand-black transition-colors">
            {content.nav.mindcalls}
          </a>
          <a href="#about" className="hover:text-brand-black transition-colors">
            {content.nav.about}
          </a>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-brand-gray border-l border-gray-100 pl-8">
          <button
            onClick={() => setLang("da")}
            className={`hover:text-brand-black transition-colors ${
              lang === "da" ? "text-brand-black underline underline-offset-4" : ""
            }`}
          >
            DA
          </button>
          <button
            onClick={() => setLang("en")}
            className={`hover:text-brand-black transition-colors ${
              lang === "en" ? "text-brand-black underline underline-offset-4" : ""
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ content }: { content: any }) => (
  <section className="section-container min-h-[80vh] flex flex-col justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl"
    >
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1]">
        {content.hero.title}
      </h1>

      <p className="text-xl md:text-2xl text-brand-gray font-light leading-relaxed mb-12">
        {content.hero.subtitle}
      </p>

      <a
        href="#contact"
        className="inline-flex items-center gap-3 bg-brand-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
      >
        {content.hero.cta}
        <ArrowRight size={20} />
      </a>
    </motion.div>
  </section>
);

const WhatWeDo = ({ content }: { content: any }) => (
  <section id="services" className="bg-brand-light">
    <div className="section-container">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-medium mb-10">{content.whatWeDo.title}</h2>

        <p className="text-2xl font-medium text-brand-black mb-6 leading-snug">
          {content.whatWeDo.intro}
        </p>

        <p className="text-xl text-brand-gray font-light mb-10 italic">
          {content.whatWeDo.why}
        </p>

        <div className="space-y-6 text-brand-gray font-light leading-relaxed">
          <p>{content.whatWeDo.methods}</p>
          <p className="font-medium text-brand-black">{content.whatWeDo.custom}</p>
        </div>
      </div>
    </div>
  </section>
);

const HowWeWork = ({ content }: { content: any }) => (
  <section id="how" className="section-container">
    <div className="grid md:grid-cols-2 gap-20">
      <div>
        <h2 className="text-4xl font-medium mb-10">{content.howWeWork.title}</h2>

        <p className="text-xl text-brand-gray font-light leading-relaxed mb-6">
          {content.howWeWork.intro}
        </p>

        <p className="text-xl font-medium text-brand-black leading-relaxed">
          {content.howWeWork.direct}
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-gray mb-6">
            {content.howWeWork.label}
          </p>

          {content.howWeWork.benefits.map((benefit: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 text-lg font-light text-brand-black"
            >
              <div className="w-1.5 h-1.5 bg-brand-black rounded-full" />
              {benefit}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const InternationalClients = ({ content }: { content: any }) => (
  <section className="bg-brand-black text-white">
    <div className="section-container">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 block">
            {content.international.tag}
          </span>

          <h2 className="text-4xl font-medium mb-8 leading-tight">
            {content.international.title}
          </h2>

          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {content.international.desc}
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          <Globe size={300} strokeWidth={0.5} className="text-gray-800" />
        </div>
      </div>
    </div>
  </section>
);

const MindCalls = ({ content }: { content: any }) => (
  <section id="mindcalls" className="section-container">
    <div className="max-w-4xl">
      <h2 className="text-5xl font-medium mb-8">{content.mindcalls.title}</h2>

      <p className="text-2xl text-brand-black font-light leading-relaxed mb-8">
        {content.mindcalls.desc}
      </p>

      <p className="text-lg text-brand-gray font-light leading-relaxed italic border-l-2 border-gray-100 pl-8">
        {content.mindcalls.note}
      </p>
    </div>
  </section>
);

const About = ({ content }: { content: any }) => (
  <section id="about" className="bg-brand-light">
    <div className="section-container">
      <div className="flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-medium mb-10 leading-tight">
            {content.about.title}
          </h2>

          <p className="text-xl text-brand-gray font-light leading-relaxed mb-8">
            {content.about.p1}
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col justify-end">
          <p className="text-xl font-medium text-brand-black leading-relaxed mb-12">
            {content.about.p2}
          </p>

          <div className="border-t border-gray-200 pt-8">
            <span className="text-xs font-bold block mb-4 uppercase tracking-widest">
              {content.about.mind.word}
            </span>

            <div className="space-y-1">
              {content.about.mind.lines.map((line: string, i: number) => (
                <p key={i} className="text-base text-brand-gray italic font-light">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Clients = ({ content }: { content: any }) => (
  <section id="clients" className="section-container pt-0 pb-32">
    <div className="border-t border-gray-100 pt-16">
      <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gray mb-12 text-center">
        {content.clients.title}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        {content.clients.list.map((client: string, i: number) => (
          <span key={i} className="text-lg font-medium tracking-tight text-brand-black">
            {client}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Contact = ({ content }: { content: any }) => (
  <section id="contact" className="section-container">
    <div className="max-w-4xl py-20">
      <h2 className="text-6xl font-medium mb-12 tracking-tight">
        {content.contact.title}
      </h2>

      <p className="text-3xl text-brand-gray font-light leading-relaxed mb-16">
        {content.contact.desc}
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        <a
          href="mailto:ulrik@mindthecustomer.dk"
          className="flex items-center gap-4 text-2xl font-medium text-brand-black hover:underline underline-offset-8"
        >
          <Mail size={28} />
          ulrik@mindthecustomer.dk
        </a>

        <a
          href="tel:+4542310101"
          className="flex items-center gap-4 text-2xl font-medium text-brand-black hover:underline underline-offset-8"
        >
          <Phone size={28} />
          +45 42 31 01 01
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-white">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-brand-gray text-sm font-medium">
        © 2024 Mind the Customer
      </div>

      <div className="flex gap-8 text-sm font-medium text-brand-gray">
        <a href="#" className="hover:text-brand-black transition-colors">
          LinkedIn
        </a>
        <a href="#" className="hover:text-brand-black transition-colors">
          Cookies
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState<Language>("da");
  const content = translations[lang];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} content={content} />

      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Hero content={content} />
          <WhatWeDo content={content} />
          <HowWeWork content={content} />
          <InternationalClients content={content} />
          <MindCalls content={content} />
          <About content={content} />
          <Clients content={content} />
          <Contact content={content} />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
