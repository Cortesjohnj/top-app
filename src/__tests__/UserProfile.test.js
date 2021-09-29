import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStoreApp from "../store/store";
import { AUTHORIZATION } from "../store/actions";
import App from "../App";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
});

const data = {
  userId: "6143ca1239b66c9025ba67e7",
};

it("should allow users to update their profile", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      address: "Cra 123",
      email: "pepito@test.com",
      name: "Fulanito de Tal",
      phoneNumber: "123",
      photoUrl: null,
      role: "user",
      _id: "6143ca1239b66c9025ba67e7",
    },
  });
  axios.post.mockResolvedValueOnce({});

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
  await waitFor(() => screen.getByText(/Fulanito de Tal/i));
  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "name", value: "Fulanito de Test" },
  });

  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: "Cra 1234" },
  });

  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: 666 },
  });

  fireEvent.submit(screen.getByTestId("form"));

  //TODO this needs more validation
});
