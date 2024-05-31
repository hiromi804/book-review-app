import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "components/Header";
import { ReviewDetail } from "type/type.d";
import { endpoint } from "util/constants";

const Edit = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [detail, setDetail] = useState<ReviewDetail>({
    id: "",
    title: "",
    url: "",
    detail: "",
    review: "",
    reviewer: "",
    isMine: false,
  });

  const params = useParams();

  const id = params.id;
  const auth = "Bearer " + cookies.token;

  // 詳細のデータ取得
  useEffect(() => {
    (async () => {
      try {
        const detailData = await axios.get(`${endpoint}/books/${id}`, {
          headers: {
            Authorization: auth,
          },
        });
        setDetail(detailData.data);
      } catch (error) {
        setErrorMessage(`データ取得に失敗しました。${error}`);
      }
    })();
  }, []);

  // レビューの編集
  const updateReview = async () => {
    const data = {
      title: detail.title,
      url: detail.url,
      detail: detail.detail,
      review: detail.review,
    };

    try {
      await axios.put(`${endpoint}/books/${id}`, data, {
        headers: {
          Authorization: auth,
        },
      });
      navigate("/");
    } catch (error) {
      setErrorMessage(`データ更新に失敗しました。${error}`);
    }
  };

  // レビューの削除
  const deleteReview = async () => {
    try {
      await axios.delete(`${endpoint}/books/${id}`, {
        headers: {
          Authorization: auth,
        },
      });
      navigate("/");
    } catch (error) {
      setErrorMessage(`データの削除に失敗しました。${error}`);
    }
  };

  return (
    <>
      <Header />
      <ul className="content">
        <form>
          <h2 className="content__header">書籍レビュー編集</h2>
          <div>
            <li className="content__title">
              <label>title：</label>
              <textarea
                defaultValue={detail.title}
                onChange={(e) =>
                  setDetail({ ...detail, title: e.target.value })
                }
              />
            </li>
            <li className="content__url">
              <label>URL：</label>
              <textarea
                defaultValue={detail.url}
                onChange={(e) => setDetail({ ...detail, url: e.target.value })}
              />
            </li>
            <li className="content__review-detail">
              <label>詳細：</label>
              <textarea
                defaultValue={detail.detail}
                onChange={(e) =>
                  setDetail({ ...detail, detail: e.target.value })
                }
              />
            </li>
            <li className="content__review">
              <label>レビュー：</label>
              <textarea
                defaultValue={detail.review}
                onChange={(e) =>
                  setDetail({ ...detail, review: e.target.value })
                }
              />
            </li>
          </div>
          <div className="btnWrap">
            <button
              type="button"
              className="updateButton"
              onClick={updateReview}
            >
              更新
            </button>
            <button
              type="button"
              className="updateButton"
              onClick={deleteReview}
            >
              削除
            </button>
          </div>
        </form>
      </ul>
    </>
  );
};

export default Edit;
