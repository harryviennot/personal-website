import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";

function App() {
  return (
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
  );
}

export default App;
