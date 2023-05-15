import { IAppStates } from '@ui-stores/states/app.states';
import { AppStateActions } from '@ui-stores/actions/app.action';

export const appStateReducer = (
  states: IAppStates,
  actions: AppStateActions
): IAppStates => {
  const { type, payload } = actions;

  switch (type) {
    // SWITCH THENES
    case 'SWITCH_THEMES':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          preference: { ...states.appStates.preference, themes: payload },
        },
      };
    // SET_WINDOW_ONTOP
    case 'SET_WINDOW_ONTOP':
      return { ...states, appStates: { ...states.appStates, isTop: payload } };
    // SET_WINDOW_MAXIMIZE_OR_RESTORE
    case 'SET_WINDOW_MAXIMIZE_OR_RESTORE':
      return {
        ...states,
        appStates: { ...states.appStates, maximized: payload },
      };
    // SET_WINDOW_MINIMIZE
    case 'SET_WINDOW_MINIMIZE':
      return {
        ...states,
        appStates: { ...states.appStates, minimized: payload },
      };
    // SET LOCKSCREEN
    case 'SET_LOCKSCREEN':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          appLocker: {
            ...states.appStates.appLocker,
            lockScreenState: payload,
          },
        },
      };
    // SET LOCKSCREENSAVER STATE
    case 'SET_LOCKSCREENSAVER':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          appLocker: {
            ...states.appStates.appLocker,
            lockScreenSaverState: payload,
          },
        },
      };
    // SET LOCKSCREENSAVER STATE
    case 'SET_LOCKSCREENTIMEOUT':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          appLocker: {
            ...states.appStates.appLocker,
            lockScreenTimeOut: payload,
          },
        },
      };
    // SET LOCKSCREENSAVER STATE
    case 'SET_LOCKSCREENSAVERTIMEOUT':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          appLocker: {
            ...states.appStates.appLocker,
            lockScreenSaverTimeOut: payload,
          },
        },
      };
    // SET PREFERENCES
    case 'SET_PREFERENCE':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          preference: {
            ...states.appStates.preference,
            [payload.key]: payload.value,
          },
        },
      };
    // SET APPSTATES:
    case 'SET_APPSTATE':
      return {
        ...states,
        appStates: {
          ...states.appStates,
          [payload.key]: payload.value,
        },
      };
    default:
      return states;
  }
};
