import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterForm } from "./components/Auth/RegisterForm.jsx"
import { LandingPage } from './components/LandingPage/LandingPage.jsx';
import { LoginForm } from './components/Auth/LoginForm.jsx';
import { Dashboard } from './components/Dashboard/Dashboard.jsx';
import { ExercisesPage } from './components/Dashboard/ExercisesPage.jsx';
import { SidebarProvider } from './context/SideBarContext.jsx';

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  )
}

export default App
