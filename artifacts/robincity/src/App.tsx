import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from '@/pages/home';
import Shop from '@/pages/shop';
import Leaderboard from '@/pages/leaderboard';
import About from '@/pages/about';
import HowTo from '@/pages/how-to';
import Cookies from '@/pages/cookies';
import Login from '@/pages/login';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/about" component={About} />
      <Route path="/how-to" component={HowTo} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
