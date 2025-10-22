import express from 'express'
import * as Path from 'node:path'
import tasksRoutes from './routes/tasks'

const server = express()
server.use(express.json())

server.use('/api/v1/tasks', tasksRoutes)
// get route at '/'
// get by id at '/:id'

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
