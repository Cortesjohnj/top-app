import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "../axios";
import history from "../history";
import createStore from "../store/store";
import App from "../App";
import { AUTHORIZATION } from "../store/actions";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

const data = {
  userId: "6143ca1239b66c9025ba67e7",
  foundationId: "613fecc4e485559caa864add",
};

it("should render userProfile page", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      _id: "6143ca1239b66c9025ba67e7",
      name: "Fulanito de Tal",
      email: "pepito@test.com",
      address: "cra 4322",
      phoneNumber: "33333331",
      role: "user",
      photoUrl:
        "http://res.cloudinary.com/juanan150/image/upload/v1632931058/ltb9ra7ha2gqcqb5hank.png",
    },
  });

  localStorage.setItem(AUTHORIZATION, "123355");
  history.push(`/${data.userId}/profile`);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getByText(/Change profile picture/i)).toBeInTheDocument()
  );
});

it("should render addPets page", async () => {
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

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getByText(/Add pet's/i)).toBeInTheDocument()
  );
});
test("renders signup page", async () => {
  history.push("/signup");
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(() =>
    expect(screen.getByText(/Sign up to continue/i)).toBeInTheDocument()
  );
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
