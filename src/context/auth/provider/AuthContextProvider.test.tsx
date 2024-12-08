import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthContextProvider, { AuthContext } from "./AuthContextProvider";

jest.mock("../../../api", () => ({
  authUsersMock: [
    {
      id: 1,
      username: "testuser",
      password: "password",
      fullname: "Test User",
    },
  ],
}));

describe("AuthContextProvider", () => {
  it("should initialize with the default state", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {(context) => (
            <div>
              <span>
                Authenticated: {context?.isAuthenticated ? "Yes" : "No"}
              </span>
              <span>Username: {context?.authUser?.username || "None"}</span>
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    expect(screen.getByText("Authenticated: No")).toBeInTheDocument();
    expect(screen.getByText("Username: None")).toBeInTheDocument();
  });

  it("should not log in the user with incorrect credentials", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {(context) => (
            <div>
              <span>
                Authenticated: {context?.isAuthenticated ? "Yes" : "No"}
              </span>
              <span>Username: {context?.authUser?.username || "None"}</span>
              <button
                onClick={() => context?.login("wronguser", "wrongpassword")}
              >
                Log In
              </button>
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Log In"));

    expect(screen.getByText("Authenticated: No")).toBeInTheDocument();
    expect(screen.getByText("Username: None")).toBeInTheDocument();
  });

  it("should log in the user with correct credentials", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {(context) => (
            <div>
              <span>
                Authenticated: {context?.isAuthenticated ? "Yes" : "No"}
              </span>
              <span>Username: {context?.authUser?.username || "None"}</span>
              <button onClick={() => context?.login("testuser", "password")}>
                Log In
              </button>
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Log In"));

    expect(screen.getByText("Authenticated: Yes")).toBeInTheDocument();
    expect(screen.getByText("Username: testuser")).toBeInTheDocument();
  });

  it("should log out the user", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {(context) => (
            <div>
              <span>
                Authenticated: {context?.isAuthenticated ? "Yes" : "No"}
              </span>
              <span>Username: {context?.authUser?.username || "None"}</span>
              <button onClick={() => context?.login("testuser", "password")}>
                Log In
              </button>
              <button onClick={() => context?.logout()}>Log Out</button>
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Log In"));

    expect(screen.getByText("Authenticated: Yes")).toBeInTheDocument();
    expect(screen.getByText("Username: testuser")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Log Out"));

    expect(screen.getByText("Authenticated: No")).toBeInTheDocument();
    expect(screen.getByText("Username: None")).toBeInTheDocument();
  });
});
