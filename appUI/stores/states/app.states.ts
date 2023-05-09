import initialStates from '@/config/initialStates.json';

/**
 * IAppStates
 * Represent the states properties
 */
export interface IAppStates {
  appName: string;
  themes: 'System' | 'Viva Light' | 'Viva Dark';
  appStates: { isTop: boolean; minimized: boolean; maximized: boolean };
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
