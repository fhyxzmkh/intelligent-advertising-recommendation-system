import { LoginPage } from "./components/pages/LoginPage.js";
import { Navigate, Route, Routes } from "react-router";
import { RegisterPage } from "./components/pages/RegisterPage.jsx";
import { AdminPage } from "./components/pages/AdminPage.js";
import { useState } from "react";
import { AdvertiserPage } from "./components/pages/AdvertiserPage";
import { WebMasterPage } from "./components/pages/WebMasterPage";

type User = {
  uid: string;
  username: string;
  role: string;
  apiKey: string;
  activated: boolean;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);

  console.log(currentUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={<AdminPage currentUser={currentUser} />}
        />
        <Route
          path="/advertiser"
          element={<AdvertiserPage currentUser={currentUser} />}
        />
        <Route
          path="/webmaster"
          element={<WebMasterPage currentUser={currentUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
