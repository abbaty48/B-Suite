import SalePage from '@ui-pages/page.sales'
import StaffPage from '@ui-pages/page.staffs'
import SupplyPage from '@ui-pages/page.supplies'
import SettingPage from '@ui-pages/page.setting'
import ProductPage from '@ui-pages/page.products'
import CustomerPage from '@ui-pages/page.customers'
import DashboardPage from '@ui-pages/page.dashboard'
import WarehousePage from '@ui-pages/page.warehouses'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='#' element={<DashboardPage />} />
        <Route path='#products' element={<ProductPage />} />
        <Route path='#customers' element={<CustomerPage />} />
        <Route path='#sales' element={<SalePage />} />
        <Route path='#supplies' element={<SupplyPage />} />
        <Route path='#warehouses' element={<WarehousePage />} />
        <Route path='#staffs' element={<StaffPage />} />
        <Route path='#settings' element={<SettingPage />} />
        <Route element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}
