const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const qaStore = require("./qaStore"); 
const fs = require("fs");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Pdfs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


app.use(express.json());

app.use(cors());

app.post("/upload", upload.single("pdfFile"), (req, res) => {
  res.send("File uploaded successfully");
});

app.post("/answer", (req, res) => {
  const question = req.body.question;
  qaStore.setQuestion(question);
  const answerText =
    "Narendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secrNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretary Narendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryNarendra Damodardas Modi general secretaryetary";
  qaStore.setAnswer(answerText);

  const imagePath = "Img/Modi.jpeg";

  let image = null;
  if (fs.existsSync(imagePath)) {
    const imageData = fs.readFileSync(imagePath);
    image = Buffer.from(imageData).toString("base64");
  }
  const response = {
    answer: answerText,
    image: image ? `data:image/jpeg;base64,${image}` : "No image available"
  };
  res.json(response);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
