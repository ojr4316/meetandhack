const AWS = require("aws-sdk");
import {
  ComprehendClient,
  BatchDetectDominantLanguageCommand,
  DetectEntitiesCommand,
  DetectKeyPhrasesCommand,
  DetectSyntaxCommand,
  DetectTargetedSentimentCommand,
} from "@aws-sdk/client-comprehend";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import wordsToNumbers from "words-to-numbers";
var pluralize = require("pluralize");
import * as chrono from "chrono-node";
import moment from "moment";

type Data = {
  error: Error;
  task?: ComprehendTask;
};

type ComprehendTask = {
  numWorkers: number;
  workerType: string;
  workerSkills: string[];
  dueDate: Date | null;
  taskDesc: string[];
};

enum Error {
  None = "",
}

export default withIronSessionApiRoute(comprehend, sessionOptions);

const WORKER_TYPES = [
  "developer",
  "cloud engineer",
  "database administrator",
  "accountant",
  "level designer",
];

const SKILLS = [
  "react",
  "angular",
  "expressjs",
  "vue",
  "javafx",
  "typescript",
  "java",
  "javascript",
  "c#",
  "c++",
  "aws",
  "javascript",
  "css",
  "unity",
  "unreal",
  "gamemaker",
  "android",
  "opengl",
];

const RESULTS = [
  "page",
  "site",
  "frontend",
  "application",
  "api",
  "app",
  "level",
  "report",
  "function",
  "method",
  "test case",
  "animation",
];

function isWorkerQuantity(input: string): {
  isWorkerQuantity: boolean;
  worker?: string;
  quantity?: number;
} {
  const s = input.split(" ");

  let quantity: number = 0;

  if (s[0] == "a" || s[0] == "an") {
    quantity = 1;
  } else if (typeof wordsToNumbers(s[0]) == "number") {
    quantity = wordsToNumbers(s[0]) as number;
  } else {
    return { isWorkerQuantity: false };
  }

  // Remove quantity from list
  s.shift();

  if (quantity > 0) {
    let singular = pluralize.singular(s.join(" ").toLowerCase());
    if (WORKER_TYPES.includes(singular)) {
      return { isWorkerQuantity: true, quantity, worker: singular };
    } else {
      for (const w of WORKER_TYPES) {
        if (singular.includes(w)) {
          return { isWorkerQuantity: true, quantity, worker: w };
        }
      }
    }
  }
  return { isWorkerQuantity: false };
}

function extractSkill(input: string): string | null {
  for (const s of SKILLS) {
    if (input.toLowerCase().includes(s)) {
      return s;
    }
  }
  return null;
}

function extractResults(input: string): string | null {
  for (const s of RESULTS) {
    if (input.toLowerCase().includes(s)) {
      return input.toLowerCase();
    }
  }
  return null;
}

// Will try to take input and turn it into task (or many tasks)
async function comprehend(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.body;

  const client = new ComprehendClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      sessionToken: process.env.AWS_SESSION_TOKEN as string,
    },
  });

  let numWorkers: number = 0;
  let workerType: string = "";
  let workerSkills: string[] = [];
  let dueDate: Date | null = null;
  let taskDesc: string[] = [];

  const keyPhrasesCommand = new DetectKeyPhrasesCommand({
    LanguageCode: "en",
    Text: input,
  });

  const entitiesCommand = new DetectEntitiesCommand({
    LanguageCode: "en",
    Text: input,
  });

  const syntaxCommand = new DetectSyntaxCommand({
    LanguageCode: "en",
    Text: input,
  });

  const targetedSentimentCommand = new DetectTargetedSentimentCommand({
    LanguageCode: "en",
    Text: input,
  });

  // Used to summarize key points
  const keyPhrases = (await client.send(keyPhrasesCommand)).KeyPhrases;
  keyPhrases?.forEach((k) => {
    const t = isWorkerQuantity(k.Text!);
    if (t.isWorkerQuantity) {
      numWorkers = t.quantity!;
      workerType = t.worker!;
    }
    const skill = extractSkill(k.Text!);
    const results = extractResults(k.Text!);
    if (skill && !workerSkills.includes(skill)) {
      workerSkills.push(skill);
    }
    if (results && !taskDesc.includes(results)) {
      taskDesc.push(results);
    }
  });

  // Used to identify date
  const entities = (await client.send(entitiesCommand)).Entities;
  entities?.forEach((e) => {
    if (e.Type == "DATE") {
      let c = chrono.parseDate(e.Text!);
      if (c < new Date()) {
        // Make sure doesn't pick a day in past!
        c = chrono.parseDate(`Next ${e.Text!}`);
      }
      dueDate = c;
    } else if (e.Type == "PERSON" && numWorkers == 0) {
      numWorkers = 1;
      workerType = e.Text!;
    }
  });
  //console.log(entities);

  // Used to make sense of skills and the rest
  const targetedSentiment = (await client.send(targetedSentimentCommand))
    .Entities;
  targetedSentiment?.forEach((t) => {
    t.Mentions?.forEach((m) => {
      if (
        m.Type == "SOFTWARE" &&
        m.Text &&
        SKILLS.includes(m.Text.toLowerCase()) &&
        !taskDesc.includes(m.Text.toLowerCase())
      ) {
        workerSkills.push(m.Text.toLowerCase());
      }
    });
  });

  // Not that valuable, only used as a last resort to figure things out
  const syntax = (await client.send(syntaxCommand)).SyntaxTokens;
  //console.log(syntax);

  console.log(
    `Task needs ${numWorkers} ${pluralize(
      workerType,
      numWorkers
    )} who know ${workerSkills.join(", ")}`
  );
  if (dueDate) {
    console.log(
      `Task must be completed ${moment(dueDate).fromNow()} (${(
        dueDate as Date
      ).toLocaleDateString("en-US", {
        dateStyle: "short",
      })}) `
    );
  } else {
    console.log("No due date assigned");
  }

  console.log(taskDesc.join(", "));

  /*

  console.log(
    `Task needs ${t.quantity} ${pluralize(t.worker, t.quantity)}`
  );
  console.log(
    `Task must be completed ${moment(c).fromNow()} (${c.toLocaleDateString(
      "en-US",
      { dateStyle: "short" }
    )}) `
  );*/

  taskDesc.push("Full Statement: " + input);
  return res.status(200).json({
    error: Error.None,
    task: { dueDate, workerSkills, taskDesc, numWorkers, workerType },
  });
}
