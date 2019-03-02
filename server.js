var fs            = require('fs'),
    path          = require('path'),
    https         = require('https'),
    express       = require('express'),
    configuration = require('./configuration.json');

const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});
   
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const X509 = {
    pfx: fs.readFileSync(configuration.Encryption.X509_NAME),
    passphrase: configuration.Encryption.X509_PASSPHRASE
};

https.createServer(X509, app)
    .listen(8080, () => {
        console.log("Web service started.")
    });