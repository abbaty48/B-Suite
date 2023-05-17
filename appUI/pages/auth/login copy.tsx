import TextInput, { TextInputButtonTypes } from "@/appUI/components/textInput/TextInput";
import { AppContext } from "@/appUI/stores/contexts/app";
import { useContext, useReducer, useRef } from "react";
import { Button } from "antd";

export const useStateReducer = () => {
   interface IState {
      valid: boolean;
      isAuthenticating: boolean;
      credential: { id: string; secret: string }
   }

   type Actions =
      | { type: 'SET_VALID', payload: boolean }
      | { type: 'SET_ISAUTHENTICATING', payload: boolean }
      | { type: 'SET_CREDENTIAL', payload: { id: string; secret: string } };

   const initialStates: IState = {
      valid: false,
      isAuthenticating: false,
      credential: { id: '', secret: '' },
   }

   function stateReducer(states: IState, actions: Actions) {
      const { type, payload } = actions

      switch (type) {
         case 'SET_VALID': return {
            ...states,
            valid: payload
         }
         case 'SET_CREDENTIAL': return {
            ...states,
            credential: payload
         }
         case 'SET_ISAUTHENTICATING': return {
            ...states,
            isAuthenticating: payload,
         }
         default: return states
      }
   }

   return useReducer(stateReducer, initialStates);
}

export const LoginForm = () => {
   const [states, setStates] = useStateReducer() // states 
   const { dispatch } = useContext(AppContext)
   const formRef = useRef<HTMLFormElement>() // form reference hook

   return (
      <div className={"mb-5 w-full relative"}>
         <form
            ref={formRef}
            method="post"
            className="w-full flex flex-col flex-nowrap justify-between"
            onSubmit={(event) => {
               event.preventDefault();
               setStates({ type: 'SET_ISAUTHENTICATING', payload: true })

               setTimeout(() => {
                  // TODO: change this to use the current login user's password
                  if (states.credential.secret === '1234' && states.credential.id === 'staff') {
                     dispatch({ type: 'SET_LOCKSCREEN', payload: 'unlocked' })
                     setStates({ type: 'SET_ISAUTHENTICATING', payload: false })
                  } else {
                     setStates({ type: 'SET_ISAUTHENTICATING', payload: false })
                  } // end else
               }, 500);
            }}
         >
            <TextInput required type="text" name="id"
               value={states.credential.id}
               containerClassName={'border-none bg-transparent'}
               inputAttributes={{
                  autoFocus: true, placeholder: 'ID', className: 'bg-transparent w-full px-4 py-2 border-b border-b-[#CCC] outline-none',
                  onChange: (e) => setStates({ type: 'SET_CREDENTIAL', payload: { ...states.credential, id: e.currentTarget.value } })
               }}
            />
            <TextInput required type="password" name="secret"
               showButtonOnHover={false}
               value={states.credential.secret}
               buttons={[TextInputButtonTypes.ShowHidePassword]}
               containerClassName={'border-none bg-transparent'}
               inputAttributes={{
                  autoFocus: true, placeholder: 'Password', className: 'bg-transparent w-full px-4 py-2 border-b border-b-[#CCC] outline-none',
                  onChange: (e) => setStates({ type: 'SET_CREDENTIAL', payload: { ...states.credential, secret: e.currentTarget.value } })
               }}
            />

            {
               (states.credential.id && states.credential.secret) && (
                  <Button type="ghost" loading={states.isAuthenticating} icon={<i className={'--icon --icon-login'}></i>}
                     className={'place-self-start my-2 bg-[#fff1] border w-[63px] h-[29px] rounded-none'}
                     onClick={(e) => formRef.current.dispatchEvent(new Event('submit', { bubbles: true }))} >Login</Button>
               )
            }
         </form>
         {states.valid && (
            <p
               className={
                  "font-light text-sm text-center bold text-orange-700 animate-fadeOut"
               }
            >
               Sorry, password authentication didn't work
               <br /> Please try again.
            </p>
         )}
      </div>
   )
}