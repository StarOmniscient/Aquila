"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AddPage() {
  const [type, setType] = useState<"anime" | "book" | "movie" | "tv" | "game" | "music" | "">("")
  const [form, setForm] = useState<Record<string, any>>({})
  const [tvSeasons, setTvSeasons] = useState<{ season: number; episodes: number }[]>([])
  const [animeSeasons, setAnimeSeasons] = useState<{ season: number; episodes: number }[]>([])

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTvSeason = () => {
    setTvSeasons(prev => [...prev, { season: prev.length + 1, episodes: 0 }])
  }

  const handleRemoveTvSeason = (index: number) => {
    const updated = tvSeasons.filter((_, i) => i !== index)
    setTvSeasons(updated)
    setForm(prev => ({ ...prev, seasons: updated }))
  }

  const handleTvSeasonChange = (index: number, field: string, value: any) => {
    const updated = [...tvSeasons]
    updated[index] = { ...updated[index], [field]: value }
    setTvSeasons(updated)
    setForm(prev => ({ ...prev, seasons: updated }))
  }

  const handleAddAnimeSeason = () => {
    setAnimeSeasons(prev => [...prev, { season: prev.length + 1, episodes: 0 }])
  }

  const handleRemoveAnimeSeason = (index: number) => {
    const updated = animeSeasons.filter((_, i) => i !== index)
    setAnimeSeasons(updated)
    setForm(prev => ({ ...prev, seasons: updated }))
  }

  const handleAnimeSeasonChange = (index: number, field: string, value: any) => {
    const updated = [...animeSeasons]
    updated[index] = { ...updated[index], [field]: value }
    setAnimeSeasons(updated)
    setForm(prev => ({ ...prev, seasons: updated }))
  }

  const handleSubmit = async () => {
  if (!type) return
  const route = `/api/add/${type.toLowerCase()}`

  await fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  })

  // reset state after successful submission
  setForm({})
  setTvSeasons([])
  setAnimeSeasons([])
  setType("")
}


  const renderFields = () => {
    switch (type) {
      case "game":
        return (
          <>
            <Label>Name</Label>
            <Input onChange={e => handleChange("name", e.target.value)} placeholder="Game title" />
            <Label>Platform</Label>
            <Input onChange={e => handleChange("platform", e.target.value)} placeholder="PC, PS5..." />
            <Label>Release Date</Label>
            <Input type="date" onChange={e => handleChange("releaseDate", e.target.value)} />
          </>
        )

      case "anime":
        return (
          <>
            <Label>Title</Label>
            <Input onChange={e => handleChange("title", e.target.value)} placeholder="Anime title" />
            <Label>AniList ID</Label>
            <Input onChange={e => handleChange("anilistID", e.target.value)} placeholder="AniList ID" />
            <Label>MyAnimeList ID</Label>
            <Input onChange={e => handleChange("myanimelistID", e.target.value)} placeholder="MAL ID" />
            <Label>Studio</Label>
            <Input onChange={e => handleChange("studio", e.target.value)} placeholder="Animation studio" />
            <Label>Status</Label>
            <Select onValueChange={v => handleChange("status", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Finished">Finished</SelectItem>
                <SelectItem value="Releasing">Releasing</SelectItem>
                <SelectItem value="Hiatus">Hiatus</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2 mt-3">
              <Label>Seasons</Label>
              {animeSeasons.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-1/3"
                    value={s.season}
                    onChange={e => handleAnimeSeasonChange(i, "season", Number(e.target.value))}
                    placeholder="Season #"
                  />
                  <Input
                    type="number"
                    className="w-1/3"
                    value={s.episodes}
                    onChange={e => handleAnimeSeasonChange(i, "episodes", Number(e.target.value))}
                    placeholder="Episodes"
                  />
                  <Button type="button" variant="destructive" className="w-1/3" onClick={() => handleRemoveAnimeSeason(i)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={handleAddAnimeSeason}>
                Add Season
              </Button>
            </div>
          </>
        )

      case "book":
        return (
          <>
            <Label>Title</Label>
            <Input onChange={e => handleChange("title", e.target.value)} placeholder="Book title" />
            <Label>Author</Label>
            <Input onChange={e => handleChange("author", e.target.value)} placeholder="Author name" />
            <Label>AniList ID</Label>
            <Input onChange={e => handleChange("anilistID", e.target.value)} placeholder="AniList ID" />
            <Label>MyAnimeList ID</Label>
            <Input onChange={e => handleChange("myanimelistID", e.target.value)} placeholder="MAL ID" />
            <Label>GoodReads ID</Label>
            <Input onChange={e => handleChange("goodReadsID", e.target.value)} placeholder="GoodReads ID" />
            <Label>Volumes</Label>
            <Input type="number" onChange={e => handleChange("volumes", e.target.value)} placeholder="Number of volumes" />
            <Label>Chapters</Label>
            <Input type="number" onChange={e => handleChange("chapters", e.target.value)} placeholder="Number of chapters" />
            <Label>Status</Label>
            <Select onValueChange={v => handleChange("status", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Finished">Finished</SelectItem>
                <SelectItem value="Releasing">Releasing</SelectItem>
                <SelectItem value="Hiatus">Hiatus</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </>
        )

      case "movie":
        return (
          <>
            <Label>Title</Label>
            <Input onChange={e => handleChange("title", e.target.value)} placeholder="Movie title" />
            <Label>Director</Label>
            <Input onChange={e => handleChange("director", e.target.value)} placeholder="Director name" />
            <Label>Release Year</Label>
            <Input type="number" onChange={e => handleChange("year", e.target.value)} placeholder="2024" />
            <Label>IMDB ID</Label>
            <Input onChange={e => handleChange("imdbID", e.target.value)} placeholder="IMDB ID" />
          </>
        )

      case "tv":
        return (
          <>
            <Label>Title</Label>
            <Input onChange={e => handleChange("title", e.target.value)} placeholder="TV show title" />
            <Label>IMDB ID</Label>
            <Input onChange={e => handleChange("imdbID", e.target.value)} placeholder="IMDB ID" />

            <div className="space-y-2 mt-3">
              <Label>Seasons</Label>
              {tvSeasons.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-1/3"
                    value={s.season}
                    onChange={e => handleTvSeasonChange(i, "season", Number(e.target.value))}
                    placeholder="Season #"
                  />
                  <Input
                    type="number"
                    className="w-1/3"
                    value={s.episodes}
                    onChange={e => handleTvSeasonChange(i, "episodes", Number(e.target.value))}
                    placeholder="Episodes"
                  />
                  <Button type="button" variant="destructive" className="w-1/3" onClick={() => handleRemoveTvSeason(i)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={handleAddTvSeason}>
                Add Season
              </Button>
            </div>
          </>
        )

      case "music":
        return (
          <>
            <Label>Title</Label>
            <Input onChange={e => handleChange("title", e.target.value)} placeholder="Song or album title" />
            <Label>Artist</Label>
            <Input onChange={e => handleChange("artist", e.target.value)} placeholder="Artist name" />
            <Label>Release Year</Label>
            <Input type="number" onChange={e => handleChange("year", e.target.value)} placeholder="2024" />
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Label>Type</Label>
      <Select onValueChange={(v) => setType(v as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="anime">Anime</SelectItem>
          <SelectItem value="book">Book</SelectItem>
          <SelectItem value="movie">Movie</SelectItem>
          <SelectItem value="tv">TV</SelectItem>
          <SelectItem value="game">Game</SelectItem>
          <SelectItem value="music">Music</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-3">{renderFields()}</div>

      {type && (
        <>
          <Label>Description</Label>
          <Textarea onChange={e => handleChange("description", e.target.value)} placeholder="Description" />
          <Button className="w-full mt-3" onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </div>
  )
}
