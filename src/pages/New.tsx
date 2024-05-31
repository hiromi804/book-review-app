import { Header } from "../components/Header";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./new.css";
import axios from "axios";
import { endpoint } from "util/constants";
import { Input } from "type/type";

export const New = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [content, setContent] = useState<Input>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  // レビュー登録
  const onSubmit = async (data: Input) => {
    const auth = "Bearer " + cookies.token;
    try {
      await axios.post(`${endpoint}/books`, data, {
        headers: {
          Authorization: auth,
        },
      });
      // 一覧画面に遷移
      navigate("/");
    } catch (error) {
      setErrorMessage(`データの登録に失敗しました。${error}`);
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="content__header">書籍レビュー登録</h2>
          <div className="content__row">
            <label>タイトル：</label>
            <textarea
              placeholder="タイトルを入力してください"
              className="content__input"
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
              {...register("title", {
                required: "入力必須項目です",
              })}
            />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
          </div>

          <div className="content__row">
            <label>URL：</label>
            <textarea
              placeholder="URLを入力してください"
              className="content__input"
              onChange={(e) => setContent({ ...content, url: e.target.value })}
              {...register("url", {
                required: "入力必須項目です",
              })}
            />
            {errors.url && <div className="error">{errors.url.message}</div>}
          </div>

          <div className="content__row">
            <label>詳細：</label>
            <textarea
              placeholder="詳細を入力してください"
              className="content__input"
              onChange={(e) =>
                setContent({ ...content, detail: e.target.value })
              }
              {...register("detail", {
                required: "入力必須項目です",
              })}
            />
            {errors.detail && (
              <div className="error">{errors.detail.message}</div>
            )}
          </div>

          <div className="content__row">
            <label>レビュー：</label>
            <textarea
              placeholder="レビューを入力してください"
              className="content__input"
              onChange={(e) =>
                setContent({ ...content, review: e.target.value })
              }
              {...register("review", {
                required: "入力必須項目です",
              })}
            />
            {errors.review && (
              <div className="error">{errors.review.message}</div>
            )}
          </div>

          <button className="registButton" type="submit">
            登録
          </button>
        </form>
      </div>
    </>
  );
};
