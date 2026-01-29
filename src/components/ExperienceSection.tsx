import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const experiences = [
  {
    company: "Innovation & Decision",
    role: "Développeur Mobile Full Stack",
    period: "Juillet 2024 - Septembre 2024",
    location: "Tunisie",
    description:
      "Développement d'une application complète de gestion de parking avec réservation en temps réel, intégration de paiements et carte interactive.",
    achievements: [
      "Application mobile Flutter avec architecture propre",
      "Backend NestJS avec API RESTful",
      "Intégration Maps API pour géolocalisation",
      "Système de paiement sécurisé",
      "Notifications temps réel",
    ],
    tags: ["Flutter", "NestJS", "Maps API", "Real-time", "Payments"],
  },
  {
    company: "OACA",
    role: "Développeur Python – Automatisation",
    period: "Juillet 2024 - Août 2024",
    location: "Tunisie",
    description:
      "Développement d'un système automatisé pour la génération de certificats fiscaux au format XML, avec interface graphique utilisateur.",
    achievements: [
      "Génération automatisée de documents XML",
      "Interface utilisateur avec Tkinter",
      "Base de données SQLite",
      "Validation et traitement de données",
    ],
    tags: ["Python", "XML", "SQLite", "Tkinter", "Automation"],
  },
  {
    company: "SITEX",
    role: "Développeur Systèmes Embarqués (PFE)",
    period: "Février 2022 - Juin 2022",
    location: "Tunisie",
    description:
      "Conception et développement d'un système embarqué IoT pour la commande et la surveillance intelligente de groupes électrogènes.",
    achievements: [
      "Système de commande intelligent",
      "Surveillance en temps réel",
      "Interface de monitoring",
      "Protocoles IoT",
    ],
    tags: ["IoT", "Embedded Systems", "C/C++", "Monitoring"],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="experiences" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            {t('experience.title')} <span className="gradient-text">{t('experience.title')}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background glow-primary" />

              {/* Content */}
              <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className={`glass-card ${index % 2 === 0 ? "md:ml-auto" : ""} max-w-xl`}>
                  <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{exp.company}</h3>
                      <p className="text-primary font-medium">{exp.role}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tech-badge text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
