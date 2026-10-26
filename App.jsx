import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Summarize from "./pages/Summarize";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <Sidebar />

      <div className="content">

        <Routes>

          <Route
            path="/"
            element={<Summarize />}
          />

          <Route
            path="/summarize"
            element={<Summarize />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;