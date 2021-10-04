import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStoreApp from "../store/store";
import { AUTHORIZATION } from "../store/actions";
import App from "../App";
import UserProfile from "../pages/UserProfile";
import RegisterPage from "../pages/RegisterPage";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
});

const data = {
  userId: "6143ca1239b66c9025ba67e7",
};

it("should allow users to update their profile updating only one field", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "6143ca1239b66c9025ba67e7",
      name: "Fulanito de Tal",
      email: "pepito@test.com",
      address: "Cra 123",
      phoneNumber: "33333331",
      role: "user",
      photoUrl: null,
    },
  });

  axios.put.mockResolvedValueOnce({
    data: {
      name: "Fulanito de test",
      email: "pepito@test.com",
      address: "Cra 123",
      phoneNumber: "33333331",
      role: "user",
      photoUrl: "null",
      _id: "6143ca1239b66c9025ba67e7",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Change profile picture/i));

  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "name", value: "Fulanito de test" },
  });

  fireEvent.submit(screen.getByTestId("form"));

  await waitFor(() =>
    expect(screen.getByText(/Hello Fulanito de test!/i)).toBeInTheDocument()
  );
});

it("should allow users to update their profile if updates all fields", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "6143ca1239b66c9025ba67e7",
      name: "Fulanito de Tal",
      email: "pepito@test.com",
      address: "Cra 123",
      phoneNumber: "33333331",
      role: "user",
      photoUrl: null,
    },
  });

  axios.put.mockResolvedValueOnce({
    data: {
      name: "Fulanito de test",
      email: "pepito@test.com",
      address: "Cra nueva",
      phoneNumber: "123",
      role: "user",
      photoUrl: "",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Change profile picture/i));

  fireEvent.click(screen.getByTestId("imageUpload"), {
    target: {
      name: "imageUpload",
      value: "",
    },
  });
  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "name", value: "Fulanito de test" },
  });
  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: "Cra nueva" },
  });
  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: "123" },
  });

  fireEvent.submit(screen.getByTestId("form"));

  await waitFor(() =>
    expect(screen.getByText(/Fulanito de test/i)).toBeInTheDocument()
  );
});
it("should not show error if user click on update profile withouth changing any input", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "6143ca1239b66c9025ba67e7",
      name: "Fulanito de Tal",
      email: "pepito@test.com",
      address: "Cra 123",
      phoneNumber: "33333331",
      role: "user",
      photoUrl: null,
    },
  });

  axios.put.mockResolvedValueOnce({
    data: {
      address: "Cra 123",
      email: "pepito@test.com",
      name: "Fulanito de Tal",
      phoneNumber: "33333331",
      photoUrl: "null",
      role: "user",
      _id: "6143ca1239b66c9025ba67e7",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Change profile picture/i));

  fireEvent.submit(screen.getByTestId("form"));

  await waitFor(() =>
    expect(screen.getByText(/Fulanito de Tal/i)).toBeInTheDocument()
  );
});
