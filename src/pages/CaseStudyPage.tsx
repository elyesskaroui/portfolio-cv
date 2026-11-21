import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Boxes,
  BrainCircuit,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChartPie,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clapperboard,
  Clock,
  Cloud,
  Compass,
  Container,
  CreditCard,
  Crown,
  Database,
  Download,
  FileSearch,
  FileText,
  FolderOpen,
  Gauge,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Hourglass,
  ImageOff,
  Keyboard,
  Landmark,
  Leaf,
  Lightbulb,
  ListChecks,
  Lock,
  Mail,
  MailX,
  Map as MapIcon,
  MapPin,
  Megaphone,
  MessageSquare,
  Monitor,
  Newspaper,
  Palette,
  PenLine,
  Play,
  Radio,
  Rocket,
  ScanEye,
  ScanText,
  Server,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Siren,
  Smartphone,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  UsersRound,
  WandSparkles,
  Zap,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/i18n/translations';
import { fanScreens, getCaseStudy } from '@/data/caseStudy';
import NotFound from '@/pages/NotFound';
import { PROFILE } from '@/data/content';
import { RevealObserver } from '@/components/common/RevealObserver';
import { VideoDialog } from '@/components/common/VideoDialog';
import { ResumeDialog } from '@/components/common/ResumeDialog';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { AnimatedTitle } from '@/components/common/AnimatedLetters';
import { ScreenStudio } from '@/components/common/ScreenStudio';
import { DemoLabel } from '@/components/common/DemoLabel';

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

/* ---- Architecture diagram ---------------------------------------------------
   Built from plain boxes so it stays sharp, themeable and readable by screen
   readers (the figure has a text description).
   ------------------------------------------------------------------------ */

/* Raised 3D block: icon tile, title, chips. */
const Node = ({
  icon: Icon,
  title,
  chips,
  strong = false,
  className = '',
  children,
}: {
  icon: LucideIcon;
  title: string;
  chips?: string[];
  strong?: boolean;
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={`arch-node ${strong ? 'is-strong' : ''} ${className}`}>
    <div className="flex items-center gap-3">
      <span className="arch-icon" aria-hidden="true">
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <p className="text-[15px] font-bold leading-tight tracking-[-0.02em]">{title}</p>
    </div>
    {chips && (
      <ul className="mt-3.5 flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <li key={chip} className="arch-chip">
            {chip}
          </li>
        ))}
      </ul>
    )}
    {children}
  </div>
);

/* Connector with data packets travelling along it. Horizontal on large
   screens unless `vertical`; always vertical on small screens. */
const Flow = ({
  label,
  vertical = false,
  both = false,
  reverse = false,
  className = '',
}: {
  label?: string;
  vertical?: boolean;
  both?: boolean;
  reverse?: boolean;
  className?: string;
}) => (
  <div className={`arch-flow ${vertical ? 'is-vertical' : ''} ${both ? 'is-both' : ''} ${reverse ? 'is-reverse' : ''} ${className}`}>
    <span className="arch-line" aria-hidden="true">
      <span className="arch-packet" />
      <span className="arch-packet arch-packet--2" />
    </span>
    {label && <span className="arch-flow-label">{label}</span>}
  </div>
);

/* ---- TSE architecture -------------------------------------------------------
   Who talks to whom:
     API privée Bourse ─5-10 s→ PC collecteur ─écrit→ MongoDB Atlas
     Site officiel + Grafana ─extraction / requêtes→ API Render
     MongoDB Atlas ⇄ API Render
     API Render → Groq (Llama 3.3, Whisper, Orpheus) · Anthropic (Claude Sonnet)
     API Render → Gmail API (Brevo en repli) → e-mails
     API Render ─10 s + WebSocket→ Application TSE ─WebView→ Libertify
     GitHub Pages ─version.json→ Application TSE ; GitHub Actions ─ping 10 min→ API Render
   Row 1: sources | server | external services. Row 2: the app. Rail: production.
   ------------------------------------------------------------------------ */

type TseItem = { name: string; detail: string };
type TseText = {
  zoneSources: string;
  zoneServer: string;
  zoneServices: string;
  zoneApp: string;
  exchangeApi: string;
  exchangeApiNote: string;
  collector: string;
  collectorChips: string[];
  site: string;
  siteChips: string[];
  toServer: string;
  api: string;
  apiModules: TseItem[];
  jobs: string;
  jobsDetail: string;
  security: string;
  db: string;
  dbChips: string[];
  toServices: string;
  fromServices: string;
  groq: string;
  groqChips: string[];
  claude: string;
  claudeChips: string[];
  mail: string;
  mailChips: string[];
  libertify: string;
  libertifyChips: string[];
  toApp: string;
  app: string;
  appChips: string[];
  appFeatures: TseItem[];
  onDevice: string;
  onDeviceItems: string[];
  update: string;
  updateDetail: string;
  base: string;
  baseItems: string[];
  keepalive: string;
  challengesTitle: string;
  challengesAccent: string;
  challengesLead: string;
  challengeLabel: string;
  answerLabel: string;
  challenges: { title: string; challenge: string; answer: string }[];
};

const TSE_DIAGRAM: Record<Language, TseText> = {
  fr: {
    zoneSources: 'Sources de données',
    zoneServer: 'Serveur · Render',
    zoneServices: 'Services externes',
    zoneApp: 'Téléphone de l’utilisateur',
    exchangeApi: 'API privée de la Bourse',
    exchangeApiNote: 'Accessible uniquement depuis le réseau interne',
    collector: 'PC collecteur à la Bourse',
    collectorChips: ['Toutes les 5 à 10 s', 'Écrit dans MongoDB'],
    site: 'Site officiel + Grafana',
    siteChips: ['Extraction web', 'Courbes intraday', 'Publications'],
    toServer: 'Données du marché',
    api: 'API NestJS',
    apiModules: [
      { name: 'Marché', detail: 'Cotations, carnet d’ordres, indices' },
      { name: 'Information officielle', detail: 'Actualités, publications, éditions' },
      { name: 'Assistant et rapports', detail: 'Chat, Claudy, synthèses' },
      { name: 'Comptes et espaces', detail: 'Visiteur, étudiant, administrateur' },
    ],
    jobs: 'Tâches planifiées',
    jobsDetail: 'Rapport de 18 h, collecte des publications et des éditions',
    security: 'JWT · rôles · cache · repli si la source tombe',
    db: 'MongoDB Atlas',
    dbChips: ['Instantanés du marché', 'Comptes', 'Rapports'],
    toServices: 'Requêtes',
    fromServices: 'Réponses',
    groq: 'Groq',
    groqChips: ['Llama 3.3 · chat', 'Whisper · voix', 'Orpheus · synthèse'],
    claude: 'Anthropic',
    claudeChips: ['Claude Sonnet', 'Claudy · rapports'],
    mail: 'E-mails',
    mailChips: ['API Gmail', 'Brevo en repli'],
    libertify: 'Libertify',
    libertifyChips: ['Démonstration', 'Avatar vidéo IA'],
    toApp: 'Rafraîchissement 10 s · WebSocket',
    app: 'Application TSE · Flutter',
    appChips: ['Android + Web', 'BLoC', 'FR · EN · AR'],
    appFeatures: [
      { name: 'Marché en direct', detail: 'Cotations, indices, graphiques' },
      { name: 'Actualités', detail: 'Notifications en temps réel' },
      { name: 'Assistant', detail: 'Texte et voix (Claudy)' },
      { name: 'Reporting', detail: 'Synthèse à la demande' },
    ],
    onDevice: 'Sur le téléphone',
    onDeviceItems: ['Voix de Claudy', 'Création des PDF', 'Export Excel', 'Libertify en WebView'],
    update: 'Mise à jour de l’APK',
    updateDetail: 'GitHub Pages publie version.json : l’application se met à jour seule',
    base: 'Mise en production',
    baseItems: ['Docker', 'Render', 'MongoDB Atlas', 'GitHub Pages', 'APK signé'],
    keepalive: 'GitHub Actions réveille l’API toutes les 10 min',
    challengesTitle: 'Les cinq',
    challengesAccent: 'défis.',
    challengesLead: 'Chaque défi de la problématique, et la réponse apportée par l’architecture.',
    challengeLabel: 'Défi',
    answerLabel: 'Réponse',
    challenges: [
      {
        title: 'Construire puis consommer l’API',
        challenge: 'Collecter et normaliser les données du marché, en retenir les indicateurs utiles et les exposer à l’application.',
        answer: 'PC collecteur sur le réseau de la Bourse, extraction du site officiel et de Grafana, API NestJS sur MongoDB Atlas.',
      },
      {
        title: 'Suivre le marché en temps réel',
        challenge: 'Livrer des données fraîches au téléphone, sans rafraîchissement manuel.',
        answer: 'Collecte toutes les 5 à 10 s, rafraîchissement de l’application toutes les 10 s, événements poussés par WebSocket.',
      },
      {
        title: 'Intégrer l’assistant IA',
        challenge: 'Répondre en langage courant, à partir des seuls chiffres réels du moment.',
        answer: 'Llama 3.3 via Groq pour le chat ; Claudy à la voix : Whisper, Claude Sonnet, puis Orpheus.',
      },
      {
        title: 'Automatiser le reporting',
        challenge: 'Produire en quelques secondes une synthèse fidèle au marché, et l’envoyer automatiquement, sans action de l’utilisateur.',
        answer: 'Synthèse à la demande, rapports quotidiens, hebdomadaires et mensuels rédigés par l’IA, envoyés par e-mail aux abonnés.',
      },
      {
        title: 'Sécurité, performance, fiabilité',
        challenge: 'Protéger les comptes, répondre vite et rester disponible si une source externe tombe.',
        answer: 'JWT et rôles, cache des données publiques, mécanismes de repli, Brevo en secours de Gmail, API maintenue éveillée.',
      },
    ],
  },
  en: {
    zoneSources: 'Data sources',
    zoneServer: 'Server · Render',
    zoneServices: 'External services',
    zoneApp: 'User’s phone',
    exchangeApi: 'Exchange private API',
    exchangeApiNote: 'Only reachable from the internal network',
    collector: 'Collector PC at the exchange',
    collectorChips: ['Every 5 to 10 s', 'Writes to MongoDB'],
    site: 'Official website + Grafana',
    siteChips: ['Web extraction', 'Intraday charts', 'Publications'],
    toServer: 'Market data',
    api: 'NestJS API',
    apiModules: [
      { name: 'Market', detail: 'Quotes, order book, indices' },
      { name: 'Official information', detail: 'News, publications, editions' },
      { name: 'Assistant and reports', detail: 'Chat, Claudy, summaries' },
      { name: 'Accounts and areas', detail: 'Visitor, student, administrator' },
    ],
    jobs: 'Scheduled jobs',
    jobsDetail: '6 pm report, collection of publications and editions',
    security: 'JWT · roles · cache · fallback if the source fails',
    db: 'MongoDB Atlas',
    dbChips: ['Market snapshots', 'Accounts', 'Reports'],
    toServices: 'Requests',
    fromServices: 'Answers',
    groq: 'Groq',
    groqChips: ['Llama 3.3 · chat', 'Whisper · voice', 'Orpheus · speech'],
    claude: 'Anthropic',
    claudeChips: ['Claude Sonnet', 'Claudy · reports'],
    mail: 'Emails',
    mailChips: ['Gmail API', 'Brevo fallback'],
    libertify: 'Libertify',
    libertifyChips: ['Demo', 'AI video avatar'],
    toApp: '10 s refresh · WebSocket',
    app: 'TSE app · Flutter',
    appChips: ['Android + Web', 'BLoC', 'FR · EN · AR'],
    appFeatures: [
      { name: 'Live market', detail: 'Quotes, indices, charts' },
      { name: 'News', detail: 'Real-time notifications' },
      { name: 'Assistant', detail: 'Text and voice (Claudy)' },
      { name: 'Reporting', detail: 'On-demand summary' },
    ],
    onDevice: 'On the phone',
    onDeviceItems: ['Claudy’s voice', 'PDF generation', 'Excel export', 'Libertify in a WebView'],
    update: 'APK update',
    updateDetail: 'GitHub Pages publishes version.json: the app updates itself',
    base: 'Production',
    baseItems: ['Docker', 'Render', 'MongoDB Atlas', 'GitHub Pages', 'Signed APK'],
    keepalive: 'GitHub Actions wakes the API every 10 min',
    challengesTitle: 'The five',
    challengesAccent: 'challenges.',
    challengesLead: 'Each challenge from the problem statement, and how the architecture answers it.',
    challengeLabel: 'Challenge',
    answerLabel: 'Answer',
    challenges: [
      {
        title: 'Build, then consume the API',
        challenge: 'Collect and normalise market data, keep the useful indicators and expose them to the app.',
        answer: 'Collector PC on the exchange network, extraction from the official site and Grafana, NestJS API on MongoDB Atlas.',
      },
      {
        title: 'Follow the market in real time',
        challenge: 'Deliver fresh data to the phone, with no manual refresh.',
        answer: 'Collection every 5 to 10 s, app refresh every 10 s, events pushed over WebSocket.',
      },
      {
        title: 'Integrate the AI assistant',
        challenge: 'Answer in plain language, using only the real figures of the moment.',
        answer: 'Llama 3.3 on Groq for chat; Claudy by voice: Whisper, Claude Sonnet, then Orpheus.',
      },
      {
        title: 'Automate reporting',
        challenge: 'Produce a faithful market summary in seconds, and send it out automatically, with no user action.',
        answer: 'On-demand summary, daily, weekly and monthly AI-written reports emailed to subscribers.',
      },
      {
        title: 'Security, performance, reliability',
        challenge: 'Protect accounts, answer fast and stay available when an external source fails.',
        answer: 'JWT and roles, cache of public data, fallbacks, Brevo backing up Gmail, API kept awake.',
      },
    ],
  },
};

const TSE_CHALLENGE_ICONS: LucideIcon[] = [Database, Radio, Sparkles, FileText, ShieldCheck];

const BvmtDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = TSE_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            {/* Zone 1 — data sources */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Landmark size={11} /> {d.zoneSources}
              </span>
              <div className="grid gap-3">
                <Node icon={Landmark} title={d.exchangeApi}>
                  <p className="job-io">{d.exchangeApiNote}</p>
                  <div className="job-orchestrator tse-collector">
                    <span className="job-orchestrator-icon" aria-hidden="true">
                      <Monitor size={14} />
                    </span>
                    <span>
                      <strong>{d.collector}</strong>
                      <em>{d.collectorChips.join(' · ')}</em>
                    </span>
                  </div>
                </Node>
                <Node icon={Globe} title={d.site} chips={d.siteChips} />
              </div>
            </div>

            <Flow label={d.toServer} />

            {/* Zone 2 — the Render server */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <div className="grid gap-3">
                <Node icon={Server} title={d.api} strong>
                  <ul className="job-modules">
                    {d.apiModules.map((module) => (
                      <li key={module.name}>
                        <strong>{module.name}</strong>
                        <em>{module.detail}</em>
                      </li>
                    ))}
                  </ul>
                  <div className="job-orchestrator tse-jobs">
                    <span className="job-orchestrator-icon" aria-hidden="true">
                      <Clock size={14} />
                    </span>
                    <span>
                      <strong>{d.jobs}</strong>
                      <em>{d.jobsDetail}</em>
                    </span>
                  </div>
                  <p className="park-realtime">
                    <Lock size={13} aria-hidden="true" /> {d.security}
                  </p>
                </Node>
                <Node icon={Database} title={d.db} chips={d.dbChips} />
              </div>
            </div>

            <div className="job-ai-links">
              <Flow label={d.toServices} />
              <Flow label={d.fromServices} reverse />
            </div>

            {/* Zone 3 — external services */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Sparkles size={11} /> {d.zoneServices}
              </span>
              <div className="grid gap-3">
                <Node icon={BrainCircuit} title={d.groq} chips={d.groqChips} />
                <Node icon={Sparkles} title={d.claude} chips={d.claudeChips} />
                <Node icon={Mail} title={d.mail} chips={d.mailChips} />
                <Node icon={Clapperboard} title={d.libertify} chips={d.libertifyChips} />
              </div>
            </div>
          </div>

          {/* Server → app */}
          <Flow label={d.toApp} vertical className="tse-down" />

          {/* Row 2 — the app on the phone */}
          <div className="park-zone tse-app-zone">
            <span className="park-zone-label">
              <Smartphone size={11} /> {d.zoneApp}
            </span>
            <div className="tse-app-row">
              <Node icon={Smartphone} title={d.app} chips={d.appChips} strong>
                <ul className="tse-features">
                  {d.appFeatures.map((feature) => (
                    <li key={feature.name}>
                      <strong>{feature.name}</strong>
                      <em>{feature.detail}</em>
                    </li>
                  ))}
                </ul>
              </Node>
              <Node icon={Smartphone} title={d.onDevice} chips={d.onDeviceItems} />
              <Node icon={Download} title={d.update}>
                <p className="job-io">{d.updateDetail}</p>
              </Node>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Rocket size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
            <span className="tse-keepalive">
              <Clock size={12} aria-hidden="true" /> {d.keepalive}
            </span>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zoneSources}: ${d.exchangeApi} (${d.exchangeApiNote}) → ${d.collector} (${d.collectorChips.join(', ')}); ${d.site} (${d.siteChips.join(
            ', ',
          )}). → ${d.zoneServer}: ${d.api} (${d.apiModules.map((m) => `${m.name}: ${m.detail}`).join(', ')}); ${d.jobs} (${d.jobsDetail}); ${
            d.security
          }; ${d.db}. ⇄ ${d.zoneServices}: ${d.groq} (${d.groqChips.join(', ')}), ${d.claude} (${d.claudeChips.join(', ')}), ${d.mail} (${d.mailChips.join(
            ', ',
          )}), ${d.libertify} (${d.libertifyChips.join(', ')}). → ${d.toApp} → ${d.zoneApp}: ${d.app}; ${d.onDevice}: ${d.onDeviceItems.join(
            ', ',
          )}; ${d.update}: ${d.updateDetail}. ${d.base}: ${d.baseItems.join(', ')}; ${d.keepalive}.`}
        </figcaption>
      </figure>

      {/* The five challenges and their answers */}
      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.challengesTitle} <span className="font-serif font-normal italic">{d.challengesAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.challengesLead}</p>
        <ol className="fn-journey">
          {d.challenges.map((item, index) => {
            const Icon = TSE_CHALLENGE_ICONS[index];
            return (
              <li key={item.title} className="rv job-role-card" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="tabular font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h4 className="mt-4 text-[16px] font-bold leading-tight tracking-[-0.02em]">{item.title}</h4>
                <dl className="job-role-steps">
                  <div>
                    <dt>{d.challengeLabel}</dt>
                    <dd>{item.challenge}</dd>
                  </div>
                  <div>
                    <dt>{d.answerLabel}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

/* ---- Smart parking architecture -------------------------------------------
   Same visual language as the TSE diagram: zones, labelled links, 3D blocks.
     [ Téléphone : App Flutter (3 couches) ] ⇄ REST · WebSocket ⇄ [ Serveur : API NestJS ] → [ Services : GPS · Paiement · IA ]
     Rail: technical foundation.
   ------------------------------------------------------------------------ */

type ParkingDiagramText = {
  zonePhone: string;
  zoneServer: string;
  zoneServices: string;
  app: string;
  appChips: string[];
  layers: { name: string; detail: string }[];
  link: string;
  api: string;
  apiChips: string[];
  apiRealtime: string;
  integrations: string;
  gps: string;
  gpsChips: string[];
  pay: string;
  payChips: string[];
  ai: string;
  aiChips: string[];
  base: string;
  baseItems: string[];
};

const PARKING_DIAGRAM: Record<Language, ParkingDiagramText> = {
  fr: {
    zonePhone: 'Téléphone de l’usager',
    zoneServer: 'Serveur',
    zoneServices: 'Services externes',
    app: 'Application Flutter',
    appChips: ['Clean architecture'],
    layers: [
      { name: 'Présentation', detail: 'Écrans · GetX (état, navigation)' },
      { name: 'Domaine', detail: 'Cas d’usage · règles métier' },
      { name: 'Données', detail: 'API REST · cache GetStorage' },
    ],
    link: 'REST · temps réel par WebSocket',
    api: 'API REST NestJS',
    apiChips: ['Réservation', 'Disponibilité', 'Facturation'],
    apiRealtime: 'Notifications temps réel · WebSocket',
    integrations: 'Intégrations',
    gps: 'API GPS · carte',
    gpsChips: ['Géolocalisation', 'Guidage'],
    pay: 'Paiement numérique',
    payChips: ['Cartes bancaires', 'Portefeuilles'],
    ai: 'Assistant IA · API d’IA',
    aiChips: ['Recommandation', 'Occupation prévue', 'Temps de trajet'],
    base: 'Socle technique',
    baseItems: ['Flutter', 'GetX', 'GetStorage', 'NestJS', 'WebSocket', 'Docker', 'Vercel', 'APK Android'],
  },
  en: {
    zonePhone: 'User’s phone',
    zoneServer: 'Server',
    zoneServices: 'External services',
    app: 'Flutter application',
    appChips: ['Clean architecture'],
    layers: [
      { name: 'Presentation', detail: 'Screens · GetX (state, navigation)' },
      { name: 'Domain', detail: 'Use cases · business rules' },
      { name: 'Data', detail: 'REST API · GetStorage cache' },
    ],
    link: 'REST · real time over WebSocket',
    api: 'NestJS REST API',
    apiChips: ['Booking', 'Availability', 'Billing'],
    apiRealtime: 'Real-time notifications · WebSocket',
    integrations: 'Integrations',
    gps: 'GPS API · map',
    gpsChips: ['Geolocation', 'Guidance'],
    pay: 'Digital payment',
    payChips: ['Bank cards', 'Wallets'],
    ai: 'AI assistant · AI API',
    aiChips: ['Recommendation', 'Expected occupancy', 'Travel time'],
    base: 'Technical foundation',
    baseItems: ['Flutter', 'GetX', 'GetStorage', 'NestJS', 'WebSocket', 'Docker', 'Vercel', 'Android APK'],
  },
};

const ParkingDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = PARKING_DIAGRAM[lang];
  return (
    <figure className="rv arch-stage" aria-label={label}>
      <div className="arch-plane">
        <div className="park-grid">
          {/* Zone 1 — the phone */}
          <div className="park-zone">
            <span className="park-zone-label">
              <Smartphone size={11} /> {d.zonePhone}
            </span>
            <Node icon={Smartphone} title={d.app} chips={d.appChips}>
              <ol className="park-layers">
                {d.layers.map((layer, index) => (
                  <li key={layer.name}>
                    <span className="tabular">{index + 1}</span>
                    <span>
                      <strong>{layer.name}</strong>
                      <em>{layer.detail}</em>
                    </span>
                  </li>
                ))}
              </ol>
            </Node>
          </div>

          <Flow label={d.link} both />

          {/* Zone 2 — the server */}
          <div className="park-zone">
            <span className="park-zone-label">
              <Cloud size={11} /> {d.zoneServer}
            </span>
            <Node icon={Server} title={d.api} chips={d.apiChips} strong>
              <p className="park-realtime">
                <Radio size={13} aria-hidden="true" /> {d.apiRealtime}
              </p>
            </Node>
          </div>

          <Flow label={d.integrations} />

          {/* Zone 3 — external services */}
          <div className="park-zone">
            <span className="park-zone-label">
              <Globe size={11} /> {d.zoneServices}
            </span>
            <div className="grid gap-3">
              <Node icon={MapIcon} title={d.gps} chips={d.gpsChips} />
              <Node icon={CreditCard} title={d.pay} chips={d.payChips} />
              <Node icon={BrainCircuit} title={d.ai} chips={d.aiChips} />
            </div>
          </div>
        </div>

        <div className="arch-rail">
          <span className="arch-rail-title">
            <Boxes size={14} aria-hidden="true" /> {d.base}
          </span>
          <ol className="arch-rail-steps">
            {d.baseItems.map((item) => (
              <li key={item}>
                <span className="arch-rail-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className="sr-only">
        {`${d.zonePhone}: ${d.app} — ${d.layers.map((l) => `${l.name} (${l.detail})`).join(', ')}. ⇄ ${d.link} ⇄ ${d.zoneServer}: ${
          d.api
        } (${d.apiChips.join(', ')}; ${d.apiRealtime}). → ${d.zoneServices}: ${d.gps} (${d.gpsChips.join(', ')}), ${d.pay} (${d.payChips.join(
          ', ',
        )}), ${d.ai} (${d.aiChips.join(', ')}). ${d.base}: ${d.baseItems.join(', ')}.`}
      </figcaption>
    </figure>
  );
};

/* ---- Vibe Tok architecture ------------------------------------------------
     [ Téléphone : App Flutter ] → envoi → [ Contrôle IA : image + vidéo ]
         ✓ contenu sûr → publié · ✕ contenu dangereux → bloqué
     → mise en ligne → [ Plateforme : flux & interactions · live · IA d'inspiration ]
   ------------------------------------------------------------------------ */

type VibeDiagramText = {
  zonePhone: string;
  zoneAi: string;
  zonePlatform: string;
  app: string;
  appChips: string[];
  layers: { name: string; detail: string }[];
  send: string;
  moderation: string;
  moderationChips: string[];
  safe: string;
  blocked: string;
  publish: string;
  feed: string;
  feedChips: string[];
  live: string;
  liveChips: string[];
  inspiration: string;
  inspirationChips: string[];
  base: string;
  baseItems: string[];
};

const VIBE_DIAGRAM: Record<Language, VibeDiagramText> = {
  fr: {
    zonePhone: 'Téléphone du créateur',
    zoneAi: 'Contrôle avant publication',
    zonePlatform: 'Plateforme',
    app: 'Application Flutter',
    appChips: ['GetX', 'GetStorage'],
    layers: [
      { name: 'Flux', detail: 'Vidéos courtes et lives' },
      { name: 'Création', detail: 'Capture, aperçu, publication' },
      { name: 'État et cache', detail: 'GetX · GetStorage' },
    ],
    send: 'Envoi de la publication',
    moderation: 'Modération IA',
    moderationChips: ['Analyse image', 'Analyse vidéo'],
    safe: 'Contenu sûr : publié dans le flux',
    blocked: 'Contenu dangereux : publication bloquée',
    publish: 'Mise en ligne',
    feed: 'Flux et interactions',
    feedChips: ['Likes', 'Commentaires', 'Partages'],
    live: 'Live streaming',
    liveChips: ['Direct', 'Intégré au flux'],
    inspiration: 'IA d’inspiration',
    inspirationChips: ['Tendances', 'Idées', 'Vues et j’aime'],
    base: 'Socle technique',
    baseItems: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'IA'],
  },
  en: {
    zonePhone: 'Creator’s phone',
    zoneAi: 'Check before publishing',
    zonePlatform: 'Platform',
    app: 'Flutter application',
    appChips: ['GetX', 'GetStorage'],
    layers: [
      { name: 'Feed', detail: 'Short videos and lives' },
      { name: 'Creation', detail: 'Capture, preview, publish' },
      { name: 'State and cache', detail: 'GetX · GetStorage' },
    ],
    send: 'Post submitted',
    moderation: 'AI moderation',
    moderationChips: ['Image analysis', 'Video analysis'],
    safe: 'Safe content: published to the feed',
    blocked: 'Dangerous content: post blocked',
    publish: 'Goes online',
    feed: 'Feed and interactions',
    feedChips: ['Likes', 'Comments', 'Shares'],
    live: 'Live streaming',
    liveChips: ['Live', 'In the feed'],
    inspiration: 'AI inspiration',
    inspirationChips: ['Trends', 'Ideas', 'Views and likes'],
    base: 'Technical foundation',
    baseItems: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'AI'],
  },
};

const VibeDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = VIBE_DIAGRAM[lang];
  return (
    <figure className="rv arch-stage" aria-label={label}>
      <div className="arch-plane">
        <div className="park-grid">
          {/* Zone 1 — the creator's phone */}
          <div className="park-zone">
            <span className="park-zone-label">
              <Smartphone size={11} /> {d.zonePhone}
            </span>
            <Node icon={Smartphone} title={d.app} chips={d.appChips}>
              <ol className="park-layers">
                {d.layers.map((layer, index) => (
                  <li key={layer.name}>
                    <span className="tabular">{index + 1}</span>
                    <span>
                      <strong>{layer.name}</strong>
                      <em>{layer.detail}</em>
                    </span>
                  </li>
                ))}
              </ol>
            </Node>
          </div>

          <Flow label={d.send} />

          {/* Zone 2 — the AI gate */}
          <div className="park-zone">
            <span className="park-zone-label">
              <ScanEye size={11} /> {d.zoneAi}
            </span>
            <Node icon={ScanEye} title={d.moderation} chips={d.moderationChips} strong>
              <ul className="vibe-gate">
                <li className="is-safe">
                  <CircleCheck size={15} aria-hidden="true" /> {d.safe}
                </li>
                <li className="is-blocked">
                  <CircleX size={15} aria-hidden="true" /> {d.blocked}
                </li>
              </ul>
            </Node>
          </div>

          <Flow label={d.publish} />

          {/* Zone 3 — the platform */}
          <div className="park-zone">
            <span className="park-zone-label">
              <Globe size={11} /> {d.zonePlatform}
            </span>
            <div className="grid gap-3">
              <Node icon={Heart} title={d.feed} chips={d.feedChips} />
              <Node icon={Radio} title={d.live} chips={d.liveChips} />
              <Node icon={WandSparkles} title={d.inspiration} chips={d.inspirationChips} />
            </div>
          </div>
        </div>

        <div className="arch-rail">
          <span className="arch-rail-title">
            <Boxes size={14} aria-hidden="true" /> {d.base}
          </span>
          <ol className="arch-rail-steps">
            {d.baseItems.map((item) => (
              <li key={item}>
                <span className="arch-rail-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className="sr-only">
        {`${d.zonePhone}: ${d.app} — ${d.layers.map((l) => `${l.name} (${l.detail})`).join(', ')}. → ${d.send} → ${d.zoneAi}: ${
          d.moderation
        } (${d.moderationChips.join(', ')}). ${d.safe}. ${d.blocked}. → ${d.publish} → ${d.zonePlatform}: ${d.feed} (${d.feedChips.join(
          ', ',
        )}), ${d.live} (${d.liveChips.join(', ')}), ${d.inspiration} (${d.inspirationChips.join(', ')}). ${d.base}: ${d.baseItems.join(
          ', ',
        )}.`}
      </figcaption>
    </figure>
  );
};

/* ---- JobTracer architecture -----------------------------------------------
     [ Téléphone : App Flutter (3 modules + couche état/cache) ]
        ⇄ REST · JSON ⇄
     [ Serveur : API Django (candidatures, comptes, rappels) + orchestrateur IA ]
        → requête + contexte (offre, CV, historique) →
     [ IA : 4 modules, chacun entrée → sortie ]
   Below: one detailed card per AI module (input · what the AI does · output).
   ------------------------------------------------------------------------ */

type JobAiModule = {
  title: string;
  short: string;
  input: string;
  does: string;
  output: string;
  value: string;
};

type JobDiagramText = {
  zonePhone: string;
  zoneServer: string;
  zoneAi: string;
  app: string;
  appChips: string[];
  layers: { name: string; detail: string }[];
  appState: string;
  link: string;
  api: string;
  apiModules: { name: string; detail: string }[];
  orchestrator: string;
  orchestratorDetail: string;
  apiNote: string;
  aiLink: string;
  aiReturn: string;
  ai: JobAiModule[];
  roleTitle: string;
  roleAccent: string;
  roleLead: string;
  labels: { input: string; does: string; output: string };
  base: string;
  baseItems: string[];
};

const JOB_DIAGRAM: Record<Language, JobDiagramText> = {
  fr: {
    zonePhone: 'Téléphone du candidat',
    zoneServer: 'Serveur',
    zoneAi: 'Intelligence artificielle',
    app: 'Application Flutter',
    appChips: ['Écrans', 'Navigation'],
    layers: [
      { name: 'Candidatures', detail: 'Ajout, statuts, recherche, filtres' },
      { name: 'Calendrier', detail: 'Échéances, entretiens, relances' },
      { name: 'Statistiques', detail: 'Taux de réponse, export' },
    ],
    appState: 'État réactif GetX · cache local GetStorage',
    link: 'REST · JSON · synchronisation',
    api: 'API Django',
    apiModules: [
      { name: 'Candidatures', detail: 'CRUD, statuts, historique' },
      { name: 'Comptes', detail: 'Inscription, connexion, profil et CV' },
      { name: 'Rappels', detail: 'Détecte les candidatures sans réponse' },
    ],
    orchestrator: 'Orchestrateur IA',
    orchestratorDetail: 'Prépare le contexte, appelle le modèle, valide la réponse',
    apiNote: 'Appels IA côté serveur · clé jamais exposée',
    aiLink: 'Requête + contexte',
    aiReturn: 'Données structurées',
    ai: [
      {
        title: 'Analyse d’offre',
        short: 'Texte ou lien → candidature prête',
        input: 'Texte ou lien de l’offre collé par l’utilisateur',
        does: 'Lit l’offre et en extrait le poste, l’entreprise, le lieu, le salaire, les compétences demandées et la date limite',
        output: 'Candidature créée automatiquement, échéance ajoutée au calendrier',
        value: 'Plus aucune saisie manuelle',
      },
      {
        title: 'Score CV / offre',
        short: 'CV + offre → score de compatibilité',
        input: 'Le CV de l’utilisateur et l’offre analysée',
        does: 'Compare les compétences, l’expérience et les exigences du poste',
        output: 'Score (par exemple 78 %), compétences qui correspondent et compétences manquantes',
        value: 'On sait où postuler en priorité',
      },
      {
        title: 'Rédaction',
        short: 'Offre + CV → lettre et relance',
        input: 'L’offre, le CV et le statut de la candidature',
        does: 'Rédige une lettre adaptée ; sans réponse après quelques jours, prépare un e-mail de relance',
        output: 'Lettre de motivation et e-mail de relance prêts à envoyer',
        value: 'Branché sur les statuts et le calendrier',
      },
      {
        title: 'Assistant de suivi',
        short: 'Question → réponse + actions',
        input: 'Une question en langage naturel et l’historique des candidatures',
        does: 'Analyse le suivi : « Qui relancer cette semaine ? », « Quel est mon taux de réponse ? »',
        output: 'Réponse chiffrée et actions suggérées (relancer, préparer un entretien…)',
        value: 'On sait toujours quoi faire ensuite',
      },
    ],
    roleTitle: 'Le rôle',
    roleAccent: 'de l’IA.',
    roleLead: 'Quatre modules, chacun avec une entrée claire, un traitement et un résultat directement utilisable dans l’application.',
    labels: { input: 'Entrée', does: 'Ce que fait l’IA', output: 'Résultat' },
    base: 'Socle technique',
    baseItems: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'API REST', 'IA'],
  },
  en: {
    zonePhone: 'Candidate’s phone',
    zoneServer: 'Server',
    zoneAi: 'Artificial intelligence',
    app: 'Flutter application',
    appChips: ['Screens', 'Navigation'],
    layers: [
      { name: 'Applications', detail: 'Add, statuses, search, filters' },
      { name: 'Calendar', detail: 'Deadlines, interviews, follow-ups' },
      { name: 'Statistics', detail: 'Response rate, export' },
    ],
    appState: 'GetX reactive state · GetStorage local cache',
    link: 'REST · JSON · sync',
    api: 'Django API',
    apiModules: [
      { name: 'Applications', detail: 'CRUD, statuses, history' },
      { name: 'Accounts', detail: 'Sign-up, sign-in, profile and CV' },
      { name: 'Reminders', detail: 'Spots applications with no reply' },
    ],
    orchestrator: 'AI orchestrator',
    orchestratorDetail: 'Builds the context, calls the model, validates the answer',
    apiNote: 'Server-side AI calls · key never exposed',
    aiLink: 'Request + context',
    aiReturn: 'Structured data',
    ai: [
      {
        title: 'Job-offer analysis',
        short: 'Text or link → ready application',
        input: 'The offer’s text or link, pasted by the user',
        does: 'Reads the offer and extracts the role, company, location, salary, required skills and deadline',
        output: 'Application created automatically, deadline added to the calendar',
        value: 'No more manual typing',
      },
      {
        title: 'CV-to-offer score',
        short: 'CV + offer → match score',
        input: 'The user’s CV and the analysed offer',
        does: 'Compares skills, experience and the role’s requirements',
        output: 'Score (for example 78%), matching skills and missing skills',
        value: 'You know where to apply first',
      },
      {
        title: 'Writing',
        short: 'Offer + CV → letter and follow-up',
        input: 'The offer, the CV and the application’s status',
        does: 'Writes a tailored letter; with no reply after a few days, drafts a follow-up email',
        output: 'Cover letter and follow-up email ready to send',
        value: 'Wired to statuses and the calendar',
      },
      {
        title: 'Tracking assistant',
        short: 'Question → answer + actions',
        input: 'A natural-language question and the application history',
        does: 'Analyses the search: “Who should I follow up this week?”, “What is my response rate?”',
        output: 'A figure-backed answer and suggested actions (follow up, prepare an interview…)',
        value: 'You always know what to do next',
      },
    ],
    roleTitle: 'The role',
    roleAccent: 'of AI.',
    roleLead: 'Four modules, each with a clear input, a processing step and a result used directly in the app.',
    labels: { input: 'Input', does: 'What the AI does', output: 'Result' },
    base: 'Technical foundation',
    baseItems: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'REST API', 'AI'],
  },
};

const JOB_AI_ICONS: LucideIcon[] = [FileSearch, Target, PenLine, MessageSquare];

const JobDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = JOB_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            {/* Zone 1 — the candidate's phone */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Smartphone size={11} /> {d.zonePhone}
              </span>
              <Node icon={Smartphone} title={d.app} chips={d.appChips}>
                <ol className="park-layers">
                  {d.layers.map((layer, index) => (
                    <li key={layer.name}>
                      <span className="tabular">{index + 1}</span>
                      <span>
                        <strong>{layer.name}</strong>
                        <em>{layer.detail}</em>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="job-state">
                  <Database size={12} aria-hidden="true" /> {d.appState}
                </p>
              </Node>
            </div>

            <Flow label={d.link} both />

            {/* Zone 2 — the Django server and its AI orchestrator */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <Node icon={Server} title={d.api} strong>
                <ul className="job-modules">
                  {d.apiModules.map((module) => (
                    <li key={module.name}>
                      <strong>{module.name}</strong>
                      <em>{module.detail}</em>
                    </li>
                  ))}
                </ul>
                <div className="job-orchestrator">
                  <span className="job-orchestrator-icon" aria-hidden="true">
                    <BrainCircuit size={14} />
                  </span>
                  <span>
                    <strong>{d.orchestrator}</strong>
                    <em>{d.orchestratorDetail}</em>
                  </span>
                </div>
                <p className="park-realtime">
                  <Lock size={13} aria-hidden="true" /> {d.apiNote}
                </p>
              </Node>
            </div>

            <div className="job-ai-links">
              <Flow label={d.aiLink} />
              <Flow label={d.aiReturn} reverse />
            </div>

            {/* Zone 3 — the AI modules, each input → output */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Sparkles size={11} /> {d.zoneAi}
              </span>
              <div className="grid gap-3">
                {d.ai.map((item, index) => (
                  <Node key={item.title} icon={JOB_AI_ICONS[index]} title={item.title}>
                    <p className="job-io">{item.short}</p>
                  </Node>
                ))}
              </div>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Boxes size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zonePhone}: ${d.app} — ${d.layers.map((l) => `${l.name} (${l.detail})`).join(', ')}; ${d.appState}. ⇄ ${
            d.link
          } ⇄ ${d.zoneServer}: ${d.api} — ${d.apiModules.map((m) => `${m.name} (${m.detail})`).join(', ')}; ${d.orchestrator} (${
            d.orchestratorDetail
          }); ${d.apiNote}. → ${d.aiLink} → ${d.zoneAi}: ${d.ai.map((a) => `${a.title} (${a.short})`).join(', ')}. ← ${d.aiReturn}. ${
            d.base
          }: ${d.baseItems.join(', ')}.`}
        </figcaption>
      </figure>

      {/* The role of the AI, module by module */}
      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.roleTitle} <span className="font-serif font-normal italic">{d.roleAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.roleLead}</p>
        <ol className="job-role-grid">
          {d.ai.map((item, index) => {
            const Icon = JOB_AI_ICONS[index];
            return (
              <li key={item.title} className="rv job-role-card" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="tabular font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h4 className="mt-4 text-[17px] font-bold leading-tight tracking-[-0.02em]">{item.title}</h4>
                <dl className="job-role-steps">
                  <div>
                    <dt>{d.labels.input}</dt>
                    <dd>{item.input}</dd>
                  </div>
                  <div>
                    <dt>{d.labels.does}</dt>
                    <dd>{item.does}</dd>
                  </div>
                  <div>
                    <dt>{d.labels.output}</dt>
                    <dd>{item.output}</dd>
                  </div>
                </dl>
                <p className="job-role-value">
                  <ArrowRight size={13} aria-hidden="true" /> {item.value}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

/* ---- Medical fake-news detector architecture ------------------------------
     [ Entrées : app Flutter + scraping ] ⇄ REST · WebSocket ⇄ [ Serveur NestJS : modules, file Redis/BullMQ, données ]
        → analyse → [ IA hybride : Ollama · Gemini/ChatGPT · consensus + RAG · multimodal ] ← verdict + score
   Below: the journey of one piece of content, in five steps, and the four verdicts.
   ------------------------------------------------------------------------ */

type FnStep = { title: string; detail: string; tags: string[] };
type FnDiagramText = {
  zoneIn: string;
  zoneServer: string;
  zoneAi: string;
  app: string;
  appLayers: { name: string; detail: string }[];
  scraper: string;
  scraperChips: string[];
  scraperNote: string;
  link: string;
  api: string;
  apiModules: { name: string; detail: string }[];
  queue: string;
  queueDetail: string;
  security: string;
  data: string;
  dataChips: string[];
  toAi: string;
  fromAi: string;
  local: string;
  localChips: string[];
  cloud: string;
  cloudChips: string[];
  consensus: string;
  consensusChips: string[];
  multimodal: string;
  multimodalChips: string[];
  base: string;
  baseItems: string[];
  journeyTitle: string;
  journeyAccent: string;
  journeyLead: string;
  steps: FnStep[];
  verdictsLabel: string;
  verdicts: string[];
};

const FN_DIAGRAM: Record<Language, FnDiagramText> = {
  fr: {
    zoneIn: 'Sources des contenus',
    zoneServer: 'Serveur',
    zoneAi: 'IA hybride',
    app: 'Application Flutter',
    appLayers: [
      { name: 'Vérifier', detail: 'Texte, lien, image, vidéo' },
      { name: 'S’informer', detail: 'Fil vérifié, alertes intox' },
      { name: 'Se soigner', detail: 'Médecins, rendez-vous, chatbot' },
    ],
    scraper: 'Collecte automatisée',
    scraperChips: ['Actualité', 'Blogs santé', 'Forums', 'Réseaux'],
    scraperNote: 'Tâches planifiées (cron) · filtrage NLP · dédoublonnage',
    link: 'REST · WebSocket',
    api: 'API NestJS',
    apiModules: [
      { name: 'Vérifications', detail: 'Soumissions, verdicts, historique' },
      { name: 'Validation médicale', detail: 'Attribution par spécialité' },
      { name: 'Médecins et rendez-vous', detail: 'Profils, créneaux, rappels' },
      { name: 'Chat', detail: 'Chatbot et urgences · WebSocket' },
    ],
    queue: 'File Redis + BullMQ',
    queueDetail: 'Analyses asynchrones, sans bloquer l’application',
    security: 'JWT · rôles (RBAC) · chiffrement · HTTPS',
    data: 'Données',
    dataChips: ['PostgreSQL', 'MongoDB', 'Base vectorielle', 'S3 / MinIO'],
    toAi: 'Contenu à analyser',
    fromAi: 'Verdict + score',
    local: 'Ollama · LLM local',
    localChips: ['Llama', 'Mistral', 'Confidentiel'],
    cloud: 'Gemini + ChatGPT',
    cloudChips: ['Analyse approfondie', 'Vérification croisée'],
    consensus: 'Consensus + RAG',
    consensusChips: ['Score de confiance', 'OMS', 'PubMed'],
    multimodal: 'Analyse multimodale',
    multimodalChips: ['Vision', 'OCR', 'Whisper', 'Deepfake'],
    base: 'Socle technique',
    baseItems: ['Flutter', 'NestJS', 'Ollama', 'Gemini', 'ChatGPT', 'Redis', 'Firebase', 'Docker', 'GitHub Actions'],
    journeyTitle: 'Le parcours',
    journeyAccent: 'd’un contenu.',
    journeyLead: 'De la publication en ligne au fil vérifié : cinq étapes, dont une validation humaine pour les cas sensibles.',
    steps: [
      { title: 'Collecte', detail: 'Le contenu est soumis par un patient ou trouvé par le scraping, filtré puis mis en file d’attente.', tags: ['Scraping', 'NLP', 'BullMQ'] },
      { title: 'Analyse', detail: 'Texte vérifié par les modèles ; images et vidéos décrites, OCR, transcription et détection de manipulation.', tags: ['Ollama', 'Vision', 'Whisper'] },
      { title: 'Verdict', detail: 'Les modèles sont comparés et confrontés aux sources de référence : verdict, score et explication.', tags: ['Consensus', 'RAG', 'Sources'] },
      { title: 'Validation', detail: 'Score faible ou fort impact : un médecin de la bonne spécialité approuve, corrige ou rejette.', tags: ['Médecin', 'Feedback'] },
      { title: 'Publication', detail: 'Contenu publié dans le fil, badge « Vérifié par un médecin », alerte push si l’intox est virale.', tags: ['Fil', 'Firebase'] },
    ],
    verdictsLabel: 'Les quatre verdicts',
    verdicts: ['Vrai', 'Faux', 'Trompeur', 'Non vérifiable'],
  },
  en: {
    zoneIn: 'Content sources',
    zoneServer: 'Server',
    zoneAi: 'Hybrid AI',
    app: 'Flutter application',
    appLayers: [
      { name: 'Check', detail: 'Text, link, image, video' },
      { name: 'Stay informed', detail: 'Verified feed, fake-news alerts' },
      { name: 'Get care', detail: 'Doctors, booking, chatbot' },
    ],
    scraper: 'Automated collection',
    scraperChips: ['News', 'Health blogs', 'Forums', 'Social'],
    scraperNote: 'Scheduled jobs (cron) · NLP filtering · de-duplication',
    link: 'REST · WebSocket',
    api: 'NestJS API',
    apiModules: [
      { name: 'Checks', detail: 'Submissions, verdicts, history' },
      { name: 'Medical validation', detail: 'Assigned by specialty' },
      { name: 'Doctors and booking', detail: 'Profiles, slots, reminders' },
      { name: 'Chat', detail: 'Chatbot and emergencies · WebSocket' },
    ],
    queue: 'Redis + BullMQ queue',
    queueDetail: 'Asynchronous analyses, the app never waits',
    security: 'JWT · roles (RBAC) · encryption · HTTPS',
    data: 'Data',
    dataChips: ['PostgreSQL', 'MongoDB', 'Vector store', 'S3 / MinIO'],
    toAi: 'Content to analyse',
    fromAi: 'Verdict + score',
    local: 'Ollama · local LLM',
    localChips: ['Llama', 'Mistral', 'Private'],
    cloud: 'Gemini + ChatGPT',
    cloudChips: ['Deep analysis', 'Cross-check'],
    consensus: 'Consensus + RAG',
    consensusChips: ['Confidence score', 'WHO', 'PubMed'],
    multimodal: 'Multimodal analysis',
    multimodalChips: ['Vision', 'OCR', 'Whisper', 'Deepfake'],
    base: 'Technical foundation',
    baseItems: ['Flutter', 'NestJS', 'Ollama', 'Gemini', 'ChatGPT', 'Redis', 'Firebase', 'Docker', 'GitHub Actions'],
    journeyTitle: 'The journey',
    journeyAccent: 'of a piece of content.',
    journeyLead: 'From an online post to the verified feed: five steps, including human validation for sensitive cases.',
    steps: [
      { title: 'Collection', detail: 'Content is submitted by a patient or found by scraping, filtered, then queued.', tags: ['Scraping', 'NLP', 'BullMQ'] },
      { title: 'Analysis', detail: 'Text checked by the models; images and videos described, OCR, transcription and manipulation detection.', tags: ['Ollama', 'Vision', 'Whisper'] },
      { title: 'Verdict', detail: 'Models are compared and checked against reference sources: verdict, score and explanation.', tags: ['Consensus', 'RAG', 'Sources'] },
      { title: 'Validation', detail: 'Low score or high impact: a doctor of the right specialty approves, corrects or rejects.', tags: ['Doctor', 'Feedback'] },
      { title: 'Publication', detail: 'Published in the feed with a “Verified by a doctor” badge; push alert if the hoax goes viral.', tags: ['Feed', 'Firebase'] },
    ],
    verdictsLabel: 'The four verdicts',
    verdicts: ['True', 'False', 'Misleading', 'Unverifiable'],
  },
};

const FN_STEP_ICONS: LucideIcon[] = [Globe, ScanText, BadgeCheck, Stethoscope, Newspaper];
const FN_VERDICT_ICONS: LucideIcon[] = [CircleCheck, CircleX, ShieldAlert, Hourglass];

const FakeNewsDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = FN_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            {/* Zone 1 — where content comes from */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Smartphone size={11} /> {d.zoneIn}
              </span>
              <div className="grid gap-3">
                <Node icon={Smartphone} title={d.app}>
                  <ol className="park-layers">
                    {d.appLayers.map((layer, index) => (
                      <li key={layer.name}>
                        <span className="tabular">{index + 1}</span>
                        <span>
                          <strong>{layer.name}</strong>
                          <em>{layer.detail}</em>
                        </span>
                      </li>
                    ))}
                  </ol>
                </Node>
                <Node icon={Globe} title={d.scraper} chips={d.scraperChips}>
                  <p className="job-io">{d.scraperNote}</p>
                </Node>
              </div>
            </div>

            <Flow label={d.link} both />

            {/* Zone 2 — NestJS server, queue and data */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <div className="grid gap-3">
                <Node icon={Server} title={d.api} strong>
                  <ul className="job-modules">
                    {d.apiModules.map((module) => (
                      <li key={module.name}>
                        <strong>{module.name}</strong>
                        <em>{module.detail}</em>
                      </li>
                    ))}
                  </ul>
                  <div className="job-orchestrator fn-queue">
                    <span className="job-orchestrator-icon" aria-hidden="true">
                      <Boxes size={14} />
                    </span>
                    <span>
                      <strong>{d.queue}</strong>
                      <em>{d.queueDetail}</em>
                    </span>
                  </div>
                  <p className="park-realtime">
                    <Lock size={13} aria-hidden="true" /> {d.security}
                  </p>
                </Node>
                <Node icon={Database} title={d.data} chips={d.dataChips} />
              </div>
            </div>

            <div className="job-ai-links">
              <Flow label={d.toAi} />
              <Flow label={d.fromAi} reverse />
            </div>

            {/* Zone 3 — hybrid AI engine */}
            <div className="park-zone">
              <span className="park-zone-label">
                <Sparkles size={11} /> {d.zoneAi}
              </span>
              <div className="grid gap-3">
                <Node icon={Lock} title={d.local} chips={d.localChips} />
                <Node icon={Cloud} title={d.cloud} chips={d.cloudChips} />
                <Node icon={BadgeCheck} title={d.consensus} chips={d.consensusChips} />
                <Node icon={ScanText} title={d.multimodal} chips={d.multimodalChips} />
              </div>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Boxes size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zoneIn}: ${d.app} (${d.appLayers.map((l) => `${l.name}: ${l.detail}`).join(', ')}); ${d.scraper} (${d.scraperChips.join(
            ', ',
          )}; ${d.scraperNote}). ⇄ ${d.link} ⇄ ${d.zoneServer}: ${d.api} (${d.apiModules
            .map((m) => `${m.name}: ${m.detail}`)
            .join(', ')}); ${d.queue} (${d.queueDetail}); ${d.security}; ${d.data}: ${d.dataChips.join(', ')}. → ${d.toAi} → ${
            d.zoneAi
          }: ${d.local}, ${d.cloud}, ${d.consensus} (${d.consensusChips.join(', ')}), ${d.multimodal} (${d.multimodalChips.join(
            ', ',
          )}). ← ${d.fromAi}. ${d.base}: ${d.baseItems.join(', ')}.`}
        </figcaption>
      </figure>

      {/* The journey of one piece of content */}
      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.journeyTitle} <span className="font-serif font-normal italic">{d.journeyAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.journeyLead}</p>
        <ol className="fn-journey">
          {d.steps.map((step, index) => {
            const Icon = FN_STEP_ICONS[index];
            return (
              <li key={step.title} className="rv job-role-card fn-step" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="tabular font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h4 className="mt-4 text-[17px] font-bold leading-tight tracking-[-0.02em]">{step.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{step.detail}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {step.tags.map((tag) => (
                    <li key={tag} className="arch-chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        <div className="rv fn-verdicts">
          <span className="eyebrow">{d.verdictsLabel}</span>
          <ul>
            {d.verdicts.map((verdict, index) => {
              const Icon = FN_VERDICT_ICONS[index];
              return (
                <li key={verdict} className={`fn-verdict fn-verdict--${index}`}>
                  <Icon size={14} aria-hidden="true" /> {verdict}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

/* ---- CrashScan architecture ---------------------------------------------------
     [ iPhone : SwiftUI ] ⇄ HTTPS · REST ⇄ [ NestJS + PostgreSQL ] → [ Gemini · ChatGPT · Google Maps ]
   Below: the two roles of the AI, step by step, and a sample result.
   ------------------------------------------------------------------------ */

type CrRole = { title: string; user: string; steps: string[]; output: string };
type CrText = {
  zonePhone: string;
  zoneServer: string;
  zoneAi: string;
  app: string;
  appChips: string[];
  appLayers: { name: string; detail: string }[];
  link: string;
  api: string;
  apiModules: { name: string; detail: string }[];
  security: string;
  db: string;
  dbChips: string[];
  toAi: string;
  fromAi: string;
  gemini: string;
  geminiChips: string[];
  gpt: string;
  gptChips: string[];
  maps: string;
  mapsChips: string[];
  base: string;
  baseItems: string[];
  rolesTitle: string;
  rolesAccent: string;
  rolesLead: string;
  labels: { user: string; ai: string; output: string };
  roles: CrRole[];
  sampleTitle: string;
  sample: { label: string; value: string }[];
};

const CR_DIAGRAM: Record<Language, CrText> = {
  fr: {
    zonePhone: 'iPhone du conducteur',
    zoneServer: 'Serveur',
    zoneAi: 'IA et cartographie',
    app: 'Application iOS · SwiftUI',
    appChips: ['Caméra', 'VisionKit', 'Signature'],
    appLayers: [
      { name: 'Prise de vue guidée', detail: 'Netteté et luminosité contrôlées' },
      { name: 'Documents', detail: 'Détection des bords, redressement' },
      { name: 'Constat', detail: 'Relecture, signature à l’écran' },
    ],
    link: 'HTTPS · REST',
    api: 'API NestJS',
    apiModules: [
      { name: 'Sinistres', detail: 'Dossiers, photos, analyses' },
      { name: 'Estimation', detail: 'Grille de prix, fourchette' },
      { name: 'Constat', detail: 'Vérifications, PDF horodaté' },
      { name: 'Comptes', detail: 'Authentification, consentement' },
    ],
    security: 'Clés API côté serveur · données chiffrées',
    db: 'PostgreSQL',
    dbChips: ['Utilisateurs', 'Sinistres', 'Constats', 'Grille de prix'],
    toAi: 'Photos + contexte',
    fromAi: 'JSON + confiance',
    gemini: 'Google Gemini',
    geminiChips: ['Analyse des dommages', 'Lecture FR · AR'],
    gpt: 'ChatGPT',
    gptChips: ['Estimation du coût', 'Circonstances'],
    maps: 'Google Maps',
    mapsChips: ['Garages proches', 'Itinéraire', 'Adresse'],
    base: 'Socle technique',
    baseItems: ['SwiftUI', 'VisionKit', 'NestJS', 'PostgreSQL', 'Gemini', 'ChatGPT', 'Google Maps'],
    rolesTitle: 'Le rôle',
    rolesAccent: 'de l’IA.',
    rolesLead: 'Deux missions : comprendre l’accident, puis remplir le constat. L’IA propose, les conducteurs vérifient et signent.',
    labels: { user: 'L’utilisateur', ai: 'Ce que fait l’IA', output: 'Résultat' },
    roles: [
      {
        title: 'Analyse, coût et garages',
        user: 'Photographie son véhicule : une vue d’ensemble, puis un gros plan de chaque zone abîmée.',
        steps: [
          'Contrôle de la netteté et de la luminosité',
          'Gemini : type d’accident, pièces, dommages, gravité, réparer ou remplacer',
          'ChatGPT + grille de prix : fourchette et détail par pièce',
          'Google Maps : garages par spécialité, distance et note',
        ],
        output: 'Dommages, estimation, garage le plus proche ; expertise recommandée si la confiance est faible',
      },
      {
        title: 'Constat amiable automatique',
        user: 'Photographie le permis, la carte grise et l’attestation d’assurance des deux conducteurs.',
        steps: [
          'VisionKit détecte et redresse chaque document',
          'Gemini lit le texte en français et en arabe',
          'Le backend vérifie immatriculation, dates et validité de l’assurance',
          'ChatGPT propose les circonstances ; GPS pour la date, l’heure et le lieu',
        ],
        output: 'Constat prérempli, signé à l’écran, PDF horodaté envoyé à l’assureur',
      },
    ],
    sampleTitle: 'Exemple de résultat',
    sample: [
      { label: 'Accident', value: 'Choc arrière' },
      { label: 'Dommages', value: 'Pare-chocs arrière (à remplacer), feu arrière gauche (cassé)' },
      { label: 'Gravité', value: 'Moyenne' },
      { label: 'Estimation', value: '900 à 1 300 TND' },
      { label: 'Garage', value: 'Garage X · 1,2 km' },
    ],
  },
  en: {
    zonePhone: 'Driver’s iPhone',
    zoneServer: 'Server',
    zoneAi: 'AI and maps',
    app: 'iOS app · SwiftUI',
    appChips: ['Camera', 'VisionKit', 'Signature'],
    appLayers: [
      { name: 'Guided capture', detail: 'Sharpness and lighting checked' },
      { name: 'Documents', detail: 'Edge detection, straightening' },
      { name: 'Report', detail: 'Review, on-screen signature' },
    ],
    link: 'HTTPS · REST',
    api: 'NestJS API',
    apiModules: [
      { name: 'Claims', detail: 'Files, photos, analyses' },
      { name: 'Estimate', detail: 'Price grid, range' },
      { name: 'Report', detail: 'Checks, timestamped PDF' },
      { name: 'Accounts', detail: 'Authentication, consent' },
    ],
    security: 'Server-side API keys · encrypted data',
    db: 'PostgreSQL',
    dbChips: ['Users', 'Claims', 'Reports', 'Price grid'],
    toAi: 'Photos + context',
    fromAi: 'JSON + confidence',
    gemini: 'Google Gemini',
    geminiChips: ['Damage analysis', 'Reading FR · AR'],
    gpt: 'ChatGPT',
    gptChips: ['Cost estimate', 'Circumstances'],
    maps: 'Google Maps',
    mapsChips: ['Nearby garages', 'Directions', 'Address'],
    base: 'Technical foundation',
    baseItems: ['SwiftUI', 'VisionKit', 'NestJS', 'PostgreSQL', 'Gemini', 'ChatGPT', 'Google Maps'],
    rolesTitle: 'The role',
    rolesAccent: 'of AI.',
    rolesLead: 'Two missions: understand the accident, then fill in the report. The AI suggests; the drivers check and sign.',
    labels: { user: 'The user', ai: 'What the AI does', output: 'Result' },
    roles: [
      {
        title: 'Analysis, cost and garages',
        user: 'Photographs the vehicle: an overview, then a close-up of each damaged area.',
        steps: [
          'Sharpness and lighting check',
          'Gemini: accident type, parts, damage, severity, repair or replace',
          'ChatGPT + price grid: price range and per-part breakdown',
          'Google Maps: garages by specialty, distance and rating',
        ],
        output: 'Damage, estimate, nearest garage; expert assessment suggested when confidence is low',
      },
      {
        title: 'Automatic accident report',
        user: 'Photographs both drivers’ licence, registration and insurance certificate.',
        steps: [
          'VisionKit detects and straightens each document',
          'Gemini reads the text in French and Arabic',
          'The backend checks the plate, dates and insurance validity',
          'ChatGPT suggests the circumstances; GPS fills date, time and place',
        ],
        output: 'Pre-filled report, signed on screen, timestamped PDF sent to the insurer',
      },
    ],
    sampleTitle: 'Sample result',
    sample: [
      { label: 'Accident', value: 'Rear impact' },
      { label: 'Damage', value: 'Rear bumper (replace), left tail light (broken)' },
      { label: 'Severity', value: 'Medium' },
      { label: 'Estimate', value: '900 to 1,300 TND' },
      { label: 'Garage', value: 'Garage X · 1.2 km' },
    ],
  },
};

const CR_ROLE_ICONS: LucideIcon[] = [ScanEye, FileText];

const CrashDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = CR_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage crash-arch" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            <div className="park-zone">
              <span className="park-zone-label">
                <Smartphone size={11} /> {d.zonePhone}
              </span>
              <Node icon={Smartphone} title={d.app} chips={d.appChips} className="is-ios">
                <ol className="park-layers">
                  {d.appLayers.map((layer, index) => (
                    <li key={layer.name}>
                      <span className="tabular">{index + 1}</span>
                      <span>
                        <strong>{layer.name}</strong>
                        <em>{layer.detail}</em>
                      </span>
                    </li>
                  ))}
                </ol>
              </Node>
            </div>

            <Flow label={d.link} both />

            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <div className="grid gap-3">
                <Node icon={Server} title={d.api} strong>
                  <ul className="job-modules">
                    {d.apiModules.map((module) => (
                      <li key={module.name}>
                        <strong>{module.name}</strong>
                        <em>{module.detail}</em>
                      </li>
                    ))}
                  </ul>
                  <p className="park-realtime">
                    <Lock size={13} aria-hidden="true" /> {d.security}
                  </p>
                </Node>
                <Node icon={Database} title={d.db} chips={d.dbChips} className="is-pg" />
              </div>
            </div>

            <div className="job-ai-links">
              <Flow label={d.toAi} />
              <Flow label={d.fromAi} reverse />
            </div>

            <div className="park-zone">
              <span className="park-zone-label">
                <Sparkles size={11} /> {d.zoneAi}
              </span>
              <div className="grid gap-3">
                <Node icon={ScanEye} title={d.gemini} chips={d.geminiChips} className="is-gemini" />
                <Node icon={BrainCircuit} title={d.gpt} chips={d.gptChips} className="is-gpt" />
                <Node icon={MapPin} title={d.maps} chips={d.mapsChips} className="is-maps" />
              </div>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Boxes size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zonePhone}: ${d.app} (${d.appLayers.map((l) => `${l.name}: ${l.detail}`).join(', ')}). ⇄ ${d.link} ⇄ ${d.zoneServer}: ${
            d.api
          } (${d.apiModules.map((m) => `${m.name}: ${m.detail}`).join(', ')}); ${d.security}; ${d.db}. → ${d.toAi} → ${d.zoneAi}: ${d.gemini} (${d.geminiChips.join(
            ', ',
          )}), ${d.gpt} (${d.gptChips.join(', ')}), ${d.maps} (${d.mapsChips.join(', ')}). ← ${d.fromAi}.`}
        </figcaption>
      </figure>

      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.rolesTitle} <span className="font-serif font-normal italic">{d.rolesAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.rolesLead}</p>
        <ol className="cr-roles">
          {d.roles.map((role, index) => {
            const Icon = CR_ROLE_ICONS[index];
            return (
              <li key={role.title} className="rv job-role-card" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="tabular font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h4 className="mt-4 text-[18px] font-bold leading-tight tracking-[-0.02em]">{role.title}</h4>
                <dl className="job-role-steps">
                  <div>
                    <dt>{d.labels.user}</dt>
                    <dd>{role.user}</dd>
                  </div>
                  <div>
                    <dt>{d.labels.ai}</dt>
                    <dd>
                      <ol className="cr-steps">
                        {role.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </dd>
                  </div>
                  <div>
                    <dt>{d.labels.output}</dt>
                    <dd>{role.output}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
          <li className="rv job-role-card cr-sample" style={stagger(2)}>
            <span className="eyebrow">{d.sampleTitle}</span>
            <dl className="cr-sample-list">
              {d.sample.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        </ol>
      </div>
    </>
  );
};

/* ---- La Reine architecture ---------------------------------------------------
   Who talks to whom:
     Téléphone (PWA, Serwist : cache 1) ⇄ HTTPS ⇄ Cloudflare + CDN (cache 3)
     CDN ─page absente→ Next.js 16 (ISR : cache 2) ─page prête→ CDN
   Below: the three-level cache cascade, then the shared base on the rail.
   ------------------------------------------------------------------------ */

type LrLevel = { level: string; title: string; where: string; hit: string; miss: string; tools: string[] };

type LrText = {
  zoneClient: string;
  zoneEdge: string;
  zoneServer: string;
  site: string;
  siteChips: string[];
  siteLayers: { name: string; detail: string }[];
  link: string;
  shield: string;
  shieldChips: string[];
  cdn: string;
  cdnChips: string[];
  toServer: string;
  fromServer: string;
  next: string;
  nextModules: { name: string; detail: string }[];
  security: string;
  pay: string;
  payChips: string[];
  base: string;
  baseItems: string[];
  cascadeTitle: string;
  cascadeAccent: string;
  cascadeLead: string;
  labels: { hit: string; miss: string };
  levels: LrLevel[];
  outcome: string;
};

const LR_DIAGRAM: Record<Language, LrText> = {
  fr: {
    zoneClient: 'Téléphone de la cliente',
    zoneEdge: 'Réseau',
    zoneServer: 'Serveur',
    site: 'Site Next.js · PWA',
    siteChips: ['Installable', 'Hors ligne', 'FR · DT'],
    siteLayers: [
      { name: 'Service Worker · Serwist', detail: 'Photos, design et pages enregistrés' },
      { name: 'Panier et favoris', detail: 'Gardés dans le navigateur, synchronisés' },
      { name: 'Achat express', detail: 'Ajout au panier en un clic' },
    ],
    link: 'HTTPS',
    shield: 'Cloudflare',
    shieldChips: ['Anti-robots', 'Anti-attaques'],
    cdn: 'CDN · Vercel',
    cdnChips: ['Serveur le plus proche', 'Pages en cache'],
    toServer: 'Page absente',
    fromServer: 'Page prête',
    next: 'Next.js 16 · App Router',
    nextModules: [
      { name: 'Accueil', detail: 'Bannière, best-sellers, avis' },
      { name: 'Catalogue', detail: '4 collections, tri, 3 ou 4 colonnes' },
      { name: 'Fiche produit', detail: 'Galerie, zoom, couleur, taille' },
      { name: 'Commande', detail: 'Page dédiée, achat express' },
    ],
    security: 'ISR : régénérée à intervalle régulier ou à chaque modification',
    pay: 'Paiement · Konnect / Flouci',
    payChips: ['Prévu', 'Prix vérifiés côté serveur'],
    base: 'Base commune',
    baseItems: ['TypeScript de bout en bout', 'Tailwind CSS · shadcn/ui', 'Design system crème et champagne', 'Images chargées à la demande', 'Turbopack'],
    cascadeTitle: 'Un cache à',
    cascadeAccent: 'trois niveaux.',
    cascadeLead: 'Chaque visite s’arrête au premier niveau qui a déjà la page : le serveur ne travaille qu’en dernier recours.',
    labels: { hit: 'Déjà enregistré', miss: 'Sinon' },
    levels: [
      {
        level: 'Niveau 1',
        title: 'Le téléphone',
        where: 'PWA + Service Worker',
        hit: 'Ouverture instantanée, même avec un mauvais réseau',
        miss: 'On demande la page au CDN',
        tools: ['Serwist', 'Installable'],
      },
      {
        level: 'Niveau 2',
        title: 'Le CDN',
        where: 'Vercel ou Cloudflare',
        hit: 'Page déjà prête, servie depuis le serveur le plus proche',
        miss: 'On demande la page à Next.js',
        tools: ['Edge', 'Réseau mondial'],
      },
      {
        level: 'Niveau 3',
        title: 'Le serveur Next.js',
        where: 'ISR · pages préparées à l’avance',
        hit: 'La page est préparée une seule fois, puis partagée',
        miss: 'Mise à jour régulière ou dès qu’un produit change',
        tools: ['ISR', 'Revalidation'],
      },
    ],
    outcome: '1 000 visiteurs en même temps : le serveur prépare chaque page une seule fois.',
  },
  en: {
    zoneClient: 'Customer’s phone',
    zoneEdge: 'Network',
    zoneServer: 'Server',
    site: 'Next.js site · PWA',
    siteChips: ['Installable', 'Offline', 'FR · TND'],
    siteLayers: [
      { name: 'Service Worker · Serwist', detail: 'Photos, design and pages stored' },
      { name: 'Cart and wishlist', detail: 'Kept in the browser, synced' },
      { name: 'Express checkout', detail: 'One-click add to cart' },
    ],
    link: 'HTTPS',
    shield: 'Cloudflare',
    shieldChips: ['Bot protection', 'Attack filtering'],
    cdn: 'CDN · Vercel',
    cdnChips: ['Nearest server', 'Cached pages'],
    toServer: 'Page missing',
    fromServer: 'Page ready',
    next: 'Next.js 16 · App Router',
    nextModules: [
      { name: 'Home', detail: 'Banner, best-sellers, reviews' },
      { name: 'Catalogue', detail: '4 collections, sorting, 3 or 4 columns' },
      { name: 'Product page', detail: 'Gallery, zoom, colour, size' },
      { name: 'Checkout', detail: 'Dedicated page, express mode' },
    ],
    security: 'ISR: rebuilt every few minutes or on change',
    pay: 'Payment · Konnect / Flouci',
    payChips: ['Planned', 'Server-side price checks'],
    base: 'Shared base',
    baseItems: ['End-to-end TypeScript', 'Tailwind CSS · shadcn/ui', 'Cream and champagne design system', 'Lazy-loaded images', 'Turbopack'],
    cascadeTitle: 'A three-level',
    cascadeAccent: 'cache.',
    cascadeLead: 'Each visit stops at the first level that already has the page: the server only works as a last resort.',
    labels: { hit: 'Already stored', miss: 'Otherwise' },
    levels: [
      {
        level: 'Level 1',
        title: 'The phone',
        where: 'PWA + Service Worker',
        hit: 'Opens instantly, even on a poor network',
        miss: 'The page is requested from the CDN',
        tools: ['Serwist', 'Installable'],
      },
      {
        level: 'Level 2',
        title: 'The CDN',
        where: 'Vercel or Cloudflare',
        hit: 'Page already built, served from the nearest server',
        miss: 'The page is requested from Next.js',
        tools: ['Edge', 'Global network'],
      },
      {
        level: 'Level 3',
        title: 'The Next.js server',
        where: 'ISR · pre-built pages',
        hit: 'The page is built once, then shared',
        miss: 'Refreshed every few minutes or when a product changes',
        tools: ['ISR', 'Revalidation'],
      },
    ],
    outcome: '1,000 simultaneous visitors: the server builds each page only once.',
  },
};

const LR_LEVEL_ICONS: LucideIcon[] = [Smartphone, Globe, Server];

const LaReineDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = LR_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage crash-arch reine-arch" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            <div className="park-zone">
              <span className="park-zone-label">
                <Smartphone size={11} /> {d.zoneClient}
              </span>
              <Node icon={ShoppingBag} title={d.site} chips={d.siteChips} className="is-ios">
                <ol className="park-layers">
                  {d.siteLayers.map((layer, index) => (
                    <li key={layer.name}>
                      <span className="tabular">{index + 1}</span>
                      <span>
                        <strong>{layer.name}</strong>
                        <em>{layer.detail}</em>
                      </span>
                    </li>
                  ))}
                </ol>
              </Node>
            </div>

            <Flow label={d.link} both />

            <div className="park-zone">
              <span className="park-zone-label">
                <Globe size={11} /> {d.zoneEdge}
              </span>
              <div className="grid gap-3">
                <Node icon={ShieldCheck} title={d.shield} chips={d.shieldChips} className="is-cf" />
                <Node icon={Zap} title={d.cdn} chips={d.cdnChips} className="is-vercel" />
              </div>
            </div>

            <div className="job-ai-links">
              <Flow label={d.toServer} />
              <Flow label={d.fromServer} reverse />
            </div>

            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <div className="grid gap-3">
                <Node icon={Server} title={d.next} strong>
                  <ul className="job-modules">
                    {d.nextModules.map((module) => (
                      <li key={module.name}>
                        <strong>{module.name}</strong>
                        <em>{module.detail}</em>
                      </li>
                    ))}
                  </ul>
                  <p className="park-realtime">
                    <Clock size={13} aria-hidden="true" /> {d.security}
                  </p>
                </Node>
                <Node icon={CreditCard} title={d.pay} chips={d.payChips} className="is-pay" />
              </div>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Boxes size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zoneClient}: ${d.site} (${d.siteLayers.map((l) => `${l.name}: ${l.detail}`).join(', ')}). ⇄ ${d.link} ⇄ ${d.zoneEdge}: ${
            d.shield
          }, ${d.cdn}. → ${d.toServer} → ${d.zoneServer}: ${d.next} (${d.nextModules
            .map((m) => `${m.name}: ${m.detail}`)
            .join(', ')}); ${d.security}; ${d.pay} (${d.payChips.join(', ')}). ← ${d.fromServer}.`}
        </figcaption>
      </figure>

      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.cascadeTitle} <span className="font-serif font-normal italic">{d.cascadeAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.cascadeLead}</p>
        <ol className="lr-cascade">
          {d.levels.map((level, index) => {
            const Icon = LR_LEVEL_ICONS[index];
            return (
              <li key={level.level} className="rv job-role-card lr-level" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="lr-level-tag">{level.level}</span>
                </div>
                <h4 className="mt-4 text-[18px] font-bold leading-tight tracking-[-0.02em]">{level.title}</h4>
                <p className="mt-1 text-[13px] text-muted-foreground">{level.where}</p>
                <dl className="job-role-steps">
                  <div>
                    <dt>{d.labels.hit}</dt>
                    <dd>{level.hit}</dd>
                  </div>
                  <div>
                    <dt>{d.labels.miss}</dt>
                    <dd>{level.miss}</dd>
                  </div>
                </dl>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {level.tools.map((tool) => (
                    <li key={tool} className="arch-chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        <p className="rv lr-outcome">
          <Zap size={15} aria-hidden="true" /> {d.outcome}
        </p>
      </div>
    </>
  );
};

/* ---- Marketplace Student architecture ---------------------------------------
   Who talks to whom:
     Navigateur (Next.js 13 PWA, Service Worker, Web Push) ⇄ HTTPS · cookie JWT
       ⇄ API Next.js (auth, profils, cours, IA) ⇄ MongoDB (Mongoose)
     API → Google Gemini · Nodemailer · Web Push ; Cloudflare in front.
   Below: the eight AI services, grouped by role.
   ------------------------------------------------------------------------ */

type MsGroup = { title: string; lead: string; items: string[] };

type MsText = {
  zoneClient: string;
  zoneServer: string;
  zoneServices: string;
  app: string;
  appChips: string[];
  appLayers: { name: string; detail: string }[];
  link: string;
  api: string;
  apiModules: { name: string; detail: string }[];
  security: string;
  db: string;
  dbChips: string[];
  toAi: string;
  fromAi: string;
  gemini: string;
  geminiChips: string[];
  mail: string;
  mailChips: string[];
  push: string;
  pushChips: string[];
  base: string;
  baseItems: string[];
  aiTitle: string;
  aiAccent: string;
  aiLead: string;
  groups: MsGroup[];
  note: string;
};

const MS_DIAGRAM: Record<Language, MsText> = {
  fr: {
    zoneClient: 'Navigateur de l’étudiant',
    zoneServer: 'Serveur Next.js',
    zoneServices: 'IA et services',
    app: 'Application Next.js 13 · PWA',
    appChips: ['React 18', 'Tailwind', 'Installable'],
    appLayers: [
      { name: 'Pages', detail: 'Accueil, catalogue, cours, tableau de bord' },
      { name: 'Service Worker', detail: 'Fonctionne hors connexion' },
      { name: 'Assistant IA', detail: 'Présent sur toutes les pages' },
    ],
    link: 'HTTPS · cookie JWT',
    api: 'API Next.js',
    apiModules: [
      { name: 'Authentification', detail: 'JWT, bcrypt, vérif. e-mail' },
      { name: 'Espace personnel', detail: 'Profil, confidentialité, achats' },
      { name: 'Cours', detail: 'Catalogue, fiches, recherche' },
      { name: 'IA', detail: 'Requêtes limitées par utilisateur' },
    ],
    security: 'Validation serveur · CSP · X-Frame-Options',
    db: 'MongoDB · Mongoose',
    dbChips: ['Utilisateurs', 'Profils', 'Achats', 'Index TTL'],
    toAi: 'Question + contexte',
    fromAi: 'Réponse',
    gemini: 'Google Gemini',
    geminiChips: ['Assistant', 'Quiz', 'Parcours', 'Traduction'],
    mail: 'Nodemailer',
    mailChips: ['Vérification', 'Mot de passe'],
    push: 'Web Push',
    pushChips: ['Notifications'],
    base: 'Base commune',
    baseItems: ['Cloudflare : anti-robots, anti-DDoS', 'Accueil généré au build', 'Connexion MongoDB réutilisée', 'Secrets dans .env', 'next/image'],
    aiTitle: 'Huit services',
    aiAccent: 'd’IA.',
    aiLead: 'Google Gemini accompagne l’étudiant à chaque étape, de la question ponctuelle au parcours complet.',
    groups: [
      {
        title: 'Accompagnement',
        lead: 'Apprendre et réviser',
        items: ['Assistant conversationnel + vidéos YouTube', 'Quiz de 5 à 10 questions corrigés', 'Parcours semaine par semaine', 'Fiches, flashcards et cartes mentales'],
      },
      {
        title: 'Recommandation',
        lead: 'Trouver le bon contenu',
        items: ['Cours selon les achats et la progression', 'Mentor choisi selon compétences et disponibilité', 'Recherche en langage naturel'],
      },
      {
        title: 'Accessibilité',
        lead: 'Apprendre dans sa langue',
        items: ['Cours et réponses traduits en anglais et en arabe'],
      },
    ],
    note: 'Requêtes vers l’IA limitées pour éviter les abus · clés jamais exposées au navigateur.',
  },
  en: {
    zoneClient: 'Student’s browser',
    zoneServer: 'Next.js server',
    zoneServices: 'AI and services',
    app: 'Next.js 13 app · PWA',
    appChips: ['React 18', 'Tailwind', 'Installable'],
    appLayers: [
      { name: 'Pages', detail: 'Home, catalogue, courses, dashboard' },
      { name: 'Service Worker', detail: 'Works offline' },
      { name: 'AI assistant', detail: 'Available on every page' },
    ],
    link: 'HTTPS · JWT cookie',
    api: 'Next.js API',
    apiModules: [
      { name: 'Authentication', detail: 'JWT, bcrypt, e-mail check' },
      { name: 'Personal space', detail: 'Profile, privacy, purchases' },
      { name: 'Courses', detail: 'Catalogue, pages, search' },
      { name: 'AI', detail: 'Rate-limited per user' },
    ],
    security: 'Server validation · CSP · X-Frame-Options',
    db: 'MongoDB · Mongoose',
    dbChips: ['Users', 'Profiles', 'Purchases', 'TTL indexes'],
    toAi: 'Question + context',
    fromAi: 'Answer',
    gemini: 'Google Gemini',
    geminiChips: ['Assistant', 'Quizzes', 'Paths', 'Translation'],
    mail: 'Nodemailer',
    mailChips: ['Verification', 'Password'],
    push: 'Web Push',
    pushChips: ['Notifications'],
    base: 'Shared base',
    baseItems: ['Cloudflare: bots, DDoS', 'Home page built at build time', 'Reused MongoDB connection', 'Secrets in .env', 'next/image'],
    aiTitle: 'Eight AI',
    aiAccent: 'services.',
    aiLead: 'Google Gemini supports the student at every step, from a quick question to a full learning path.',
    groups: [
      {
        title: 'Guidance',
        lead: 'Learn and revise',
        items: ['Chat assistant + YouTube videos', '5-to-10-question graded quizzes', 'Week-by-week learning path', 'Sheets, flashcards and mind maps'],
      },
      {
        title: 'Recommendation',
        lead: 'Find the right content',
        items: ['Courses from purchases and progress', 'Mentor matched on skills and availability', 'Natural-language search'],
      },
      {
        title: 'Accessibility',
        lead: 'Learn in your language',
        items: ['Courses and answers translated into English and Arabic'],
      },
    ],
    note: 'AI requests are rate-limited to prevent abuse · keys never reach the browser.',
  },
};

const MS_GROUP_ICONS: LucideIcon[] = [GraduationCap, Target, Globe];

const MarketplaceDiagram = ({ lang, label }: { lang: Language; label: string }) => {
  const d = MS_DIAGRAM[lang];
  return (
    <>
      <figure className="rv arch-stage crash-arch ms-arch" aria-label={label}>
        <div className="arch-plane">
          <div className="park-grid">
            <div className="park-zone">
              <span className="park-zone-label">
                <Monitor size={11} /> {d.zoneClient}
              </span>
              <Node icon={GraduationCap} title={d.app} chips={d.appChips} className="is-ios">
                <ol className="park-layers">
                  {d.appLayers.map((layer, index) => (
                    <li key={layer.name}>
                      <span className="tabular">{index + 1}</span>
                      <span>
                        <strong>{layer.name}</strong>
                        <em>{layer.detail}</em>
                      </span>
                    </li>
                  ))}
                </ol>
              </Node>
            </div>

            <Flow label={d.link} both />

            <div className="park-zone">
              <span className="park-zone-label">
                <Cloud size={11} /> {d.zoneServer}
              </span>
              <div className="grid gap-3">
                <Node icon={Server} title={d.api} strong>
                  <ul className="job-modules">
                    {d.apiModules.map((module) => (
                      <li key={module.name}>
                        <strong>{module.name}</strong>
                        <em>{module.detail}</em>
                      </li>
                    ))}
                  </ul>
                  <p className="park-realtime">
                    <Lock size={13} aria-hidden="true" /> {d.security}
                  </p>
                </Node>
                <Node icon={Database} title={d.db} chips={d.dbChips} className="is-pg" />
              </div>
            </div>

            <div className="job-ai-links">
              <Flow label={d.toAi} />
              <Flow label={d.fromAi} reverse />
            </div>

            <div className="park-zone">
              <span className="park-zone-label">
                <Sparkles size={11} /> {d.zoneServices}
              </span>
              <div className="grid gap-3">
                <Node icon={Sparkles} title={d.gemini} chips={d.geminiChips} className="is-gemini" />
                <Node icon={Mail} title={d.mail} chips={d.mailChips} className="is-mail" />
                <Node icon={BellRing} title={d.push} chips={d.pushChips} className="is-push" />
              </div>
            </div>
          </div>

          <div className="arch-rail">
            <span className="arch-rail-title">
              <Boxes size={14} aria-hidden="true" /> {d.base}
            </span>
            <ol className="arch-rail-steps">
              {d.baseItems.map((item) => (
                <li key={item}>
                  <span className="arch-rail-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="sr-only">
          {`${d.zoneClient}: ${d.app} (${d.appLayers.map((l) => `${l.name}: ${l.detail}`).join(', ')}). ⇄ ${d.link} ⇄ ${d.zoneServer}: ${
            d.api
          } (${d.apiModules.map((m) => `${m.name}: ${m.detail}`).join(', ')}); ${d.security}; ${d.db}. → ${d.toAi} → ${d.zoneServices}: ${
            d.gemini
          }, ${d.mail}, ${d.push}. ← ${d.fromAi}.`}
        </figcaption>
      </figure>

      <div className="job-role">
        <h3 className="rv job-role-title">
          {d.aiTitle} <span className="font-serif font-normal italic">{d.aiAccent}</span>
        </h3>
        <p className="rv mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{d.aiLead}</p>
        <ol className="lr-cascade ms-groups">
          {d.groups.map((group, index) => {
            const Icon = MS_GROUP_ICONS[index];
            return (
              <li key={group.title} className="rv job-role-card" style={stagger(index)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="audience-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="lr-level-tag">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <h4 className="mt-4 text-[18px] font-bold leading-tight tracking-[-0.02em]">{group.title}</h4>
                <p className="mt-1 text-[13px] text-muted-foreground">{group.lead}</p>
                <ol className="cr-steps mt-4">
                  {group.items.map((item) => (
                    <li key={item} className="text-[13.5px] leading-snug">
                      {item}
                    </li>
                  ))}
                </ol>
              </li>
            );
          })}
        </ol>
        <p className="rv lr-outcome">
          <ShieldCheck size={15} aria-hidden="true" /> {d.note}
        </p>
      </div>
    </>
  );
};

/* ---- Section heading ------------------------------------------------------ */

const Heading = ({ id, index, title, accent }: { id?: string; index: string; title: string; accent: string }) => (
  <div className="case-heading mb-10" id={id}>
    <div className="min-w-0">
      <h2 className="title-section !text-[clamp(2.2rem,1.2rem+3vw,3.6rem)]">
        <AnimatedTitle title={title} accent={accent} />
      </h2>
    </div>
    <span className="case-heading-num rv tabular" aria-hidden="true">
      {index}
    </span>
  </div>
);

/* ---- Count-up figure (runs once, when the panel scrolls into view) ------- */

const CountUp = ({ value }: { value: string }) => {
  const target = Number.parseInt(value, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(Number.isNaN(target) ? value : '0');

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1100);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(String(Math.round(target * eased)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, value]);

  return <span ref={ref}>{shown}</span>;
};

const sectionLabel = (title: string, accent: string) =>
  `${title}${/['’]$/.test(title) ? '' : ' '}${accent}`.replace(/\.$/, '');

/* ---- Sticky table of contents --------------------------------------------- */

type TocItem = { id: string; index: string; label: string };

const Toc = ({ items, label }: { items: TocItem[]; label: string }) => {
  const [active, setActive] = useState(items[0]?.id);
  const ids = items.map((item) => item.id).join(',');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    );
    ids.split(',').forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav aria-label={label} className="case-toc">
      <p className="eyebrow mb-4">{label}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : ''}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className="tabular font-mono text-[10px]">{item.index}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/* ---- Screens carousel ----------------------------------------------------- */

const Gallery = ({
  items,
  prev,
  next,
  countLabel,
  landscape = false,
}: {
  items: { src: string; caption: string }[];
  prev: string;
  next: string;
  countLabel: string;
  landscape?: boolean;
}) => {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="tabular text-foreground">{String(items.length).padStart(2, '0')}</span> {countLabel}
        </p>
        <div className="flex gap-2">
          <button type="button" className="gallery-btn" onClick={() => scroll(-1)} disabled={edge.start} aria-label={prev}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="gallery-btn" onClick={() => scroll(1)} disabled={edge.end} aria-label={next}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <ul ref={track} onScroll={update} className={`gallery-track ${landscape ? 'is-landscape' : ''}`}>
        {items.map((screen, index) => (
          <li key={screen.src} className="rv gallery-item" style={stagger(index % 4)}>
            <figure className="group">
              <div className="gallery-frame">
                <img
                  src={screen.src}
                  alt={screen.caption}
                  loading="lazy"
                  width={landscape ? 1440 : 540}
                  height={landscape ? 900 : 960}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                />
                <span className="gallery-index tabular">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <figcaption className="mt-3 px-1 text-[13px] leading-snug text-muted-foreground">{screen.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---- Page ----------------------------------------------------------------- */

/* Icons per case study: one per audience, one per result item. */
const ICONS: Record<string, { audiences: LucideIcon[]; result: LucideIcon[] }> = {
  bvmt: { audiences: [Smartphone, Database, Monitor, MessageSquare, FileText], result: [Server, Database, Globe, Smartphone] },
  parking: { audiences: [Clock, Leaf, Building2, CreditCard, Compass], result: [CalendarCheck, Radio, CreditCard, MapPin, BrainCircuit, Container, Rocket, Download] },
  'vibe-tok': {
    audiences: [ShieldAlert, Hourglass, Lightbulb, TrendingUp, Gauge],
    result: [Clapperboard, Heart, Radio, ShieldCheck, WandSparkles, Gauge],
  },
  crashscan: {
    audiences: [PenLine, CreditCard, MapPin, Hourglass, Lock],
    result: [ScanEye, CreditCard, MapPin, FileSearch, FileText, PenLine, Mail, ShieldCheck],
  },
  'fake-news': {
    audiences: [Megaphone, HeartPulse, UsersRound, ImageOff, Hourglass],
    result: [Globe, ScanText, BadgeCheck, Stethoscope, Newspaper, CalendarCheck, Siren, Lock],
  },
  jobtracer: {
    audiences: [FolderOpen, CalendarClock, Keyboard, Target, MailX],
    result: [ListChecks, CalendarDays, ChartPie, Server, FileSearch, Target, PenLine, MessageSquare],
  },
  'marketplace-student': {
    audiences: [ListChecks, MessageSquare, Hourglass, Download, Lock],
    result: [Boxes, Lock, Sparkles, ListChecks, Target, FileSearch, Download, Globe],
  },
  'la-reine': {
    audiences: [Crown, ZoomIn, ShoppingBag, Smartphone, MapPin],
    result: [Palette, ZoomIn, ShoppingBag, Heart, Zap, Server, Smartphone, Boxes],
  },
};

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { t, language, setLanguage } = useLanguage();
  const cs = getCaseStudy(slug, language);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!cs) return;
    document.title = `${cs.title} — ${t('case.tag')} · ${PROFILE.name}`;
    return () => {
      document.title = 'Karoui Elyess — Ingénieur Full Stack & Développeur Mobile';
    };
  }, [cs, t]);

  if (!cs) return <NotFound />;

  const icons = ICONS[cs.slug] ?? ICONS.bvmt;
  const screens = cs.screens;
  const hasFan = (screens?.items.length ?? 0) >= 3;
  const Diagram = {
    bvmt: BvmtDiagram,
    parking: ParkingDiagram,
    vibetok: VibeDiagram,
    jobtracer: JobDiagram,
    fakenews: FakeNewsDiagram,
    crashscan: CrashDiagram,
    lareine: LaReineDiagram,
    marketplace: MarketplaceDiagram,
  }[cs.diagram];

  const sections: TocItem[] = [
    { id: 'contexte', ...cs.context },
    { id: 'architecture', ...cs.architecture },
    { id: 'choix', ...cs.decisions },
    ...(screens ? [{ id: 'captures', ...screens }] : []),
    { id: 'resultat', ...cs.result },
  ].map(({ id, index, title, accent }) => ({ id, index, label: sectionLabel(title, accent) }));

  const meta = [
    ['case.role', cs.meta.role],
    ['case.period', cs.meta.period],
    ['case.company', cs.meta.company],
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <RevealObserver />

      {/* ---- Minimal header ---- */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="wrap flex h-[68px] items-center justify-between gap-4">
          <Link to="/#projets" className="inline-flex items-center gap-3 text-sm font-medium">
            <img src="/logo-ke.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-[9px]" />
            <span className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft size={14} /> {t('case.back')}
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <div
              role="group"
              aria-label={t('nav.language')}
              className="flex items-center rounded-full bg-card p-1 shadow-[inset_0_0_0_1px_var(--line-alpha)]"
            >
              {(['fr', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
                    language === lang ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="contenu">
        {/* ---- Hero: the story on the left, the real app running on the right ---- */}
        <section className="wrap grid items-center gap-12 pb-14 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            <div className="hero-in flex flex-wrap items-center gap-3" style={stagger(0)}>
              <p className="section-tag">{t('case.tag')}</p>
              {cs.live && (
              <span className="live-pill">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                </span>
                {t('case.live')}
              </span>
              )}
            </div>
            <h1
              className="hero-in mt-6 text-[clamp(2.8rem,1.4rem+4.6vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.05em]"
              style={stagger(1)}
            >
              {cs.title}
              <span className="serif-accent mt-2 block text-[0.5em] leading-[1.05] tracking-[-0.02em]">{cs.tagline}</span>
            </h1>
            <p className="hero-in mt-7 max-w-xl text-lead leading-relaxed text-ink-2" style={stagger(2)}>
              {cs.intro}
            </p>
            <div className="hero-in mt-8 flex flex-wrap gap-2.5" style={stagger(3)}>
              {cs.video && (
              <button type="button" onClick={() => setDemoOpen(true)} className="btn-primary">
                <Play size={14} /> {t('case.watch')}
              </button>
              )}
              <Link to="/#contact" className={cs.video ? 'btn-secondary' : 'btn-primary'}>
                {t('case.contact')} <ArrowUpRight size={14} />
              </Link>
            </div>

            <dl className="hero-in case-meta mt-10" style={stagger(4)}>
              {meta.map(([key, value]) => (
                <div key={key}>
                  <dt className="eyebrow">{t(key)}</dt>
                  <dd className="mt-1.5 text-[14px] font-medium leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-in" style={stagger(2)}>
            {cs.studio ? (
            /* Product "ad" stage: cut-out renders, colour glow, feature badges. */
            <ScreenStudio studio={cs.studio} eager>
              {cs.video && (
              <button type="button" onClick={() => setDemoOpen(true)} className="case-fan-play">
                <DemoLabel title={t('case.watch')} subtitle={t('case.realDemo')} />
              </button>
              )}
            </ScreenStudio>
            ) : hasFan && screens ? (
            /* Three real screens fanned out, the live demo one click away. */
            <div className="case-fan">
              {fanScreens(cs).map((screen, index) => (
                <figure key={screen.src} className={`case-fan-card case-fan-card--${index}`}>
                  <img src={screen.src} alt={screen.caption} width={540} height={960} loading={index === 1 ? 'eager' : 'lazy'} />
                </figure>
              ))}
              <button type="button" onClick={() => setDemoOpen(true)} className="case-fan-play">
                <DemoLabel title={t('case.watch')} subtitle={t('case.realDemo')} />
              </button>
            </div>
            ) : (
            /* No portrait screens: the real demo, playing muted in a frame. */
            <button type="button" onClick={() => setDemoOpen(true)} className="case-demo group" aria-label={t('case.watch')}>
              <video src={cs.video} poster={cs.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
              <span className="case-demo-play">
                <DemoLabel title={t('case.watch')} subtitle={t('case.realDemo')} />
              </span>
            </button>
            )}
          </div>
        </section>

        {/* ---- Key figures + stack, in one panel ---- */}
        <section className="wrap pb-6">
          <div className="case-figures rv">
            <dl className="case-figures-grid">
              {cs.figures.map((figure) => (
                <div key={figure.label} className="flex flex-col-reverse p-6 lg:p-7">
                  <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{figure.label}</dt>
                  <dd className="tabular text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] font-bold leading-none tracking-[-0.05em]">
                    <CountUp value={figure.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-2 border-t border-border px-6 py-4 lg:px-7">
              <span className="eyebrow mr-2">{t('case.stack')}</span>
              {cs.meta.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Body: sticky contents + chapters ---- */}
        <div className="wrap grid gap-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 pt-24">
              <Toc items={sections} label={t('case.toc')} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* ---- 01 Context ---- */}
            <section className="case-section">
              <Heading id="contexte" {...cs.context} />
              <p className="rv max-w-3xl text-lead leading-relaxed text-ink-2">{cs.context.body}</p>
              {cs.context.label && <p className="eyebrow rv mt-12">{cs.context.label}</p>}
              <ol className={`${cs.context.label ? 'mt-5' : 'mt-10'} grid gap-4 ${cs.context.audiences.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {cs.context.audiences.map((audience, index) => {
                  const Icon = icons.audiences[index] ?? Users;
                  return (
                    <li key={audience.name} className="rv audience-card" style={stagger(index)}>
                      <div className="flex items-center justify-between">
                        <span className="audience-icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.6} />
                        </span>
                        <span className="tabular font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                      </div>
                      <p className="mt-8 text-[18px] font-bold leading-tight tracking-[-0.02em]">{audience.name}</p>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{audience.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* ---- 02 Architecture ---- */}
            <section className="case-section">
              <Heading id="architecture" {...cs.architecture} />
              <p className="rv mb-10 max-w-3xl text-lead leading-relaxed text-ink-2">{cs.architecture.body}</p>
              <Diagram lang={language} label={`${t('case.diagram.label.prefix')} ${cs.title}`} />
            </section>

            {/* ---- 03 Decisions: need → choice ---- */}
            <section className="case-section">
              <Heading id="choix" {...cs.decisions} />
              <ol className="decision-list">
                {cs.decisions.items.map((item, index) => (
                  <li key={item.choice} className="rv decision-row" style={stagger(index % 3)}>
                    <div className="flex gap-4">
                      <span className="tabular pt-0.5 font-mono text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="eyebrow">{t('case.need')}</p>
                        <p className="mt-1.5 text-[14.5px] leading-snug text-ink-2">{item.need}</p>
                      </div>
                    </div>
                    <span className="decision-arrow" aria-hidden="true">
                      <ArrowRight size={16} />
                    </span>
                    <div>
                      <p className="text-[19px] font-bold leading-tight tracking-[-0.025em]">{item.choice}</p>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---- Screens: carousel (only when the case has some) ---- */}
            {screens && (
              <section className="case-section">
                <Heading id="captures" {...screens} />
                <Gallery
                  items={screens.items}
                  prev={t('case.gallery.prev')}
                  next={t('case.gallery.next')}
                  countLabel={t('case.gallery.count')}
                  landscape={screens.landscape}
                />
              </section>
            )}

            {/* ---- 05 Result: the deployment pipeline ---- */}
            <section className="case-section">
              <Heading id="resultat" {...cs.result} />
              <p className="rv max-w-3xl text-lead leading-relaxed text-ink-2">{cs.result.body}</p>
              <ol
                className={`pipeline mt-10 ${
                  cs.result.items.length > 5 ? (cs.result.items.length % 4 === 0 ? 'is-grid' : 'is-grid is-grid-3') : ''
                }`}
              >
                {cs.result.items.map((item, index) => {
                  const Icon = icons.result[index] ?? Check;
                  return (
                    <li key={item} className="rv pipeline-step" style={stagger(index)}>
                      <div className="flex items-center justify-between">
                        <span className="audience-icon" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.6} />
                        </span>
                        <span className="pipeline-check" aria-hidden="true">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                      </div>
                      <p className="mt-6 text-[15px] font-semibold leading-snug">{item}</p>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>

        {/* ---- Call to action ---- */}
        <section className="wrap pb-24 pt-8">
          <div className="case-cta rv">
            <div className="max-w-xl">
              <p className="text-[clamp(2rem,1.2rem+2.6vw,3.4rem)] font-bold leading-[1] tracking-[-0.045em]">{t('case.next')}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-background/70">{t('case.nextBody')}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link to="/#contact" className="btn inline-flex bg-background text-foreground hover:bg-surface">
                {t('case.contact')} <ArrowUpRight size={14} />
              </Link>
              <ResumeDialog>
                <button
                  type="button"
                  className="btn inline-flex text-background shadow-[inset_0_0_0_1px_hsl(var(--background)/0.3)] hover:bg-background/10"
                >
                  {t('hero.cta.resume')} <ArrowDown size={14} />
                </button>
              </ResumeDialog>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <VideoDialog
        video={demoOpen && cs.video ? { id: `${cs.slug}-case`, title: cs.title, subtitle: cs.tagline, src: cs.video } : null}
        onClose={() => setDemoOpen(false)}
      />
    </div>
  );
};

export default CaseStudyPage;
