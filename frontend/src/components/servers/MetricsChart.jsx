const WIDTH = 300;
const HEIGHT = 64;
const MAX = 100;

function buildPaths(values) {
  const points = values.map((v, i) => {
    const x = values.length > 1 ? (i * WIDTH) / (values.length - 1) : 0;
    const y = HEIGHT - (Math.min(MAX, Math.max(0, v)) / MAX) * HEIGHT;
    return [x, y];
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");

  const area = points.length
    ? `${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`
    : "";

  return { line, area };
}

function MetricsChart({ label, values, current, unit = "%" }) {
  const { line, area } = buildPaths(values);

  return (
    <div className="metric-chart">
      <div className="metric-chart__head">
        <span className="metric-chart__label">{label}</span>
        {typeof current === "number" && !Number.isNaN(current) && (
          <span className="metric-chart__current">
            {current.toFixed(0)}
            {unit}
          </span>
        )}
      </div>

      {values.length > 1 ? (
        <svg
          className="metric-chart__svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path d={area} className="metric-chart__area" />
          <path d={line} className="metric-chart__line" />
        </svg>
      ) : (
        <p className="metric-chart__empty">
          Aún no hay suficientes datos históricos.
        </p>
      )}
    </div>
  );
}

export default MetricsChart;