import { useState, useEffect } from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

const EditModal = ({ isOpen, onClose, propsOrder, onOrderUpdate }) => {
  const [optionsDefault, setOptionsDefault] = useState([]);
  const [bread, setBread] = useState("");
  const [meat, setMeat] = useState("");
  const [salad, setSalad] = useState("");
  const [sauce, setSauce] = useState("");

  // Função para filtrar opções com base no valor selecionado
  const filterOptions = (type, selectedValue) => {
    return optionsDefault.filter(option => option[type] !== selectedValue);
  };

  useEffect(() => {
    async function getOrderOptions() {
      try {
        const response = await fetch(
          "http://burgermonapp.somee.com/api/OptionsBurger"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setOptionsDefault(result.data);

        // Inicializa os valores dos select com os dados do pedido atual
        setBread(propsOrder.bread || "");
        setMeat(propsOrder.meat || "");
        setSalad(propsOrder.salad || "");
        setSauce(propsOrder.sauce || "");

      } catch (err) {
        console.log("erro dado", err);
      }
    }

    getOrderOptions();
  }, [propsOrder]);

  async function editOrder(e) {
    e.preventDefault();

    const formOrder = {
      id: propsOrder.id,
      name: propsOrder.name,
      bread: bread || propsOrder.bread,
      meat: meat || propsOrder.meat,
      salad: salad || propsOrder.salad,
      sauce: sauce || propsOrder.sauce,
    };

    try {
      const response = await fetch(
        "http://burgermonapp.somee.com/api/Order/order", {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formOrder),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.flag === true) {
        toast.success("Pedido atualizado");
        onOrderUpdate(); // Chama a função para atualizar a lista de pedidos na página principal
        onClose();
      }

      console.log("Deu bom", result);
    } catch (err) {
      console.log("erro dado", err);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Editar Pedido</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700 text-lg"
          >
            <FaRegTimesCircle />
          </button>
        </div>
        <div className="p-4">
          <form className="space-y-4" onSubmit={editOrder}>
            <div>
              <label htmlFor="select1" className="block text-sm font-medium text-gray-700">Pão</label>
              <select
                id="select1"
                value={bread}
                onChange={(e) => setBread(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              >
                <option value={propsOrder.bread}>{propsOrder.bread}</option>
                {filterOptions('bread', propsOrder.bread).map(option => (
                  <option key={option.id} value={option.bread}>{option.bread}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="select2" className="block text-sm font-medium text-gray-700">Carne</label>
              <select
                id="select2"
                value={meat}
                onChange={(e) => setMeat(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              >
                <option value={propsOrder.meat}>{propsOrder.meat}</option>
                {filterOptions('meat', propsOrder.meat).map(option => (
                  <option key={option.id} value={option.meat}>{option.meat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="select3" className="block text-sm font-medium text-gray-700">Salada</label>
              <select
                id="select3"
                value={salad}
                onChange={(e) => setSalad(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              >
                <option value={propsOrder.salad}>{propsOrder.salad}</option>
                {filterOptions('salad', propsOrder.salad).map(option => (
                  <option key={option.id} value={option.salad}>{option.salad}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="select4" className="block text-sm font-medium text-gray-700">Molho</label>
              <select
                id="select4"
                value={sauce}
                onChange={(e) => setSauce(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              >
                <option value={propsOrder.sauce}>{propsOrder.sauce}</option>
                {filterOptions('sauce', propsOrder.sauce).map(option => (
                  <option key={option.id} value={option.sauce}>{option.sauce}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition duration-500 text-amber-400 font-bold py-2 px-4 rounded"
              >
                Atualizar pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
