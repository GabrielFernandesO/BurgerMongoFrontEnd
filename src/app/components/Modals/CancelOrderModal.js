import { FaRegTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const CancelOrderModal = ({ isOpen, onClose, propsOrder, onOrderUpdate }) => {
  async function cancelOrder(id) {
    try {
      const response = await fetch(
        `http://burgermonapp.somee.com/api/Order/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json(); // Use await para obter o resultado corretamente

      if (data.flag === true) {
        toast.success("Pedido cancelado");
        onOrderUpdate();
        onClose();
      } else {
        toast.error("Erro ao cancelar pedido");
      }
    } catch (error) {
      console.log("Erro ao cancelar pedido:", error);
      toast.error("Erro ao cancelar pedido");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Deseja cancelar seu pedido?</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 text-lg"
          >
            <FaRegTimesCircle />
          </button>
        </div>
        <div className="flex justify-center space-x-10 mt-4 mb-4">
          <button
            onClick={() => cancelOrder(propsOrder.id)}
            className="bg-green-600 hover:bg-green-500 hover:text border-2 border-transparent hover:border-black transition duration-500 text-black font-bold py-1 px-6 rounded"
          >
            Sim
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 hover:text-black border-2 border-transparent hover:border-black transition duration-500 text-black font-bold py-1 px-6 rounded"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
