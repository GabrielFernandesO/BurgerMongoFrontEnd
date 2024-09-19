/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StatusChangeModal from "@/app/components/Modals/StatusChangeModal";
import FinishOrderModal from "@/app/components/Modals/FinishOrderModal";
import { redirect } from "next/navigation";

export default function adminOrders() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/burger-login')
    },
  });

  if (status === "Loading") {
    return "Loading";
  }

  if (session) {
    if (!session.isAdmin) {
      redirect("/burger-order");
    }
  }

  const [dataOrders, setDataOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isCancelModal, setIsCancelModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://burgermonapp.somee.com/api/Order");
      const data = await response.json();

      if (data.flag === true) {
        setDataOrders(data.data);
        console.log(data.data, "Req feita");
        return;
      }

      console.log("ocorreu algum erro");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Função para abrir o modal de edição
  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleCancelClick = (order) => {
    setCurrentOrder(order);
    setIsCancelModal(true);
  };

  // Função para atualizar a lista de pedidos após a edição
  const handleOrderUpdate = () => {
    fetchOrders();
    setIsModalOpen(false);
  };

  if (status === "loading") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-t-8 border-amber-400 border-opacity-1 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center mt-[30px]">
        <table className="min-w-[1400px] ">
          <thead className="border-b-2 border-black mb-4">
            <tr className="text-left">
              <th className="p-2 w-1/6">Cliente:</th>
              <th className="p-2 w-1/6">Pão:</th>
              <th className="p-2 w-1/6">Carne:</th>
              <th className="p-2 w-1/6">Salada:</th>
              <th className="p-2 w-1/6">Molho:</th>
              <th className="p-2 w-1/6">Status:</th>
              <th className="p-2 w-1/6">Ações:</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {dataOrders.length > 0 ? (
              dataOrders.map((order) => (
                <tr key={order.id} className="text-left hover:bg-gray-100 mt-6">
                  <td className="p-2 w-1/12">{order.name}</td>
                  <td className="p-2 w-1/12">{order.bread}</td>
                  <td className="p-2 w-1/12">{order.meat}</td>
                  <td className="p-2 w-1/12">{order.salad}</td>
                  <td className="p-2 w-1/12">{order.sauce}</td>
                  <td className="p-2 w-1/12">{order.status}</td>
                  <td className="p-2 w-[350px] flex space-x-4 ">
                    <button
                      className="bg-zinc-800 hover:bg-zinc-950 hover:text-white cursor-pointer text-amber-400 py-1 rounded-lg w-[140px]"
                      onClick={() => handleEditClick(order)}
                    >
                      {" "}
                      Alterar status
                    </button>
                    <button
                      className="bg-green-800 hover:bg-green-700  cursor-pointer text-white py-1 rounded-lg w-[140px]"
                      onClick={() => handleCancelClick(order)}
                    >
                      Finalizar pedido
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 text-center">
                  Nenhum pedido encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <StatusChangeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propsOrder={currentOrder}
          onOrderUpdate={handleOrderUpdate} // Passa a função de atualização para o modal
        />
        <FinishOrderModal
          isOpen={isCancelModal}
          onClose={() => setIsCancelModal(false)}
          propsOrder={currentOrder}
          onOrderUpdate={handleOrderUpdate}
        />
      </div>
    </>
  );
}
