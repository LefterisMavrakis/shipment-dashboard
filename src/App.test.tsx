import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import shipmentsAPI from "./api/api";
import companiesMock from "./api/data/companies.json";

jest.mock("./components/locationMap/LocationMap", () => {
  return () => <div data-testid="mock-location-map"></div>;
});

const login = () => {
  const nameInput = within(screen.getByTestId("username")).getByRole("textbox");

  const passwordInput = within(screen.getByTestId("password")).getByLabelText(
    "Password"
  );

  userEvent.type(nameInput, "Johnny");
  userEvent.type(passwordInput, "johnnyAdmin");

  userEvent.click(screen.getByTestId("submit"));
};

const logout = () => {
  userEvent.click(screen.getByTestId("logout-button"));
};

describe("App Component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    jest.clearAllMocks();
    jest.spyOn(shipmentsAPI, "getCompanies").mockResolvedValue(companiesMock);
  });

  it("renders LoginPage for '/login' route", () => {
    render(<App />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  describe("when succefully login", () => {
    it("renders user initials within header", async () => {
      render(<App />);

      login();

      await waitFor(() => {
        expect(
          within(screen.getByTestId("app-header")).getByText("JD")
        ).toBeInTheDocument();
      });

      logout();
    });

    it("navigates to Companies list page", async () => {
      render(<App />);

      expect(screen.queryByText("Companies list")).not.toBeInTheDocument();

      login();

      await waitFor(() => {
        expect(screen.getByText("Companies list")).toBeInTheDocument();
      });

      logout();
    });

    describe("and then logout", () => {
      it("navigates to the login page", async () => {
        render(<App />);

        login();

        await waitFor(() => {
          expect(screen.getByText("Companies list")).toBeInTheDocument();
        });

        logout();

        await waitFor(() => {
          expect(screen.getByText(/login/i)).toBeInTheDocument();
        });

        expect(screen.queryByText("Companies list")).not.toBeInTheDocument();
      });
    });
  });
});
