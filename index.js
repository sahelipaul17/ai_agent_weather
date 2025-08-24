// index.js
import model, { systemPrompt, tools } from './agent.js';
import { getWeatherDetails } from './toolFunction.js';
import promptSync from 'prompt-sync';
const prompt = promptSync();

const messages = [
  {
    role: 'system',
    content: systemPrompt + `\nCurrent datetime: ${new Date().toUTCString()}`,
  },
];

async function main() {
  console.log("Your Weather Assistant");

  while (true) {
    const userInput = prompt("User: ");
    if (userInput.toLowerCase() === 'bye' || userInput.toLowerCase() === 'exit') {
      break;
    }

    messages.push({
      role: 'user',
      content: userInput,
    });

    // Loop: keep calling the model until we get a final response
    while (true) {
      const completion = await model.chat.completions.create({
        model: process.env.MODEL || 'llama-3-70b-8192',
        messages,
        tools,
      });

      const responseMessage = completion.choices[0].message;
      messages.push(responseMessage);

      const toolCalls = responseMessage.tool_calls;

      if (!toolCalls) {
        // Final assistant message
        console.log(`🤖 Assistant: ${responseMessage.content}`);
        break;
      }

      // Handle tool calls
      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const args = JSON.parse(tool.function.arguments);

        let result = '';

        if (functionName === 'getWeatherDetails') {
          // getWeatherDetails expects two args: city and aqi
          result = await getWeatherDetails(args.city, args.aqi);
        }

        messages.push({
          role: 'tool',
          tool_call_id: tool.id,
          content: result,
        });
      }
    }
  }
}

main();
