function Skeleton({ className = "", style }) {
  return <div className={`sh-skeleton ${className}`.trim()} style={style} />;
}

export default Skeleton;