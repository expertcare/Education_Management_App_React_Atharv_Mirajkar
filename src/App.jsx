import React, { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "react-notifications/lib/notifications.css";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsApp from "./components/NewsApp/NewsApp";
import Sidebar from "./components/Sidebar";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import TodoApp from "./components/TodoApp/TodoApp";
import UserData from "./components/UserCRUD/UserData";
import WeatherApp from "./components/WeatherApp/WeatherApp";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import StudentDashboard from "./components/Student_Dashboard/StudentDashboard";
import StudentProfile from "./components/Student_Dashboard/StudentProfile";
import UserProfile from "./components/Student_Dashboard/StudentCourses";
import FacultyDashboard from "./components/Faculty_Dashboard/FacultyDashboard";
import AdminDashboard from "./components/Admin_Dashboard/AdminDashboard";
import FacultyAssignment from "./components/Faculty_Dashboard/FacultyAssignment";
import StudentAssignment from "./components/Student_Dashboard/StudentAssignment";
import FacultyAttendance from "./components/Faculty_Dashboard/StudentList";
import StudentAttendanceRecord from "./components/Student_Dashboard/StudentAttendanceRecord";
import DeveloperDashboard from "./components/Admin_Dashboard/DeveloperDashboard";
import UserList from "./components/Admin_Dashboard/UserList";
import ManageStudentSchedule from "./components/Admin_Dashboard/ManageStudentSchedule";
import ManageFacultySchedule from "./components/Admin_Dashboard/ManageFacultySchedule";
import StudentSchedule from "./components/Student_Dashboard/StudentSchedule";
import AdminNotification from "./components/Admin_Dashboard/AdminNotification";
import NotificationPopup from "./components/NotificationPopup";
import SettingsPrivacyPage from "./components/SettingsPrivacyPage";
import NavProfile from "./components/NavProfile";
import ManageCourse from "./components/Admin_Dashboard/ManageCourse";
import StudentCourses from "./components/Student_Dashboard/StudentCourses";
import FacultyCourses from "./components/Faculty_Dashboard/FacultyCourses";
import FacultySchedule from "./components/Faculty_Dashboard/FacultySchedule";
import ContactList from "./components/Admin_Dashboard/ContactList";
import FacultyExams from "./components/Faculty_Dashboard/FacultyExams";

import ExamCourseList from "./components/Student_Dashboard/ExamCourseList";
import Exam from "./components/Student_Dashboard/Exam";
// import ExamCourseCard from "./components/Student_Dashboard/ExamCourseCard";

// import CreateUser from "./components/Admin_Dashboard/CreateUser";

const MainContent = ({ isLoggedIn, login, logout, userRole }) => {
  const location = useLocation();

  const isAuthPage = ["/signin", "/signup", "/"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location.pathname]);

  if (!isLoggedIn && !isAuthPage && location.pathname !== "/signin") {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <UserProvider>
        {/* Render header only if not on auth page */}
        {!isAuthPage && <Header logout={logout} />}
        {isLoggedIn && <Sidebar logout={logout} userRole={userRole} />}

        <Routes>
          {isLoggedIn && (
            <>
              {/* Render routes based on user's role */}
              {userRole === "student" && (
                <>
                  <Route
                    path="/student_dashboard"
                    element={<StudentDashboard />}
                  />
                  <Route path="/student_profile" element={<StudentProfile />} />
                  <Route path="/student_courses" element={<StudentCourses />} />
                  <Route
                    path="/student_assignment"
                    element={<StudentAssignment />}
                  />
                  <Route
                    path="/student_attendance"
                    element={<StudentAttendanceRecord />}
                  />
                  <Route
                    path="/student_schedule"
                    element={<StudentSchedule />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationPopup />}
                  />
                  <Route path="/student_exams" element={<ExamCourseList />} />
                  <Route path="/exam/:courseName" element={<Exam />}></Route>

                  {/* Add more student-specific routes here */}
                </>
              )}
              {userRole === "faculty" && (
                <>
                  <Route
                    path="/faculty_dashboard"
                    element={<FacultyDashboard />}
                  />
                  <Route
                    path="/faculty_assignment"
                    element={<FacultyAssignment />}
                  />
                  <Route
                    path="/faculty_attendance"
                    element={<FacultyAttendance />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationPopup />}
                  />
                  <Route path="/faculty_courses" element={<FacultyCourses />} />
                  <Route path="/faculty_profile" element={<StudentProfile />} />
                  <Route path="/faculty_exams" element={<FacultyExams />} />

                  <Route
                    path="/faculty_schedule"
                    element={<FacultySchedule />}
                  />

                  {/* Add more faculty-specific routes here */}
                </>
              )}
              {userRole === "admin" && (
                <>
                  <Route path="/admin_dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/developer_dashboard"
                    element={<DeveloperDashboard />}
                  />
                  <Route path="/admin/user_list" element={<UserList />} />
                  <Route
                    path="/admin/student_schedule"
                    element={<ManageStudentSchedule />}
                  />
                  <Route
                    path="/admin/faculty_schedule"
                    element={<ManageFacultySchedule />}
                  />
                  <Route
                    path="/admin/notifications"
                    element={<AdminNotification />}
                  />
                  <Route
                    path="/admin/manage_courses"
                    element={<ManageCourse />}
                  />
                  <Route path="/admin_profile" element={<StudentProfile />} />
                  <Route path="/admin/contact_list" element={<ContactList />} />

                  {/* <Route path="/admin/manage_users" element={<CreateUser />} /> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/news" element={<NewsApp />} />
                  <Route path="/users-data" element={<UserData />} />
                  {/* Add more admin-specific routes here */}
                </>
              )}
            </>
          )}
          {
            // Render other routes
            <Route path="/signin" element={<SigninForm login={login} />} />
          }
          <Route path="/" element={<SigninForm login={login} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/settings" element={<SettingsPrivacyPage />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>

        {/* Render footer only if not on auth page */}
        {!isAuthPage && <Footer />}
      </UserProvider>
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userRole, setUserRole] = useState(""); // State to store user's role

  useEffect(() => {
    // Check if user is logged in from local storage
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (storedIsLoggedIn === true) {
      setIsLoggedIn(true);
      const storedUserRole = localStorage.getItem("userRole");
      setUserRole(storedUserRole);
    }
    setIsInitialized(true); // Set initialization flag
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    console.log(userRole);
    localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Store logged-in state in local storage
    localStorage.setItem("userRole", role); // Store user's role in local storage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("userRole"); // Remove user's role from local storage
  };

  // Don't render anything until the initialization is complete
  if (!isInitialized) {
    return null;
  }

  return (
    <Router>
      <MainContent
        isLoggedIn={isLoggedIn}
        login={login}
        logout={logout}
        userRole={userRole}
      />
    </Router>
  );
};

export default App;
