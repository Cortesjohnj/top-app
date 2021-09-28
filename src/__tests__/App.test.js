import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import App from "../App";

jest.mock("../axios");
jest.setTimeout(60000);

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("renders navBar component", async () => {
  history.push("/");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("navBar")).toBeInTheDocument());
});

test("renders sideBar component", async () => {
  history.push("/");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByTestId("sideBar")).toBeInTheDocument()
  );
});

test("renders footer component", async () => {
  history.push("/");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByTestId("footer")).toBeInTheDocument());
});
