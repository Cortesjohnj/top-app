import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStore from "../store/store";
import PetListPage from "../pages/PetListPage";
import { AUTHORIZATION } from "../store/actions";
import App from "../App";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});
//foundationt _id
const data = {
  foundationInfo: {
    _id: "613fecc4e485559caa864add",
    email: "foundationt@test.com",
    name: "foundationDiego",
    role: "foundation",
  },
  userInfo: {
    _id: "613fecc4e485559caa864add",
    email: "user@test.com",
    name: "userDiego",
    role: "user",
  },
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

test("The page is listing all the pets for the foundation", async () => {
  //mock pet list response
  axios.get.mockResolvedValueOnce({
    data: data.petsList,
  });

  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetListPage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/friend/i));

  await waitFor(() => {
    expect(screen.getAllByTestId("petCard").length).toBe(5);
  });
});

test("The AddPet and deletePet buttons are displayed for foundations", async () => {
  axios.get.mockResolvedValueOnce({
    data: data.foundationInfo,
  });

  axios.get.mockResolvedValueOnce({
    data: data.petsList,
  });

  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/friend/i));

  await waitFor(() => {
    expect(screen.getByTestId("addPetButton")).toBeInTheDocument();
    expect(screen.getAllByTestId("deletePetButton").length).toBeGreaterThan(0);
  });
});

test("The AddPet and deletePet button are not displayed for users", async () => {
  axios.get.mockResolvedValueOnce({
    data: data.userInfo,
  });

  axios.get.mockResolvedValueOnce({
    data: data.petsList,
  });

  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/friend/i));

  await waitFor(() => {
    expect(screen.queryByTestId("addPetButton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("deletePetButton")).not.toBeInTheDocument();
  });
});

test("The modal opens when the delete button is clicked", async () => {
  axios.get.mockResolvedValueOnce({
    data: data.foundationInfo,
  });

  axios.get.mockResolvedValueOnce({
    data: data.petsList,
  });

  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await screen.findAllByTestId("deletePetButton");
  fireEvent.click(screen.getAllByTestId("deletePetButton")[0]);

  await waitFor(() => {
    expect(screen.queryByTestId("deletePetModal")).toBeInTheDocument();
  });
});

test("A message is displayed when there are no pets for users", async () => {
  axios.get.mockResolvedValueOnce({
    data: data.userInfo,
  });

  axios.get.mockResolvedValueOnce({
    data: {
      page: 1,
      count: 0,
      pets: [],
    },
  });

  //mock foundation requests response
  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/friend/i));

  await waitFor(() => {
    expect(screen.queryByTestId("noPetsUser")).toBeInTheDocument();
  });
});

test("A message is displayed when there are no pets for foundations", async () => {
  axios.get.mockResolvedValueOnce({
    data: data.foundationInfo,
  });

  axios.get.mockResolvedValueOnce({
    data: {
      page: 1,
      count: 0,
      pets: [],
    },
  });

  axios.get.mockResolvedValueOnce({
    data: data.requestsInfo,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/foundations/${data.foundationInfo._id}/pets`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getAllByText(/friend/i));

  await waitFor(() => {
    expect(screen.queryByTestId("noPetsFoundation")).toBeInTheDocument();
  });
});
