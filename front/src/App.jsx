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

import Report from './pages/Report';
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
import CareGiver from './pages/CareGiver';
import Guardian from './pages/Guardian';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<CareGiver />} />
              <Route path="/guardianMainPage" element={<Guardian />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/patients/:id" element={<PatientUpdate />} />
              <Route path="/patientRegisteration" element={<PatientRegisteration />} />
              <Route path="/CommunityBoard" element={<CommunityBoard />} />
              <Route path="/CommunityBoard/:no" element={<CommunityDetail />} />
              <Route path="/CommunityQuestion" element={<CommunityQuestion />} />
              <Route path="/NoticeBoard" element={<NoticeBoard />} />
              <Route path="/review" element={<ReviewModal />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/login" element={<Login />} />

              <Route path="/hirelist" element={<HireList />} />
              <Route path="/caregiverlist" element={<CaregiverList />} />
              <Route path="/hireRegistration" element={<HireRegistration />} />
              <Route path="/hireDetail" element={<HireDetail />} />
              <Route path="/resumeRegistration" element={<ResumeRegistration />} />
              <Route path="/resumeDetail" element={<ResumeDetail />} />

              <Route path="/report" element={<Report />} />
              <Route path="/reportdetail" element={<ReportDetail />} />
              <Route path="/reportform" element={<ReportForm />} />
            </Routes>
          </Layout>
          NoticeBoard
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
