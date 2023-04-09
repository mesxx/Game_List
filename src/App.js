import { Routes, Route } from "react-router-dom";

import NotFound from "./components/404";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Table from "./components/Table";
import Form from "./components/Form";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/game-list"
          element={
            <Layout>
              <Table />
            </Layout>
          }
        />
        <Route
          path="/game-detail/:IdData"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/game-add"
          element={
            <Layout>
              <Form />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
