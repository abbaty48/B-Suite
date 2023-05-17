import TextInput, { TextInputButtonTypes } from "@/appUI/components/textInput/TextInput";
import { AppContext } from "@/appUI/stores/contexts/app";
import { useContext, useReducer, useRef } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { rules } from '../../../webpack.rules';

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
         <Form
            size="middle"
            method="post"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 420 }}
            onFinish={(values) => {
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
            {/* SID */}
            <Form.Item
               required
               id="id"
               hasFeedback
               noStyle
               rules={[{ required: true, message: 'Your ID is not provided.' }]}
            >
               <Space direction="horizontal">
                  <Input
                     name="id"
                     allowClear
                     placeholder="ID"
                     value={states.credential.id}
                     disabled={states.isAuthenticating}
                     className={'border-none w-[350px] px-4 py-2 outline-none'}
                     onChange={(e) => setStates({ type: 'SET_CREDENTIAL', payload: { ...states.credential, id: e.currentTarget.value } })}
                  />
                  {/* Load already loggedIn users from localStroage for user to select instead of typing */}
                  <Select bordered={false} placeholder={<span className={'--icon --icon-users'}></span>}
                     options={[{ label: 'StaffA', value: 'staffA' }, { label: 'StaffB', value: 'staffB' }]} />
               </Space>
            </Form.Item>
            {/* SECRET */}
            <Form.Item required id="secret" rules={[{ required: true, message: 'Password not provided.' }]}>
               <Input.Password
                  required
                  allowClear
                  name="secret"
                  placeholder="Password"
                  value={states.credential.secret}
                  disabled={states.isAuthenticating}
                  className={'border-none w-full px-4 outline-none'}
                  onChange={(e) => setStates({ type: 'SET_CREDENTIAL', payload: { ...states.credential, secret: e.currentTarget.value } })}
               />
            </Form.Item>

            {
               <Form.Item wrapperCol={{ offset: 0, span: 0 }} hidden={!states.credential.id || !states.credential.secret}>
                  <Button type="primary" htmlType="submit" loading={states.isAuthenticating} icon={<i className={'--icon --icon-login'}></i>}
                     className={'bg-[#fff1] border w-[73px] h-[29px] rounded-none'}>Login</Button>
               </Form.Item>
            }
         </Form>
      </div>
   )
}