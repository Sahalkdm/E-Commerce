import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import nextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
const adminEmails=['sahalkdm@gmail.com']

  export const authOptions = {
    adapter:MongoDBAdapter(clientPromise),
    secret:'Y3r/VQ4h4ka1dV5O2JvJ7fDhtsdLZirOM6EzG5a3rFE=',
    providers: [
      // OAuth authentication providers...
      //ecommercenext123
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      
    ],
    callbacks:{
      session:({session,token,user})=>{
        if(adminEmails.includes(session?.user?.email) ){
          return session;
        }else{
          return false;
        }
        
      }
    },
    session: {
      strategy: "jwt",
    },
  }
  export default nextAuth(authOptions)

  export async function isAdminRequest(req,res){
    const session = await getServerSession(req,res,authOptions)
    if(!adminEmails.includes(session?.user?.email)){
      res.status(401)
      res.end()
      throw 'not an admin'
    }
  }


