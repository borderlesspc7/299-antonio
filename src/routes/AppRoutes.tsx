import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./paths";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import TotemDetails from "../pages/TotemDetails/TotemDetails";

export const AppRoutes = () => {
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
        <Route
          path={paths.home}
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
        <Route
          path={paths.dashboard}
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/totem/:totemId"
          element={
            <Layout>
              <TotemDetails />
            </Layout>
          }
        />
        <Route path={paths.caucao} element={<Caucao />} />
        <Route path={paths.carregamento} element={<Carregamento />} />
        <Route path={paths.devolucao} element={<Devolucao />} />
        <Route path={paths.historico} element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
};
