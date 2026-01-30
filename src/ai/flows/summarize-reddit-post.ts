'use server';

/**
 * @fileOverview Summarizes a Reddit post in Korean.
 *
 * - summarizeRedditPost - A function that summarizes the Reddit post.
 * - SummarizeRedditPostInput - The input type for the summarizeRedditPost function.
 * - SummarizeRedditPostOutput - The return type for the summarizeRedditPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRedditPostInputSchema = z.object({
  redditPostContent: z
    .string()
    .describe('The content of the Reddit post to be summarized.'),
});
export type SummarizeRedditPostInput = z.infer<typeof SummarizeRedditPostInputSchema>;

const SummarizeRedditPostOutputSchema = z.object({
  summary: z
    .string()
    .describe('A short summary of the Reddit post in Korean.'),
});
export type SummarizeRedditPostOutput = z.infer<typeof SummarizeRedditPostOutputSchema>;

export async function summarizeRedditPost(
  input: SummarizeRedditPostInput
): Promise<SummarizeRedditPostOutput> {
  return summarizeRedditPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRedditPostPrompt',
  input: {schema: SummarizeRedditPostInputSchema},
  output: {schema: SummarizeRedditPostOutputSchema},
  prompt: `Summarize the following Reddit post in Korean, focusing on the main points and key arguments:\n\n{{{redditPostContent}}}`,
});

const summarizeRedditPostFlow = ai.defineFlow(
  {
    name: 'summarizeRedditPostFlow',
    inputSchema: SummarizeRedditPostInputSchema,
    outputSchema: SummarizeRedditPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
