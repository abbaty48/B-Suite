import { useMutation } from "@apollo/client";
import { AppContext } from "@/appUI/stores/contexts/app";
import { SetStateAction, useContext, useState } from "react";
import { AUTHENTICATE } from "@/appUI/commons/models/gqls/gql_staff";
import { Staff } from '@/appServer/src/models/@types/resolver_types';
import { getlStaffs, setLocalStaff } from "@/appUI/commons/helpers";
import { LockScreenFormType } from "@/appUI/components/appLocker/appLocker";
import { Button, Form, Input, Dropdown, Space, App, Tag, MenuProps, Tooltip } from "antd";


interface IState {
   credential: { id: string; secret: string }
}

export const LoginForm = (props: { setFormType: React.Dispatch<SetStateAction<LockScreenFormType>> }) => {

   const { message } = App.useApp();
   const { dispatch } = useContext(AppContext)
   const [authenticate, { loading, error, data }] = useMutation(AUTHENTICATE)
   const [states, setStates] = useState<IState>({ credential: { id: '', secret: '' } }) // states

   if (error) {
      message.error(`Server Error: ${error.message}`);
   }

   if (!loading && data?.authenticate) {
      setTimeout(() => {
         const staff = data?.authenticate?.staff as Staff;
         if (staff) {
            // set the current loggedIn Staff
            localStorage.setItem('_app_current_user', JSON.stringify(staff))
            // add/get the current loggedIn Staff to the _app_users storage
            setLocalStaff({ staffID: staff.staffID, name: `${staff.firstName} ${staff.lastName}` })
            // set the current user state
            dispatch({ type: 'SET_CURRENT_USER', payload: staff })
            // unlocked the screen
            dispatch({ type: 'SET_LOCKSCREEN', payload: 'unlocked' })
            // set the lock time to 5 minute
            dispatch({ type: 'SET_LOCKSCREENTIMEOUT', payload: 300000 })
         } // end if
      }, 500);
   }

   const localStaffs: MenuProps['items'] = getlStaffs()?.map((staff, i) => {

      return ({
         key: staff.staffID,
         icon: <i className={'--icon --icon-staff'}></i>,
         onClick: () => {
            setStates({ credential: { id: staff.staffID, secret: '' } })
         },
         label: (
            <Space>
               <span>{staff.staffID}</span>
               <strong>{staff.name}</strong>
            </Space>
         ),
      })

   }
   ) ?? []

   return (
      <div className={"mb-5 w-full relative"}>
         <Form
            size="middle"
            method="post"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 420 }}
            onFinish={async () => { await authenticate({ variables: { ...states.credential } }); }} // onFinish
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
                     disabled={loading}
                     placeholder="ID"
                     value={states.credential.id}
                     className={'border-none w-[350px] px-4 py-2 outline-none'}
                     onChange={(e) => setStates(({ credential: { ...states.credential, id: e.currentTarget.value } }))}
                  />
                  {/* Load already loggedIn users from localStroage for user to select instead of typing */}
                  <Dropdown menu={{ items: localStaffs }} trigger={['click']}>
                     <i className="--icon --icon-users"></i>
                  </Dropdown>
               </Space>
            </Form.Item>
            {/* SECRET */}
            <Form.Item required id="secret" rules={[{ required: true, message: 'Password not provided.' }]}>
               <Input.Password
                  required
                  allowClear
                  name="secret"
                  disabled={loading}
                  placeholder="Password"
                  value={states.credential.secret}
                  className={'border-none w-full px-4 outline-none'}
                  onChange={(e) => setStates(({ credential: { ...states.credential, secret: e.currentTarget.value } }))}
               />
            </Form.Item>
            {/* PASSWORD RESET */}
            <Form.Item wrapperCol={{ offset: -10, span: 0 }}>
               <Tooltip placement="right" title={'Reset your password, if you are a seller please contact the admin/manager or accounter to reset the password for you.'}>
                  <Button type="link" onClick={() => props.setFormType(LockScreenFormType.ResetForm)}>Reset Password</Button>
               </Tooltip>
            </Form.Item>
            {/* AUTHENTICATION MESSAGE */}
            {
               data?.authenticate.message && <Tag color="warning">{data?.authenticate?.message}</Tag>
            }
            {
               <Form.Item wrapperCol={{ offset: 0, span: 0 }} hidden={!states.credential.id || !states.credential.secret}>
                  <Button type="primary" htmlType="submit" loading={loading} disabled={loading} icon={<i className={'--icon --icon-login'}></i>}
                     className={'bg-[#fff1] border w-[73px] h-[29px] rounded-none'}>Login</Button>
               </Form.Item>
            }
         </Form>
      </div>
   )
}