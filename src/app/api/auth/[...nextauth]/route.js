import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"; "next-auth/providers/credentials";

export const authOptions = {
  strategy: "jwt",
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",

  providers: [
    Credentials({
        name: "Credentials",
        
        async authorize(credentials, req) {
          const { email, password } = req.body;
          // console.log({ email, password });
  
          if (email == "" || password == "") {
            console.log("All field are required");
            return null;
          }
  
          const User = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            body: JSON.stringify({
                emailId: email,
                password 
            }),
            headers: {
              "Content-Type" : "application/json"
            }
          })

          const { userExist } = await User.json();

          console.log(userExist);
          return userExist;
        }
      }),
  ],

  callbacks: {
    async jwt({ session, token, user, trigger }) {
      if(trigger === 'update') {
          token.image = session.user.image
          token.userId = session.user._id
          token.name = session.user.name
      }
      if(user) {
        return {
          ...token,
          image: user.image,
          userId: user._id,
          name: user.name
        };
      }
      return token;
    },
    async session({ user, token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          image: token.image,
          userId: token.userId,
          name: token.name
        },
      };
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
