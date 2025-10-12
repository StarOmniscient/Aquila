import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    console.log(await req.json())

//         {
//   title: 'gfdgr',
//   imdbID: '4365346',
//   seasons: [
//     { season: 1, episodes: 10 },
//     { season: 2, episodes: 7 },
//     { season: 3, episodes: 8 },
//     { season: 4, episodes: 17 }
//   ],
//   description: 'gfhxfghfg'
// }
    
}
