import initialStates from '@/config/initialStates.json';

/**
 * IAppStates
 * Represent the states properties
 */
export interface IAppStates {
  appName: string;
  appStates: {
    isTop: boolean;
    minimized: boolean;
    maximized: boolean;
    appLocker: {
      allowLockScreenSaver: false;
      lockScreenTimeOut: number; // default to 30 Minute
      lockScreenSaverTimeOut: number; // default to 2 Minute
      lockScreenState: 'unlocked' | 'locked';
      lockScreenSaverState: 'hide' | 'show' | 'showing' | 'hiding';
    };
    preference: {
      generalFontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
      generalIconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
      IconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
      FontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xlg';
      themes:
        | 'Auto'
        | 'Viva Light'
        | 'Viva Dark'
        | 'Nord'
        | 'Lither'
        | 'GrayHunt';
      themeMode: 'Dark' | 'Light';
      font: 'Exo' | 'Saira' | 'Roboto';
    };
  };
}
/**
 * AppInitStates
 * represent the initial application states, this first get the _app_state stored in localStorage and parse it into IAppStates,
 * else if _app_states not found, then it usee the initial states from the initialStates.json
 */
export const AppInitStates: IAppStates = {
  ...((JSON.parse(localStorage.getItem('_app_states')) as IAppStates) || {
    ...(initialStates as IAppStates),
  }),
};
