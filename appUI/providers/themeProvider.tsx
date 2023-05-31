import React, { useContext } from 'react'
import { ConfigProvider, Space, theme } from 'antd'
import { AliasToken } from 'antd/es/theme/internal'
import { AppContext } from '@ui-stores/contexts/app'
// THEMES
import Nord from '@ui-assets/styles/themes/nord.json'
import Lither from '@ui-assets/styles/themes/lither.json'
import GrayHunt from '@ui-assets/styles/themes/grayhunt.json'
import VivaDark from '@ui-assets/styles/themes/vivaDark.json'
import VivaLight from '@ui-assets/styles/themes/vivaLight.json'

export const ThemeProvider = (props: { children: React.ReactNode }) => {

   const { state } = useContext(AppContext)

   /**
    * Determine the themes to switch to and return the token
    */
   const themeToken = (): Partial<AliasToken> => {

      let token = (): Partial<AliasToken> => {

         switch (state.appStates.preference.themes) {
            case 'Nord': return Nord.token;
            case 'Lither': return Lither.token
            case 'GrayHunt': return GrayHunt.token;
            case 'Viva Dark': return VivaDark.token;
            case 'Viva Light': return VivaLight.token;
            case 'Auto': return matchMedia('(prefers-color-scheme: light)').matches ? VivaLight.token : VivaDark.token;
            default: return VivaLight.token;
         }
      }
      // Change the body backgroudColor everytime a theme is changed
      document.querySelector('body').style.backgroundColor = token().colorBgLayout;

      return token();
   }

   const customEmpty = () => (
      <div style={{ textAlign: 'center' }}>
         <Space direction='vertical'>
            <i className='--icon --icon-emo-unhappy text-lg my-2'></i>
            <p>No Data</p>
         </Space>
      </div>
   )

   return (
      <ConfigProvider renderEmpty={customEmpty} theme={{
         token: themeToken(),
         algorithm: [
            theme.compactAlgorithm,
            state.appStates.preference.themeMode === 'Dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
         ]
      }}>
         {props.children}
      </ConfigProvider>
   )
}
