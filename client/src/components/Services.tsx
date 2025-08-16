import type { ServerStatus } from "../types";
import Badge from "./Badge";

interface ServicesProps {
  data: ServerStatus;
}

const Services = ({ data }: ServicesProps) => {
  const { services } = data.results;

  return (
    <div className="mt-5">
      <div className="mb-2 text-xs uppercase tracking-wide text-black/60">
        Services
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
          className="flex items-center gap-x-1"
          tone={services.redis ? "ok" : "bad"}
        >
          <span className=" size-1.5 rounded-full bg-current opacity-70" />
          <p>Redis: {services.redis ? "up" : "down"}</p>
        </Badge>
        <Badge
          className="flex items-center gap-x-1"
          tone={services.database ? "ok" : "bad"}
        >
          <span className="size-1.5 rounded-full bg-current opacity-70" />
          <p>Database: {services.database ? "up" : "down"}</p>
        </Badge>
      </div>
    </div>
  );
};

export default Services;
