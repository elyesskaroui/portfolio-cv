import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Star, Play, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    title: "Vibe Tok",
    description:
      "Application mobile de partage de vidéos inspirée de TikTok. Permet aux utilisateurs de publier des vidéos, d'interagir via likes, commentaires et partages, avec streaming en direct et conseiller IA. Utilise GetStorage pour le stockage local et GetX pour une gestion d'état performante.",
    image: "🎥",
    tags: ["Flutter", "NestJS", "Node.js", "IA", "GetX", "GetStorage"],
    featured: true,
    github: "https://github.com/elyesskaroui",
    video: "/videos/video vibeTok.mp4",
  },
  {
    title: "Job Application Tracker",
    description:
      "Application mobile Flutter avec backend Django pour suivre et gérer efficacement les candidatures. Organisation par statuts, calendrier intégré, stockage local avec GetStorage et gestion d'état performante avec GetX pour une expérience fluide.",
    image: "📋",
    tags: ["Flutter", "Django", "GetX", "GetStorage", "Mobile"],
    featured: true,
    github: "https://github.com/elyesskaroui",
  },
  {
    title: "Détecteur Fake News Médicales",
    description:
      "Application Flutter/NestJS utilisant l'IA Ollama pour détecter les fausses informations médicales avec scraping automatisé et validation par experts. Utilise SharedPreferences pour le stockage local et Provider pour une gestion d'état performante.",
    image: "🔬",
    tags: ["Flutter", "NestJS", "Ollama", "IA", "Provider", "SharedPreferences"],
    featured: true,
    github: "https://github.com/elyesskaroui",
    video: "/videos/Détecteur Fake News Médicales.mp4",
  },
  {
    title: "Estimation Réparations Véhicules",
    description:
      "Application cross-platform (Flutter/Kotlin/Swift) avec IA pour estimer les coûts de réparation et réduire les délais de constat. Utilise GetStorage pour le stockage local et GetX pour une gestion d'état performante.",
    image: "🚗",
    tags: ["Flutter", "Kotlin", "Swift", "IA", "GetX", "GetStorage"],
    featured: true,
    github: "https://github.com/elyesskaroui",
    video: "/videos/video _parking(1).mp4",
  },
  {
    title: "Réparations Automobiles Intelligentes",
    description:
      "Application mobile cross-platform pour l'estimation des réparations automobiles et la réduction des constats d'accidents. Développée avec SwiftUI pour iOS et Kotlin pour Android, back-end NestJS. Analyse intelligente des dommages et estimation des réparations.",
    image: "🔧",
    tags: ["SwiftUI", "Kotlin", "NestJS", "iOS", "Android", "IA"],
    featured: true,
    github: "https://github.com/elyesskaroui",
    video: "/videos/crash test.mp4",
  },
  {
    title: "Marketplace Student",
    description:
      "Plateforme Next.js permettant aux étudiants d'échanger des livres, cours et matériel scolaire de manière sécurisée.",
    image: "📚",
    tags: ["Next.js", "React", "Node.js", "MongoDB"],
    github: "https://github.com/elyesskaroui",
  },
  {
    title: "Gestion Transfusion Sanguine",
    description:
      "Solution complète en C/C++ sous Linux pour la gestion des dons et transfusions sanguines dans les hôpitaux.",
    image: "🩸",
    tags: ["C", "C++", "Linux", "Healthcare"],
    github: "https://github.com/elyesskaroui",
  },
  {
    title: "Système IoT de Surveillance",
    description:
      "Système embarqué intelligent pour la surveillance et le contrôle de groupes électrogènes en temps réel.",
    image: "⚡",
    tags: ["IoT", "Embedded", "C", "Sensors"],
    github: "https://github.com/elyesskaroui",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { t } = useLanguage();

  return (
    <section id="projets" className="py-24 relative" ref={ref}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl parallax-float" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl parallax-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-4"
          >
            <Star size={16} className="text-primary animate-pulse" />
            <span className="text-sm text-foreground font-medium">Portfolio</span>
          </motion.div>
          <h2 className="section-title">
            Projets <span className="gradient-text-animated text-shadow-glow">Académiques</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Des projets concrets démontrant mes compétences techniques et mon innovation
          </p>
        </motion.div>

        {/* Featured Projects with Enhanced Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => project.video && setSelectedProject(project)}
                className="glass-premium group relative overflow-hidden rounded-2xl p-6 card-3d-hover cursor-pointer"
              >
                {/* Play Button Overlay for projects with video */}
                {project.video && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center neon-glow">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                  </motion.div>
                )}

                {/* Featured Badge */}
                <motion.div 
                  className="absolute top-4 right-4 z-10"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-secondary bg-secondary/20 rounded-full border border-secondary/30 neon-glow">
                    <Sparkles size={14} className="animate-pulse" />
                    Featured
                  </span>
                </motion.div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start gap-6 relative z-10">
                  <motion.div 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.image}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-foreground mb-3 group-hover:gradient-text-animated transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <motion.span 
                          key={tag} 
                          className="tech-badge-secondary text-xs hover:scale-110 transition-transform cursor-pointer"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.1 * i }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.video && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors group/video"
                          whileHover={{ x: 5 }}
                        >
                          <Play size={18} className="group-hover/video:animate-bounce-slow" />
                          Voir la démo
                        </motion.button>
                      )}
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group/link"
                        whileHover={{ x: 5 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} className="group-hover/link:animate-bounce-slow" />
                        Voir le code
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other Projects with Enhanced Styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-premium group rounded-2xl p-6 hover-3d cursor-pointer"
              >
                <motion.div 
                  className="text-5xl mb-5"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.image}
                </motion.div>
                <h3 className="font-bold text-lg text-foreground mb-3 group-hover:gradient-text-animated transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <motion.span 
                      key={tag} 
                      className="tech-badge text-xs hover:scale-110 transition-transform"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.05 * i }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group/link"
                  whileHover={{ x: 5 }}
                >
                  <Github size={16} className="group-hover/link:animate-bounce-slow" />
                  Voir le code
                  <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </motion.a>
              </motion.div>
            ))}
        </div>

        {/* Enhanced View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/elyesskaroui"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline gradient-border inline-flex items-center gap-3 text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={22} />
            <span>Voir plus sur GitHub</span>
            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl w-full glass-premium border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text-animated flex items-center gap-3">
              {selectedProject?.image} {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-base">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject?.video && (
            <div className="mt-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm">
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  src={selectedProject.video}
                >
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tech-badge-secondary">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Github size={18} />
                  Voir le code
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
