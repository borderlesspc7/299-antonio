import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaBolt, FaMobile } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setIsLoading(true);

    try {
      await login(formData);
      navigate("/menu");
    } catch (err) {
      setError(
        (err as Error).message || "Erro ao fazer login. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-shape shape-1"></div>
        <div className="login-shape shape-2"></div>
        <div className="login-shape shape-3"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <FaBolt />
            </div>
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">
              Acesse sua conta para gerenciar seus carregadores
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkbox-label">Lembrar-me</span>
              </label>
              <Link to="/recuperar-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
              leftIcon={!isLoading && <FaBolt />}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="login-divider">
              <span>ou</span>
            </div>

            <div className="login-footer">
              <p>
                Ainda não tem uma conta?{" "}
                <Link to="/register" className="register-link">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="login-features">
          <div className="feature-item">
            <div className="feature-icon">
              <FaBolt />
            </div>
            <h3>Carregamento Rápido</h3>
            <p>Carregadores de alta velocidade disponíveis 24/7</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <FaLock />
            </div>
            <h3>Seguro e Confiável</h3>
            <p>Sistema de caução automática via cartão de crédito</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <FaMobile />
            </div>
            <h3>Fácil de Usar</h3>
            <p>Retire, use e devolva com apenas alguns cliques</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
