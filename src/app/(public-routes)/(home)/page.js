import Link from "next/link";

export const metadata = {
  title: 'Burger - Home',
}

export default function Home() {

  return (
    <>
      <section className="bg-[url('/images/burger.jpg')] h-screen bg-cover bg-center flex items-center">
        <div className="text-white text-6xl font-bold bg-zinc-800 w-[700px] h-[120px] flex items-center justify-center">
          <Link
            href={"/burger-login"}
            className="transition duration-500 ease-in-out hover:text-amber-400"
          >
            Faça seu Burger aqui
          </Link>
        </div>
      </section>
    </>
  );
}
