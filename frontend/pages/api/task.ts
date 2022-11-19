import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, task, user_task } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
    error: Error;
    task?: task;  
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
    const [id,name,project_id] = req.body;

    if(req.method == "POST" && name && project_id){
        const task = await prisma.task.create({data:{name: name as string, creation_date: new Date() , finish_date: new Date("2040-12-12"), project : project_id as number}});
        return res.status(200).json({error: Error.None, task });
    } else if( req.method == "DELETE" && id){
        await prisma.task.delete({where:{id:parseInt(id)}})
        return res.status(200).json({error: Error.None });
    }else {
        return res.status(400).json({error: Error.InvalidRequest});
      }
  }





