import React from 'react'
import { App } from 'antd'
import { RecoilRoot } from 'recoil'

const Application = () => {
   return (
      <RecoilRoot>
         <App>
            <h1>React Electron</h1>
         </App>
      </RecoilRoot>
   )
}

export default Application