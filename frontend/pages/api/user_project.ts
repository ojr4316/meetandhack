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
    const {user_id,manager_id,project_id,id} = req.body;
    if(req.method == "POST" && user_id &&project_id && manager_id){
        await prisma.user_project.create({data:{worker: user_id,manager: manager_id, project: project_id}})
        return res.status(200).json({error: Error.None});
    }
    else if(req.method == "DELETE" && id){
        await prisma.user_project.delete({where:{id : id}})
        return res.status(200).json({error:Error.None})
    }
  }