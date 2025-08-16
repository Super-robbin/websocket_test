import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import GridStats from "@components/GridStats";
import type { ServerStatus } from "../types";

jest.mock("@components/StatItem", () => {
  return {
    __esModule: true,
    default: ({
      label,
      value,
      hint,
    }: {
      label: string;
      value: React.ReactNode;
      hint?: string;
    }) => (
      <div data-testid={`stat-${label}`}>
        <span data-testid="label">{label}</span>
        <span data-testid="value">{value}</span>
        {hint ? <span data-testid="hint">{hint}</span> : null}
      </div>
    ),
  };
});

const makeData = (withIo = true): ServerStatus => ({
  status: "ok",
  region: "us-east",
  roles: ["test"],
  strict: false,
  server_issue: null,
  version: "1.0.0",
  results: {
    services: {
      redis: true,
      database: true,
    },
    stats: {
      servers_count: 3,
      online: 1234,
      session: 567,
      server: {
        cpus: 8,
        active_connections: 9876,
        cpu_load: 0.42, 
        timers: 12,
        wait_time: 10,
        workers: [
          [
            "requests:pageviews",
            {
              wait_time: 1,
              workers: 1,
              waiting: 0,
              idle: 1,
              time_to_return: 1,
              recently_blocked_keys: [],
              top_keys: [],
            },
          ],
          [
            "io",
            {
              wait_time: withIo ? 42 : 0,
              workers: 1,
              waiting: 0,
              idle: 1,
              time_to_return: 1,
              recently_blocked_keys: [],
              top_keys: [],
            },
          ],
          [
            "requests:unsupported-users",
            {
              wait_time: 1,
              workers: 1,
              waiting: 0,
              idle: 1,
              time_to_return: 1,
              recently_blocked_keys: [],
              top_keys: [],
            },
          ],
          [
            "recording-workers",
            {
              wait_time: 1,
              workers: 1,
              waiting: 0,
              idle: 1,
              time_to_return: 1,
              recently_blocked_keys: [],
              top_keys: [],
            },
          ],
        ],
      },
    },
  },
});

describe("<GridStats />", () => {
  test("Renders all StatItems with computed values when IO worker exists", () => {
    const data = makeData(true);
    render(<GridStats data={data} />);

    const onlineStr = data.results.stats.online.toLocaleString();
    const sessionStr = data.results.stats.session.toLocaleString();
    const activeConnsStr =
      data.results.stats.server.active_connections.toLocaleString();
    const cpuLoadStr = `${(data.results.stats.server.cpu_load * 100).toFixed(
      0
    )}%`;

    expect(
      within(screen.getByTestId("stat-Servers")).getByTestId("value")
    ).toHaveTextContent(String(data.results.stats.servers_count));

    expect(
      within(screen.getByTestId("stat-Online Users")).getByTestId("value")
    ).toHaveTextContent(onlineStr);

    expect(
      within(screen.getByTestId("stat-Active Sessions")).getByTestId("value")
    ).toHaveTextContent(sessionStr);

    expect(
      within(screen.getByTestId("stat-CPU Cores")).getByTestId("value")
    ).toHaveTextContent(String(data.results.stats.server.cpus));

    expect(
      within(screen.getByTestId("stat-Active Conns")).getByTestId("value")
    ).toHaveTextContent(activeConnsStr);

    const load = screen.getByTestId("stat-CPU Load");
    expect(within(load).getByTestId("value")).toHaveTextContent(cpuLoadStr);
    expect(within(load).getByTestId("hint")).toHaveTextContent("avg load");

    expect(
      within(screen.getByTestId("stat-Timers")).getByTestId("value")
    ).toHaveTextContent(String(data.results.stats.server.timers));

    // Queue Wait (+ hint) when io worker exists
    const queue = screen.getByTestId("stat-Queue Wait");
    expect(within(queue).getByTestId("value")).toHaveTextContent("42 ms");
    expect(within(queue).getByTestId("hint")).toHaveTextContent("io.wait_time");
  });

  test("Renders exactly eight StatItems with expected labels", () => {
    const data = makeData(true);
    render(<GridStats data={data} />);

    [
      "Servers",
      "Online Users",
      "Active Sessions",
      "CPU Cores",
      "Active Conns",
      "CPU Load",
      "Timers",
      "Queue Wait",
    ].forEach((label) => {
      expect(screen.getByTestId(`stat-${label}`)).toBeInTheDocument();
    });
  });
});
