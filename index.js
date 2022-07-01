const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')

const app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect('mongodb://localhost/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("connected"))
  .catch((err) => console.log(err));


var jsonParser = bodyParser.json()


const record = new mongoose.Schema({
  data: String
});

const recordModel = new mongoose.model("record", record)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post('/get', jsonParser, async function (req, res) {
  var find = await recordModel.find({ data: req.body.data })
  if (find.length ) {
    console.log("available", req.body.data);
  } else {
    const insertrecord = new recordModel({
      data: req.body.data
    });
    insertrecord.save()
  }

  var data = await recordModel.find({ data: { $regex: req.body.data } })
  console.log(req.body)
  res.json({ data: data })
})

console.log("hellows");
app.listen(3001)
