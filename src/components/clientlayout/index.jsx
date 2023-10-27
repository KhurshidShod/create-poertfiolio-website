import Header from "../header"
import { Outlet } from "react-router-dom"

const ClientLayout = () => {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default ClientLayout