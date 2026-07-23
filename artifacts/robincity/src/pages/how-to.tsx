import { BackLink } from '@/components/back-link';
import { Footer } from '@/components/footer';
import { LofiPlayer } from '@/components/lofi-player';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: 1,
    title: 'SIGN IN WITH GITHUB',
    description: 'Connect your GitHub account to RobinCity. We only access your public profile data. No private repos, no write access, just read-only stats.',
  },
  {
    number: 2,
    title: 'FIND YOUR BUILDING',
    description: 'Search for your GitHub username. Your building already exists in the city, generated from your contribution history. Fly to it and take a look.',
  },
  {
    number: 3,
    title: 'CLAIM YOUR BUILDING',
    description: 'Press E to claim ownership. Once claimed, you can customize it, add rooftop items, change colors, and show off your developer identity.',
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

const faqs = [
  {
    question: 'HOW ARE BUILDINGS GENERATED?',
    answer: 'Buildings are generated from your GitHub contribution history. Each commit adds height, different languages add color variation, and more repositories mean more complex structures. The algorithm runs on your public GitHub data.',
  },
  {
    question: 'CAN I HAVE MULTIPLE BUILDINGS?',
    answer: 'Each GitHub account gets one main building. However, if you contribute to popular repositories, you may have smaller structures in those organization districts.',
  },
  {
    question: 'HOW DO I EARN COINS?',
    answer: 'Daily challenges, battle victories, recruiting new developers, and maintaining contribution streaks all award coins. Premium items require more coins.',
  },
  {
    question: 'WHAT ARE SHOP ITEMS?',
    answer: 'Shop items are visual customizations for your building. Rooftop decorations, LED trim, hologram rings, custom colors, and more. Some are free, others cost coins.',
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
  {
    question: 'CAN I DELETE MY BUILDING?',
    answer: 'Your building exists as long as your GitHub profile is public. You can unclaim it at any time, which removes your customizations but keeps the base building in the city.',
  },
];

export default function HowTo() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LofiPlayer />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <BackLink />

        <div className="mt-8 space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">HOW TO PLAY</h1>
            <p className="text-lg text-muted-foreground">
              YOUR GUIDE TO NAVIGATING ROBINCITY
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start" data-testid={`section-step-${step.number}`}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <section className="space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-primary">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-2 border-primary pl-6 py-2" data-testid={`faq-item-${index}`}>
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-8 text-center">
            <Button size="lg" data-testid="button-enter-city">
              ENTER THE CITY
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
