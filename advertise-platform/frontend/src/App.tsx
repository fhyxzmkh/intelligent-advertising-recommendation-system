import { LoginPage } from "./components/pages/LoginPage.js";
import { Route, Routes } from "react-router";
import { RegisterPage } from "./components/pages/RegisterPage.jsx";
import { AdminPage } from "./components/pages/AdminPage.js";
import { useState } from "react";

type User = {
  username: string;
  role: string;
  activated: boolean;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);

  console.log(currentUser);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={<AdminPage currentUser={currentUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
