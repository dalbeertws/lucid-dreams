import { useQuery, QueryClient } from "@tanstack/react-query";
import { OpenAI } from 'openai';





export const useChatGPTQuery = (query: string) => {
    const queryClient = new QueryClient();
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
        // Add any other necessary configurations here
      });
    return useQuery<string, Error>({
        queryKey: ["chatGPT", query],
        queryFn: async () => {
            if (query === "") return ""; // If query is empty, return empty string (no need to call API)
            try {
                const completion = await openai.chat.completions.create({
                    messages: [{ role: 'system', content: query }],
                    model: 'gpt-3.5-turbo',
                });
                const data = completion.choices[0].message.content;
                console.log(completion ,"completion"); // Log information if needed
                console.log(completion.choices[0] ,"data"); // Log information if needed
                return data; // Return the result
            } catch (error) {
                // Handle any errors that occur during the request
                throw new Error(error); 
            }
        },
        enabled: !!query && typeof window !== 'undefined', // Enable query only when query is not empty and in the browser context
        cacheTime: 0, // Disable caching to force API call each time
        queryClient, // Use the query client
    });
};
