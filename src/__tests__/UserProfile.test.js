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
  const initialState = {
    user: {
      name: "Fulanito de Tales1",
      email: "pepito@test.com",
      address: "Cra 1234",
      phoneNumber: "33333331",
      role: "user",
      photoUrl: "null",
      _id: "6143ca1239b66c9025ba67e7",
    },
  };

  store = createStoreApp(initialState);
});

const data = {
  userId: "6143ca1239b66c9025ba67e7",
};

it("should allow users to update their profile", async () => {
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
      user: {
        name: "Fulanito de test",
        email: "pepito@test.com",
        address: "Cra 123",
        phoneNumber: "33333331",
        role: "user",
        photoUrl: "null",
        _id: "6143ca1239b66c9025ba67e7",
      },
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Change profile picture/i));

  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "name", value: "Fulanito de test" },
  });

  fireEvent.submit(screen.getByTestId("form"));

  console.log(store);
  // await waitFor(() =>
  //   expect(screen.getByText(/Hello Fulanito de test!/i)).toBeInTheDocument()
  // );
});
