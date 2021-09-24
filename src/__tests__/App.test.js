import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import axios from "../axios";
import App from "../App";
import { AUTHORIZATION } from "../store/actions";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("renders login component", async () => {
  history.push("/login");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument()
  );
});

test("renders PetListPage component", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "613fecc4e485559caa864add",
      email: "foundationt@test.com",
      name: "foundationDiego",
      role: "foundation",
    },
  });
  axios.get.mockResolvedValueOnce({
    data: {
      page: 1,
      count: 1,
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
      ],
    },
  });
  axios.get.mockResolvedValueOnce({
    data: [
      {
        _id: "614a107a8e075232b9776e95",
        userId: "6144b9b1b085aa415714f515",
        petId: "6143e2a60d4bc9d25fb9e929",
        description: "Test description",
        responseStatus: "pending",
      },
    ],
  });
  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/foundations/613fecc4e485559caa864add/pets");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() => expect(screen.getByText(/friend/i)).toBeInTheDocument());
});

test("PetListPage redirects to login if not authenticated", async () => {
  history.push("/foundations/613fecc4e485559caa864add/pets");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.queryByText(/new friend/i)).not.toBeInTheDocument()
  );
});

test("renders PetManagePage component", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "613fecc4e485559caa864add",
      email: "foundationt@test.com",
      name: "foundationDiego",
      role: "foundation",
    },
  });
  axios.get.mockResolvedValueOnce({
    data: {
      page: 1,
      count: 1,
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
      ],
    },
  });
  axios.get.mockResolvedValueOnce({
    data: [
      {
        _id: "614a107a8e075232b9776e95",
        userId: "6144b9b1b085aa415714f515",
        petId: "6143e2a60d4bc9d25fb9e929",
        description: "Test description",
        responseStatus: "pending",
      },
    ],
  });
  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/pets/6143e2a60d4bc9d25fb9e929/manage");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByTestId("petManagePage")).toBeInTheDocument()
  );
});

test("PetManagePage redirects to login if not authenticated", async () => {
  history.push("/pets/6143e2a60d4bc9d25fb9e929/manage");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.queryByTestId("petManagePage")).not.toBeInTheDocument()
  );
});
