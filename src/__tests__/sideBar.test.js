import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import createStoreApp from "../store/store";
import App from "../App";

jest.mock("../axios");
jest.setTimeout(60000);

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
  history.push("/");
});

//execution

it("should send to signUp when clicking signUp button", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("sideBar")).toBeInTheDocument()
  );
  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("signup2"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/signup"));
});

it("should send to login when clicking login button", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("sideBar")).toBeInTheDocument()
  );
  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("login2"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/login"));
});

it("should send to donate when clicking donate button", async () => {
  history.push("/donate");
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => expect(screen.getByTestId("navBar")).toBeInTheDocument());
  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("donate2"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/donate"));
});
