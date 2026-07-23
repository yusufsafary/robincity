import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const steps = [
  {
    number: 1,
    title: 'SIGN IN WITH GITHUB',
    description: 'Connect your GitHub account to RobinCity. We only access your public profile data. No private repos, no write access, just read-only stats.',
  },
  {
    number: 2,
    title: 'FIND YOUR BUILDING',
    description: 'Search for your GitHub username on the home page. Your building already exists in the city, generated from your contribution history.',
  },
  {
    number: 3,
    title: 'CLAIM YOUR BUILDING',
    description: 'Once claimed, you can customize it, add rooftop items, change colors, and show off your developer identity.',
  },
  {
    number: 4,
    title: 'CUSTOMIZE',
    description: 'Visit the shop to buy rooftop items. Add an antenna, plant a flag, install a pool, light a rooftop fire. Make your building uniquely yours.',
  },
  {
    number: 5,
    title: 'BATTLE',
    description: 'Challenge other developers to battles. Send your duck into combat. Win coins, climb the leaderboard, earn bragging rights.',
  },
  {
    number: 6,
    title: 'EARN COINS',
    description: 'Complete daily challenges, win battles, recruit friends, and contribute to open source. Coins unlock premium items and customizations.',
  },
];

const levels = [
  { tier: 'NEWBIE', range: '0 - 99 CONTRIBUTIONS', color: 'hsl(120 30% 40%)', description: 'Welcome to the city. Your building is short but it is yours.' },
  { tier: 'JUNIOR', range: '100 - 499 CONTRIBUTIONS', color: 'hsl(120 50% 50%)', description: 'The city starts to notice you. A few extra floors.' },
  { tier: 'MID', range: '500 - 1,999 CONTRIBUTIONS', color: 'hsl(75 80% 50%)', description: 'A solid presence in the skyline. Multiple districts recognise your handle.' },
  { tier: 'SENIOR', range: '2,000 - 4,999 CONTRIBUTIONS', color: 'hsl(55 100% 55%)', description: 'Your building towers above most. Rare items unlock at this tier.' },
  { tier: 'ARCHITECT', range: '5,000 - 9,999 CONTRIBUTIONS', color: 'hsl(30 100% 55%)', description: 'A landmark in RobinCity. Other developers fly past just to see you.' },
  { tier: 'LEGEND', range: '10,000+ CONTRIBUTIONS', color: 'hsl(0 100% 60%)', description: 'The skyscraper district. Your building is visible from every corner of the city.' },
];

const faqs = [
  {
    question: 'HOW ARE BUILDINGS GENERATED?',
    answer: 'Buildings are generated from your public GitHub contribution data fetched via the free GitHub API. Each commit adds height, different languages add color variation, and more repositories mean more complex structures.',
  },
  {
    question: 'DO YOU NEED MY API KEY?',
    answer: 'No. RobinCity uses the free public GitHub API which requires no authentication for basic profile and repo data. We never ask for tokens or write permissions.',
  },
  {
    question: 'CAN I HAVE MULTIPLE BUILDINGS?',
    answer: 'Each GitHub account gets one main building. However, if you contribute to popular repositories, you may have smaller structures in those organisation districts.',
  },
  {
    question: 'HOW DO I EARN COINS?',
    answer: 'Daily challenges, battle victories, recruiting new developers, and maintaining contribution streaks all award coins. Premium items require more coins.',
  },
  {
    question: 'WHAT ARE SHOP ITEMS?',
    answer: 'Shop items are visual customisations for your building. Rooftop decorations, LED trim, hologram rings, custom colors, and more. Some are free, others cost coins.',
  },
  {
    question: 'CAN I CHANGE MY BUILDING COLOR?',
    answer: 'Yes. Purchase the Custom Color item from the shop. You can then set any hex color for your building. Default colors are based on your primary programming language.',
  },
  {
    question: 'WHAT IS THE BATTLE SYSTEM?',
    answer: 'Send your duck companion into flight challenges and speedrun missions. Compete against other developers for the fastest times and highest scores. Winners earn coins and leaderboard ranks.',
  },
  {
    question: 'IS MY DATA PRIVATE?',
    answer: 'We only access your public GitHub profile. No private repos, no email, no write permissions. All data is publicly visible on GitHub already.',
  },
];

export default function HowTo() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">HOW TO PLAY</h1>
            <p className="text-lg text-muted-foreground">
              YOUR GUIDE TO NAVIGATING ROBINCITY
            </p>
          </div>

          {/* Steps */}
          <section className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 sm:gap-6 items-start" data-testid={`section-step-${step.number}`}>
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground flex items-center justify-center text-lg sm:text-xl font-bold">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Levels */}
          <section id="levels" className="space-y-6 scroll-mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">DEVELOPER LEVELS</h2>
            <p className="text-muted-foreground">
              Your level is determined by your total public GitHub contributions. Higher levels unlock taller buildings and exclusive shop items.
            </p>
            <div className="space-y-3">
              {levels.map((level) => (
                <div
                  key={level.tier}
                  className="bg-card border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                  data-testid={`level-${level.tier.toLowerCase()}`}
                >
                  <div
                    className="shrink-0 px-3 py-1 text-xs font-bold w-fit"
                    style={{ backgroundColor: `${level.color}20`, color: level.color, border: `1px solid ${level.color}40` }}
                  >
                    {level.tier}
                  </div>
                  <div className="text-xs text-muted-foreground sm:w-44 shrink-0">{level.range}</div>
                  <div className="text-sm text-muted-foreground">{level.description}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-2 border-primary pl-4 sm:pl-6 py-2" data-testid={`faq-item-${index}`}>
                  <h3 className="text-base sm:text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-4 text-center">
            <Link href="/">
              <Button size="lg" data-testid="button-enter-city">
                SEARCH YOUR BUILDING
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
