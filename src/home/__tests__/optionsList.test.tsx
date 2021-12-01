import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import jwt from "jsonwebtoken";
import App from "../../App";
import { SESSION_DATA } from "../../common/utils";
import { getUserTestData } from "../../common/testData";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

function mockSignInToLocalStorage(type: "user" | "manager") {
  const user = getUserTestData(type);
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      isManager: user.isManager,
    },
    "test",
    { expiresIn: "1h" }
  );
  window.localStorage.setItem(
    SESSION_DATA.PROFILE,
    JSON.stringify({
      [SESSION_DATA.RESULT]: user,
      [SESSION_DATA.TOKEN]: token,
    })
  );
}
describe("Option List", () => {
  const initialState = { globalNotification: { message: "", type: "sucess" } };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Shows login if user is not logged in", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("Shows profile, bikes, reservations and logout options if user is logged in", () => {
    mockSignInToLocalStorage("user");
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.queryByText("Login")).toBe(null);
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("Bikes")).toBeInTheDocument();
    expect(screen.getByText("My Reservations")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("Shows profile, bikes, users, add user, add bike and logout options if manager is logged in", () => {
    mockSignInToLocalStorage("manager");
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.queryByText("Login")).toBe(null);
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("Bikes")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Add New User")).toBeInTheDocument();
    expect(screen.getByText("Add New Bike")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
