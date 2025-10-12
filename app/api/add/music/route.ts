import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    console.log(await req.json())

//         {
//   title: 'Ussewa',
//   artist: 'ado',
//   year: '2021',
//   description: 'hfghfgh'
// }
    
}
