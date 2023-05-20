import { useMutation } from '@apollo/client';
import { SetStateAction, useState } from 'react'
import { Form, Button, Tag, Input, App, theme, Space } from 'antd';
import { RESET_STAFF_PASSWORD } from '@/appUI/commons/models/gqls/gql_staff';
import { LockScreenFormType } from '@/appUI/components/appLocker/appLocker';

interface IState {
   staffID: string;
   refereeID: string;
   newPassword: string;
   refereePassword: string;
}

export default function ResetPassword(props: { setFormType: React.Dispatch<SetStateAction<LockScreenFormType>> }) {

   const { message } = App.useApp()
   const { token } = theme.useToken()
   const [onReset, { loading, error, data }] = useMutation(RESET_STAFF_PASSWORD)
   const [states, setStates] = useState<IState>({ staffID: '', refereeID: '', newPassword: '', refereePassword: '' }) // states  

   if (error) {
      message.error(`Server Error: ${error.message}`);
   }

   if (!loading && data?.staffResetPassword.success) {
      message.success(data?.staffResetPassword.message, 10000, () => {
         // Reset
         setStates({ staffID: '', refereeID: '', newPassword: '', refereePassword: '' })
      })
   }

   return (
      <div className={"mb-5 w-full relative"}>

         <Form
            size="middle"
            method="post"
            preserve={true}
            layout="vertical"
            requiredMark="optional"
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 420 }}
            onFinish={async () => { await onReset({ variables: { ...states } }); }} // onFinish
         >
            <Space direction='vertical'>

               {/* HEADER */}
               <Form.Item>
                  <h1 className={'py-2 px-1 text-xl'} style={{ borderBottomColor: token.colorBorder, borderBottomWidth: 1 }}>RESET PASSWORD</h1>
               </Form.Item>
               {/* STAFFID */}
               <Form.Item
                  required
                  id="staffID"
                  hasFeedback
                  noStyle
                  rules={[{ required: true, message: 'Staff ID is not provided.' }]}
               >
                  <Input
                     name="id"
                     allowClear
                     placeholder="Staff ID"
                     disabled={loading}
                     value={states.staffID}
                     className={'border-none w-[350px] px-4 py-2 outline-none'}
                     onChange={(e) => setStates(({ ...states, staffID: e.currentTarget.value }))}
                  />
               </Form.Item>
               {/* NEW PASSWORD */}
               <Form.Item required id="newPassword" rules={[{ required: true, message: 'Staff new password not provided.' }]}>
                  <Input.Password
                     required
                     allowClear
                     name="newPassword"
                     disabled={loading}
                     placeholder="Staff new password"
                     value={states.newPassword}
                     className={'border-none w-full px-4 outline-none'}
                     onChange={(e) => setStates(({ ...states, newPassword: e.currentTarget.value }))}
                  />
               </Form.Item>
               {/* REFEREE ID */}
               <Form.Item
                  required
                  id="refereeID"
                  hasFeedback
                  noStyle
                  rules={[{ required: true, message: 'Referee ID is not provided.' }]}
               >
                  <Input
                     name="refereeID"
                     allowClear
                     disabled={loading}
                     placeholder="Referee ID"
                     value={states.refereeID}
                     className={'border-none w-[350px] px-4 py-2 outline-none'}
                     onChange={(e) => setStates(({ ...states, refereeID: e.currentTarget.value }))}
                  />
               </Form.Item>
               {/* REFERRE PASSWORD */}
               <Form.Item required id="refereePassword" rules={[{ required: true, message: 'Referee password not provided.' }]}>
                  <Input.Password
                     required
                     allowClear
                     disabled={loading}
                     name="refereePassword"
                     placeholder="Referee password"
                     value={states.refereePassword}
                     className={'border-none w-full px-4 outline-none'}
                     onChange={(e) => setStates(({ ...states, refereePassword: e.currentTarget.value }))}
                  />
               </Form.Item>
               {/* LOGIN */}
               <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
                  <Button type="link" icon={<i className={'--icon --icon-login'}></i>} onClick={() => props.setFormType(LockScreenFormType.Login)}>Login</Button>
               </Form.Item>
               {/* AUTHENTICATION MESSAGE */}
               {
                  data?.staffResetPassword.message && <Tag color="warning">{data?.staffResetPassword.message}</Tag>
               }
               {
                  <Form.Item wrapperCol={{ offset: 0, span: 0 }}
                     hidden={!states.staffID || !states.refereeID || !states.newPassword || !states.refereePassword}>
                     <Button type="primary" htmlType="submit" loading={loading} disabled={loading} icon={<i className={'--icon --icon-emo-displeased'}></i>}
                        className={'bg-[#fff1] border w-[73px] h-[29px] rounded-none'}>Reset</Button>
                  </Form.Item>
               }
            </Space>
         </Form>
      </div >
   )
}
