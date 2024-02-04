// création d'un serveur web
// importer le module express
const express = require("express");
const cors=require('cors');
const Document = require("./models/Document");
const sequelize = require("./database");
// synchroniser la base de données avec le modèle
sequelize.sync().then(() => {});
const app = express();
app.use(express.json());
app.use(cors());

app.get("/documents", async (req,res)=>{
  
  const document=await Document.findAll();
  res.status(200).json(document);
})
// émission des documents
app.post("/documents", async (req, res) => {
  await Document.create(req.body);
  res.send(`document is created`);
});

// récupération des documents selon leur id
app.get("/documents/:id", async (req, res) => {
  const requestedId = req.params.id;
  const document = await Document.findOne({ where: { id: requestedId } });
  if (!document) {
    return res.status(404).json({ error: "Document introuvable" });
  }
  res.status(200).json(document);
});
// modification des données
app.put("/documents/:id", async (req, res) => {
  const requestedId = req.params.id;

  const document = await Document.findOne({ where: { id: requestedId } });
  if (!document) {
    return res.status(404).json({ error: "Document introuvable" });
  }
  document.name = req.body.name;
  document.documentType = req.body.documentType;
  document.description=req.body.description;
  document.save();
  res.status(200).json(document);
});
// delete des données
app.delete("/documents/:id", async (req, res) => {
  const requestedId = req.params.id;
  await Document.destroy({ where: { id: requestedId } });
  res.send("removed");
});

app.listen(4000, () => {
  console.log("i am listening a port 4000");
});
