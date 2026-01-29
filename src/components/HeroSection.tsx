import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Phone, Sparkles, Code2, Cpu } from "lucide-react";
import profileImage from "@/assets/elyess.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Enhanced Background Effects with Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden mesh-gradient">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl parallax-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl parallax-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Floating Particles */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-[10%] w-3 h-3 bg-primary rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            x: [10, -10, 10],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-40 right-[15%] w-2 h-2 bg-secondary rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            x: [15, -15, 15],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-40 left-[20%] w-4 h-4 bg-accent rounded-full blur-sm"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(217 91% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60%) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium neon-glow mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              <span className="text-sm text-foreground font-medium">
                {t('hero.availability')}
              </span>
              <Sparkles size={14} className="text-primary animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4"
            >
              <span className="text-foreground">Karoui</span>{" "}
              <span className="gradient-text-animated text-shadow-glow">Elyess</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground/90 mb-4 flex items-center gap-3 justify-center lg:justify-start flex-wrap"
            >
              <span className="flex items-center gap-2">
                <Code2 size={28} className="text-primary" />
                {t('hero.title')}
              </span>
              <span className="gradient-text-animated flex items-center gap-2">
                <Cpu size={28} className="text-accent animate-pulse" />
                {t('hero.subtitle')}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <motion.a 
                href="#projets" 
                className="btn-primary flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t('hero.cta.projects')}</span>
                <ArrowDown size={18} className="relative z-10 animate-bounce-slow group-hover:translate-y-1 transition-transform" />
                <span className="absolute inset-0 animate-shimmer" />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn-outline gradient-border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.contact')}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start"
            >
              <motion.a
                href="https://github.com/elyesskaroui"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-premium p-3 rounded-xl hover:neon-glow transition-all duration-300 hover:-translate-y-1"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} className="text-foreground" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/karoui-elyess-49109a223/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-premium p-3 rounded-xl hover:neon-glow transition-all duration-300 hover:-translate-y-1"
                whileHover={{ rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} className="text-foreground" />
              </motion.a>
              <motion.a
                href="mailto:Karouielyess@gmail.com"
                className="glass-premium p-3 rounded-xl hover:neon-glow transition-all duration-300 hover:-translate-y-1"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} className="text-foreground" />
              </motion.a>
              <motion.a
                href="tel:+21655448132"
                className="glass-premium p-3 rounded-xl hover:neon-glow transition-all duration-300 hover:-translate-y-1"
                whileHover={{ rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone size={20} className="text-foreground" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image with Premium Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Glow Rings */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-3xl opacity-50 animate-pulse-slow" />
              <div className="absolute inset-[-20px] bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-2xl opacity-30 pulse-ring" />
              
              {/* Main Image Container */}
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/50 glass-premium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-10" />
                <img
                  src={profileImage}
                  alt="Karoui Elyess"
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
              </motion.div>
              
              {/* Floating Elements with Enhanced Animations */}
              <motion.div
                animate={{ 
                  y: [-15, 15, -15],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-premium p-4 rounded-2xl neon-glow hover:scale-125 transition-transform cursor-pointer"
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [15, -15, 15],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 glass-premium p-4 rounded-2xl neon-glow hover:scale-125 transition-transform cursor-pointer"
              >
                <span className="text-3xl">💻</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [-10, 10, -10],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 -right-8 glass-premium p-3 rounded-xl neon-glow hover:scale-125 transition-transform cursor-pointer"
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [10, -10, 10],
                  rotate: [0, -15, 0]
                }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute top-1/3 -left-8 glass-premium p-3 rounded-xl neon-glow hover:scale-125 transition-transform cursor-pointer"
              >
                <span className="text-2xl">🎯</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#apropos" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
