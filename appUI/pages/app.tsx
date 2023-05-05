import { App } from 'antd'
import { AppProvider } from '@ui-stores/contexts/app'

const Application = () => {
   return (
      // Antd global component for general antd component configuration
      <App className={'bg-white'}>
         {/* AppProvider for global configurations and states */}
         <AppProvider>
         </AppProvider>
      </App>
   )
}

export default Application