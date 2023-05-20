import { Button, Select, Space } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../stores/contexts/app'
import { getlStaffs } from '../commons/helpers'

export default function DashboardPage() {

   const { dispatch } = useContext(AppContext)

   const onSelect = (value: any) => {
      console.log('value: ', value)
   }
   return (
      <>
         <h1>Dashboard Page</h1>
         <Button onClick={() => { dispatch({ type: 'SET_LOCKSCREEN', payload: 'locked' }) }}>
            Lock
         </Button>

         <Select size="large" bordered={false}  placeholder={<span className={'--icon --icon-users'}></span>}
            options={
               getlStaffs()?.map(staff => ({
                  label: (
                     <Space>
                        <span>{staff.staffID}</span>
                        <strong>{staff.name}</strong>
                     </Space>
                  ),
                  value: staff.staffID
               }))
            }
            onChange={onSelect}
         /*
         onChange={(staffID, option: { label: any, value: string }) => {
            console.log('ID: ', staffID, ' - value: ', option.value)
            setStates({ type: 'SET_CREDENTIAL', payload: { id: staffID, secret: '' } })
         }}  */
         />
      </>
   )
}
