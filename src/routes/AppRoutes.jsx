import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import ProductDetails from 'pages/ProductDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
