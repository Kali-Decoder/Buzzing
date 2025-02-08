import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getTweetById, getUserByUsername } from '../helper/utils';

dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

/**
 * Generates prediction-style questions using Hugging Face API.
 * @param postData - Twitter post engagement data.
 * @param predictionType - Binary or Range-Based Prediction.
 * @param metric - The selected engagement metric (likes, shares, etc.).
 */
async function generatePredictionQuestion(
    postData: any,
    predictionType: string,
    metric: string
): Promise<string> {
    const prompt = `
        Generate a ${predictionType.toLowerCase()} prediction-style question based on this Twitter post engagement data:
        - ${metric}: ${postData[metric]}
        The question should be engaging and formatted for a prediction market.
    `;

    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputs: prompt })
            }
        );

        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.generated_text || 'Could not generate a question.';
    } catch (error) {
        console.error('Error generating question with Hugging Face:', error);
        return 'Error generating a prediction question.';
    }
}

/**
 * Express Controller: Generates a prediction question based on tweet engagement.
 */
export const getPredictionQuestion = async (req: Request, res: Response) => {
    try {
        const { metric, postId, username, predictionType } = req.body;

        if (!metric || !postId || !predictionType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let postData: any;

        // Fetch tweet engagement data
        if (metric?.toLowerCase() === 'followers') {
            if (!username) return res.status(400).json({ error: 'Username is required for followers' });
            postData = await getUserByUsername(username);
        } else {
            postData = await getTweetById(postId);
        }

        if (!postData) {
            return res.status(500).json({ error: 'Failed to fetch Twitter data' });
        }

        // Generate prediction-style question
        const question = await generatePredictionQuestion(postData, predictionType, metric);

        res.json({
            message: 'Prediction question generated successfully',
            postData,
            question
        });
    } catch (error) {
        console.error('Error in getPredictionQuestion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
