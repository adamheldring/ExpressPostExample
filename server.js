import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const mongoServer = "mongodb://localhost/expressPostLecture"
mongoose.connect(mongoServer, { useMongoClient: true })
mongoose.Promise = Promise

// mongoose.connection.on("error", err => {
//   console.error("connection error:", err)
// })
//
// mongoose.connection.once("open", () => {
//   console.log("Connected to mongodb")
// })

const Fruit = mongoose.model("Fruit", {
  name: String,
  isSour: Boolean,
  rating: Number
})

// const orange = new Fruit({ name: "Orange", isSour: false, rating: 4 })
//
// orange.save()
//   .then(() => { console.log("Orange saved!") })

app.get("/fruits", (req, res) => {
  Fruit.find().then(fruits => {
    res.json(fruits)
  })
})

app.listen(8080, () =>
  console.log("Example app listening on port 8080!")
)
