import { Route, Switch } from "wouter";
import { NavigationHeader } from "./components/NavigationHeader";
import { Footer } from "./components/Footer";
import { SEOHead } from "./components/SEOHead";
import { Home } from "./pages/Home";
import { PlayLearn } from "./pages/PlayLearn";
import { Simulator } from "./pages/Simulator";
import { LearnNewton } from "./pages/LearnNewton";
import { NewtonFormulas } from "./pages/NewtonFormulas";
import { KidsGuide } from "./pages/KidsGuide";
import { AstroBot } from "./pages/AstroBot";
import { ResearchHub } from "./pages/ResearchHub";
import { AerospaceReference } from "./pages/AerospaceReference";
import { FormulaLibrary } from "./pages/FormulaLibrary";
import { RealSatelliteData } from "./pages/RealSatelliteData";
import { LearnOrbitalMechanics } from "./pages/LearnOrbitalMechanics";
import { SpaceQuestions } from "./pages/SpaceQuestions";
import { Calculators } from "./pages/Calculators";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { BlogCategory } from "./pages/BlogCategory";
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
import { MissionList } from "./pages/MissionList";
import { MissionDetail } from "./pages/MissionDetail";
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
import { AstronautExplorer } from "./pages/AstronautExplorer";
import { AstronautProfile } from "./pages/AstronautProfile";
import { PlanetHub } from "./pages/PlanetHub";
import { PlanetDetail } from "./pages/PlanetDetail";
import { LunarGeology } from "./pages/LunarGeology";
import { NeuroSpaceResearch } from "./pages/NeuroSpaceResearch";
import { SpaceAGIDoctrine } from "./pages/SpaceAGIDoctrine";
import { SpaceAGIEngineeringLab } from "./pages/SpaceAGIEngineeringLab";
import { SpaceAGIRoadmap } from "./pages/SpaceAGIRoadmap";
import { SpaceAGIMathematics } from "./pages/SpaceAGIMathematics";
import { SpaceAGIExplanation } from "./pages/SpaceAGIExplanation";
import { AGIASIFramework } from "./pages/AGIASIFramework";
import { PMPNMPCControlFramework } from "./pages/PMPNMPCControlFramework";
import { SpaceAGISwarmSimulator } from "./pages/SpaceAGISwarmSimulator";
import { AIAstronautRobotSimulator } from "./pages/AIAstronautRobotSimulator";
import { QuantumSpaceAGISimulator } from "./pages/QuantumSpaceAGISimulator";
import { QuantumSpaceAGILab } from "./pages/QuantumSpaceAGILab";
import { QuantumSpaceAGIScenario } from "./pages/QuantumSpaceAGIScenario";
import { QuantumSpaceAGICompare } from "./pages/QuantumSpaceAGICompare";
import { FutureSpaceCivilization } from "./pages/FutureSpaceCivilization";
import { Next100Years } from "./pages/Next100Years";
import { Welcome } from "./pages/Welcome";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen blueprint-bg flex flex-col">
      <SEOHead />
      <NavigationHeader />
      <main className="container mx-auto px-4 py-6 max-w-7xl flex-1">
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
          <Route path="/research/agi-asi-framework" component={AGIASIFramework} />
          <Route path="/research/pmp-nmpc-autonomous-control" component={PMPNMPCControlFramework} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
