import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();

  function closeMenu() {
    const menuElement = document.getElementById("menuLateral");
    const offcanvas = window.bootstrap?.Offcanvas?.getInstance(menuElement);

    if (offcanvas) {
      offcanvas.hide();
    }
  }

  return (
    <>
      <button
        className="btn btn-outline-light menu-button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menuLateral"
        aria-label="Abrir menu"
      >
        <i className="bi bi-list" />
      </button>

      <aside
        className="offcanvas offcanvas-start text-bg-dark"
        id="menuLateral"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Smart-Money</h5>
          <button
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="offcanvas-body">
          <p>Menu do Usuário</p>
          <nav className="d-grid gap-2">
            <NavLink className="btn btn-light" to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink className="btn btn-outline-light" to="/rendas" onClick={closeMenu}>
              Rendas
            </NavLink>
            <NavLink className="btn btn-outline-light" to="/despesas" onClick={closeMenu}>
              Despesas
            </NavLink>
            <NavLink className="btn btn-outline-light" to="/metas" onClick={closeMenu}>
              Metas
            </NavLink>
          </nav>
          <div className="sidebar-user mt-4">
            <small className="text-white-50 d-block">Conectado como</small>
            <strong>{user?.name}</strong>
            <button
              className="btn btn-sm btn-outline-light w-100 mt-3"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      <main className="container py-4 text-white">
        <Outlet />
      </main>
    </>
  );
}
