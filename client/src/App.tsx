import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import OnlyAuthenticated from "./pages/OnlyAuthenticated";
import OnlyAdmin from "./pages/OnlyAdmin";
import AdminRoute from "./components/auth/AdminRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/only-authenticated" element={<OnlyAuthenticated />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/only-admins" element={<OnlyAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
// lVIHj3stX2aHlALx
