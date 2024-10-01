import dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

import {
  createGoogleCalendarUrl,
} from './utils.js';

import { promptFewShot } from './prompt.js';

// Open AI settings
const MODEL = 'gpt-3.5-turbo-0125';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function textEndpoint(req, res) {
  try {
    const { prompt } = req.query;
    const timezone =
      req.query.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone; 

    const formattedPrompt = promptFewShot(prompt, timezone);
    console.log('Prompt:', formattedPrompt);
    const completion = await openai.chat.completions.create({
      model: MODEL,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: formattedPrompt,
        },
      ],
      response_format: { type: 'json_object' },
    });
    const output = JSON.parse(completion.choices[0].message.content);

    console.log('Output:', output);
    res.json({
      ...output,
      google_calendar_link: createGoogleCalendarUrl(output),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
