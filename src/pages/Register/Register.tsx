import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../../components/ui/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import "./Register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    // Validação de nome
    if (!formData.name.trim()) {
      setError("Por favor, insira seu nome completo.");
      return false;
    }

    if (formData.name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres.");
      return false;
    }

    // Validação de email
    if (!formData.email) {
      setError("Por favor, insira seu email.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Por favor, insira um email válido.");
      return false;
    }

    // Validação de telefone
    if (!formData.phone) {
      setError("Por favor, insira seu telefone.");
      return false;
    }

    if (
      !/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}-?[0-9]{4}$/.test(
        formData.phone.replace(/\s/g, "")
      )
    ) {
      setError("Por favor, insira um telefone válido.");
      return false;
    }

    // Validação de senha
    if (!formData.password) {
      setError("Por favor, insira uma senha.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    // Validação de confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return false;
    }

    // Validação de termos
    if (!acceptTerms) {
      setError("Você deve aceitar os termos e condições.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(
        (err as Error).message || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-shape shape-1"></div>
        <div className="register-shape shape-2"></div>
        <div className="register-shape shape-3"></div>
      </div>

      <div className="register-content">
        <div className="register-info">
          <div className="register-info-header">
            <div className="register-info-icon">
              <FaBolt />
            </div>
            <h2>Sistema de Carregadores</h2>
            <p>Carregue seus dispositivos com facilidade e segurança</p>
          </div>

          <div className="register-benefits">
            <div className="benefit-item">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Acesso 24/7</h4>
                <p>Carregadores disponíveis a qualquer hora</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Pagamento Seguro</h4>
                <p>Caução automática via cartão de crédito</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Múltiplos Locais</h4>
                <p>Totens espalhados por toda a cidade</p>
              </div>
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="benefit-icon" />
              <div>
                <h4>Carregamento Rápido</h4>
                <p>Tecnologia de última geração</p>
              </div>
            </div>
          </div>
        </div>

        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Criar Conta</h1>
            <p className="register-subtitle">
              Preencha seus dados para começar
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {error && (
              <div className="register-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nome Completo
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaUser />
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="form-label">
                Telefone
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <FaPhone />
                </span>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="(11) 98765-4321"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-row">
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
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Senha
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <FaLock />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="terms-container">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkbox-label">
                  Eu aceito os{" "}
                  <Link to="/termos" className="terms-link">
                    termos e condições
                  </Link>{" "}
                  e a{" "}
                  <Link to="/privacidade" className="terms-link">
                    política de privacidade
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              isLoading={isLoading}
              leftIcon={!isLoading && <FaBolt />}
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>

            <div className="register-footer">
              <p>
                Já tem uma conta?{" "}
                <Link to="/login" className="login-link">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
