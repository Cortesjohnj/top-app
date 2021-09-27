import { createBrowserHistory, createMemoryHistory } from "history";

export default process.env.NODE_ENV === "test"
  ? createMemoryHistory()
  : createBrowserHistory();
