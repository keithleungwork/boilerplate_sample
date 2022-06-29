const _ = require('lodash')
const fs = require("fs")
const path = require("path")
const moment = require('moment')


// Define build output dir
const DIST_PATH = path.join(__dirname, "../dist")
// Import ssr related module
const entry_server_path = path.join(DIST_PATH, '/entry-server.common.js')
if (!fs.existsSync(entry_server_path)) throw(new Error(`Please ensure you already build the code via 'npm run build:server'. And the file existed in ${entry_server_path} .`))
const render = require(entry_server_path).cusRender
const renderToString = require('vue-server-renderer').createRenderer().renderToString


// Create ONE Html filled with random invoice data
async function createHtml() {
    const url = "/"
    const options = {}
    const html = await render(url, options, renderToString)

    // Store html file
    const cur_file_path = "testing.html"
    fs.writeFileSync(cur_file_path, html)
    return cur_file_path
}

module.exports = {
    createHtml
}
