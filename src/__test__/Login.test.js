import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type } from "@testing-library/user-event/dist/type";
import Login, { validateEmail } from "../Login";

describe("Test Login Component", ()=> {
  test("test render form with 1 button", async ()=> {
    render(<Login />);
    const button = await screen.findAllByRole("button");
    // console.log(button);
    expect(button).toHaveLength(1);
  });

  test("should be faild on email validation", ()=> {
    const testemail = "test.com";
    expect(validateEmail(testemail)).not.toBe(true);
  });

  test("should be succeeded on email validation", ()=> {
    const testemail = "test@test.com";
    expect(validateEmail(testemail)).toBe(true);
  });

  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should be able to submit the form", ()=> {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, "test-kosugi@gmail.com");
    userEvent.type(password, "asdcadfg");

    userEvent.click(submitButton);
    const userInfo = screen.getByText("test-kosugi@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });
});
