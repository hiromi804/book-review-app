import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Header } from "components/Header";
import Loading from "components/Loading";
import { ReviewDetail } from "type/type.d";
import { endpoint } from "util/constants";

const Detail = () => {
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();

  const id = params.id;
  const auth = "Bearer " + cookies.token;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const detailData = await axios.get(`${endpoint}/books/${id}`, {
          headers: {
            Authorization: auth,
          },
        });
        setDetail(detailData.data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(`データ取得に失敗しました。${error}`);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      {/* 情報を取得中はローディングを表示 */}
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="content">
          <h2 className="content__header">書籍レビュー詳細</h2>
          <div>
            <li className="content__title">{detail.title}</li>
            <li className="content__url">
              <label>URL：</label>
              <a href={detail.url} target="_blank" rel="noreferrer">
                {detail.url}
              </a>
            </li>
            <li className="content__review-detail">
              <p>詳細：</p>
              {detail.detail}
            </li>
            <li className="content__review">
              <p>レビュー：</p>
              {detail.review}
            </li>

            <li className="content__reviewer">
              <label>レビュワー：</label>
              <span>{detail.reviewer}</span>
            </li>
          </div>
        </ul>
      )}
    </>
  );
};

export default Detail;
