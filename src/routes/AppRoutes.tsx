import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Layout from "../components/Layout/Layout";

export const AppRoutes = () => {
  const Dashboard = () => {
    return (
      <Layout>
        <div>Dashboard</div>
      </Layout>
    );
  };

  const Carregadores = () => {
    return (
      <Layout>
        <div>Carregadores</div>
      </Layout>
    );
  };

  const Caucao = () => {
    return (
      <Layout>
        <div>Caucao</div>
      </Layout>
    );
  };

  const Carregamento = () => {
    return (
      <Layout>
        <div>Carregamento</div>
      </Layout>
    );
  };

  const Devolucao = () => {
    return (
      <Layout>
        <div>Devolucao</div>
      </Layout>
    );
  };

  const Historico = () => {
    return (
      <Layout>
        <div>Historico</div>
      </Layout>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<Dashboard />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
        <Route
          path={paths.dashboard}
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path={paths.carregadores}
          element={
            <ProtectedRoutes>
              <Carregadores />
            </ProtectedRoutes>
          }
        />
        <Route
          path={paths.caucao}
          element={
            <ProtectedRoutes>
              <Caucao />
            </ProtectedRoutes>
          }
        />
        <Route
          path={paths.carregamento}
          element={
            <ProtectedRoutes>
              <Carregamento />
            </ProtectedRoutes>
          }
        />
        <Route
          path={paths.devolucao}
          element={
            <ProtectedRoutes>
              <Devolucao />
            </ProtectedRoutes>
          }
        />
        <Route
          path={paths.historico}
          element={
            <ProtectedRoutes>
              <Historico />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
