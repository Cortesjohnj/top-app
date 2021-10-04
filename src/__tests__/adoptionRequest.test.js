import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import axios from "../axios";
import { AUTHORIZATION } from "../store/actions";
import { MemoryRouter } from "react-router";
import AdoptionPetRequest from "../pages/AdoptionPetRequest";
import PetFormSuccess from "../components/pet-form/PetFormSuccess";
import PetFormRepeat from "../components/pet-form/PetFormRepeatjs";

jest.mock("../axios");
jest.setTimeout(60000);

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();

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
      pet: {
        _id: "61392cb386895b8cffc78fb1",
        name: "3rd generation",
        description: "Phased neutral database",
        photoUrl: ["http://dummyimage.com/135x100.png/ff4444/ffffff"],
        foundationId: "61392cb386895b8cffc78f9f",
        adopted: false,
        age: 8,
      },
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
});

it("should show an error if address isn't filled", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AdoptionPetRequest />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("petForm")).toBeInTheDocument()
  );
  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: null },
  });

  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: "3204534334" },
  });

  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "description", value: "This is a test" },
  });

  fireEvent.submit(screen.getByTestId("petFormSubmit"));
  expect(screen.getByText("Address required")).toBeInTheDocument();
});

it("should show an error if phoneNumber isn't filled", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AdoptionPetRequest />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("petForm")).toBeInTheDocument()
  );
  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: "street 1234" },
  });

  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: null },
  });

  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "description", value: "This is a test" },
  });

  fireEvent.submit(screen.getByTestId("petFormSubmit"));
  expect(screen.getByText("Phone number required")).toBeInTheDocument();
});

it("should show an error if description isn't filled", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AdoptionPetRequest />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("petForm")).toBeInTheDocument()
  );
  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: "street 1234" },
  });

  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: "3204534334" },
  });

  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "description", value: null },
  });

  fireEvent.submit(screen.getByTestId("petFormSubmit"));
  expect(screen.getByText("Description required")).toBeInTheDocument();
});

it("Show success component when submitting a adoption request", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  axios.post.mockResolvedValueOnce({
    data: {
      request: {
        userId: "6154e5e3cdd3615c2c6fc9b6",
        petId: "61392cb386895b8cffc78fb1",
        description: "sadasdsadasdsa",
        responseStatus: "pending",
        _id: "6154e5fdcdd3615c2c6fc9c2",
        __v: 0,
      },
    },
  });
  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AdoptionPetRequest />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("petForm")).toBeInTheDocument()
  );
  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "address", value: "street 1234" },
  });

  fireEvent.change(screen.getByTestId("phoneNumber"), {
    target: { name: "phoneNumber", value: "3204534334" },
  });

  fireEvent.change(screen.getByTestId("address"), {
    target: { name: "description", value: "I love this pet" },
  });

  fireEvent.submit(screen.getByTestId("petFormSubmit"));
  await waitFor(() => {
    expect(
      screen.getByText("We have received your request!")
    ).toBeInTheDocument();
  });
});

test("renders Success component", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetFormSuccess />
      </MemoryRouter>
    </Provider>
  );
  await waitFor(() =>
    expect(
      screen.getByText("We have received your request!")
    ).toBeInTheDocument()
  );
});

test("renders Error component", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetFormRepeat />
      </MemoryRouter>
    </Provider>
  );
  await waitFor(() =>
    expect(
      screen.getByText("You have already sent a request to adopt this pet")
    ).toBeInTheDocument()
  );
});

it("should have '/' href return to home button", async () => {
  const petId = "61392cb386895b8cffc78fb1";

  localStorage.setItem(AUTHORIZATION, "12345");

  history.push(`/pets/${petId}/request`);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetFormSuccess />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() =>
    expect(screen.getByTestId("success")).toBeInTheDocument()
  );

  await waitFor(() =>
    expect(screen.getByTestId("successButton").href).toBe("http://localhost/")
  );
});
