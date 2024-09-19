"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // Importa signOut para o logout

export default function Navbar() {
  const { data: session, status } = useSession(); // Obtém a sessão e o status

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Condição para verificar se a sessão está carregando ou não
  const isLoading = status === "loading";

  // Função para sair da sessão
  const handleLogout = async () => {
    await signOut(); // Faz logout do usuário
  };

  return (
    <nav className="flex px-[50px] py-[15px] bg-zinc-800 text-amber-400 items-center justify-end border-b-4 border-zinc-900">
      <Link href={"/"} className="m-auto ml-0">
        <Image
          height={40}
          width={40}
          src={"/images/logo.png"}
          alt="img-button"
        />
      </Link>
      {isLoading ? (
        <p className="m-[12px]">Loading...</p>
      ) : session ? (
        <>
          <p className="m-[12px] pr-2">
            Olá! {capitalizeFirstLetter(session.user.name)}
          </p>
          <Link
            href={
              session.isAdmin ? "/admin/adminOrders" : "/burger-orders"
            }
            className="m-[12px] transition duration-500 ease-in-out hover:text-white"
          >
            {session.isAdmin ? "Pedidos" : "Meus pedidos"}
          </Link>
          <Link
            href={"/burger-profile"}
            className="m-[12px] transition duration-500 ease-in-out hover:text-white"
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="m-[12px] transition duration-500 ease-in-out hover:text-white"
          >
            Sair
          </button>
        </>
      ) : (
        <Link
          href={"/burger-login"}
          className="m-[12px] transition duration-500 ease-in-out hover:text-white"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
