import React, { useContext } from 'react'
import { ConfigProvider, theme } from 'antd'
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
            case 'Auto': return matchMedia('(prefers-color-schema: light)').matches ? VivaLight.token : VivaDark.token;
            default: return VivaLight.token;
         }
      }
      // Change the body backgroudColor everytime a theme is changed
      document.querySelector('body').style.color = token().colorTextBase;
      document.querySelector('body').style.backgroundColor = token().colorBgLayout;

      return token();
   }

   return (
      <ConfigProvider theme={{
         token: themeToken(),
         algorithm: [
            state.appStates.preference.themeMode === 'Dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
         ]
      }}>
         {props.children}
      </ConfigProvider>
   )
}
