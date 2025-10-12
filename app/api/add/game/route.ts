import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    console.log(await req.json())

//         {
//   name: 'Cytbet',
//   platform: 'PC',
//   releaseDate: '2025-10-23',
//   description: 'gfhcgvbcv'
// }
    
}
