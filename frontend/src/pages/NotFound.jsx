import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Esta página no existe</h1>
      <p className="not-found__sub">
        Revisa el enlace o volvé al panel principal.
      </p>
      <Link to="/dashboard" className="sh-btn sh-btn--primary">
        Volver al dashboard
      </Link>
    </div>
  );
}

export default NotFound;