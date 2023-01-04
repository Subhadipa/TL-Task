const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const _ = require('underscore');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads",express.static("public"))

const mongoose = require('mongoose')


let connection_uri = "mongodb+srv://Subhadipa:Subha2022@subhadipa-cluster.qy3xxtm.mongodb.net/every-home-final-db?authSource=admin&replicaSet=atlas-iogo5c-shard-0&readPreference=primary&ssl=true";
mongoose.connect(connection_uri, { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 3000'))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
