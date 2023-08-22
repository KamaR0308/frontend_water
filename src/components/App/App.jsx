import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import Routing from "../Routing/Routing";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback="loading...">
          <Routing />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
