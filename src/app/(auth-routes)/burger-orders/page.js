"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import EditModal from "@/app/components/Modals/EditModal";
import CancelOrderModal from "@/app/components/Modals/CancelOrderModal";

export default function Orders() {
  const { data: session, status } = useSession();
  const [dataOrders, setDataOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Função para buscar pedidos

  // Função para buscar pedidos
  // Use useCallback to memoize the fetchOrders function
  const fetchOrders = useCallback(async () => {
    if (status === "authenticated" && session?.user?.name) {
      try {
        const response = await fetch(
          `http://burgermonapp.somee.com/api/Order/${session.user.name}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setDataOrders(result.data);
        console.log("Pedidos carregados com sucesso", result);
      } catch (err) {
        console.log("Erro ao carregar pedidos", err);
      }
    }
  }, [status, session]);

  useEffect(() => {
    // Verifica se a sessão não está carregando
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, session, fetchOrders]);

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
    setIsCancelModal(false);
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
        <table className="min-w-[1300px] ">
          <thead className="border-b-2 border-black mb-4">
            <tr className="text-left">
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
                  <td className="p-2 w-1/6">{order.bread}</td>
                  <td className="p-2 w-1/6">{order.meat}</td>
                  <td className="p-2 w-1/6">{order.salad}</td>
                  <td className="p-2 w-1/6">{order.sauce}</td>
                  <td className="p-2 w-1/6">{order.status}</td>
                  <td className="p-2 w-1/6">
                    <span
                      className="bg-zinc-800 hover:bg-zinc-950 hover:text-white cursor-pointer text-amber-400 py-1 rounded-lg px-2"
                      onClick={() => handleEditClick(order)}
                    >
                      Editar pedido
                    </span>{" "}
                    <span
                      className="bg-red-700 hover:bg-red-600 cursor-pointer rounded-lg text-white p-1"
                      onClick={() => handleCancelClick(order)}
                    >
                      Cancelar
                    </span>
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
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propsOrder={currentOrder}
          onOrderUpdate={handleOrderUpdate} // Passa a função de atualização para o modal
        />
        <CancelOrderModal
          isOpen={isCancelModal}
          onClose={() => setIsCancelModal(false)}
          propsOrder={currentOrder}
          onOrderUpdate={handleOrderUpdate}
        />
      </div>
    </>
  );
}
