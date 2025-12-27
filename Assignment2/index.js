const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const { EventEmitter } = require('node:events');
const emitter = new EventEmitter();
const { pipeline,Transform } = require('node:stream');
const zlib = require('node:zlib');

// // Q1
// function currentPath() {
//     console.log("File Name: ", __filename);
//     console.log("Dir Name: ", __dirname);
// }
// currentPath();

// // Q2
// function baseName(filePath) {
//     console.log("Base Name: ", path.basename(filePath));
// }
// baseName(__filename)

// // Q3
// function formatPath(filePath) {
//     console.log("Format Path: ",path.format(filePath));
// }
// const myPathObj = {
//     dir: '/folder',
//     ext: '.js',
//     name: 'app',
// };
// formatPath(myPathObj);

// // Q4
// function extName(filePath) {
//     console.log("Extension Name: ", path.extname(filePath));
// }
// extName(__filename);

// // Q5
// function nameAndExt(filePath) {
//     parsePath = path.parse(filePath)
//     console.log({ Name: parsePath.name, Ext: parsePath.ext });
// }
// nameAndExt("/home/app/main.js");

// // Q6
// function isAbsolute(filePath) {
//     console.log(path.isAbsolute(filePath))
// }
// isAbsolute('/home/user/docs');

// // Q7
// function joinPaths(...paths) {
//     console.log(path.join(...paths));
// }
// joinPaths('/home', 'user', 'docs', 'file.txt');

// // Q8
// function toAbsolute(fileBasename) {
//     console.log(path.resolve(fileBasename))
// }
// toAbsolute("index.js")

// // Q9
// function joinPaths(...paths) {
//     console.log(path.join(...paths))
// }
// joinPaths('/home/user', 'docs/file.txt');

// // Q10
// function deleteFileAsync(filePath) {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.error("Error deleting the file:", err.message);
//         } else {
//             console.log(`${path.basename(filePath)} is deleted.`);
//         }
//     });
// }
// deleteFileAsync("file.txt");

// // Q11
// function makeDir() {
//     fs.mkdirSync("newDir")
//     console.log("Success");
// }
// makeDir()

// // Q12
// emitter.on('hi', () => {
//     console.log("Welcome event triggered!")
// })
// emitter.emit('hi');

// // Q13
// emitter.on("login", (username) => {
//         console.log(`User logged in: ${username}`)
//     })
// emitter.emit('login', "Ahmed");

// // Q14
// const data = fs.readFileSync("notes.txt", "utf-8");
// console.log(JSON.stringify(data));

// // Q15
// fs.writeFile("async.txt", "This is an async file.", (err) => {
//     if (err) throw err;
//     console.log("File created asynchronously.");
// });

// // Q16
// function directoryExists(dirPath) {
//     console.log(fs.existsSync(dirPath));
// }
// directoryExists("notes.txt");

// //Q17
// function OSinfo() {
//     console.log("OS Platform:", os.platform());
//     console.log("OS Architecture:", os.arch());
// }
// OSinfo();

// // Q18
// const readstream = fs.createReadStream("async.txt",
//     {
//         encoding: "utf-8",
//         highwatermark: 16
//     })
// const writeStream = fs.createWriteStream("output.txt")
// readstream
//     .on("data", (chunk) => {
//         writeStream.write(chunk);
//     }
//     )

// // Q19
// const sourceFile = 'test.txt';
// const compressedFile = 'output.gz';
// pipeline(
//     fs.createReadStream(sourceFile),
//     zlib.createGzip(),
//     fs.createWriteStream(compressedFile),
//     (err) => {
//         if (err) {
//             console.error('Pipeline failed.', err);
//         } else {
//             console.log('Pipeline succeeded.');
//         }
//     }
// );