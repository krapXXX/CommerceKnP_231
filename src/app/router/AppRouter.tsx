import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../../pages/home/Home';
import Back from '../../pages/back/Back';
import Layout from '../../features/layout/Layout';
import Privacy from '../../pages/privacy/Privacy';
import Section from '../../pages/section/Section';
import Product from '../../pages/product/Product';
import Auth from '../../pages/auth/Auth';
import Cart from "../../pages/cart/Cart";
import NotFound from "../../pages/notfound/NotFound";
import Search from "../../pages/search/Search";
import BackNotFound from "../../pages/back/BackNotFound";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="back" element={<Back />} />
                     <Route path="back/*" element={<BackNotFound />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="product/:slug" element={<Product />} />
                    <Route path="search/:slug" element={<Search />} />
                    <Route path="section/:slug" element={<Section />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
