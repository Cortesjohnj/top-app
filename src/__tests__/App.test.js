import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import App from "../App";
import axios from "../axios";
import { AUTHORIZATION } from "../store/actions";

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

test("renders Adoption Request page component", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  axios.get.mockResolvedValueOnce({
    data: {
      user: {
        _id: "6144b9b1b085aa415714f515",
        name: "carlos",
        email: "testprueba@gmail.com",
        address: "calle 106 A # 54-65",
        phoneNumber: "3204534334",
        role: "user",
      },
    },
  });

  axios.get.mockResolvedValueOnce({
    data: {
      _id: "61392cb386895b8cffc78fb1",
      name: "3rd generation",
      description: "Phased neutral database",
      photoUrl: ["http://dummyimage.com/135x100.png/ff4444/ffffff"],
      foundationId: "61392cb386895b8cffc78f9f",
      adopted: false,
      age: 8,
    },
  });

  axios.get.mockResolvedValueOnce({
    data: [
      {
        _id: "614a3c34ac8e6062b57d9c68",
        userId: {
          _id: "6144b9b1b085aa415714f515",
          email: "testprueba@gmail.com",
          password:
            "$2b$10$sPOUAfDWB2lnZfBq3L6jBe2A5.71Be/Evdil26pGebxHRYXd9/.uG",
          name: "carlos",
          role: "user",
          __v: 0,
          address: "calle 106 A # 54-65",
          phoneNumber: "3204534334",
        },
        petId: "61392cb386895b8cffc78fb1",
        description: "sdfdsfdsfds",
        responseStatus: "pending",
        __v: 0,
      },
      {
        _id: "614a77b21ce6dc2ddfa7efdc",
        userId: {
          _id: "614a4beb05445cc353d5eb4b",
          email: "userRequest@gmail.com",
          password:
            "$2b$10$tmLAMBZ/Bb0qOaZhano98uLTILYAc9Yo5XbJNr7h5e0nzvlwPHxuy",
          name: "joseAdmin",
          role: "user",
          __v: 0,
          address: "calle 106 A # 54-65",
          phoneNumber: "3204534334",
        },
        petId: "61392cb386895b8cffc78fb1",
        description: "sadsadada",
        responseStatus: "pending",
        __v: 0,
      },
    ],
  });

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByTestId("petForm")).toBeInTheDocument()
  );
});
