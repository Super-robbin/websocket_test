import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Services from "@components/Services";
import type { ServerStatus } from "../types";

const makeData = (redis: boolean, database: boolean): ServerStatus => ({
  status: "ok",
  region: "us-east",
  roles: [],
  strict: false,
  server_issue: null,
  version: "1.0.0",
  results: {
    services: { redis, database },
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

describe("Services", () => {
  test("Renders section heading", () => {
    const data = makeData(true, true);
    render(<Services data={data} />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  test.each([
    [true, true, "Redis: up", "Database: up"],
    [true, false, "Redis: up", "Database: down"],
    [false, true, "Redis: down", "Database: up"],
    [false, false, "Redis: down", "Database: down"],
  ])(
    "Renders correct badges for redis=%s, database=%s",
    (redis, database, redisText, dbText) => {
      const data = makeData(redis, database);
      render(<Services data={data} />);

      expect(screen.getByText(redisText)).toBeInTheDocument();
      expect(screen.getByText(dbText)).toBeInTheDocument();
    }
  );

});
