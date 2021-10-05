import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStore from "../store/store";
import PetManagePage from "../pages/PetManagePage";
import { AUTHORIZATION } from "../store/actions";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});
//foundationt _ic
const data = {
  foundationId: "613fecc4e485559caa864add",
  petInfo: {
    _id: "6143e2a60d4bc9d25fb9e929",
    name: "Test pet",
    description: "Pet test description",
    photoUrl: ["http://dummyimage.com/300x300.png/ff4444/ffffff"],
    age: 8,
    adopted: false,
  },
  requests: [
    {
      _id: "614a107a8e075232b9776e95",
      userId: "6144b9b1b085aa415714f515",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description",
      responseStatus: "pending",
    },
    {
      _id: "614a107a8e075232b9776e96",
      userId: "6144b9b1b085aa415714f516",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description 2",
      responseStatus: "pending",
    },
    {
      _id: "614a107a8e075232b9776e97",
      userId: "6144b9b1b085aa415714f517",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description 3",
      responseStatus: "pending",
    },
  ],
};

test("The page is listing all the requests for the pet", async () => {
  //mock pet info
  axios.get.mockResolvedValueOnce({
    data: { ...data.petInfo },
  });

  //mock pet requests
  axios.get.mockResolvedValueOnce({
    data: data.requests,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/pets/${data.petInfo.petId}/request`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetManagePage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getByTestId("petManagePage"));

  await waitFor(() => {
    expect(screen.getAllByTestId("requestCard").length).toBe(3);
  });
});

test("The page is showing the pet info", async () => {
  //mock pet info
  axios.get.mockResolvedValueOnce({
    data: { ...data.petInfo },
  });

  //mock pet requests
  axios.get.mockResolvedValueOnce({
    data: data.requests,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/pets/${data.petInfo.petId}/request`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetManagePage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getByTestId("petManagePage"));

  await waitFor(() => {
    expect(screen.getByText(/Test pet/i)).toBeInTheDocument();
    expect(screen.getByText(/Pet test description/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
  });
});

test("The modal opens when the foundation approves a request", async () => {
  //mock pet info
  axios.get.mockResolvedValueOnce({
    data: { ...data.petInfo },
  });

  //mock pet requests
  axios.get.mockResolvedValueOnce({
    data: data.requests,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/pets/${data.petInfo.petId}/request`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetManagePage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getByTestId("petManagePage"));
  fireEvent.click(screen.getAllByText("Approve")[0]);

  await waitFor(() => {
    expect(
      screen.getByText(/Are you sure you want to approve this request?/i)
    ).toBeInTheDocument();
  });
});

test("The app approves one request and rejects the other ones", async () => {
  //mock pet info
  axios.get.mockResolvedValueOnce({
    data: { ...data.petInfo },
  });

  //mock pet requests
  axios.get.mockResolvedValueOnce({
    data: data.requests,
  });

  //mock approve request
  axios.put.mockResolvedValueOnce({
    data: {
      _id: "614a107a8e075232b9776e95",
      userId: "6144b9b1b085aa415714f515",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description",
      responseStatus: "approved",
    },
  });

  //mock bulkReject request
  axios.put.mockResolvedValueOnce({
    status: 204,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/pets/${data.petInfo.petId}/request`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetManagePage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getByTestId("petManagePage"));
  fireEvent.click(screen.getAllByText("Approve")[0]);
  fireEvent.click(screen.getByText("Confirm"));

  await waitFor(() => {
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.getAllByText(/rejected/i).length).toBe(2);
  });
});

test("The app rejects the request", async () => {
  //mock pet info
  axios.get.mockResolvedValueOnce({
    data: { ...data.petInfo },
  });

  //mock pet requests
  axios.get.mockResolvedValueOnce({
    data: data.requests,
  });

  //mock approve request
  axios.put.mockResolvedValueOnce({
    data: {
      _id: "614a107a8e075232b9776e95",
      userId: "6144b9b1b085aa415714f515",
      petId: "6143e2a60d4bc9d25fb9e929",
      description: "Test description",
      responseStatus: "rejected",
    },
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push(`/pets/${data.petInfo.petId}/request`);

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PetManagePage />
      </MemoryRouter>
    </Provider>
  );

  //validations
  await waitFor(() => screen.getByTestId("petManagePage"));
  fireEvent.click(screen.getAllByText("Reject")[0]);

  await waitFor(() => {
    expect(screen.getByText(/rejected/i)).toBeInTheDocument();
  });
});
