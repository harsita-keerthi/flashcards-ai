import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answes.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.
12. The back of the flash card should only contain the answer, not both the question and answer.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
	const openai = new OpenAI()
	const data = await req.text()
  
	const completion = await openai.chat.completions.create({
	  messages: [
		{ role: 'system', content: systemPrompt },
		{ role: 'user', content: data },
	  ],
	  model: 'gpt-4o-mini',
	  response_format: { type: 'json_object' },
	})
  
	// Parse the JSON response from the OpenAI API
	const flashcards = JSON.parse(completion.choices[0].message.content)
  
	// Return the flashcards as a JSON response
	return NextResponse.json(flashcards.flashcards)
  }
