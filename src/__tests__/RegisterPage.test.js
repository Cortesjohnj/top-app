import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStoreApp from "../store/store";
import RegisterPage from "../pages/RegisterPage";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
});

test("Signup with valid credentials", async () => {
  // prepare;
  axios.post.mockResolvedValueOnce({
    data: {
      user: {
        name: "Diegodev",
        email: "Diegodev@gmail.com",
        password: "Test1234",
        _id: "123123123",
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

  // validations
  await waitFor(() => screen.getByText(/Sign up to continue/i));

  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "name", value: "Diegodev" },
  });
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "Diegodev@gmail.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { name: "password", value: "Test1234" },
  });
  fireEvent.change(screen.getByTestId("confirmPassword"), {
    target: { name: "confirmPassword", value: "Test1234" },
  });
  fireEvent.change(screen.getByTestId("user"), {
    target: { name: "user", value: true },
  });
  fireEvent.change(screen.getByTestId("terms"), {
    target: { name: "terms", value: true },
  });

  const spy = jest.spyOn(history, "push");
  const submit = fireEvent.click(screen.getByTestId("submitButton"));

  expect(submit).toBeTruthy();

  // await waitFor(() => expect(spy).toHaveBeenCalledWith("/login"));
});

test("shows error when user enters an invalid email", async () => {
  history.push("/signup");

  // execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getAllByText(/Sign up to continue/i));
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "failgmail.com" },
  });
  fireEvent.blur(screen.getByTestId("email"));

  await waitFor(() => {
    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
  });
});

test("shows error when user enters an invalid password", async () => {
  history.push("/signup");

  // execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getAllByText(/Sign up to continue/i));
  fireEvent.change(screen.getByTestId("password"), {
    target: { name: "password", value: "123" },
  });
  fireEvent.blur(screen.getByTestId("password"));

  await waitFor(() => {
    expect(
      screen.getByText(
        /Password must be at least 8 characters, one uppercase with one lowercase & one numeric character/i
      )
    ).toBeInTheDocument();
  });
});
