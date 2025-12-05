import { Routes, Route, BrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addemployee" element={<AddEmployeeForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
