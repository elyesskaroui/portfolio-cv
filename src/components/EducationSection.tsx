import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Users } from "lucide-react";

const education = [
  {
    degree: "Ingénieur Informatique Full Stack",
    school: "ESPRIT - École Supérieure Privée d'Ingénierie et de Technologies",
    period: "2023 - 2026",
    description: "Formation complète en développement logiciel, architecture système et technologies web/mobile.",
    icon: GraduationCap,
  },
  {
    degree: "Licence en Systèmes Embarqués",
    school: "ISIMM - Institut Supérieur d'Informatique et de Mathématiques de Monastir",
    period: "2019 - 2022",
    description: "Spécialisation en systèmes embarqués, IoT et programmation bas niveau.",
    icon: Award,
  },
  {
    degree: "Baccalauréat Technique",
    school: "Tunisie",
    period: "2019",
    description: "Fondations solides en sciences techniques et mathématiques.",
    icon: Award,
  },
];

const activities = [
  {
    name: "IEEE ESPRIT Student Branch",
    role: "Membre actif",
    period: "2023 - Présent",
    description: "Participation aux événements tech, hackathons et conférences.",
  },
  {
    name: "Club CPU",
    role: "Membre",
    period: "2019 - 2022",
    description: "Club d'informatique et de programmation.",
  },
  {
    name: "Club Espoir",
    role: "Membre",
    period: "2019 - 2022",
    description: "Engagement social et bénévolat.",
  },
  {
    name: "Club ATAST",
    role: "Membre",
    period: "2019 - 2022",
    description: "Association tunisienne pour l'avancement de la science et la technologie.",
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="formation" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Formation & <span className="gradient-text">Engagement</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Mon parcours académique et mes activités associatives
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 text-xl font-bold text-foreground mb-8"
            >
              <GraduationCap className="text-primary" />
              Formation Académique
            </motion.h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="glass-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <edu.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{edu.degree}</h4>
                      <p className="text-primary text-sm font-medium">{edu.school}</p>
                      <p className="text-muted-foreground text-sm mt-1">{edu.period}</p>
                      <p className="text-muted-foreground text-sm mt-2">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 text-xl font-bold text-foreground mb-8"
            >
              <Users className="text-secondary" />
              Activités & Engagement
            </motion.h3>

            <div className="grid gap-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="glass-card py-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{activity.name}</h4>
                    <span className="tech-badge-accent text-xs">{activity.period}</span>
                  </div>
                  <p className="text-secondary text-sm font-medium">{activity.role}</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {activity.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
