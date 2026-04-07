import Navigation from "./components_ui/navigation"
import Content from "./components_ui/content"
import LandingPage from "./pages/landing"

export default function Home() {
    
   return(
    <>
      <Navigation />
      <Content className="content-wrapper">
         <LandingPage />
      </Content>

    </>
    )
}
