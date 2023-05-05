import { useEffect, useReducer } from 'react'
import { Dispatch, ReactNode, createContext } from 'react';
import { AppStateActions } from '@ui-stores/actions/app.action';
import { appStateReducer } from '@ui-stores/reducers/app.reducer';
import { AppInitStates, IAppStates } from '@ui-stores/states/app.states';

export const AppContext = createContext<{
  state: IAppStates;
  dispatch: Dispatch<AppStateActions>;
}>({ state: AppInitStates, dispatch: () => undefined });


export const AppProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appStateReducer, AppInitStates,
    (initial) => JSON.parse(localStorage.getItem('_app_states')) || initial
  )
  useEffect(() => {
    // update the _app_states data everytime the state is changed
    localStorage.setItem('_app_states', JSON.stringify(state))
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
  )
}
