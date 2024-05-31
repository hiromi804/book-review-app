import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Home from "pages/Home";
import Profile from "pages/Profile";
import { New } from "pages/New";
import Detail from "pages/detail/[id]";
import Edit from "pages/edit/[id]";

export const Router = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={cookies.token ? <Navigate replace to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={cookies.token ? <Navigate replace to="/" /> : <SignUp />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<New />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};
