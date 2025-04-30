const express = require("express");
const { connectToMongoDb } = require("./connect");
const urlroutes = require("./routes/url");
const URL = require("./models/url");
const { timeStamp } = require("console");
const app = express();
const PORT = 1000;

connectToMongoDb("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected");
});
app.use(express.json());

app.use("/url", urlroutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(404).send('Short URL not found');
  }
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
			timeStamp:Date.now()
		},
      },
    }
  );
  res.redirect(entry.redirectURL)
});
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT} i.e http://localhost:${PORT}/`);
});
