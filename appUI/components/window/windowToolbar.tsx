import { useContext } from "react";
import { AppContext } from "@/appUI/stores/contexts/app";

export default function WindowToolbar() {
  const { state, dispatch } = useContext(AppContext)

  const _buttonClass =
    `text-gray-500 min-h-[16px] min-w-[16px] max-h-[50px] max-w-[50px] w-12 h-12 
      bg-transparent p-2 text-center appearance-none hover:animate-fadeOut hover:text-xs`;

  // send a close command to the electron main process, to close the entire program
  const close = () => {
    //TIPS: we could determine if any process ongoing, then alert the user before closing the app
    Renderer.closeApp()
  };

  const minimize = async () => {
    const isMinimize = await Renderer.minimizeApp()
    dispatch({ type: 'SET_WINDOW_MINIMIZE', payload: isMinimize })
  }

  const onTop = async () => {
    const _isTop = await Renderer.onTop(state.appStates.isTop)
    dispatch({ type: 'SET_WINDOW_ONTOP', payload: _isTop })
  };

  const maximizeOrRestore = async () => {
    const _isRestored = await Renderer.maximizeOrRestore(state.appStates.maximized)
    dispatch({ type: 'SET_WINDOW_MAXIMIZE_OR_RESTORE', payload: _isRestored })
  };

  return (
    <header className={"m-o p-o min-h-[20px] text-sm"}>
      <div className={"flex justify-between items-center flex-row p-1"}>
        {/* APP TITLE */}
        <div className={"dragable flex-1 text-xl text-toolbar"}>
          <span>
            {/* <img src={''} /> */}
          </span>
          <span className="">{state.appName}</span>
        </div>
        <div className={'flex flex-row items-center'}>
          {/* USER ACCOUNT */}
          { }
          {/* APP CONTROLS */}
          <div className={"flex flex-row justify-around text-14 text-toolbar"}>
            <button
              title={state.appStates.isTop ? "unTopped" : "Always on Top"}
              className={_buttonClass}
              onClick={onTop}
            >
              <span
                className={state.appStates.isTop ? "icon icon-untop" : "icon icon-top"}
              ></span>
            </button>
            <button
              title="minimize"
              className={_buttonClass}
              onClick={minimize}
            >
              <span className={"icon icon-minimize"}></span>
            </button>
            <button
              title={state.appStates.maximized ? "restore" : "maximize"}
              className={_buttonClass}
              onClick={maximizeOrRestore}
            >
              <span
                className={
                  state.appStates.maximized ? "icon icon-restore" : "icon icon-miximize"
                }
              ></span>
            </button>
            <button title="close" className={_buttonClass} onClick={close}>
              <span className={"icon icon-close"}></span>
            </button>
          </div>
        </div>
      </div>
    </header >
  );
}
