import RackReadout from "./RackReadout";

function AuthLayout({ children }) {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="auth__brand-inner">
          <h1 className="auth__logo">ServerHub</h1>
          <p className="auth__tagline">
            Un panel para todos tus VPS. Monitorea CPU, RAM y disco en tiempo
            real.
          </p>
          <RackReadout />
        </div>
      </aside>

      <main className="auth__panel">
        <div className="auth__card">{children}</div>
      </main>
    </div>
  );
}

export default AuthLayout;