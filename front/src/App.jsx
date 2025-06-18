import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import theme from './styles/theme';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import CommunityBoard from './pages/CommunityBoard';
import ReviewModal from './pages/ReviewModal';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import HireList from './pages/HireList';
import Patient from './pages/Patient';
import PatientRegisteration from './pages/PatientRegistration';
import PatientUpdate from './pages/PatientUpdate';
import ReportDetail from './pages/ReportDetail';
import ReportForm from './pages/ReportForm';
import CommunityDetail from './pages/CommunityDetail';
import CommunityQuestion from './pages/CommunityQuestion';
import NoticeBoard from './pages/NoticeBoard';
import CaregiverList from './pages/CaregiverList';
import HireRegistration from './pages/HireRegistration';
import HireDetail from './pages/HireDetail';
import ResumeRegistration from './pages/ResumeRegistration';
import ResumeDetail from './pages/ResumeDetail';
import GuardianMainPage from './pages/GuardianMainPage';
import CareGiverMainPage from './pages/CareGiverMainPage';
import { useEffect } from 'react';
// import useUserStore from './store/userStore';
import ReportMain from './pages/ReportMain';
import CreateCommuBoardForm from './pages/CreateCommuBoardForm';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/caregiver');
    }
  }, [location, navigate]);

  return (
    <>
      <Layout>
        <Routes>
          {/* 간병인 */}
          <Route path="/caregiver" element={<CareGiverMainPage />} />
          <Route path="/caregiver/hirelist" element={<HireList />} />
          <Route path="/caregiver/resumeRegistration" element={<ResumeRegistration />} />
          <Route path="/caregiver/reportform/:patNo" element={<ReportForm />} />

          {/* 보호자 */}
          <Route path="/guardian" element={<GuardianMainPage />} />
          <Route path="/guardian/caregiverlist" element={<CaregiverList />} />
          <Route path="/guardian/hire-registration" element={<HireRegistration />} />
          <Route path="/guardian/patient" element={<Patient />} />
          <Route path="/guardian/patient/:id" element={<PatientUpdate />} />
          <Route path="/guardian/patientregisteration" element={<PatientRegisteration />} />
          <Route path="/review" element={<ReviewModal />} />

          {/* 공용 */}
          <Route path="/community/free/create" element={<CreateCommuBoardForm />} />
          <Route path="/community/free" element={<CommunityBoard />} />
          <Route path="/community/free/detail/:no" element={<CommunityDetail />} />
          <Route path="/community/question" element={<CommunityQuestion />} />
          <Route path="/community/notice" element={<NoticeBoard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/hireDetail/:hiringNo" element={<HireDetail />} />
          <Route path="/resumeDetail" element={<ResumeDetail />} />
          <Route path="/report/:patNo" element={<ReportMain />} />
          <Route path="/report/:patNo/detail/:reportNo" element={<ReportDetail />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  // const { userStatus } = useUserStore();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>

          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            draggable
            hideProgressBar={false}
            newestOnTop
            theme="light"
            pauseOnHover
          />

        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
