import { FC } from "react";
import React from "react";
import "./pagenation.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "pagenateSlice";
import { Link } from "react-router-dom";

export type Props = {
  isLastPage: boolean;
};

export const Pagenation: FC<Props> = (props) => {
  const page: number = useSelector((state: any) => state.page.currentPage);
  const dispatch = useDispatch();
  const prevPage = () => {
    dispatch(decrement());
  };
  const nextPage = () => {
    dispatch(increment());
  };
  return (
    <div className="Pagination">
      <Link to={`?page=${page - 1}`}>
        <button
          className="Pagination-Item-btn"
          disabled={page ? false : true}
          onClick={prevPage}
        >
          前へ
        </button>
      </Link>
      <Link to={`?page=${page + 1}`}>
        <button
          className="Pagination-Item-btn"
          disabled={props.isLastPage}
          onClick={nextPage}
        >
          次へ
        </button>
      </Link>
    </div>
  );
};

export default Pagenation;
