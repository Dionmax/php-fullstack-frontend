import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";

import Navbar from "./Navbar";

describe("Navbar", () => {
  it("should render the Navbar component", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });

  it('should redirect to "/" when the "Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const homeButton = screen.getByText("home.home");
    expect(homeButton).toBeInTheDocument();
    expect(screen.getByText("home.home")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "home.home" })).toHaveAttribute('href', '/');

  });

  it('should redirect to "/list" when the "Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const listButton = screen.getByText("home.list");
    expect(listButton).toBeInTheDocument();
    expect(screen.getByText("home.list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "home.list" })).toHaveAttribute('href', '/list');

  });

  it('should redirect to "/dashboard" when the "Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const dashboardButton = screen.getByText("home.dashboard");
    expect(dashboardButton).toBeInTheDocument();
    expect(screen.getByText("home.dashboard")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "home.dashboard" })).toHaveAttribute('href', '/dashboard');

  });

});
