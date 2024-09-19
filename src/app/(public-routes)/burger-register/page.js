'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


export default function Register(){

  const router = useRouter()

    const [visible, setVisible] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")


    async function registerUser(e){
      e.preventDefault()

      const formData = {
        name: name,
        email: email,
        password: password,
        confirmPass: confirmPass
      }

      console.log(formData)

      if(password != confirmPass){
        toast.warning("Senhas não coincidem");
        return;
      }

      const response = await fetch("http://burgermonapp.somee.com/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if(!response.ok){
        throw new console.error("Erro!");
      }

      const result = await response.json();

      if(result.flag === true){
        console.log(result.data)
        toast.success("Usuário criado");
        router.push("/burger-login");
      }else{
        toast.error("Email já cadastrado");
      }

    }

    return(
        <>
          <section className="bg-[url('/images/burger-register.jpeg')] h-screen bg-cover bg-left-bottom flex items-center justify-center">
            <form onSubmit={registerUser} className=" flex flex-col items-center 
            bg-zinc-900 w-[440px] h-[520px] rounded-2xl pt-10 text-white ">
              <div className="flex flex-col space-y-1 mb-8">
                <label>Nome completo</label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  className="h-[35px] w-[300px] text-black invalid:text-pink-600 invalid:border-pink-500 focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                
              </div>
              <div className="flex flex-col space-y-1 mb-8">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="h-[35px] w-[300px] text-black invalid:text-pink-600 invalid:border-pink-500 focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
              </div>
              <div className="flex flex-col space-y-1 mb-8">
              <label>Senha</label>
              <div className="flex items-center justify-items-end relative">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="h-[35px] w-[300px] text-black focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {visible ? (
                  <FaEye className=" text-xl absolute right-2 text-black cursor-pointer" onClick={() => setVisible(!visible)} />
                ) : (
                  <FaEyeSlash className=" text-xl absolute right-2 text-black cursor-pointer" onClick={() => setVisible(!visible)}/>
                )}
              </div>
              </div>
              <div className="flex flex-col space-y-1 mb-10">
              <label>Confirmar senha</label>
              <div className="flex items-center justify-items-end relative">
                <input
                  type={visibleConfirm ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  className="h-[35px] w-[300px] text-black focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
                {visibleConfirm ? (
                  <FaEye className=" text-xl absolute right-2 text-black cursor-pointer" onClick={() => setVisibleConfirm(!visibleConfirm)} />
                ) : (
                  <FaEyeSlash className=" text-xl absolute right-2 text-black cursor-pointer" onClick={() => setVisibleConfirm(!visibleConfirm)}/>
                )}
              </div>
              </div>
              <div className="flex flex-col space-y-5 mb-8 justify-center items-center">
                <button
                  type="submit"
                  className="bg-amber-500 font-bold transition duration-500 hover:bg-amber-400 text-black w-[170px] h-[35px] "
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </section>
      </>
    )
}