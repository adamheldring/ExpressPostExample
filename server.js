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
  name: {
    type: String,
    enum: ["Apple", "Pear"]
  },
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

app.post("/fruits", (req, res) => {
    console.log(req.body)
    const newFruit = new Fruit({
      name: req.body.name,
      isSour: req.body.isSour,
      rating: req.body.rating
    })
    newFruit.save()
      .then(() => {
        res.status(201).json({ created: true })
      })
      .catch((err) => {
        res.status(400).json({ created: false, error: err })
      })
})


// THIS IS ANOTHER WAY WITH LESS CODE,
// JUST PASSING IN THE ENTIRE OBJECT, BUT FOR SECURITY YOUR SHOULD
// ALWAYS CHECK AND VALIDATE THE OBJECT FIRST TO MAKE SURE NO EVIL CODE
// IS INJECTED
// const newFruit = new Fruit(req.body)

app.listen(8080, () =>
  console.log("Example app listening on port 8080!")
)
