import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (account.password !== account.confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    await register({
      name: account.name,
      email: account.email,
      password: account.password,
    });
    setIsSubmitting(false);
    navigate('/dashboard', { replace: true });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setAccount((currentAccount) => ({
      ...currentAccount,
      [name]: value,
    }));
  }

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-register">
        <div className="auth-hero">
          <div>
            <span className="auth-badge">Nova conta</span>
            <h1>Crie sua conta Smart-Money.</h1>
            <p>
              Cadastre-se para começar a organizar suas finanças de um jeito simples.
            </p>
          </div>

          <ul className="auth-simple-list">
            <li>Rendas</li>
            <li>Despesas</li>
            <li>Metas</li>
          </ul>
        </div>

        <div className="auth-panel">
          <p className="auth-eyebrow">Cadastro</p>
          <h2>Criar conta</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Nome</span>
              <div>
                <i className="bi bi-person" />
                <input
                  name="name"
                  type="text"
                  value={account.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>E-mail</span>
              <div>
                <i className="bi bi-envelope" />
                <input
                  name="email"
                  type="email"
                  value={account.email}
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
                  value={account.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Confirmar senha</span>
              <div>
                <i className="bi bi-shield-check" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={account.confirmPassword}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="auth-footer">
            <span>Já tem conta?</span>
            <Link to="/login">Entrar</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
