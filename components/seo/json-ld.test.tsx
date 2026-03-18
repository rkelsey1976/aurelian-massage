import React from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { JsonLd } from "@/components/seo/json-ld";

describe("JsonLd", () => {
  it("renders a JSON-LD script tag", () => {
    render(
      React.createElement(JsonLd, {
        data: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Starter Local Business",
        },
      }),
    );

    const script = screen.getByTestId("json-ld");

    expect(script).toHaveAttribute("type", "application/ld+json");
    expect(script.textContent).toContain('"@type":"LocalBusiness"');
  });
});
