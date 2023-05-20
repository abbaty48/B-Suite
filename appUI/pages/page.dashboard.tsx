import { Link } from 'react-router-dom'

export default function DashboardPage() {

   return (
      <>
         <h1>Dashboard Page</h1>
         <ul>
            <Link to={'/'}>Home</Link>
            <Link to={'/products'}>Products</Link>
            <Link to={'/settings'}>Settings</Link>
         </ul>
      </>
   )
}
