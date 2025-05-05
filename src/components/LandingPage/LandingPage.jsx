import { MainFeatures } from "./MainFeatures.jsx"
import NavbarLanding from "./NavbarLanding"
import { PresentationContent } from "./PresentationContent"
import { Benefits } from "./Benefits.jsx"
import { Footer } from "../Footer.jsx"

export function LandingPage() {
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