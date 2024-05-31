it("入力値に不備がない場合", () => {
  cy.visit("/");
  const mail = "kumekya700@eay.jp";
  const password = "password";

  // inputにメールアドレスを入力
  cy.get("#input-mail").type(mail);
  // パスワードを入力
  cy.get("#input-password").type(password);

  cy.get("#login").click();
  // エラーメッセージが表示されていないこと
  cy.get("#error").should("not.exist");
});

it("入力値に不備がある場合", () => {
  cy.visit("/");
  const ngMail = "あいうえお";
  const password = "password";

  // inputにひらがなを入力
  cy.get("#input-mail").type(ngMail);
  // パスワードを入力
  cy.get("#input-password").type(password);

  cy.get("#login").click();
  // エラーメッセージが表示されているか
  cy.get("#error").should("be.visible");
});
