const express = require("express")
const cors = require('cors')
const _ = require("lodash")

const { createHtml } = require('./render_ssr.js');

// Server init
const port = 3000


async function createServer() {
  
  const app = express()
  // for parsing application/json
  app.use(express.json())
  // For allowing CORS
  app.use(cors())
  // For log incoming request
  app.use((req, res, next)=> {
    console.log(`[${new Date().toISOString()}]: ${req.method} - ${req.originalUrl}`)
    next();
  })

  // =================================================================
  // API endpoint definition
  // =================================================================

  // get empty data skeleton
  app.get('/test', async (req, res) => {
    // render SSR html
    const filepath = await createHtml()
    res.send(filepath)
  })

  return app
}
  

createServer().then((app) =>
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
)
