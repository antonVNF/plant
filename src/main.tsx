import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
const rootElem = document.getElementById("root")


if(rootElem) {

createRoot(rootElem).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
);
}
