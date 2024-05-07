import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/component/Header/Header";
import Footer from "./components/component/Footer/Footer";

import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import ImportPage from "./pages/Admin/ImportPage/ImportPage";
import UserPage from "./pages/Admin/UserPage/UserPage";
import UserDetailsPage from "./pages/Admin/UserDetailsPage/UserDetailsPage";
import AddUserPage from "./pages/Admin/AddUserPage/AddUserPage";
import RolesPage from "./pages/Admin/RolesPage/RolesPage";
import RoleDetails from "./pages/Admin/RoleDetails/RoleDetails";
import LoginPage from "./pages/Login/LoginPage/LoginPage";
import UserDashboard from "./pages/User/UserDashboard/UserDashboard";
import Login from "./components/component/Login/Login";
import { useState } from "react";
import ApplicationsPage from "./pages/Admin/ApplicationsPage/ApplicationsPage";
import ApplicationsDetailsPage from "./pages/Admin/ApplicationDetailsPage/ApplicationsDetailsPage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [appName, setAppName] = useState("");
  console.log(isUserLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<AdminPage />} /> */}

          <>
            <Route
              path="/"
              element={<UserPage setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/user/:id" element={<UserDetailsPage />} />
            <Route path="/user/add" element={<AddUserPage />} />

            <Route
              path="/applications"
              element={<ApplicationsPage setAppName={setAppName} />}
            />
            <Route
              path="/applicationsdetails"
              element={<ApplicationsDetailsPage appName={appName} />}
            />

            <Route path="/roles" element={<RolesPage />} />
            <Route path="/roledetails" element={<RoleDetails />} />

            <Route path="/dashboard" element={<UserDashboard />} />
          </>

          <>
            <Route
              path="/login"
              element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
            <Route
              path="*"
              element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
            />
          </>

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
