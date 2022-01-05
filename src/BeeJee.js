import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";

function BeeJee() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="create" element={<AddTask />} />
        <Route path="edit/:id" element={<EditTask />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default BeeJee;
