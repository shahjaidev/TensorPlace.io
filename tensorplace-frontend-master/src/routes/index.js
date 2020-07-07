import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BaseLayout from '../components/Layouts/BaseLayout';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import RouteWrapper from './RoutesWrapper';
import PrivateRoute from "../components/high-order/PrivateRoute";

import Home from '../components/Home';
import SignUp from '../components/Registration/SignUp';
import Login from '../components/Registration/Login';
import ForgotPassword from '../components/Registration/ForgotPassword';
import ProductDetail from '../components/ProductDetail';
import Results from '../components/Results';

import Dashboard from '../components/Dashboard';
import Account from '../components/Dashboard/Account';
import ThankYou from '../components/ThankYou';
import UploadNewRepo from '../components/Dashboard/UploadNewRepo';
import EditProduct from '../components/Dashboard/UploadNewRepo/ProductEdit';
import Checkout from '../components/Checkout';
import PurchasedPlugin from '../components/Dashboard/PurchasePlugin';
import SavedPlugin from '../components/Dashboard/SavedPlugin';
import MyPlugin from '../components/Dashboard/MyPlugin';
import ChangePassword from '../components/Registration/ChangePassword';

export default (
  <>
    <RouteWrapper exact path="/" component={Home} layout={BaseLayout}/>
    <RouteWrapper exact path="/product/:slug" component={ProductDetail} layout={BaseLayout} />
    <RouteWrapper path="/results" component={Results} layout={BaseLayout} />
    <Route exact path="/register" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} layout={DashboardLayout} />
      <PrivateRoute exact path="/account" component={Account} layout={DashboardLayout} />
      <PrivateRoute exact path="/upload-new-product" component={UploadNewRepo} layout={DashboardLayout} />
      <PrivateRoute exact path="/purchased-products" component={PurchasedPlugin} layout={DashboardLayout} />
      <PrivateRoute exact path="/saved-products" component={SavedPlugin} layout={DashboardLayout} />
      <PrivateRoute exact path="/my-products" component={MyPlugin} layout={DashboardLayout} />
      <PrivateRoute exact path="/product/:slug/edit" component={EditProduct} layout={DashboardLayout} />
      <PrivateRoute exact path="/change-password" component={ChangePassword} layout={DashboardLayout} />
      <PrivateRoute exact path="/checkout" component={Checkout} layout={BaseLayout} />
      <PrivateRoute exact path="/thankyou" component={ThankYou} layout={DashboardLayout} />
    </Switch>
  </>
);
