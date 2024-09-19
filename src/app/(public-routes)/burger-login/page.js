"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Head from "next/head";

export default function Login() {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        if (result.error === "Credenciais Inválidas") {
          toast.error(result.error);
        } else {
          toast.error("Email não cadastrado");
        }
      } else {
        toast.success("Login efetuado com sucesso!");
        router.push("/burger-order");
      }
    } catch (err) {
      toast.error("Ocorreu algum erro", err);
    }
  }

  return (
    <>
      <section className="bg-[url('/images/burger-login.jpeg')] h-screen bg-cover   flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className=" flex flex-col items-center bg-zinc-900 w-[420px] h-[500px] rounded-2xl pt-10 text-white"
        >
          <div className="flex flex-col space-y-1 mb-6">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="h-[35px] w-[300px] text-black invalid:text-pink-600 invalid:border-pink-500 focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1 mb-10">
            <label>Senha</label>
            <div className="flex items-center justify-items-end relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Digite sua senha"
                className="h-[35px] w-[300px] text-black focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring-2 invalid:text-pink-600 invalid:border-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {visible ? (
                <FaEye
                  className=" text-xl absolute right-2 text-black cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <FaEyeSlash
                  className=" text-xl absolute right-2 text-black cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-5 mb-8 justify-center items-center">
            <button
              type="submit"
              className="bg-amber-500 font-bold transition duration-500 hover:bg-amber-400 text-black w-[170px] h-[35px] "
            >
              Entrar
            </button>
            <Link
              href={"/"}
              className="underline transition duration-500 hover:text-amber-400"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            <hr className="border w-[150px]" />
            <p>ou</p>
            <hr className="border w-[150px]" />
          </div>
          <button
            type="button"
            className="bg-white font-bold transition duration-500 hover:bg-slate-400 text-black w-[170px] h-[35px] mt-10"
            onClick={() => router.push("/burger-register")}
          >
            Criar conta
          </button>
        </form>
      </section>
    </>
  );
}
