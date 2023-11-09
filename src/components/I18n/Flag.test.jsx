import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

import Flag from "./Flag";

describe("Flag", () => {
  it("renders an image with the provided source", () => {
    const imageSrc = "https://example.com/flag.png";
    render(<Flag image={imageSrc} />);
    const flagImage = screen.getByTestId("flag");
    expect(flagImage).toHaveAttribute("src", imageSrc);
  });

  it('applies the "selected" class when isSelected is true', () => {
    render(<Flag image="https://example.com/flag.png" isSelected />);
    const flagImage = screen.getByTestId("flag");
    expect(flagImage).toHaveClass("flag selected");
  });

  it('does not apply the "selected" class when isSelected is false', () => {
    render(<Flag image="https://example.com/flag.png" />);
    const flagImage = screen.getByTestId("flag");
    expect(flagImage).not.toHaveClass("selected");
  });
});
