import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterForm } from "./components/RegisterForm.jsx"
import { LandingPage } from './components/LandingPage.jsx';
import { LoginForm } from './components/LoginForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
