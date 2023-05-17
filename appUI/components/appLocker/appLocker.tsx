import React, { ReactNode, useContext, useEffect, useState } from "react";
import { IIdleTimer, IdleTimerProvider } from "react-idle-timer";
import { Particle } from "@ui-components/particle/particle";
import { AppContext } from "@/appUI/stores/contexts/app";
import { LoginForm } from "@/appUI/pages/auth/login";

interface ILockSaverProps {
   backgroundImage?: string;
   backgroundColor?: string;
}
interface ILockScreenProp {
   backgroundImage?: string;
   backgroundColor?: string;
}
/*
 *
 *
 *
 */
const LockSaver = (props: ILockSaverProps) => {
   const _date = new Date();
   const { state: { appStates: { appLocker } }, dispatch } = useContext(AppContext)

   const [datetime, setDateTime] = useState({
      hour: _date.getHours(),
      minute: _date.getMinutes(),
      seconds: _date.getSeconds(),
      date: _date.getDate(),
   });

   useEffect(() => {
      window.addEventListener("keypress", onKeyPress);
      setInterval(() => {
         setDateTime({
            hour: _date.getHours(),
            minute: _date.getMinutes(),
            seconds: _date.getSeconds(),
            date: _date.getDate(),
         });
      }, appLocker.lockScreenSaverTimeOut);
   }, [datetime, setDateTime]);

   const onKeyPress = (event: Event) => {
      // remove the locksaver
      dispatch({ type: 'SET_LOCKSCREENSAVER', payload: 'hiding' })
   };

   return (
      <div
         className={`app-locksaver absolute top-0 right-0 bottom-0 left-0 z-[9999] h-screen 
            ${appLocker.lockScreenSaverState === "hiding"
               ? " animate-slideOutUp"
               : " animate-slideInDown"
            }`}
      >
         <div
            className={
               "flex flex-col justify-start items-center font-saira  h-screen p-10 text-[#434343]"
            }
         >
            <p className={"text-[200px] text-opacity-70"}>
               {datetime.hour}:{datetime.minute}
            </p>
            <div className={"absolute top-2/4 font-saira font-extrabold"}>
               <p className={"space-y-9 text-center font-light"}>
                  <span
                     className={
                        "mms mms-lock-open-thin block mb-5 text-5xl animate-bounce text-[100px]"
                     }
                  ></span>
                  <span>press any key to unlock screen</span>
               </p>
            </div>
         </div>
      </div>
   );
};
/*
 *
 *
 *
 */
const LockScreen = (props: ILockScreenProp) => {

   // HOOKS
   const { dispatch } = useContext(AppContext) // global context 

   useEffect(() => {
      dispatch({ 'type': 'SET_LOCKSCREEN', payload: 'locked' });
      dispatch({ 'type': 'SET_LOCKSCREENSAVER', payload: 'hide' })
   }, []);

   const randomPosition = () => {
      const _positions = [
         { top: '10%', left: '10%' }, // top-left
         { top: '10%', right: '10%' },// top-right
         { bottom: '10%', left: '10%' }, // bottom-left
         { bottom: '10%', right: '10%' }, // bottom-right
         { margin: 'auto', left: 0, right: 0, top: '50%', bottom: '50%' } // centered
      ]

      return _positions[Math.floor(Math.random() * _positions.length)]
   }

   return (
      <div
         className={
            "app-lockscreen absolute top-0 left-0 right-0 bottom-0 z-[9998] h-screen animate-fadeOut"
         }
      >
         <Particle>
            <div
               className={
                  "--app-login-screen flex h-screen w-full relative"
               }
            >
               <div className={'p-[1%] w-[420px] animate-pulse'} style={{ position: 'absolute', ...randomPosition() }}>
                  <LoginForm />
               </div>
            </div>
         </Particle>
      </div>
   );
};
/*
 *
 *
 *
 */
const AppLocker: React.FC<{ children: ReactNode }> = (props: { children: ReactNode }) => {

   const { state: { appStates: { appLocker } }, dispatch } = useContext(AppContext)
   const onlockScreen = (event?: Event, idleTimer?: IIdleTimer) => {
      if (appLocker.lockScreenState !== 'locked') {
         dispatch({ type: 'SET_LOCKSCREEN', payload: 'locked' })
      } else {
         // set timeout for screensaver
         setTimeout(() => {
            dispatch({ type: 'SET_LOCKSCREENSAVER', payload: 'show' })
         }, appLocker.lockScreenSaverTimeOut);
      }
   };
   return (
      <IdleTimerProvider
         onIdle={onlockScreen}
         timeout={appLocker.lockScreenTimeOut}
         startOnMount={true} // chnage this to true/remove it
      >
         {appLocker.allowLockScreenSaver &&
            appLocker.lockScreenState === "locked" &&
            appLocker.lockScreenSaverState === 'show' && (
               <LockSaver />
            )}
         {appLocker.lockScreenState === 'locked' && (
            <LockScreen />
         )}
         {appLocker.lockScreenState === 'unlocked' && props.children}
      </IdleTimerProvider>
   );
};

export default AppLocker;
