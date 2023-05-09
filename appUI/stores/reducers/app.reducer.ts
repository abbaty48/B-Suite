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
      return { ...states, themes: payload };
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
    default:
      return states;
  }
};
