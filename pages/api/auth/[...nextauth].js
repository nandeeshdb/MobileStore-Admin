import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['nandeeshbasavarajaiah@gmail.com','nandeeshbasavarajaiah4@gmail.com']

export const authOptions ={ providers: [
  // OAuth authentication providers...
 
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }),
],
adapter: MongoDBAdapter(clientPromise),

callbacks:{
  session:({session,user,token})=>{
   if(adminEmails.includes(session?.user?.email)){
    return session
   }
   else{
    return false
   }

  }
}}

export const isAdminRequest = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      res.status(403).json({ error: 'Only Admin has access' });
    }
  } catch (error) {
    console.error('Error in isAdminRequest:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export default NextAuth(authOptions)
