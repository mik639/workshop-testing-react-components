import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

let appReady = Promise.resolve();

// Enable API mocking only in development
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks");
  appReady = worker.start({
    serviceWorker: {
      /**
       * Use a custom Service Worker script URL to resolve
       * the mock worker served by Codesandbox.
       * @note You MAY NOT need this in your application.
       * @see https://mswjs.io/docs/api/setup-worker/start#serviceworker
       */
      url: "/mockServiceWorker.js"
    }
  });
}

/**
 * Use deferred application mounting in order to work in a sandbox.
 * You may not need this in your application.
 * @see https://mswjs.io/docs/recipes/deferred-mounting
 */
appReady.then(() => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
});
