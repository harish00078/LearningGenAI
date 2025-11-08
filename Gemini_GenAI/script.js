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

const prompt = `
Create a fun and emotional animated video scene in the style of the Doraemon universe.

Characters: Doraemon (a robotic cat from the future) and Nobita (a lazy but kind-hearted boy).

Setting: Afternoon in Nobita’s room with sunlight coming through the window. Doraemon is sitting near his gadgets box, and Nobita is lying on the floor doing his homework half-heartedly.

Dialogue:
Nobita: (sighs) Doraemon... why does Shizuka always top the class? I study too... sometimes.
Doraemon: (grinning) "Sometimes" is the keyword here, Nobita. Maybe try studying more than you nap.
Nobita: Hey! I just need a gadget that helps me focus!
Doraemon: I have one — it’s called “self-discipline.” But I don’t think you’ll use it.
Nobita: Come on, Doraemon! Just give me *something*! I want Shizuka to notice me!
Doraemon: (smiling kindly) She already does, Nobita. You just need to be yourself — a little better version, maybe.
Nobita: (blushes) Really? You think so?
Doraemon: Of course. Now, do your homework before I call Shizuka to check on you.
Nobita: Noooo! Okay, okay, I’m doing it!

Tone: Light-hearted, funny, warm friendship.
Visual style: Soft anime colors, classic Doraemon animation look, emotional expressions, cozy background.
`;

async function main() {
  let operation = await ai.models.generateVideos({
    model: "veo-3.1-generate-preview",
    prompt: prompt,
  });

  // Poll the operation status until the video is ready.
  while (!operation.done) {
    console.log("Waiting for video generation to complete...");
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
      operation: operation,
    });
  }

  // Download the generated video.
  ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "../../../Documents/gemini_genai/dialogue_example.mp4",
  });
  console.log(`Generated video saved to dialogue_example.mp4`);
}

main();
