import dayjs from 'dayjs'
import { useState, useEffect } from "react"
import { DateTransfomer } from '@ui-commons/helpers';


interface IRealProps {
   className?: string;
   style?: React.CSSProperties
}

export const useRealDateTime = () => {
   const [currentDateTime, setCurrentDateTime] = useState(dayjs().format())

   useEffect(() => {
      setInterval(() => {
         setCurrentDateTime(dayjs().format())
      }, 1000)
   }, [currentDateTime])

   const RealTime = (props: IRealProps) => {
      return <span className={props.className}>{
         DateTransfomer.extractedTime(currentDateTime)
      }</span>
   }

   const RealDate = (props: IRealProps) => {
      return <span className={props.className}>{
         DateTransfomer.extractedDate(currentDateTime)
      }</span>
   }

   return { RealDate, RealTime } as const
}