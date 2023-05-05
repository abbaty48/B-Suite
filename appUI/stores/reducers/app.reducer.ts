import { IAppStates } from '@ui-stores/states/app.states';
import { AppStateActions } from '@ui-stores/actions/app.action';

export const appStateReducer = (
  states: IAppStates,
  actions: AppStateActions
): IAppStates => {
  const { type, payload } = actions;

  switch (type) {
   /* SWITCH THENES*/
    case 'SWITCH_THEMES':
      return { ...states, themes: payload };
    default:
      return states;
  }
};
