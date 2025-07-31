import { Route, Routes } from "react-router";
import "./scss/app.scss";
import Home from "./pages/home";
import Cart from "./pages/Cart";
import FlowerPage from "./pages/FlowerPage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
export const App = () => {
	return (
		<>
		<Routes>

				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route path="shop/cart" element={<Cart />} />
					<Route path="plant/:id" element={<FlowerPage/>}/>
					<Route path="*" element={<NotFound />} />
				</Route>
		</Routes>
		</>
	);
};
