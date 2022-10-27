const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"nod><button type="submit">Send</button> </form></body>');
        res.write('</html>');
        return res.end(); //the return in this statement enables you to return from 
        //the anonymous code.
    }
    // process.exit(); //exits the eventloop 

    //If url = /message and you send a poset
    if (url === '/message' && method === 'POST') {

        const body = [];
        //on allows us to listen to certain events, in this case "data"
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            //parse the the body array to string
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];

            //WriteFileSync - impliments write synchronous File/IO operations 
            //In this case it's creating a textfile with words Dummy in it
            //it is considered a blocking code
            //  fs.writeFileSync('message.txt', message);
            //writefile is non-blocking meaning it doesn't block the excecution of code
            fs.writeFile('message.txt', message, (error) => {
                console.log(error);
                //Changes the status code
                res.statusCode = 302;
                //res.setHeader('Location', '/');
                return res.end();
            });

        });



    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My first page </title></head>');
    res.write('<body><h1> Hello this is a NodeJs server </h1></body>');
    res.write('</html>');
    res.end(); //cannot change a response once we've ended it, because at the end it has already
    //sent a response to the client

}

module.exports = requestHandler;