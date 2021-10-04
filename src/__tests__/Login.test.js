import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStore from "../store/store";
import LoginPage from "../pages/LoginPage";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("allows user to login", async () => {
  //prepare
  axios.post.mockResolvedValueOnce({
    data: {
      token: "12345",
      user: {
        email: "found@gmail.com",
        name: "foundationDiego",
        role: "foundation",
      },
    },
  });

  history.push("/login");

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/Login/i));
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "found@gmail.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { name: "password", value: "Prueba123" },
  });

  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("loginButton"));

  await waitFor(() => {
    expect(localStorage.getItem("Authorization")).not.toBeFalsy();
    expect(spy).toHaveBeenCalledWith("/");
  });
});

test("shows error when user enters invalid credentials", async () => {
  // prepare
  const error = new Error();
  error.response = {
    data: { error: "Invalid credentials" },
    status: 401,
    statusText: "Unauthorized",
  };
  axios.post.mockRejectedValueOnce(error);

  history.push("/login");

  // execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getAllByText(/Login/i));
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "fail@gmail.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { name: "password", value: "Fail123" },
  });

  fireEvent.click(screen.getByTestId("loginButton"));

  await waitFor(() => {
    expect(localStorage.getItem("Authorization")).toBeFalsy();
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});

test("shows error when user enters an invalid email", async () => {
  history.push("/login");

  // execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getAllByText(/Login/i));
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "failgmail.com" },
  });
  fireEvent.blur(screen.getByTestId("email"));

  await waitFor(() => {
    expect(localStorage.getItem("Authorization")).toBeFalsy();
    expect(screen.getByText(/Invalid Email/i)).toBeInTheDocument();
  });
});
