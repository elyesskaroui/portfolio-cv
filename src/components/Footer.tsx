import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="gradient-text font-semibold">Karoui Elyess</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {t('footer.made')} <Heart size={14} className="text-red-500 fill-red-500" /> {language === 'fr' ? 'en Tunisie' : 'in Tunisia'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/elyesskaroui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/karoui-elyess-49109a223/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:Karouielyess@gmail.com"
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
