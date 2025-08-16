import type { ServerStatus } from "../types";

interface FooterProps {
  data: ServerStatus;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <div data-testid="footer" className="mt-6 flex items-center justify-between text-xs text-black/60">
      <div>
        Roles:{" "}
        <span className="font-medium text-black/85">
          {data.roles.join(", ") || "—"}
        </span>
      </div>
      <div>
        Strict mode:{" "}
        <span className="font-medium text-black/85">
          {String(data.strict)}
        </span>
      </div>
    </div>
  );
};

export default Footer;
