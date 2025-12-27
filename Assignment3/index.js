const http = require("node:http");
const fs = require("node:fs");

const port = 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "POST" && url === "/user") {

        // Read body 
        let body = "";
        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            const newUser = JSON.parse(body);
            const { name, email } = newUser;
            if (!name || !email) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Name and Email are required" }));
            }
            // Read DB
            const users = JSON.parse(fs.readFileSync("data.json", "utf-8"));

            // Check duplicate email
            const exists = users.find(user => user.email === email);
            if (exists) {
                res.writeHead(409, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: `Email ${email} already exists` }));
            }

            // Add new user
            users.push(newUser);

            // Save DB
            fs.writeFileSync("data.json", JSON.stringify(users, null, 2));

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end("User added successfully");
        });
    } else if (method === "PATCH" && url.startsWith("/user/")) {
        const id = url.split("/")[2];// [ '', 'user', 'id' ] '' => index = 0 | 'user' => index = 1 | 'id' => index = 2

        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            let updates;
            updates = JSON.parse(body);

            let users = JSON.parse(fs.readFileSync("data.json"));
            const index = users.findIndex(user => user.id == id);

            if (index < 0) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "User Not Found" }));
            }

            // Check email collision
            if (updates.email) {
                const exists = users.find(user => user.email === updates.email && user.id != id);
                if (exists) {
                    res.writeHead(409, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: `Email already used: ${updates.email}` }));
                }
            }

            // Update fields
            Object.assign(users[index], updates);

            fs.writeFileSync("data.json", JSON.stringify(users));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User updated successfully", user: users[index] }));
        });
    } else if (method === "DELETE" && url.startsWith("/user/")) {
        const id = url.split("/")[2];

        let users = JSON.parse(fs.readFileSync("data.json"));

        const index = users.findIndex(user => user.id == id);

        if (index < 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "User Not Found" }));
        }

        users.splice(index, 1);

        fs.writeFileSync("data.json", JSON.stringify(users));

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User Deleted Successfully" }));
    } else if (method === "GET" && url === "/user") {
        const dataFromDB = JSON.parse(fs.readFileSync("data.json"))
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataFromDB));
    } else if (method === "GET" && url.startsWith("/user/")) {
        const id = url.split("/")[2]; // extract ID
        const dataFromDB = JSON.parse(fs.readFileSync("data.json"));

        const user = dataFromDB.find((user) => user.id == id);

        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "User Not Found" }));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
    }

    else {
        res.statusCode = 404;
        res.end("Route Not Found");
    }
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
