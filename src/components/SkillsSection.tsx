import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smartphone,
  Server,
  Code,
  Database,
  Wrench,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const skillCategories = [
  {
    icon: Smartphone,
    title: "Développement Mobile",
    color: "primary",
    skills: ["Flutter", "Kotlin (Jetpack Compose)", "SwiftUI", "Android Studio", "Xcode"],
  },
  {
    icon: Server,
    title: "Backend & API",
    color: "secondary",
    skills: ["NestJS", ".NET (C#)", "Spring Boot", "NextJS", "REST API"],
  },
  {
    icon: Code,
    title: "Langages",
    color: "accent",
    skills: ["Python", "Java", "Dart", "Kotlin", "Swift", "C", "C++", "TypeScript"],
  },
  {
    icon: Database,
    title: "Bases de Données",
    color: "primary",
    skills: ["MongoDB", "MySQL", "Oracle", "PostgreSQL", "PL/SQL", "SQLite"],
  },
  {
    icon: Wrench,
    title: "Outils & DevOps",
    color: "secondary",
    skills: ["Git", "Docker", "Swagger", "Jira", "Figma", "Postman"],
  },
  {
    icon: Brain,
    title: "IA & Innovation",
    color: "accent",
    skills: ["Ollama", "Machine Learning", "API Integration", "LLM", "Web Scraping"],
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return {
        bg: "from-primary/20 to-primary/5",
        border: "border-primary/30",
        text: "text-primary",
        badge: "tech-badge",
      };
    case "secondary":
      return {
        bg: "from-secondary/20 to-secondary/5",
        border: "border-secondary/30",
        text: "text-secondary",
        badge: "tech-badge-secondary",
      };
    case "accent":
      return {
        bg: "from-accent/20 to-accent/5",
        border: "border-accent/30",
        text: "text-accent",
        badge: "tech-badge-accent",
      };
    default:
      return {
        bg: "from-primary/20 to-primary/5",
        border: "border-primary/30",
        text: "text-primary",
        badge: "tech-badge",
      };
  }
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="competences" className="py-24 relative" ref={ref}>
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl parallax-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl parallax-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-4"
          >
            <Code size={16} className="text-accent animate-pulse" />
            <span className="text-sm text-foreground font-medium">{t('skills.title')}</span>
          </motion.div>
          <h2 className="section-title">
            {t('skills.title')} <span className="gradient-text-animated text-shadow-glow">{t('skills.title')}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const colors = getColorClasses(category.color);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-premium group rounded-2xl p-6 hover-3d cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center border ${colors.border} relative overflow-hidden`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <category.icon className={`w-8 h-8 ${colors.text} relative z-10`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <h3 className="font-bold text-xl text-foreground group-hover:gradient-text-animated transition-all">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skill} 
                      className={`${colors.badge} hover:scale-110 hover:neon-glow transition-all duration-300 cursor-pointer`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
