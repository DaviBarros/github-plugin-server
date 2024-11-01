import express from "express";
import cors from "cors";
import AnalysisController from "../controllers/analysisController";
import { ICodeReview } from "../models/CodeReview";
import mongoose from "mongoose";
import { connectionString } from "../config";

// criando conexão com o banco de dados
mongoose.connect(connectionString, {
  dbName: "analysisOutputs"
});
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("connected", () => console.log("Connected to database"));

const analysisController = new AnalysisController();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());


app.get("/codeReviewT", async (req, res) => {
  console.log("oi");
})

app.get("/codeReview", async (req, res) => {
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const pull_number = req.query.pull_number as string;

  if (!owner) return res.status(400).send("Bad request: owner not provided");
  if (pull_number && !repo) return res.status(400).send("Bad request: repo not provided");

  try {
    let analysis: string;
    if (owner && repo && pull_number) {
      analysis = await analysisController
        .getAnalysis(repo, owner, parseInt(pull_number))
        .then((analysis) => JSON.stringify(analysis));
    } else if (owner && repo) {
      analysis = await analysisController
        .getAllAnalysisFromRepo(repo, owner)
        .then((analysis) => JSON.stringify(analysis));
    } else {
      analysis = await analysisController
        .getAllAnalysisFromOwner(owner)
        .then((analysis) => JSON.stringify(analysis));
    }
    return res.send(analysis);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Analysis not found");
  }
});

app.post("/codeReview", async (req, res) => {
  if (!req.body.codeReview) return res.status(400).send("Bad request: analysis not provided");
  console.log("post aqui");

  const codeReview: ICodeReview = req.body.codeReview;

  try {
    const createdAnalysis = await analysisController
      .createAnalysis(codeReview)
      .then((codeReview) => JSON.stringify(codeReview));

    res.send(createdAnalysis);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Analysis not created");
  }
});

app.put("/codeReview", async (req, res) => {
  if (!req.body.analysis) return res.status(400).send("Bad request: analysis not provided");

  const analysis: ICodeReview = req.body.analysis;

  try {
    const updatedAnalysis = await analysisController
      .updateAnalysis(analysis)
      .then((analysis) => JSON.stringify(analysis));

    res.send(updatedAnalysis);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Analysis not updated");
  }
});

app.delete("/codeReview", async (req, res) => {
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const pull_number = req.query.pull_number as string;

  if (!owner) return res.status(400).send("Bad request: owner not provided");
  if (pull_number && !repo) return res.status(400).send("Bad request: repo not provided");

  try {
    await analysisController
      .deleteAnalysis(repo, owner, parseInt(pull_number))
      .then((analysis) => JSON.stringify(analysis));

    return res.send();
  } catch (error) {
    console.log(error);
    return res.status(404).send("Analysis not found");
  }
});

export default app;
