import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import theme from './styles/theme';
import Layout from './components/Layout';
import CommunityBoard from './pages/CommunityBoard';

import ReviewModal from './pages/ReviewModal';

import SignUp from './pages/SignUp';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
<<<<<<< HEAD
              <Route path="/CommunityBoard" element={<CommunityBoard />} />
=======
              <Route path="/review" element={<ReviewModal />} /> 
              <Route path="/signup" element={<SignUp />} />
>>>>>>> 02104005cb25cb511b4f99e9e1bf938a88cb4814
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
