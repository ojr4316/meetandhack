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
    const {name,project_id} = req.body;
    const date = new Date()
    // const user = req.session.user
    // if (user){
        // if(!(await prisma.user.findFirst({where:{id: user.id}}))?.is_manager){
            if(req.method == "POST"){
                await prisma.task.create({data:{name: name as string, creation_date: date , finish_date: new Date("2040-12-12"), project : parseInt(project_id)}});
                return res.status(200).json({error: Error.None});
            }else if( req.method == "DELETE" && name){
                const id = (await prisma.task.findFirst({where:{name:name as string,project : parseInt(project_id)}}))?.id
                await prisma.task.delete({where:{id:id}})
                return res.status(200).json({error: Error.None });
                
            }else if(req.method == "PUT" && name && project_id && name){
                const id = (await prisma.task.findFirst({where:{name:name as string}}))?.id
                await prisma.task.update({where:{id:id},data:{name: name as string, project:parseInt(project_id)}});
                return res.status(200).json({error: Error.None});
            }
            else {
                return res.status(400).json({error: Error.InvalidRequest});
            }
        // }
        // else{
        //     return res.status(400).json({error: Error.InvalidUser})
        // }
    }

    
//   }





