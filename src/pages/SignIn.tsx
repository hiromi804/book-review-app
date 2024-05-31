import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import "./signIn.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { endpoint } from "util/constants";

export const SignIn = () => {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const locationSignUp = () => {
    navigate("/signup");
  };

  const emailHandleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const passwordHandleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axios.post(`${endpoint}/signin`, data);
      setCookie("token", res.data.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(`サインインに失敗しました。${error}`);
    }
  };

  if (cookies.token) return <Navigate to="/" />;

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">ログイン</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>メールアドレス</label>
            <input
              type="mail"
              id="input-mail"
              placeholder="メールアドレスを入力してください"
              {...register("email", {
                required: "入力必須項目です",
              })}
              onChange={emailHandleChange}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div className="formField">
            <label>パスワード</label>
            <input
              type="password"
              id="input-password"
              placeholder="パスワードを入力してください"
              {...register("password", {
                required: "入力必須項目です",
              })}
              onChange={passwordHandleChange}
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <p className="error">{errorMessage}</p>
          <div className="loginButton">
            <button type="submit" id="login" className="submitButton">
              ログイン
            </button>
            <button
              type="button"
              id="signup"
              className="clearButton"
              onClick={locationSignUp}
            >
              アカウントをお持ちでない方はこちら
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
