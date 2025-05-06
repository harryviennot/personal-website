import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Suspense fallback={<div>{t("app.loading")}</div>}>
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/projects/:projectName"
              element={<ProjectDetailPage />}
            />
            <Route
              path="/experience/:experienceName"
              element={<ExperienceDetailPage />}
            />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
