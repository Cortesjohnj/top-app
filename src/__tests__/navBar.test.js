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
  await waitFor(() => expect(screen.getByTestId("navBar")).toBeInTheDocument());
  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("signup"));
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
  await waitFor(() => expect(screen.getByTestId("navBar")).toBeInTheDocument());
  const spy = jest.spyOn(history, "push");
  fireEvent.click(screen.getByTestId("login"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/login"));
});

it("should send to home when clicking Adogta Logo", async () => {
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
  fireEvent.click(screen.getByTestId("adogta"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/"));
});

it("should send to foundations when clicking foundations button", async () => {
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
  fireEvent.click(screen.getByTestId("foundations"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/foundations"));
});

it("should send to pets when clicking pets button", async () => {
  const id = "613a2c7cfd818ebfd9e05029";
  history.push(`/foundations/${id}/pets`);
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
  fireEvent.click(screen.getByTestId("pets"));
  await waitFor(() =>
    expect(spy).toHaveBeenCalledWith(`/foundations/${id}/pets`)
  );
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
  fireEvent.click(screen.getByTestId("donate"));
  await waitFor(() => expect(spy).toHaveBeenCalledWith("/donate"));
});
