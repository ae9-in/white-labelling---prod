import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ShopList from './pages/customers/ShopList';
import ShopForm from './pages/customers/ShopForm';
import DeliveryList from './pages/deliveries/DeliveryList';
import DeliveryForm from './pages/deliveries/DeliveryForm';
import ReminderList from './pages/reminders/ReminderList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="customers">
            <Route index element={<ShopList />} />
            <Route path="new" element={<ShopForm />} />
            <Route path=":id/edit" element={<ShopForm />} />
          </Route>
          
          <Route path="deliveries">
            <Route index element={<DeliveryList />} />
            <Route path="new" element={<DeliveryForm />} />
            <Route path=":id/edit" element={<DeliveryForm />} />
          </Route>
          
          <Route path="reminders">
            <Route index element={<ReminderList />} />
          </Route>
          
          <Route path="reports" element={<div className="text-center py-12 text-gray-600">Reports page coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
