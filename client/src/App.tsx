import { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "wouter";
import { NavigationHeader } from "./components/NavigationHeader";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";
import { ScrollReveal } from "./components/ScrollReveal";
import { Home } from "./pages/Home";
import { PlayLearn } from "./pages/PlayLearn";
import { LearnNewton } from "./pages/LearnNewton";
import { NewtonFormulas } from "./pages/NewtonFormulas";
import { KidsGuide } from "./pages/KidsGuide";
import { AerospaceReference } from "./pages/AerospaceReference";
import { FormulaLibrary } from "./pages/FormulaLibrary";
import { RealSatelliteData } from "./pages/RealSatelliteData";
import { LearnOrbitalMechanics } from "./pages/LearnOrbitalMechanics";
import { SpaceQuestions } from "./pages/SpaceQuestions";
import { Calculators } from "./pages/Calculators";
import { RecommendedBooks } from "./pages/RecommendedBooks";
import { SpaceShop } from "./pages/SpaceShop";
import { SpaceExperiments } from "./pages/SpaceExperiments";
import { HowGPSWorks } from "./pages/HowGPSWorks";
import { CompareOrbits } from "./pages/CompareOrbits";
import { HowNASALaunches } from "./pages/HowNASALaunches";
import { HowSpaceXLands } from "./pages/HowSpaceXLands";
import { HowMarsRovers } from "./pages/HowMarsRovers";
import { HowStarlinkWorks } from "./pages/HowStarlinkWorks";
import { HowISSWorks } from "./pages/HowISSWorks";
import { MissionTimeline } from "./pages/MissionTimeline";
import { MissionPlatform } from "./pages/MissionPlatform";
import { BroughtFromSpace } from "./pages/BroughtFromSpace";
import { OrbitalMechanicsQuiz } from "./pages/OrbitalMechanicsQuiz";
import { HowSolarSystemWorks } from "./pages/HowSolarSystemWorks";
import { WhatIsMoon } from "./pages/WhatIsMoon";
import { Astrophysics } from "./pages/Astrophysics";
import { QuantumPhysics } from "./pages/QuantumPhysics";
import { QuantumPhysicsNASA } from "./pages/QuantumPhysicsNASA";
import { Aerodynamics } from "./pages/Aerodynamics";
import { QuantumSpace } from "./pages/QuantumSpace";
import { AIInAerospace } from "./pages/AIInAerospace";
import { SpaceCareers } from "./pages/SpaceCareers";
import { NASAStudyGuide } from "./pages/NASAStudyGuide";
import { HowSatellitesWork } from "./pages/HowSatellitesWork";
import { AstronomyForKids } from "./pages/AstronomyForKids";
import { NASAForStudents } from "./pages/NASAForStudents";
import { SpaceNews } from "./pages/SpaceNews";
import { NASAForKids } from "./pages/NASAForKids";
import { SatelliteTutorial } from "./pages/SatelliteTutorial";
import { SpaceQuiz } from "./pages/SpaceQuiz";
import { LunarGeology } from "./pages/LunarGeology";
import { Welcome } from "./pages/Welcome";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";

const Simulator = lazy(() => import("./pages/Simulator").then((m) => ({ default: m.Simulator })));
const AstroBot = lazy(() => import("./pages/AstroBot").then((m) => ({ default: m.AstroBot })));
const ResearchHub = lazy(() => import("./pages/ResearchHub").then((m) => ({ default: m.ResearchHub })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const BlogCategory = lazy(() => import("./pages/BlogCategory").then((m) => ({ default: m.BlogCategory })));
const MissionList = lazy(() => import("./pages/MissionList").then((m) => ({ default: m.MissionList })));
const MissionDetail = lazy(() => import("./pages/MissionDetail").then((m) => ({ default: m.MissionDetail })));
const AstronautExplorer = lazy(() => import("./pages/AstronautExplorer").then((m) => ({ default: m.AstronautExplorer })));
const AstronautProfile = lazy(() => import("./pages/AstronautProfile").then((m) => ({ default: m.AstronautProfile })));
const PlanetHub = lazy(() => import("./pages/PlanetHub").then((m) => ({ default: m.PlanetHub })));
const PlanetDetail = lazy(() => import("./pages/PlanetDetail").then((m) => ({ default: m.PlanetDetail })));
const NeuroSpaceResearch = lazy(() => import("./pages/NeuroSpaceResearch").then((m) => ({ default: m.NeuroSpaceResearch })));
const SpaceAGIDoctrine = lazy(() => import("./pages/SpaceAGIDoctrine").then((m) => ({ default: m.SpaceAGIDoctrine })));
const SpaceAGIEngineeringLab = lazy(() => import("./pages/SpaceAGIEngineeringLab").then((m) => ({ default: m.SpaceAGIEngineeringLab })));
const SpaceAGIRoadmap = lazy(() => import("./pages/SpaceAGIRoadmap").then((m) => ({ default: m.SpaceAGIRoadmap })));
const SpaceAGIMathematics = lazy(() => import("./pages/SpaceAGIMathematics").then((m) => ({ default: m.SpaceAGIMathematics })));
const SpaceAGIExplanation = lazy(() => import("./pages/SpaceAGIExplanation").then((m) => ({ default: m.SpaceAGIExplanation })));
const SpaceAGISwarmSimulator = lazy(() => import("./pages/SpaceAGISwarmSimulator").then((m) => ({ default: m.SpaceAGISwarmSimulator })));
const AIAstronautRobotSimulator = lazy(() => import("./pages/AIAstronautRobotSimulator").then((m) => ({ default: m.AIAstronautRobotSimulator })));
const QuantumSpaceAGISimulator = lazy(() => import("./pages/QuantumSpaceAGISimulator").then((m) => ({ default: m.QuantumSpaceAGISimulator })));
const QuantumSpaceAGILab = lazy(() => import("./pages/QuantumSpaceAGILab").then((m) => ({ default: m.QuantumSpaceAGILab })));
const QuantumSpaceAGIScenario = lazy(() => import("./pages/QuantumSpaceAGIScenario").then((m) => ({ default: m.QuantumSpaceAGIScenario })));
const QuantumSpaceAGICompare = lazy(() => import("./pages/QuantumSpaceAGICompare").then((m) => ({ default: m.QuantumSpaceAGICompare })));
const FutureSpaceCivilization = lazy(() => import("./pages/FutureSpaceCivilization").then((m) => ({ default: m.FutureSpaceCivilization })));
const Next100Years = lazy(() => import("./pages/Next100Years").then((m) => ({ default: m.Next100Years })));
const CosmicBackground = lazy(() => import("./components/CosmicBackground").then((m) => ({ default: m.CosmicBackground })));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)", background: "var(--bg-card)" }}>
        Loading page...
      </div>
    </div>
  );
}

function App() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      <Suspense fallback={null}>
        <CosmicBackground />
      </Suspense>
      <ScrollReveal />
      <SEOHead />
      <NavigationHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1">
        <div key={location} className="route-transition-enter">
          <Suspense fallback={<RouteFallback />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/play" component={PlayLearn} />
              <Route path="/simulator" component={Simulator} />
              <Route path="/simulator/swarm" component={SpaceAGISwarmSimulator} />
              <Route path="/simulator/ai-astronaut-robot" component={AIAstronautRobotSimulator} />
              <Route path="/quantum-space-agi" component={QuantumSpaceAGILab} />
              <Route path="/quantum-space-agi/scenario" component={QuantumSpaceAGIScenario} />
              <Route path="/quantum-space-agi/sim" component={QuantumSpaceAGISimulator} />
              <Route path="/quantum-space-agi/compare" component={QuantumSpaceAGICompare} />
              <Route path="/simulator/quantum-space-agi" component={QuantumSpaceAGISimulator} />
              <Route path="/learn/newton" component={LearnNewton} />
              <Route path="/learn/formulas" component={NewtonFormulas} />
              <Route path="/guide" component={KidsGuide} />
              <Route path="/astrobot" component={AstroBot} />
              <Route path="/research" component={ResearchHub} />
              <Route path="/research/neuro-space" component={NeuroSpaceResearch} />
              <Route path="/research/future-civilization" component={FutureSpaceCivilization} />
              <Route path="/research/next-100-years" component={Next100Years} />
              <Route path="/research/space-agi-doctrine" component={SpaceAGIDoctrine} />
              <Route path="/research/space-agi-lab" component={SpaceAGIEngineeringLab} />
              <Route path="/research/space-agi-roadmap" component={SpaceAGIRoadmap} />
              <Route path="/research/space-agi-math" component={SpaceAGIMathematics} />
              <Route path="/research/space-agi-explanation" component={SpaceAGIExplanation} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/learn/aerospace" component={AerospaceReference} />
              <Route path="/formulas-library" component={FormulaLibrary} />
              <Route path="/satellites" component={RealSatelliteData} />
              <Route path="/learn/orbital-mechanics" component={LearnOrbitalMechanics} />
              <Route path="/learn/space-questions" component={SpaceQuestions} />
              <Route path="/calculators" component={Calculators} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/category/:category" component={BlogCategory} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/recommended-books" component={RecommendedBooks} />
              <Route path="/space-shop" component={SpaceShop} />
              <Route path="/learn/experiments" component={SpaceExperiments} />
              <Route path="/learn/how-gps-works" component={HowGPSWorks} />
              <Route path="/learn/how-nasa-launches-satellite" component={HowNASALaunches} />
              <Route path="/learn/how-spacex-lands-rockets" component={HowSpaceXLands} />
              <Route path="/learn/how-mars-rovers-work" component={HowMarsRovers} />
              <Route path="/learn/how-starlink-works" component={HowStarlinkWorks} />
              <Route path="/learn/how-iss-works" component={HowISSWorks} />
              <Route path="/compare/orbits" component={CompareOrbits} />
              <Route path="/missions" component={MissionList} />
              <Route path="/missions/timeline" component={MissionTimeline} />
              <Route path="/missions/platform" component={MissionPlatform} />
              <Route path="/missions/:slug" component={MissionDetail} />
              <Route path="/artifacts" component={BroughtFromSpace} />
              <Route path="/quiz/orbital-mechanics" component={OrbitalMechanicsQuiz} />
              <Route path="/learn/how-solar-system-works" component={HowSolarSystemWorks} />
              <Route path="/learn/what-is-moon" component={WhatIsMoon} />
              <Route path="/learn/lunar-geology" component={LunarGeology} />
              <Route path="/learn/astrophysics" component={Astrophysics} />
              <Route path="/learn/quantum-physics" component={QuantumPhysics} />
              <Route path="/learn/quantum-physics-nasa" component={QuantumPhysicsNASA} />
              <Route path="/learn/aerodynamics" component={Aerodynamics} />
              <Route path="/learn/quantum-space" component={QuantumSpace} />
              <Route path="/ai-in-aerospace" component={AIInAerospace} />
              <Route path="/ai-in-space" component={AIInAerospace} />
              <Route path="/careers" component={SpaceCareers} />
              <Route path="/learn/nasa-study-guide" component={NASAStudyGuide} />
              <Route path="/learn/how-satellites-work" component={HowSatellitesWork} />
              <Route path="/learn/astronomy-for-kids" component={AstronomyForKids} />
              <Route path="/learn/nasa-for-students" component={NASAForStudents} />
              <Route path="/space-news" component={SpaceNews} />
              <Route path="/learn/nasa-for-kids" component={NASAForKids} />
              <Route path="/learn/satellite-tutorial" component={SatelliteTutorial} />
              <Route path="/space-quiz" component={SpaceQuiz} />
              <Route path="/astronauts" component={AstronautExplorer} />
              <Route path="/astronauts/:slug" component={AstronautProfile} />
              <Route path="/planets" component={PlanetHub} />
              <Route path="/planets/:slug" component={PlanetDetail} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
