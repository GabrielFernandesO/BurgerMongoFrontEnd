"use client";

import Image from "next/image";
import {  useSession } from "next-auth/react";
import moment from "moment";
import 'moment/locale/pt-br';

export default function Profile() {
  const { data: session } = useSession();

  
  
if(session){
  console.log(session)
  const date = moment(session.creation_time).locale('pt-br').format('DD/MM/YYYY');

    return (
      <>
        <section className="flex flex-col items-center justify-center h-[400px] mt-16">
          <div className="rounded-full bg-amber-400 p-2">
            <Image
              src={"/images/burger-profile.png"}
              alt="profile-pic"
              height={180}
              width={180}
              className="rounded-full"
              priority
            />
          </div>
          <hr className="border w-[300px] mt-8 "></hr>
          {session && (
            <table className="w-[300px] border-collapse mt-8">
              <thead className="text-center">
                <tr>
                  <th className="p-2">Dados</th>
                </tr>
              </thead>
              <tbody className="text-left">
                <tr>
                  <td className="border-b p-2">Nome: {session.user.name} </td>
                </tr>
                <tr>
                  <td className="border-b p-2">Email: {session.user.email}</td>
                </tr>
                <tr>
                  <td className="p-2">Membro desde: {date}</td>
                </tr>
              </tbody>
            </table>
          )}
        </section>
      </>
    );
  }
}
