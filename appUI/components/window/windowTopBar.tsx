import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Popover, Space } from "antd";
import { AppContext } from "@/appUI/stores/contexts/app";
import { currentUser, getStaffIcon } from "@/appUI/commons/helpers";

export default function WinowTopBar() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(AppContext)

  const _buttonClass = '--window-topbar-button space-x-4 bg-transparent p-1 text-center appearance-none hover:animate-fadeOut hover:text-xs';

  // send a close command to the electron main process, to close the entire program
  const close = () => {
    //TIPS: we could determine if any process ongoing, then alert the user before closing the app
    Renderer.closeApp()
  };

  const minimize = async () => {
    const isMinimize = await Renderer.minimizeApp()
    dispatch({ type: 'SET_WINDOW_MINIMIZE', payload: isMinimize })
  }

  /*  const onTop = async () => {
     const _isTop = await Renderer.onTop(state.appStates.isTop)
     dispatch({ type: 'SET_WINDOW_ONTOP', payload: _isTop })
   }; */

  const maximizeOrRestore = async () => {
    const _isRestored = await Renderer.maximizeOrRestore(state.appStates.maximized)
    dispatch({ type: 'SET_WINDOW_MAXIMIZE_OR_RESTORE', payload: _isRestored })
  };

  return (
    <header className={"--window-topbar m-o p-o min-h-[20px]"}>
      <div className={"flex justify-between items-center flex-row"}>
        {/* APP TITLE */}
        <div className={"--window-topbar-dragable flex-1"} onClick={maximizeOrRestore}>
          <span className={'--window-topbar-icon'}>
            <i className={'--icon --icon-macstore text-xl'}></i>
          </span>
          <span className="--window-topbar-title m-1">{state.appName}</span>
        </div>
        <div className={'flex flex-row items-center'}>
          {/* USER ACCOUNT */}
          <Space direction="horizontal">
            {
              /* HOME */
              state.appCurrentRoute !== '/' && (
                <Button type="text" icon={<i className={'--icon --icon-home'}></i>} title="Main" onClick={() => navigate('/')} />
              )
            }
            {
              /* SETTINGS */
              state.appCurrentRoute !== '/settings' && (
                <Button type="text" icon={<i className={'--icon --icon-cog'} ></i>} title="Settings" onClick={() => navigate('/settings')} />
              )
            }
            {/* LOCK BUTTON */}
            <Button type="text" icon={<i className={'--icon --icon-lock'}></i>} title="Lock App" onClick={() => dispatch({ type: 'SET_LOCKSCREEN', payload: 'locked' })} />
            {/* USER PROFILE */}
            <Popover placement="bottomLeft" content={
              <Space direction="horizontal" wrap>
                <Avatar icon={currentUser?.password ?
                  (<img src={currentUser?.picture?.url} />) :
                  (<i className={`--icon ${getStaffIcon(currentUser?.role)}`}></i>)
                }
                />
                <h5>{currentUser?.firstName} {currentUser?.lastName}</h5>
              </Space>
            }>
              <Button type="text" size={'small'} icon={<i className={'--icon --icon-user'}></i>} />
            </Popover>
          </Space>
          {/* APP CONTROLS */}
          <div className={"flex flex-row justify-around"}>
            <button
              title="minimize"
              className={_buttonClass}
              onClick={minimize}
            >
              <span className={"--icon --icon-minimize"}></span>
            </button>
            <button
              title={state.appStates.maximized ? "Restore" : "Maximize"}
              className={_buttonClass}
              onClick={maximizeOrRestore}
            >
              <span
                className={
                  state.appStates.maximized ? "--icon --icon-restore-small" : "--icon --icon-maximize-full-"
                }
              ></span>
            </button>
            <button title="close" className={_buttonClass} onClick={close}>
              <span className={"--icon --icon-close"}></span>
            </button>
          </div>
        </div>
      </div>
    </header >
  );
}