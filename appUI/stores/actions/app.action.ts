export type AppStateActions =
  | {
      type: 'SWITCH_THEMES';
      payload: 'System' | 'Viva Light' | 'Viva Dark';
    }
  | {
      type: 'SET_WINDOW_ONTOP';
      payload: boolean;
    }
  | {
      type: 'SET_WINDOW_MAXIMIZE_OR_RESTORE';
      payload: boolean;
    }
  | {
      type: 'SET_WINDOW_MINIMIZE';
      payload: boolean;
    };
