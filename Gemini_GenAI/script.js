// const { GoogleGenAI } = require("@google/genai");

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-pro",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

// import { GoogleGenAI } from "@google/genai";
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const prompt = `A close up of two people staring at a cryptic drawing on a wall, torchlight flickering.
A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'`;

async function main() {
    let operation = await ai.models.generateVideos({
        model: "veo-3.1-generate-preview",
        prompt: prompt,
    });

    // Poll the operation status until the video is ready.
    while (!operation.done) {
        console.log("Waiting for video generation to complete...")
        await new Promise((resolve) => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({
            operation: operation,
        });
    }

    // Download the generated video.
    ai.files.download({
        file: operation.response.generatedVideos[0].video,
        downloadPath: "dialogue_example.mp4",
    });
    console.log(`Generated video saved to dialogue_example.mp4`);
}

main();