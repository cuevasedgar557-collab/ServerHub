function StatusDot({ active }) {
  return <span className={`sh-dot ${active ? "sh-dot--on" : ""}`.trim()} />;
}

export default StatusDot;