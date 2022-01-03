import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksTable from "./components/TasksTable/TasksTable";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
function BeeJee() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TasksTable />} />
        <Route path="/create" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default BeeJee;
