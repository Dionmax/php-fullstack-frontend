import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { expect } from "vitest";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Dashboard />);
    expect(getByTestId("dashboard")).toBeInTheDocument();
  });
});
