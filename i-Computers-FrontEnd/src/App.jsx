import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import AdminPage from './pages/adminPage.jsx';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPasswordPage.jsx';

function App() {
  
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <Toaster position='top-right' />
        <div className="w-full h-screen bg-primary">
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/admin/*' element={<AdminPage />} />
            
           <Route path = "/forgot-password/" element={<ForgetPasswordPage/>}/>
           <Route path="/*" element={<HomePage />} />
            
          </Routes> 
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;