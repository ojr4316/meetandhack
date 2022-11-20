import type { NextApiRequest,NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Data = {
    error: Error
}
enum Error {
    None = "",
    InvalidUsername = "Could not find username",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request",
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    const {user_id,tag_id,id} = req.body;
    if(req.method == "POST" && user_id &&tag_id ){
        await prisma.user_tag.create({data:{user: parseInt(user_id),tag: parseInt(tag_id)}})
        return res.status(200).json({error: Error.None});
    }
    else if(req.method == "DELETE" && id){
        await prisma.user_tag.delete({where:{id : parseInt(id)}})
        return res.status(200).json({error:Error.None})
    }
  }