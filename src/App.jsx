import { MainFeatures } from "./components/MainFeatures.jsx"
import NavbarLanding from "./components/NavbarLanding"
import { PresentationContent } from "./components/PresentationContent"
import { HeaderIcon, Graph, Calendar, Bars, Phone, Shield } from "./components/Icons.jsx"
import { Benefits } from "./components/Benefits.jsx"
import { Footer } from "./components/Footer.jsx"

function App() {
  return (
    <main className="relative flex flex-col">
      <NavbarLanding />
      <PresentationContent />
      <article className="flex flex-col text-center">
        <MainFeatures />
        <Benefits/>
      </article>

      <Footer />
    </main>
  )
}

export default App
