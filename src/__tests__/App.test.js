import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "../axios";
import history from "../history";
import createStore from "../store/store";
import { AUTHORIZATION } from "../store/actions";
import App from "../App";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

const data = {
  userId: "6143ca1239b66c9025ba67e7",
};

it("should render userProfile page", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "6143ca1239b66c9025ba67e7",
      name: "Fulanito de Tal",
      email: "pepito@test.com",
      address: "cra 4322",
      phoneNumber: "33333331",
      role: "user",
      photoUrl:
        "http://res.cloudinary.com/juanan150/image/upload/v1632931058/ltb9ra7ha2gqcqb5hank.png",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getByText(/Change profile picture/i)).toBeInTheDocument()
  );
});
