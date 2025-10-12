import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    console.log(await req.json())

// {
//   title: 'ORV',
//   author: 'SingNShong',
//   anilistID: '364634',
//   myanimelistID: '124235',
//   goodReadsID: '4574564',
//   volumes: '5',
//   chapters: '500',
//   status: 'Finished',
//   description: 'yhtjdhg'
// }
    
}
