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
  foundationId: "613fecc4e485559caa864add",
};

it("should render addPets page", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      address: "",
      email: "foundationt@test.com",
      name: "Fundacion Mascoticas",
      phoneNumber: "",
      photoUrl: null,
      role: "foundation",
      _id: "613fecc4e485559caa864add",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/foundations/${data.foundationId}/add-pet`);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getByText(/Add pet's/i)).toBeInTheDocument()
  );
});
