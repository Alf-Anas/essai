import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

type AIDataType = {
    question: string;
    answer: string;
    min_score: string;
    max_score: string;
    condition_set?: string;
    example_max_score_answer?: string;
};

async function runScoring({
    answer,
    condition_set,
    example_max_score_answer,
    max_score,
    min_score,
    question,
}: AIDataType) {
    const MODEL_NAME = process.env.GOOGLE_GEMINI_MODEL || "";
    if (!API_KEY) {
        console.error("Please provide the API Key.");
        return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        {
            text: `Question : ${question}\n\n
            Answer : ${answer}\n\n
            Minimum Score : ${min_score}\n\n
            Maximum Score : ${max_score}\n\n
            Condition Set : ${condition_set}\n\n
            Example Max Score Answer : ${example_max_score_answer}\n\n\n
            Using the given question, evaluate the answer based on the condition set and the example max score if applicable. Ensure that the score falls within the specified minimum and maximum range. Write the comment in the same language as the question.\n
            Provide your output in the following JSON format: {"score": score, "comment": comment} 
            `,
        },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const { response } = result;
    return response.text();
}

export async function POST(request: Request) {
    const {
        answer,
        condition_set,
        example_max_score_answer,
        max_score,
        min_score,
        question,
    } = await request.json();

    if (!answer || !question || min_score === "" || max_score === "") {
        return NextResponse.json(
            {
                error: true,
                message:
                    "Answer, Question, Min Score, and Max Score is mandatory!",
            },
            { status: 422 }
        );
    }

    try {
        const res = await runScoring({
            answer,
            condition_set,
            example_max_score_answer,
            max_score,
            min_score,
            question,
        });
        return NextResponse.json({ success: true, data: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
