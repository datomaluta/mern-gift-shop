import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
          <Toaster position="bottom-right" />
        </StrictMode>
      </BrowserRouter>{" "}
    </Provider>
  </PersistGate>
);
