const express = require("express");
const path=require('path')
const cookieParser=require('cookie-parser')

const { connectToMongoDb } = require("./connect");
const urlroutes = require("./routes/url");
const staticRoute= require("./routes/staticRouter")
const URL = require("./models/url");
const userRoute=require('./routes/user')
//const {restrictToLoggedinUserOnly,checkAuth}=require('./middleware/auth')
const { checkForAuthentication,restrictTo}=require('./middleware/auth')

const { timeStamp } = require("console");
const app = express();
const PORT = 1000;

connectToMongoDb("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected");
});


app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);


// app.get("/test",async(req,res)=>{
//   const allUrls=await URL.find({});
//   return res.render('home',{
//     urls:allUrls,
//   })
// })


app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlroutes);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
