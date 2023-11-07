import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import DetailBook from "./pages/DetailBook";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import DetailUser from "./pages/DetailUser";
import Applicants from "./pages/Applicants";
import EditApplicant from "./pages/EditApplicant";
import DetailApplicant from "./pages/DetailApplicant";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="/books/detail/:id" element={<DetailBook />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/detail/:id" element={<DetailUser />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/applicants/detail/:id" element={<DetailApplicant />} />
          <Route path="/applicants/edit/:id" element={<EditApplicant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
