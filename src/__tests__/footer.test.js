import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import createStoreApp from "../store/store";
import App from "../App";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
  history.push("/");
});

//execution

it("facebook icon should have href facebook attribute", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => expect(screen.getByTestId("footer")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByTestId("facebook").href).toBe(
      "https://www.facebook.com/"
    )
  );
});

it("twitter icon should have href twitter attribute", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => expect(screen.getByTestId("footer")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByTestId("twitter").href).toBe("https://www.twitter.com/")
  );
});

it("instagram icon should have href instagram attribute", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => expect(screen.getByTestId("footer")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByTestId("instagram").href).toBe(
      "https://www.instagram.com/"
    )
  );
});

it("linkedin icon should have href linkedin attribute", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => expect(screen.getByTestId("footer")).toBeInTheDocument());
  await waitFor(() =>
    expect(screen.getByTestId("linkedin").href).toBe(
      "https://www.linkedin.com/"
    )
  );
});
