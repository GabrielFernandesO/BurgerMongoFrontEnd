import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import https from "https";

// Crie uma instância de agente HTTPS
const agent = new https.Agent({
  rejectUnauthorized: false, // Desativa a verificação do certificado
});

const handler = NextAuth({
  pages: {
    signIn: "/burger-login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://burgermonapp.somee.com/api/User/login", // Certifique-se de que o protocolo e a URL estão corretos
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              httpsAgent: agent,
            }
          );

          console.log("Response data:", response.data);

          const data = response.data;

          if (data.message === "Invalid credentials") {
            return Promise.reject(new Error("Credenciais Inválidas"));
          }

          if (data && data.flag === true) {
            console.log("DATA", data.user.creation_time);
            return {
              name: data.user.name,
              email: data.user.email,
              isAdmin: data.user.isAdmin,
              creation_time: data.user.creation_time,
              
            };
          }

          return Promise.reject(new Error("Usuário não existe"));
        } catch (error) {
          Promise.reject(new Error("Ocorreu algum erro"));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.creation_time = user.creation_time;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        
        session.isAdmin = token.isAdmin,
        session.creation_time = token.creation_time
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST, handler };
