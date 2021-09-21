import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import App from "../App";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("renders login component", () => {
  history.push("/login");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
});
