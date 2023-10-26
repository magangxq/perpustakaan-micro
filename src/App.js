import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./pages/Users";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import WelcomePage from "./components/Welcome";
import DetailBook from "./pages/DetailBook";
import EditProfile from "./pages/EditProfile";
import EditUser from "./pages/EditUser";
import DetailUser from "./pages/DetailUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/" element={<EditProfile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/detail/:id" element={<DetailBook />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/detail/:id" element={<DetailUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
