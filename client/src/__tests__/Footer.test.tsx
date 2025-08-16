import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@components/Footer";
import type { ServerStatus } from "../types";

const makeData = (roles: string[], strict: boolean): ServerStatus => ({
  status: "ok",
  region: "us-east",
  roles,
  strict,
  server_issue: null,
  version: "1.0.0",
  results: {
    services: { redis: true, database: true },
    stats: {
      servers_count: 1,
      online: 1,
      session: 1,
      server: {
        cpus: 1,
        active_connections: 1,
        wait_time: 0,
        cpu_load: 0.1,
        timers: 0,
        workers: [
          ["requests:pageviews", { wait_time: 0, workers: 0, waiting: 0, idle: 0, time_to_return: 0, recently_blocked_keys: [], top_keys: [] }],
          ["io", { wait_time: 0, workers: 0, waiting: 0, idle: 0, time_to_return: 0, recently_blocked_keys: [], top_keys: [] }],
          ["requests:unsupported-users", { wait_time: 0, workers: 0, waiting: 0, idle: 0, time_to_return: 0, recently_blocked_keys: [], top_keys: [] }],
          ["recording-workers", { wait_time: 0, workers: 0, waiting: 0, idle: 0, time_to_return: 0, recently_blocked_keys: [], top_keys: [] }],
        ],
      },
    },
  },
});

describe("<Footer />", () => {
  test("Renders labels for Roles and Strict mode", () => {
    const data = makeData(["api"], true);
    render(<Footer data={data} />);
    expect(screen.getByText("Roles:")).toBeInTheDocument();
    expect(screen.getByText("Strict mode:")).toBeInTheDocument();
  });

  test("Shows comma-separated roles when roles exist", () => {
    const data = makeData(["api", "worker", "scheduler"], true);
    render(<Footer data={data} />);
    expect(screen.getByText("api, worker, scheduler")).toBeInTheDocument();
  });

  test("Shows em dash when roles array is empty", () => {
    const data = makeData([], true);
    render(<Footer data={data} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("Shows strict as 'true' when strict is true", () => {
    const data = makeData(["api"], true);
    render(<Footer data={data} />);
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("Shows strict as 'false' when strict is false", () => {
    const data = makeData(["api"], false);
    render(<Footer data={data} />);
    expect(screen.getByText("false")).toBeInTheDocument();
  });
});
