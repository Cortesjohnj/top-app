import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStoreApp from "../store/store";
import RegisterPage from "../pages/RegisterPage";
import { act } from "react-dom/test-utils";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
});

test("Signup", async () => {
  //prepare
  axios.post.mockResolvedValueOnce({
    data: {
      user: {
        name: "Diegodev",
        email: "Diegodev@gmail.com",
        password: "Test1234",
        role: "user",
      },
    },
  });

  history.push("/signup");

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await act(async () => screen.getByText(/Sign up to continue/i));
  await act(async () => {
    fireEvent.click(screen.getByText("Register"));
  });

  await act(async () => {
    fireEvent.change(screen.getByTestId("email"), {
      target: { name: "email", value: "Diegodev@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { name: "password", value: "Test1234" },
    });
    const button = fireEvent.click(screen.getByText("Register"));
    expect(button).toBeTruthy();
  });
});
