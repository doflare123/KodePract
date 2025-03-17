
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './MainPage.css'
import MainPage from "./MainPage";
import UserDetail from "./UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;