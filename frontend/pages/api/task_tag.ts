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
    const {task_id,tag_id,id} = req.body;
    if(req.method == "POST" && task_id &&task_id && tag_id){
        await prisma.task_tag.create({data:{task: parseInt(task_id),tag: parseInt(tag_id)}})
        return res.status(200).json({error: Error.None});
    }
    else if(req.method == "DELETE" && id){
        await prisma.task_tag.delete({where:{id: parseInt(id)}})
        return res.status(200).json({error:Error.None})
    }
  }