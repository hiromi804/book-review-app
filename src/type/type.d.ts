// 型定義ファイル

export type reviewListsType = [
  {
    id: string;
    title: string;
    url: string;
    detail: string;
    review: string;
    reviewer: string;
    isMine?: boolean;
  }
];

export type reviewList = {
  isMine: boolean;
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
};

export type ReviewDetail = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

// 新規登録
export type Input = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

// ユーザー登録
export type Inputs = {
  name: string;
  email: string;
  password: string;
};
