import { createRoot } from "react-dom/client";
import App from "./App";
import "./Styles/index.css";

import { Provider } from "react-redux";
import store from "./Store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
