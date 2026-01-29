import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Lightbulb, Target, Zap } from "lucide-react";

const qualities = [
  {
    icon: Lightbulb,
    title: "Curieux",
    description: "Toujours à la recherche de nouvelles technologies et méthodologies",
  },
  {
    icon: Target,
    title: "Rigoureux",
    description: "Attention aux détails et code de qualité",
  },
  {
    icon: Zap,
    title: "Autonome",
    description: "Capable de gérer des projets de A à Z",
  },
  {
    icon: Code2,
    title: "Passionné",
    description: "L'innovation tech est ma passion quotidienne",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            À <span className="gradient-text">Propos</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Développeur passionné avec une expertise Full Stack
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Étudiant en <span className="text-primary font-semibold">Ingénierie Informatique</span> à 
              ESPRIT, je suis spécialisé dans le développement d'applications 
              mobiles et backend. Ma passion pour la technologie m'a conduit à 
              maîtriser une variété d'outils et de langages.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Je suis particulièrement expérimenté en{" "}
              <span className="text-secondary font-semibold">Python, NestJS, Flutter</span>, 
              ainsi qu'en développement iOS (Swift) et Android (Kotlin). Mon intérêt 
              pour l'<span className="text-accent font-semibold">Intelligence Artificielle</span> me 
              pousse à explorer constamment de nouvelles solutions innovantes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Actuellement en recherche active d'un{" "}
              <span className="gradient-text font-semibold">stage PFE ou alternance</span>, 
              je suis prêt à contribuer à des projets ambitieux et à apprendre 
              auprès d'équipes talentueuses.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Python", "NestJS", "Flutter", "Swift", "Kotlin", "IA"].map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Qualities Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {qualities.map((quality, index) => (
              <motion.div
                key={quality.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <quality.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{quality.title}</h3>
                <p className="text-sm text-muted-foreground">{quality.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
