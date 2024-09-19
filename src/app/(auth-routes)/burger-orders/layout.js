import { getServerSession } from "next-auth"
import { handler } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"


export const metadata = {
    title: 'Burger - Pedidos',
  }

export default async function PrivateLayout({children}){ 

    const session = await getServerSession(handler)

    if(!session){
        redirect('/burger-login')

    }else if(session.user.isAdmin){
        redirect('/admin/adminOrders');
    }

    return(
        <>{children}</>
    )
}