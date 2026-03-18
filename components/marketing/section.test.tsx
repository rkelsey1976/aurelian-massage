import React from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "@/components/marketing/section";

describe("Section", () => {
  it("renders an h1 when requested", () => {
    render(
      React.createElement(
        Section,
        {
          as: "h1",
          title: "Primary page title",
          description: "Section description",
        },
        React.createElement("div", null, "Body copy"),
      ),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Primary page title" }),
    ).toBeInTheDocument();
  });
});
