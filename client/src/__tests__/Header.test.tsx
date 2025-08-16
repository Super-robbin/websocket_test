import { render, screen } from "@testing-library/react";
import Header from "@components/Header";
import type { ServerStatus } from "../types";

describe("<Header />", () => {
  const baseData: ServerStatus = {
    status: "ok",
    region: "us-east-1",
    version: "1.2.3",
    server_issue: null,
  };

  test("Render cluster status title and indicator", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText("Cluster Status")).toBeInTheDocument();
    expect(screen.getByTitle('Status: ok')).toBeInTheDocument();
  });

  test("Render version badge correctly", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });

  test("Render region information", () => {
    render(<Header data={baseData} />);
    expect(screen.getByText("us-east-1")).toBeInTheDocument();
  });

  test("Render server issue message when provided", () => {
    const issueData = { ...baseData, server_issue: "Database down" };
    render(<Header data={issueData} />);
    expect(screen.getByText("Database down")).toBeInTheDocument();
  });

  test("Not render server issue message when null", () => {
    render(<Header data={baseData} />);
    const issueElement = screen.queryByText(/database down/i);
    expect(issueElement).not.toBeInTheDocument();
  });
});
