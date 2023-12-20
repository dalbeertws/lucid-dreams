import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Add any other necessary configurations here
});

export async function POST(req: NextApiRequest) {
  const { prompt } = req.body;
  if(!prompt) return NextResponse.json({ error: 'Prompt is required' }, {status:400});
 
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo',
      });

      console.log(completion.choices[0]);
      // Return the transcribed text in the response
      return NextResponse.json({ result: completion.choices[0].message.content }, {status:200});
    } catch (error : any) {
      // Handle any errors that occur during the request
      if (error.response) {
        console.error(error.response.status, error.response.data);
        return NextResponse.json({ error: error.response.data }, {status:500});

      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        return NextResponse.json({  error: `Error with OpenAI API request: ${error.message}`  }, {status:500});
      }
    }
}


