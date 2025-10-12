import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    const { title, anilistID, myanimelistID, studio, status, seasons, description } = await req.json()
    //      {
    //   title: 'Steins Gate',
    //   anilistID: '34534',
    //   myanimelistID: '4564564',
    //   studio: 'A1 Pictures',
    //   status: 'Finished',
    //   seasons: [ { season: 1, episodes: 24 }, { season: 2, episodes: 12 } ],
    //   description: 'descdsgdfhdzhtrhdfgh'
    // }

    if (!title) {
        return NextResponse.json({ message: 'Title is required' }, { status: 400 })
    }
    let aniListRating = null;
    let malRating = null;
    let releaseDate = null;


    if (anilistID) {
        const query = `
    query {
      Media(id: ${anilistID}, type: ANIME) {
        averageScore
        startDate {
          year
          month
          day
        }
      }
    }`

        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        const media = data.data.Media;
        aniListRating = media.averageScore;
        releaseDate = new Date(media.startDate.year, media.startDate.month - 1, media.startDate.day)
    }

    if (myanimelistID) {
        const url = `https://api.jikan.moe/v4/anime/${myanimelistID}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            malRating = data.data.score;
        } else {
            malRating = null;
        }
    }

    const existing = await prisma.anime.findFirst({
        where: {
            OR: [
                { title },
                { anilistID },
                { malID: myanimelistID }
            ]
        }
    })

    if (existing) {
        
        return NextResponse.json({ message: 'Anime already exists' }, { status: 400 })
    } else {
        const created = await prisma.anime.create({
            data: {
                title,
                anilistID,
                malID: myanimelistID,
                status,
                description,
                coverUrl: '', //from anilist
                aniListRating,
                malRating,
                seasons: {
                    create: seasons
                },
                releaseDate,  //from anilist
                studio


            }
        })
        return NextResponse.json({ message: 'Anime added' }, { status: 200 })
    }

    
}
