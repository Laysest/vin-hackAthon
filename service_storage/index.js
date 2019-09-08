const express = require("express");
const cloudinary = require("cloudinary");
const cors = require("cors");
const formData = require("express-form-data");
require("dotenv").config();

const app = express();

cloudinary.config({
  cloud_name: 'vtoan',
  api_key: '755858286135434',
  api_secret: 'oLQyg1XcJu4ZwfT5X1KmISycBuI'
});

app.use(formData.parse());
app.use(cors());

app.get("/images", async (req, res) => {
  cloudinary.v2.api.resources(
    { type: "upload", max_results: 500 },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.post("/upload", async (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  const result = await Promise.all(promises);
  res.json(result);
});

const server = app.listen(4000, () => {
  console.log(`Listening on ${server.address().port}`);
});
