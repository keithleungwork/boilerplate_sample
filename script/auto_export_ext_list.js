const { exec } = require("child_process");
const fs = require('fs');
const { exit } = require("process");

// Ensure we are executed in the right folder
if (!fs.existsSync("script/auto_export_ext_list.js")) {
    console.log("You are in the wrong place! Execute the script from project root please.")
    exit(0)
}


// check if file exist
ext_json_path = '.vscode/extensions.json'
if (!fs.existsSync(ext_json_path)) {
    console.log("No extensions.json found, create a new one now...")
    // create file
    default_json = {
        "recommendations": []
    }
    let data = JSON.stringify(default_json);
    fs.writeFileSync(ext_json_path, data);
}
let rawdata = fs.readFileSync('.vscode/extensions.json');
let extensions_json = JSON.parse(rawdata);
// console.log(extensions_json);


exec("code --list-extensions", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    // console.log(`stdout: ${stdout}`);
    // split into array
    ext_arr = stdout.split("\n")
    // Remove invalid one
    ext_arr = ext_arr.filter((x) => {
        return x.includes(".")
    })
    console.log(`We found ${ext_arr.length} extensions.`)
    extensions_json["recommendations"] = ext_arr
    // Save into array
    let data = JSON.stringify(extensions_json, null, 2);
    fs.writeFileSync(ext_json_path, data);
    console.log("The extensions list is updated.")
});
