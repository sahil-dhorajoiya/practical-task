import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setupMirage } from "./services/mirage";
import App from "./App";
import "./styles/index.css";

if (import.meta.env.DEV) {
  setupMirage();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
