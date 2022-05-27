import type { Context } from 'netlify:edge'
import { DB } from 'https://deno.land/x/sqlite@v3.4.0/mod.ts'
import { cheerio } from 'https://deno.land/x/cheerio@1.0.4/mod.ts'

type RankType = 1 | 2 | 3 | 4
type RankSufType = 1 | 2 | 3 | 4 | 5

export default async (req: Request, ctx: Context): Promise<Response> => {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()

  const db = new DB('public/data.sqlite')

  const sql = `
    select name1, rank, rank_suf
    from units
    where id = ${id}
  `
  const [name1, rank, rank_suf] = db.query(sql)[0] as Array<number>
  db.close()

  const rankDisplay = { 1: 'C', 2: 'B', 3: 'A', 4: 'S' }[rank as RankType] + { 1: '', 2: '', 3: 'S', 4: 'R', 5: 'U' }[rank_suf as RankSufType]

  const res = await ctx.next()
  const html = await res.text()

  const $ = cheerio.load(html)
  const head = $('head')
  head.append(`<meta property="og:url" content="${req.url}">`)
  head.append('<meta property="og:site_name" content="SDGO Data">')
  head.append(`<meta property="og:title" content="${name1}">`)
  head.append('<meta property="og:type" content="website">')
  head.append(`<meta property="og:image" content="${url.origin}/sgnoodles/units/${id}-1.png">`)
  head.append(`<meta property="og:description" content="ID: ${id}, Rank: ${rankDisplay}">`)

  ctx.log('page', $.html())

  return new Response($.html(), res)
}
