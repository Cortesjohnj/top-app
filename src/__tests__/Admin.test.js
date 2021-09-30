import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import createStore from "../store/store";
import axios from "../axios";
import { AUTHORIZATION } from "../store/actions";
import Admin from "../pages/Admin";

jest.mock("../axios");

let store;
let adminData = [
  {
    _id: "613a2c7cfd818ebfd9e05029",
    email: "dbraganca0@un.org",
    name: "Riffpath",
    address: "007 David Pass",
    phoneNumber: "235-262-2735",
    photoUrl: "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
  },
  {
    _id: "613a5c5e382eee3ccac5bad0",
    email: "relegood1@eepurl.com",
    name: "Avamm",
    address: "48469 Randy Plaza",
    phoneNumber: "582-369-8187",
    photoUrl: "http://dummyimage.com/194x100.png/cc0000/ffffff",
  },
  {
    _id: "613a749c7c6c0998970eab95",
    email: "pdooman2@msu.edu",
    name: "Divape",
    address: "2201 Milwaukee Park",
    phoneNumber: "971-616-6430",
    photoUrl: "http://dummyimage.com/182x100.png/ff4444/ffffff",
  },
  {
    _id: "613a86e210ed01add3e4f2ae",
    email: "bbacksal3@wiley.com",
    name: "Brightdog",
    address: "66 Oxford Place",
    phoneNumber: "951-915-6585",
    photoUrl: "http://dummyimage.com/239x100.png/ff4444/ffffff",
  },
  {
    _id: "613a9b7abd9f8c8d00f6a612",
    email: "mnowak4@google.cn",
    name: "Bluejam",
    address: "54601 Badeau Street",
    phoneNumber: "918-429-1332",
    photoUrl: "http://dummyimage.com/100x100.png/dddddd/000000",
  },
];
let twoFoundations = [
  {
    _id: "123",
    email: "lol@un.org",
    name: "Riph",
    address: "00",
    phoneNumber: "62766666",
    photoUrl: "http://dummyimage.com",
  },
  {
    _id: "1234",
    email: "lol1@un.org",
    name: "Riph",
    address: "00",
    phoneNumber: "62766666",
    photoUrl: "http://dummyimage.com",
  },
];
let fourFoundations = [
  {
    _id: "613a2c7cfd818ebfd9e05029",
    email: "dbraganca0@un.org",
    name: "Riffpath",
    address: "007 David Pass",
    phoneNumber: "235-262-2735",
    photoUrl: "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
  },
  {
    _id: "613a5c5e382eee3ccac5bad0",
    email: "relegood1@eepurl.com",
    name: "Avamm",
    address: "48469 Randy Plaza",
    phoneNumber: "582-369-8187",
    photoUrl: "http://dummyimage.com/194x100.png/cc0000/ffffff",
  },
  {
    _id: "613a749c7c6c0998970eab95",
    email: "pdooman2@msu.edu",
    name: "Divape",
    address: "2201 Milwaukee Park",
    phoneNumber: "971-616-6430",
    photoUrl: "http://dummyimage.com/182x100.png/ff4444/ffffff",
  },
  {
    _id: "613a86e210ed01add3e4f2ae",
    email: "bbacksal3@wiley.com",
    name: "Brightdog",
    address: "66 Oxford Place",
    phoneNumber: "951-915-6585",
    photoUrl: "http://dummyimage.com/239x100.png/ff4444/ffffff",
  },
];

beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

test("Page lists not found page", async () => {
  axios.get.mockResolvedValueOnce({
    data: null,
  });

  history.push("/admin");
  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Admin isFoundation={true} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("Home")).toBeInTheDocument();
    expect(screen.queryByTestId("nextButton")).toBeNull();
  });
});

test("Admin page renders 5 rows", async () => {
  axios.get.mockResolvedValueOnce({
    data: adminData,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/admin");
  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Admin isFoundation={true} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByTestId("nextButton")).toBeInTheDocument();
    expect(screen.getByTestId("previousButton")).toBeInTheDocument();
    expect(screen.getAllByTestId("checkBox").length).toBe(5);
  });
});

test("Admin renders 2 rows", async () => {
  axios.get.mockResolvedValueOnce({
    data: [
      {
        _id: "123",
        email: "lol@un.org",
        name: "Riph",
        address: "00",
        phoneNumber: "62766666",
        photoUrl: "http://dummyimage.com",
      },
      {
        _id: "1234",
        email: "lol1@un.org",
        name: "Riph",
        address: "00",
        phoneNumber: "62766666",
        photoUrl: "http://dummyimage.com",
      },
    ],
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/admin");
  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Admin isFoundation={true} />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => {
    expect(screen.getByTestId("nextButton")).toBeInTheDocument();
    expect(screen.getByTestId("previousButton")).toBeInTheDocument();
    expect(screen.getAllByTestId("checkBox").length).toBe(2);
  });
});

test("Next and previous buttons working", async () => {
  axios.get.mockResolvedValueOnce({
    data: adminData,
  });
  axios.get.mockResolvedValueOnce({
    data: adminData,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/admin");

  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Admin isFoundation={true} />
      </MemoryRouter>
    </Provider>
  );

  // validations
  await waitFor(() => {
    expect(screen.getAllByTestId("checkBox").length).toBe(5);
  });

  await waitFor(() => {
    axios.get.mockResolvedValueOnce({
      data: twoFoundations,
    });
    axios.get.mockResolvedValueOnce({
      data: twoFoundations,
    });
    fireEvent.click(screen.getByTestId("nextButton"));
    expect(screen.getAllByTestId("checkBox").length).toBe(2);
  });

  await waitFor(() => {
    axios.get.mockResolvedValueOnce({
      data: fourFoundations,
    });
    axios.get.mockResolvedValueOnce({
      data: fourFoundations,
    });
    fireEvent.click(screen.getByTestId("previousButton"));
    expect(screen.getAllByTestId("checkBox").length).toBe(2);
  });
});

test("Delete fundations is working", async () => {
  axios.get.mockResolvedValueOnce({
    data: adminData,
  });

  localStorage.setItem(AUTHORIZATION, "12345");
  history.push("/admin");
  //execution
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Admin isFoundation={true} />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getAllByTestId("checkBox").length).toBe(5);
    fireEvent.click(screen.getByTestId("deleteButton"));
    expect(screen.getAllByTestId("checkBox").length).toBe(5);
  });

  await waitFor(() => {
    let checks = screen.getAllByTestId("checkBox");
    fireEvent.click(checks[0]);
    fireEvent.click(checks[1]);
    axios.delete.mockResolvedValueOnce({
      _id: ["613a2c7cfd818ebfd9e05029", "613a5c5e382eee3ccac5bad0"],
    });
    fireEvent.click(screen.getByTestId("deleteButton"));
    expect(screen.getAllByTestId("checkBox").length).toBe(5);
  });
});
