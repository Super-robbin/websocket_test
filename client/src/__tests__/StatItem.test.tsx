import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatItem from "@components/StatItem";

describe("<StatItem />", () => {
  test("Renders label and value", () => {
    render(<StatItem label="CPU Load" value="42%" />);
    expect(screen.getByText("CPU Load")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  test("Renders hint when provided", () => {
    render(<StatItem label="CPU Load" value="42%" hint="avg load" />);
    expect(screen.getByText("avg load")).toBeInTheDocument();
  });

  test("Does not render hint when not provided", () => {
    render(<StatItem label="CPU Load" value="42%" />);
    expect(screen.queryByText("avg load")).not.toBeInTheDocument();
  });

});
