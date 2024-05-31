import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagenation } from "components/Pagenation";
import { Header } from "components/Header";
import { setName } from "userNameSlice";
import { reviewListsType, reviewList } from "type/type.d";
import { endpoint } from "util/constants";

export const Home = () => {
  const page: number = useSelector((state: any) => state.page.currentPage);
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const auth = "Bearer " + cookies.token;

  const [reviewList, setReviewList] = useState<reviewListsType>([
    {
      id: "",
      title: "",
      url: "",
      detail: "",
      review: "",
      reviewer: "",
      isMine: false,
    },
  ]);

  // ページの位置を先頭にする
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [reviewList]);

  useEffect(() => {
    (async () => {
      try {
        if (cookies.token) {
          // ログイン後のユーザ情報取得
          const userData = await axios.get(`${endpoint}/users`, {
            headers: {
              Authorization: auth,
            },
          });
          dispatch(setName(userData.data.name));

          // ログイン後のデータ取得
          const response = await axios.get(`${endpoint}/books`, {
            headers: {
              Authorization: auth,
            },
            params: {
              offset: page * 10,
            },
          });
          setReviewList(response.data);

          if (response.data.length !== 10) {
            setIsLastPage(true);
          } else {
            setIsLastPage(false);
          }
        } else {
          // 未ログイン時は認証トークンなしでデータ取得
          const publicResponse = await axios.get(`${endpoint}/public/books`, {
            params: {
              offset: page * 10,
            },
          });
          setReviewList(publicResponse.data);

          if (publicResponse.data.length !== 10) {
            setIsLastPage(true);
          } else {
            setIsLastPage(false);
          }
        }
      } catch (error) {
        setErrorMessage(`データ取得に失敗しました。${error}`);
      }
    })();
  }, [page]);

  // 選択された書籍レビューのlog送信
  const logSend = async (selectBookId: string) => {
    const id = {
      selectBookId: selectBookId,
    };
    try {
      await axios.post(`${endpoint}/logs`, id, {
        headers: {
          Authorization: auth,
        },
      });
      navigate(`/detail/${selectBookId}`);
    } catch (error) {
      setErrorMessage(`データの登録に失敗しました。${error}`);
    }
  };

  const editReview = (selectBookId: string) => {
    navigate(`/edit/${selectBookId}`);
  };

  return (
    <>
      <Header />
      <ul className="content">
        <h2 className="content__header">書籍レビュー一覧</h2>
        {reviewList.map((review: reviewList) => {
          return (
            <div key={review.id}>
              <li className="content__title">{review.title}</li>
              <li className="content__url">
                <label>URL：</label>
                <a href={review.url} target="_blank" rel="noreferrer">
                  {review.url}
                </a>
              </li>
              <li className="content__reviewer">
                <label>レビュワー：</label>
                <span>{review.reviewer}</span>
              </li>
              <li className="content__review-detail">
                <label>詳細：</label>
                {review.detail}
              </li>
              <li className="content__review">
                <p>レビュー：</p>
                {review.review}
              </li>
              <div className="btnWrap">
                <button className="btn" onClick={() => logSend(review.id)}>
                  詳細を見る
                </button>
                {review?.isMine ? (
                  <button className="btn" onClick={() => editReview(review.id)}>
                    編集する
                  </button>
                ) : (
                  ""
                )}
              </div>
              <hr className="content__border" />
            </div>
          );
        })}
        <Pagenation isLastPage={isLastPage} />
      </ul>
    </>
  );
};

export default Home;
