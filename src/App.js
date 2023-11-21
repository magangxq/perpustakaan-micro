import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/home/Welcome";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Books from "./pages/books/Books";
import AddBook from "./pages/books/AddBook";
import EditBook from "./pages/books/EditBook";
import DeleteBook from "./pages/books/DeleteBook";
import DetailBook from "./pages/books/DetailBook";
import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import DetailUser from "./pages/users/DetailUser";
import Applicants from "./pages/applicants/Applicants";
import EditApplicant from "./pages/applicants/EditApplicant";
import DetailApplicant from "./pages/applicants/DetailApplicant";
import UploadProfile from "./pages/profile/UploadProfile";
import BorrowingBook from "./pages/borrowings/Borrowing";
import DetailBorrowing from "./pages/borrowings/DetailBorrowing";

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
          <Route path="/profile/upload-profile" element={<UploadProfile />} />
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
          <Route path="/borrowing-book" element={<BorrowingBook />} />
          <Route path="/borrowing-book/detail/:id" element={<DetailBorrowing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
