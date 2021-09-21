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
  //preparacion
  axios.post.mockResolvedValueOnce({
    data: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTQzNTU2Y2RkNTgwNGRlMjY5NzM5MzMiLCJpYXQiOjE2MzIwMDA2MDl9.G3ukPNIzoiVXVx0xO_bIv9SZiJDZCno4sNa7gk4kvmw",
      user: {
        email: "found@gmail.com",
        name: "foundationDiego",
        role: "foundation",
      },
    },
  });

  history.push("/login");

  //ejecucion
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  //validaciones
  await waitFor(() => screen.getAllByText(/Login/i));
  fireEvent.change(screen.getByTestId("email"), {
    target: { name: "email", value: "found@gmail.com" },
  });
  fireEvent.change(screen.getByTestId("password"), {
    target: { name: "password", value: "Prueba123" },
  });

  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("loginButton"));

  await waitFor(() => expect(spy).toHaveBeenCalledWith("/"));
});

test("shows error when user enters invalid credentials", async () => {
  // preparación
  const error = new Error();
  error.response = {
    data: { error: "Invalid credentials" },
    status: 401,
    statusText: "Unauthorized",
  };
  axios.post.mockRejectedValueOnce(error);

  history.push("/login");

  // ejecución
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  // validaciones
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

    // verificar que aparezca el error
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
