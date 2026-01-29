import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Lightbulb, Target, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const getQualities = (t: (key: string) => string) => [
  {
    icon: Lightbulb,
    title: t('about.quality.curious'),
    description: t('about.quality.curious.desc'),
  },
  {
    icon: Target,
    title: t('about.quality.rigorous'),
    description: t('about.quality.rigorous.desc'),
  },
  {
    icon: Zap,
    title: t('about.quality.autonomous'),
    description: t('about.quality.autonomous.desc'),
  },
  {
    icon: Code2,
    title: t('about.quality.passionate'),
    description: t('about.quality.passionate.desc'),
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const qualities = getQualities(t);

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
            {t('about.title').split(' ')[0]} <span className="gradient-text">{t('about.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="section-subtitle mx-auto">
            {t('about.description')}
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
              {t('about.intro1')} <span className="text-primary font-semibold">{t('about.intro1.bold')}</span> {t('about.intro1.text')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.intro2')}{" "}
              <span className="text-secondary font-semibold">{t('about.intro2.bold')}</span>, 
              {t('about.intro2.text')}<span className="text-accent font-semibold">{t('about.intro2.bold2')}</span> {t('about.intro2.text2')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.intro3')}{" "}
              <span className="gradient-text font-semibold">{t('about.intro3.bold')}</span>, 
              {t('about.intro3.text')}
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
