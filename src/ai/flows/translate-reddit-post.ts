'use server';

/**
 * @fileOverview This file defines a Genkit flow for translating Reddit posts into Korean.
 *
 * - translateRedditPost - A function that translates a given Reddit post into Korean.
 * - TranslateRedditPostInput - The input type for the translateRedditPost function.
 * - TranslateRedditPostOutput - The return type for the translateRedditPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateRedditPostInputSchema = z.object({
  title: z.string().describe('The title of the Reddit post.'),
  content: z.string().describe('The content of the Reddit post.'),
});
export type TranslateRedditPostInput = z.infer<typeof TranslateRedditPostInputSchema>;

const TranslateRedditPostOutputSchema = z.object({
  translatedTitle: z.string().describe('The translated title of the Reddit post in Korean.'),
  translatedContent: z.string().describe('The translated content of the Reddit post in Korean.'),
});
export type TranslateRedditPostOutput = z.infer<typeof TranslateRedditPostOutputSchema>;

export async function translateRedditPost(
  input: TranslateRedditPostInput
): Promise<TranslateRedditPostOutput> {
  return translateRedditPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateRedditPostPrompt',
  input: {schema: TranslateRedditPostInputSchema},
  output: {schema: TranslateRedditPostOutputSchema},
  prompt: `You are an expert translator specializing in translating English Reddit posts into Korean, optimized for Korean online community context.

  Translate the following Reddit post into Korean, maintaining the original tone and intent.  Make sure to use respectful language and honorifics.

  Title: {{{title}}}
  Content: {{{content}}}`,
});

const translateRedditPostFlow = ai.defineFlow(
  {
    name: 'translateRedditPostFlow',
    inputSchema: TranslateRedditPostInputSchema,
    outputSchema: TranslateRedditPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
