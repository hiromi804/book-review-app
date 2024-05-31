import { SignIn } from "../pages/SignIn";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("ログイン画面のコンポーネントが存在するか", () => {
  beforeEach(() => {
    render(<SignIn />);
  });
  // ID指定のほうがいい
  test("メールアドレスの入力フォームが存在するか", () => {
    expect(screen.getAllByRole("textbox")[0]).toBeTruthy();
  });
  test("メールアドレスのラベルが存在するか", () => {
    expect(screen.getByText("メールアドレス")).toBeInTheDocument();
  });
  test("ログインのボタンが存在するか", () => {
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
  });
});
