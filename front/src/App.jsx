import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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

import ReportMain from './pages/ReportMain';
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

import useUserStore from './store/userStore';

function App() {
  const { userStatus } = useUserStore();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Routes>
              {/* 간병인 */}

              <Route path="/caregiver/hirelist" element={<HireList />} />
              <Route path="/caregiver/resumeRegistration" element={<ResumeRegistration />} />
              <Route path="/caregiver/reportform/:patNo" element={<ReportForm />} />

              {/* 보호자 */}

              <Route path="/guardian/caregiverlist" element={<CaregiverList />} />
              <Route path="/guardian/hireRegistration" element={<HireRegistration />} />
              <Route path="/guardian/patient" element={<Patient />} />
              <Route path="/guardian/patient/:id" element={<PatientUpdate />} />
              <Route path="/guardian/patientregisteration" element={<PatientRegisteration />} />
              <Route path="/review" element={<ReviewModal />} />

              {/* 공용 */}
              <Route path="/NoticeBoard" element={<NoticeBoard />} />
              <Route path="/CommunityBoard" element={<CommunityBoard />} />
              <Route path="/CommunityBoard/:no" element={<CommunityDetail />} />
              <Route path="/CommunityQuestion" element={<CommunityQuestion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/hireDetail" element={<HireDetail />} />
              <Route path="/resumeDetail" element={<ResumeDetail />} />
              <Route path="/report/:patNo" element={<ReportMain />} />
              <Route path="/report/:patno/detail/:reportno" element={<ReportDetail />} />
            </Routes>
          </Layout>
        </Router>
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
      </ThemeProvider>
    </>
  );
}

export default App;
