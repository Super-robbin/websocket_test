export interface WorkerMetrics {
  wait_time: number;
  workers: number;
  waiting: number;
  idle: number;
  time_to_return: number;
  recently_blocked_keys: [string, number, string][]; // key, count, ISO timestamp
  top_keys: [string, number][]; // key, ratio
}

export interface ServerInfo {
  cpus: number;
  active_connections: number;
  wait_time: number;
  workers: [
    ["requests:pageviews", WorkerMetrics],
    ["io", WorkerMetrics],
    ["requests:unsupported-users", WorkerMetrics],
    ["recording-workers", WorkerMetrics]
  ];
  cpu_load: number;
  timers: number;
}

export interface Stats {
  servers_count: number;
  online: number;
  session: number;
  server: ServerInfo;
}

export interface Services {
  redis: boolean;
  database: boolean;
}

export interface Results {
  services: Services;
  stats: Stats;
}

export interface ServerStatus {
  status: string;
  region: string;
  roles: string[];
  results: Results;
  strict: boolean;
  server_issue: string | null;
  version: string;
}
