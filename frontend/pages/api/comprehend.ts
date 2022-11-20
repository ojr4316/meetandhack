const AWS = require("aws-sdk");
import {
  ComprehendClient,
  BatchDetectDominantLanguageCommand,
  DetectEntitiesCommand,
  DetectKeyPhrasesCommand,
  DetectSyntaxCommand,
} from "@aws-sdk/client-comprehend";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

type Data = {
  error: Error;
};

enum Error {
  None = "",
}

export default withIronSessionApiRoute(comprehend, sessionOptions);

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

  const keyPhrases = (await client.send(keyPhrasesCommand)).KeyPhrases;
  console.log("Key Phrases");
  console.log(keyPhrases);

  const entities = (await client.send(entitiesCommand)).Entities;
  console.log("Entities");
  console.log(entities);

  const syntax = (await client.send(syntaxCommand)).SyntaxTokens;
  console.log("Syntax");
  console.log(syntax);


  return res.status(200).json({ error: Error.None });
}
