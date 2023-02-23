import { createRoot } from 'react-dom/client'
import Application from './pages/app'
import './assets/index.css'
import React from 'react'

createRoot(document.getElementById('root')!).render(<Application />)