import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="login-page text-white">
      <section className="login-panel custom-card text-center">
        <p className="section-kicker mb-2">Erro 404</p>
        <h1 className="fw-bold">Página não encontrada</h1>
        <p className="text-white-50">
          A rota acessada não existe no frontend da aplicação.
        </p>
        <Link className="btn btn-gray px-4 fw-bold rounded-pill" to="/">
          Voltar para o início
        </Link>
      </section>
    </main>
  );
}
