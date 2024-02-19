import express, { Request, Response } from 'express'
import { Favourites, getFavourites } from './src/db'
const app = express()
const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get('/favourites/', (req: Request, res: Response) => {
    const favourites: Favourites[] | undefined = getFavourites()
    if (favourites) {
        res.send(favourites)
    } else {
        res.status(404).send('Favourites not found')
    }
})