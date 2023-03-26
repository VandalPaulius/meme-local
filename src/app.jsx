import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

const test = {
  la: "la",
        la: "la2",
};

const root = ReactDOMClient.createRoot(document.body);
root.render(<h2>Hello from React!</h2>);
