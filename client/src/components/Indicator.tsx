interface IndicatorProps {
  ok: boolean;
  title?: string;
}

const Indicator = ({ ok, title }: IndicatorProps) => (
  <span
    title={title}
    className={`size-2.5 rounded-full ${
      ok ? "bg-emerald-500" : "bg-rose-500"
    }`}
  />
);

export default Indicator;
