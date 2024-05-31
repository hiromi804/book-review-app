import { useSelector, useDispatch } from "react-redux";
import { Header } from "components/Header";
import "./profile.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { setName } from "userNameSlice";
import { useState } from "react";
import { endpoint } from "util/constants";

export const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const userName: string = useSelector((state: any) => state.name.userName);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  // ユーザー名の更新
  const onSubmit = async (data: { name: string }) => {
    const auth = "Bearer " + cookies.token;
    try {
      const res = await axios.put(`${endpoint}/users`, data, {
        headers: {
          Authorization: auth,
        },
      });
      dispatch(setName(res.data.name));
      navigate("/");
    } catch (error) {
      setErrorMessage(`データ更新に失敗しました。${error}`);
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="content__header">ユーザー情報編集</h2>
          <label>ユーザー名：</label>
          <input
            type="text"
            className="userName"
            onChange={handleSetName}
            defaultValue={userName}
            {...register("name", {
              required: "入力必須項目です",
            })}
          />
          {errors.name && <div className="error">{errors.name.message}</div>}
          <button className="updateButton" type="submit">
            更新
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
