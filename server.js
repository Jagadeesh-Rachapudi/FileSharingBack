const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Added CORS middleware
const qaStore = require("./qaStore"); // Import the qaStore module

const app = express();

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Pdfs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Route for file upload
app.post("/upload", upload.single("pdfFile"), (req, res) => {
  res.send("File uploaded successfully");
});

// Route for answering questions
app.post("/answer", (req, res) => {
  const question = req.body.question;
  qaStore.setQuestion(question);
  const answer =
    "Narendra Damodardas Modi (Gujarati: [ˈnəɾendɾə dɑmodəɾˈdɑs ˈmodiː] ⓘ; born 17 September 1950)[b] is an Indian politician who has served as the 14th prime minister of India since May 2014. Modi was the chief minister of Gujarat from 2001 to 2014 and is the Member of Parliament (MP) for Varanasi. He is a member of the Bharatiya Janata Party (BJP) and of the Rashtriya Swayamsevak Sangh (RSS), a right wing Hindu nationalist paramilitary volunteer organisation. He is the longest-serving prime minister from outside the Indian National Congress.Modi was born and raised in Vadnagar in northeastern Gujarat, where he completed his secondary education. He was introduced to the RSS at the age of eight. His account of helping his father sell tea at the Vadnagar railway station has not been reliably corroborated. At age 18, he was married to Jashodaben Modi, whom he abandoned soon after, only publicly acknowledging her four decades later when legally required to do so. Modi became a full-time worker for the RSS in Gujarat in 1971. The RSS assigned him to the BJP in 1985 and he held several positions within the party hierarchy until 2001, rising to the rank of general secretary.";
  qaStore.setAnswer(answer);
  res.json({ answer });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
