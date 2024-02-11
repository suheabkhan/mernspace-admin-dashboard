import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";

describe("Login Page", () => {
  it("should render with required fields", () => {
    //AAA

    //1. Arrange
    render(<LoginPage />);
    //getBy -> throws an error
    //findBy -> Async
    //queryBy -> similar to getBy, but doesnot throw an error, returns null
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeInTheDocument();
    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });
});
