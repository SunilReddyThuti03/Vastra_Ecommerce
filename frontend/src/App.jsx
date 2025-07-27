import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';

import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetails from './components/Cart/OrderDetails';
import MyorderPage from './pages/MyorderPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductsManagement from './components/Admin/ProductsManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagementPage from './components/Admin/OrderManagementPage';
import ProtectedRoutes from './components/Common/ProtectedRoutes';
import ScrollToTop from './components/Common/ScrollToTop';

import store from './Redux/store';


function App() {

  return (
    <Provider store ={store}>
      <BrowserRouter future= {{v7_startTransition: true, v7_relativeSplatPath : true}}>
      <Toaster position='top-right'/>
      <ScrollToTop/>
        <Routes>
          {/* User layout */}
          <Route path="/" element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="collections/:collections" element={<CollectionPage/>} />
            <Route path="product/:id" element={<ProductDetails/>} />
            <Route path="checkout" element={<Checkout/>} />
            <Route path="order-conformation" element={<OrderConfirmation/>} />
            <Route path="order/:id" element={<OrderDetails/>} />
            <Route path="my-orders" element={<MyorderPage/>} />


          </Route>
          {/* Admin Layout */}
          <Route path="/admin" element={<ProtectedRoutes role="admin"> <AdminLayout/> </ProtectedRoutes>}>
            <Route index element={<AdminHomePage/>}/>
            <Route path="users" element={<UserManagement/>}/>
            <Route path="products" element={<ProductsManagement/>} />
            <Route  path="products/:id/edit" element={ <EditProductPage/>} />
            <Route path="orders" element={<OrderManagementPage/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
};

export default App;
