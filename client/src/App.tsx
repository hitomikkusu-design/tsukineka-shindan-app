import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DiagnosisProvider, useDiagnosis } from "./contexts/DiagnosisContext";
import Onboarding from "./pages/Onboarding";
import Diagnosis from "./pages/Diagnosis";
import Result from "./pages/Result";
import DailyCare from "./pages/DailyCare";
import Premium from "./pages/Premium";
import Disclaimer from "./pages/Disclaimer";

function DiagnosisRouter() {
  const { state } = useDiagnosis();

  return (
    <Switch>
      <Route path="/" component={() => {
        switch (state.currentStep) {
          case 'onboarding':
            return <Onboarding />;
          case 'diagnosis':
            return <Diagnosis />;
          case 'result':
            return <Result />;
          case 'daily-care':
            return <DailyCare />;
          case 'premium':
            return <Premium />;
          case 'disclaimer':
            return <Disclaimer />;
          default:
            return <Onboarding />;
        }
      }} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <DiagnosisProvider>
      <DiagnosisRouter />
    </DiagnosisProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
