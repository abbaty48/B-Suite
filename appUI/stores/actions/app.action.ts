export type AppStateActions =
  | {
      type: 'SWITCH_THEMES';
      payload: string;
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
    }
  | {
      type: 'SET_LOCKSCREEN';
      payload: 'locked' | 'unlocked';
    }
  | {
      type: 'SET_LOCKSCREENSAVER';
      payload: 'hide' | 'show' | 'showing' | 'hiding';
    }
  | {
      type: 'SET_LOCKSCREENTIMEOUT';
      payload: number;
    }
  | {
      type: 'SET_LOCKSCREENSAVERTIMEOUT';
      payload: number;
    }
  | {
      type: 'SET_PREFERENCE';
      payload: { key: string; value: any };
    }
  | {
      type: 'SET_APPSTATE';
      payload: { key: string; value: any };
    }
  | {
      type: 'SET_THEMEMODE';
      payload: 'Dark' | 'Light';
    };
