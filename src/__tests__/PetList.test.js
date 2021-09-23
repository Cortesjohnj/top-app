import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../history";
import axios from "../axios";
import createStore from "../store/store";
import PetListPage from "../pages/PetListPage";
import { AUTHORIZATION } from "../store/actions";

jest.mock("../axios");

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});
const data = {
  _id: "613fecc4e485559caa864add",
};

test("The page is listing all the pets for the foundation", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
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
  history.push(`/foundations/${data._id}/pets`);

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
