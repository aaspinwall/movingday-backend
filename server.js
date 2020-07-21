const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const kAPI = require("./kAPI");
require("dotenv").config();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/host", (req, res) => {
  res.send(JSON.stringify({ response: true }));
});

app.post("/search", (req, res) => {
  let query = {
    params: req.body.params,
    options: req.body.options,
  };

  try {
    //const {params, options} = query.body

    const searchKijiji = async (query, res) => {
      //Wait for the scraping that returns the object
      const searchResult = await new kAPI(query);
      //Clean up the data
      const results = Object.keys(searchResult).map((key) => {
        const element = searchResult[key];
        const {
          title,
          url,
          description,
          date,
          image,
          images,
          attributes,
        } = element;

        return { title, url, description, date, image, images, attributes };
      });
      //Respond with the result
      res.send(JSON.stringify(results));
    };
    searchKijiji(query, res);
  } catch (error) {
    console.log("//// error on search");
    res.send(JSON.stringify(error));
  }
});

app.listen(port, () =>
  console.log(`Moving Day server listening on port ${port}!`)
);
