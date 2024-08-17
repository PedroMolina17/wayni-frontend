import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableUsers from "./Components/TableUsers";
import UsersDetail from "./pages/UsersDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableUsers />} />
        <Route path="/users/:id" element={<UsersDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
