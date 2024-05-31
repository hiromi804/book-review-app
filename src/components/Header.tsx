import React from "react";
import "./header.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setName } from "userNameSlice";

export const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const userName: string = useSelector((state: any) => state.name.userName);
  const navigate = useNavigate();

  const locationSignIn = () => {
    navigate("/login");
  };

  const logout = () => {
    removeCookie("token");
    navigate("/login");
    setName("");
  };

  return (
    <header className="header">
      <h1>
        <Link to="/" className="headerLink">
          書籍レビューアプリ
        </Link>
      </h1>
      {/* ログインしていたら、ユーザー名を表示 
      ログインしていなければ、ログインボタンを表示*/}
      {userName ? (
        <div className="headerRightContent">
          <div>
            <p className="userName">ユーザー名：{userName}</p>
            <Link to="/new" className="headerLink">
              書籍レビュー登録
            </Link>
            <Link to="/profile" className="headerLink">
              ユーザー情報編集
            </Link>
          </div>
          <button onClick={logout}>ログアウト</button>
        </div>
      ) : (
        <button className="headerLoginButton" onClick={locationSignIn}>
          ログイン
        </button>
      )}
    </header>
  );
};
