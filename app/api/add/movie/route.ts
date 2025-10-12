import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    console.log(await req.json())

        
//     {
//   title: 'SDFsd',
//   director: 'fsdfse',
//   year: '2012',
//   imdbID: '4636346',
//   description: 'dafgfgdfg'
// }
}
