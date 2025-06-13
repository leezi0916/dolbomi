import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import theme from './styles/theme';
import Layout from './components/Layout';
import ReviewModal from './pages/ReviewModal';
import SignUp from './pages/SignUp';
import Patient from './pages/Patient';
import PatientRegisteration from './pages/PatientRegistration';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/patient" element={<PatientRegisteration />} />
              <Route path="/review" element={<ReviewModal />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
