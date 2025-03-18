
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/App.css';
import './styles/MainPage.css'
import MainPage from "./Pages/MainPage";
import UserDetail from "./Pages/UserDetail";

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