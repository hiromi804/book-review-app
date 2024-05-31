import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./signUp.css";
import { useCookies } from "react-cookie";
import { endpoint } from "util/constants";
import { Inputs } from "type/type";

export const SignUp = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [compressFile, setCompressFile] = useState<Blob>();
  type setErrorMessage = string | undefined;

  const compressOption = {
    maxSizeMB: 2,
    maxwidthOrHeight: 1024,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const locationSignIn = () => {
    navigate("/login");
  };

  // 画像選択時に圧縮する
  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const img = e.currentTarget.files[0];
      const imgFile = new FormData();
      try {
        const compressFile = await imageCompression(img, compressOption);
        imgFile.append("image", compressFile, img.name);
        setCompressFile(compressFile);
        console.log(compressFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (data: Inputs) => {
    try {
      const userResponse = await axios.post(`${endpoint}/users`, data);
      setCookie("token", userResponse.data.token);
      const iconData = {
        icon: compressFile,
      };
      const imageUploadResponse = await axios.post(
        `${endpoint}/uploads`,
        iconData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + userResponse.data.token,
          },
        }
      );
      setImageUrl(imageUploadResponse.data.iconUrl);
      navigate("/");
    } catch (error) {
      setErrorMessage(`サインアップに失敗しました。${error}`);
    }
    if (cookies.token) return <Navigate to="/" />;
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title">ユーザー作成</h1>
        <hr />
        <div className="uiFormSignup">
          <div className="formField">
            <label>名前</label>
            <input
              type="text"
              id="input-name"
              placeholder="名前を入力してください"
              {...register("name", { required: true })}
            />
            {errors.name && <div className="error">入力必須項目です</div>}
          </div>
          <div className="formField">
            <label>メールアドレス</label>
            <input
              type="mail"
              id="input-mail"
              placeholder="メールアドレスを入力してください"
              {...register("email", {
                required: "入力必須項目です",
                pattern: {
                  value:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                  message: "メールアドレスの形式が異なっています。",
                },
              })}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              id="input-password"
              placeholder="パスワードを入力してください"
              {...register("password", {
                required: "入力必須項目です",
                pattern: {
                  value: /^[0-9a-zA-Z]*$/,
                  message: "半角英数字のみ入力してください",
                },
              })}
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <div className="formField">
            <label>アイコン</label>
            <input
              type="file"
              className="icon"
              accept="image/jpeg,image/png"
              placeholder="アイコン画像"
              onChange={imageChange}
            />
          </div>
          <p className="error">{errorMessage}</p>
          <div className="loginButton">
            <button type="submit" id="login" className="submitButton">
              新規登録
            </button>
            <button
              type="button"
              id="signup"
              className="clearButton"
              onClick={locationSignIn}
            >
              アカウントをお持ちの方はこちら
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
