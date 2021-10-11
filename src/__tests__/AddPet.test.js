import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStoreApp from "../store/store";
import { AUTHORIZATION } from "../store/actions";
import App from "../App";
import AddPet from "../pages/AddPet";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStoreApp();
});

const data = {
  foundationId: "613fecc4e485559caa864add",
};
const pets = {
  petsList: {
    page: 1,
    count: 5,
    pets: [
      {
        _id: "6143e2a60d4bc9d25fb9e929",
        name: "coco1",
        description: "test pet",
        photoUrl: ["http://dummyimage.com/119x100.png/cc0000/ffffff"],
        age: 10,
        foundationId: "613fecc4e485559caa864add",
        adopted: false,
        __v: 0,
      },
      {
        _id: "6143e2a60d4bc9d25fb9e930",
        name: "coco2",
        description: "test pet",
        photoUrl: ["http://dummyimage.com/119x100.png/cc0000/ffffff"],
        age: 10,
        foundationId: "613fecc4e485559caa864add",
        adopted: false,
        __v: 0,
      },
      {
        _id: "6143e2a60d4bc9d25fb9e931",
        name: "coco3",
        description: "test pet",
        photoUrl: ["http://dummyimage.com/119x100.png/cc0000/ffffff"],
        age: 10,
        foundationId: "613fecc4e485559caa864add",
        adopted: false,
        __v: 0,
      },
      {
        _id: "6143e2a60d4bc9d25fb9e932",
        name: "coco4",
        description: "test pet",
        photoUrl: ["http://dummyimage.com/119x100.png/cc0000/ffffff"],
        age: 10,
        foundationId: "613fecc4e485559caa864add",
        adopted: false,
        __v: 0,
      },
      {
        _id: "6143e2a60d4bc9d25fb9e933",
        name: "coco5",
        description: "test pet",
        photoUrl: ["http://dummyimage.com/119x100.png/cc0000/ffffff"],
        age: 10,
        foundationId: "613fecc4e485559caa864add",
        adopted: false,
        __v: 0,
      },
    ],
  },
  requestsInfo: [
    {
      _id: "614a107a8e075232b9776e95",
      userId: "6144b9b1b085aa415714f515",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description",
      responseStatus: "pending",
    },
  ],
};

it("should add a pet with valid data", async () => {
  // prepare;
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
  axios.post.mockResolvedValueOnce({
    data: {
      pets: {
        adopted: false,
        age: 12,
        description: "aaaaaa",
        foundationId: "613fecc4e485559caa864add",
        name: "Perrito",
        photoUrl: [],
        _id: "61525241d959973169fabfb7",
      },
    },
  });

  axios.get.mockResolvedValueOnce({
    data: pets.petsList,
  });

  axios.get.mockResolvedValueOnce({
    data: pets.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/foundations/${data.foundationId}/add-pet`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Add Pet's/i));

  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "petName", value: "Perrito" },
  });
  fireEvent.change(screen.getByTestId("age"), {
    target: { name: "petAge", value: 12 },
  });
  fireEvent.change(screen.getByTestId("description"), {
    target: { name: "petDescription", value: "aaaaaa" },
  });

  const spy = jest.spyOn(history, "push");
  fireEvent.submit(screen.getByTestId("form"));

  await waitFor(() =>
    expect(spy).toHaveBeenCalledWith(`/foundations/${data.foundationId}/pets`)
  );
});

it("shouldn't add a pet is there is a missing value", async () => {
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

  axios.post.mockResolvedValueOnce({
    data: {
      error: "Pet validation failed: description: A description is required",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/foundations/${data.foundationId}/add-pet`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddPet />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Add Pet's/i));
  fireEvent.change(screen.getByTestId("name"), {
    target: { name: "petName", value: "Perrito" },
  });
  fireEvent.change(screen.getByTestId("age"), {
    target: { name: "petAge", value: 12 },
  });
  const spy = jest.spyOn(history, "push");
  fireEvent.submit(screen.getByTestId("form"));

  await waitFor(() =>
    expect(spy).not.toHaveBeenCalledWith(
      `/foundations/${data.foundationId}/pets`
    )
  );
});

it("should display an error namePet when the onBlur action triggered", async () => {
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

  //execution
  const container = render(
    <Provider store={store}>
      <MemoryRouter>
        <AddPet />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => screen.getByText(/Add Pet's/i));
  container.getByTestId("name").focus();
  expect(document.activeElement).toBe(container.getByTestId("name"));
  container.getByTestId("age").focus();
  expect(document.activeElement).toBe(container.getByTestId("age"));
  await waitFor(() => screen.getByText(/Please enter a name for your pet/i));
});
