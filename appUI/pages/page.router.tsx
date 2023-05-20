import SalePage from '@ui-pages/page.sales'
import StaffPage from '@ui-pages/page.staffs'
import { MainPage } from '@ui-pages/page.main'
import SupplyPage from '@ui-pages/page.supplies'
import SettingPage from '@ui-pages/page.setting'
import ProductPage from '@ui-pages/page.products'
import CustomerPage from '@ui-pages/page.customers'
import DashboardPage from '@ui-pages/page.dashboard'
import WarehousePage from '@ui-pages/page.warehouses'

import { useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppContext } from '@ui-stores/contexts/app'

export function AppRouter() {

  const location = useLocation()
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_ROUTE', payload: location.pathname })
  }, [location])

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/products' element={<ProductPage />} />
      <Route path='/customers' element={<CustomerPage />} />
      <Route path='/sales' element={<SalePage />} />
      <Route path='/supplies' element={<SupplyPage />} />
      <Route path='/warehouses' element={<WarehousePage />} />
      <Route path='/staffs' element={<StaffPage />} />
      <Route path='/settings' element={<SettingPage />} />
      <Route element={<MainPage />} />
    </Routes>
  )
}
