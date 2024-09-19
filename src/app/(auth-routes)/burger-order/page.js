'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default  function Order() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dataOrder, setDataOrder] = useState([]);

  const [bread, setBread] = useState("");
  const [meat, setMeat] = useState("");
  const [salad, setSalad] = useState("");
  const [sauce, setSauce] = useState("");

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
        setDataOrder(result.data);

        console.log("Deu bom", result);
      } catch (err) {
        console.log("erro dado", err);
      }
    }

    getOrderOptions();
  }, []);

  async function createOrder(e){
    e.preventDefault()

    const formOrder = {
      name: session.user.name,
      bread: bread,
      meat: meat,
      salad: salad,
      sauce: sauce
    }

    console.log("ENVIOU", formOrder)

    try {
      const response = await fetch(
        "http://burgermonapp.somee.com/api/Order",{
          method: 'POST',
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(formOrder)
        }
        
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if(result.flag === true){
        toast.success("Pedido criado")
        router.push('/burger-orders')
      }

      console.log("Deu bom", result);
    } catch (err) {
      console.log("erro dado", err);
    }


  }

  return (
    <>
      <section className="min-h-[600px] max-h-[700px] ">
        <h1 className="text-4xl text-black font-medium text-center mb-[40px] mt-[40px]">
          Monte seu burger
        </h1>
        <form className="m-auto max-w-[350px] max-h-[500px]" onSubmit={createOrder}>
          <div className="flex flex-col space-y-2 mb-10">
            <label className="border-l-4 border-amber-400 px-2 font-bold text-lg">
              Escolha o pão:
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              value={bread}
              onChange={(e) => setBread(e.target.value)}
            >
              <option disabled value={""}>
                Selecione o pão
              </option>
              {dataOrder.map((order) => (
                <option key={order.id} value={order.bread}>
                  {order.bread}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col space-y-2 mb-10">
            <label className="border-l-4 border-amber-400 px-2 font-bold text-lg">
              Escolha a carne
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm "
              value={meat}
              onChange={(e) => setMeat(e.target.value)}
            >
              <option disabled value={""}>
                Selecione a carne
              </option>
              {dataOrder.map((order) => (
                <option key={order.id} value={order.meat}>
                  {order.meat}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col space-y-2 mb-10">
            <label className="border-l-4 border-amber-400 px-2 font-bold text-lg">
              Escolha a salada:
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm"
              value={salad}
              onChange={(e) => setSalad(e.target.value)}
            >
              <option disabled value={""}>
                Selecione a salada
              </option>
              {dataOrder.map((order) => (
                <option key={order.id} value={order.salad}>
                  {order.salad}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col space-y-2 mb-12">
            <label className="border-l-4 border-amber-400 px-2 font-bold text-lg">
              Escolha o molho:
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 hover:border-amber-400 rounded-md shadow-sm focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm "
              value={sauce}
              onChange={(e) => setSauce(e.target.value)}
            >
              <option disabled value={""}>
                Selecione o molho
              </option>
              {dataOrder.map((order) => (
                <option key={order.id} value={order.sauce}>
                  {order.sauce}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-zinc-800 text-amber-400 font-bold w-full h-[50px] border-2 border-transparent mb-16 transition duration-500 hover:bg-white hover:text-black hover:border-black"
          >
            Enviar pedido
          </button>
        </form>
      </section>
    </>
  );
}
