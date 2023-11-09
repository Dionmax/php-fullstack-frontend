import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

import { I18nextProvider } from "react-i18next";
import I18n from "./I18n";
import i18n from "../../../i18n/index";

describe("I18n component", () => {
  it("renders the component with the Brasil flag by default", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <I18n />
      </I18nextProvider>
    );

    const flagsContainer = screen.getByTestId("flags-container");

    expect(flagsContainer).toBeInTheDocument();
    expect(flagsContainer.childNodes[0]).toHaveProperty(
      "src",
      window.location.href + "src/assets/brasil-flag.svg"
    );

    expect(flagsContainer.childNodes[1]).toHaveProperty(
      "src",
      window.location.href + "src/assets/eua-flag.svg"
    );
  });
});
