import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: 'joao@smartmoney.com',
    password: '123456',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await login(credentials);
    setIsSubmitting(false);
    navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }));
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-hero">
          <div>
            <span className="auth-badge">Smart-Money</span>
            <h1>Seu dinheiro em ordem.</h1>
            <p>
              Acesse sua conta para ver o saldo, suas rendas, despesas e metas do mês.
            </p>
          </div>

          <ul className="auth-simple-list">
            <li>Controle rápido</li>
            <li>Visual simples</li>
            <li>Pronto para API</li>
          </ul>
        </div>

        <div className="auth-panel">
          <p className="auth-eyebrow">Login</p>
          <h2>Bem-vindo(a) de volta</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>E-mail</span>
              <div>
                <i className="bi bi-envelope" />
                <input
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Senha</span>
              <div>
                <i className="bi bi-lock" />
                <input
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <button className="auth-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            <Link to="/register">Criar uma conta</Link>
            <button type="button">Esqueci minha senha</button>
          </div>
        </div>
      </section>
    </main>
  );
}
