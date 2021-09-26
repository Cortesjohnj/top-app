import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import createStore from "../store/store";
import App from "../App";
import history from "../history";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("renders signup page", async () => {
  history.push("/signup");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByText(/Sign up to continue/i)).toBeInTheDocument()
  );
  // const titleElement = screen.getByText(/Sign up to continue/i);
  // expect(titleElement).toBeInTheDocument();
});
