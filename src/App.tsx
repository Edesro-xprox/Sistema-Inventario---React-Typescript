import { Routes, Route, Navigate } from 'react-router-dom';
import Content from './pages/Content';
import Products from './pages/ProductPage.tsx';
import LoginPage from './pages/LoginPage';
import 'devextreme/dist/css/dx.light.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="loginPage" />} />
      <Route path="/loginPage" element={<LoginPage />}></Route>
      <Route path="/content" element={<Content />}>
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
