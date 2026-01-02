import path from 'path';
import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataPath = path.join(__dirname, '../data/data.json');


const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-robotics-er-1.5-preview"
});


export const chatHandler = async (req, res) => {
    const { message } = req.body || {};
if (!message) {
  return res.status(400).json({ reply: "Message is required." });
}

    const text = message.toLowerCase();

try {
  const prompt = `
You are a helpful GDG Batna assistant.
Answer **briefly** (2–3 lines) and **practically**.
Use the following community data to answer user questions accurately:

Community
Description: ${data.community.description}
Slogan: ${data.community.slogan}
Location: ${data.community.location}
Values: ${data.community.values.join(", ")}
Backed By: ${data.community.backedBy}

Social Media
${data.socialMedia.map(s => {
  let sm = `Platform: ${s.platform}`;
  if(s.username) sm += `, Username: ${s.username}`;
  if(s.page) sm += `, Page: ${s.page}`;
  if(s.followers) sm += `, Followers: ${s.followers}`;
  if(s.likes) sm += `, Likes: ${s.likes}`;
  if(s.posts) sm += `, Posts: ${s.posts}`;
  if(s.url) sm += `, URL: ${s.url}`;
  if(s.founded) sm += `, Founded: ${s.founded}`;
  return sm;
}).join("\n")}

Events Lifecycle
${data.eventsLifecycle.map(e => `Name: ${e.name}, Type: ${e.type}, Description: ${e.description}`).join("\n")}

Programs
${data.programs.map(p => {
  let prog = `Name: ${p.name}, Description: ${p.description}`;
  if(p.platformUrl) prog += `, URL: ${p.platformUrl}`;
  if(p.challengeTypes) prog += `, Challenge Types: ${p.challengeTypes.join(", ")}`;
  if(p.rules) prog += `, Rules: ${p.rules.join("; ")}`;
  return prog;
}).join("\n")}

Core Members
${data.coreMembers.map(m => `Name: ${m.name}, Role: ${m.role}, Responsibilities: ${m.responsibilities.join("; ")}`).join("\n")}

Discord Activities
Platform: ${data.discordActivities.platform}
Activities: ${data.discordActivities.activities.join(", ")}
Examples: ${data.discordActivities.examples.join(", ")}

Joining Instructions
How to Join: ${data.joining.howToJoin.join("; ")}
Benefits: ${data.joining.benefits.join("; ")}

User question:
"${message}"

Provide a **clear step or instructions** if the user asks how to join, participate, or attend events.
`;
  const result = await model.generateContent(prompt);
 const aiReply =
      result?.response?.text?.() || "I couldn't generate a response.";

    return res.status(200).json({ reply: aiReply });

} catch (error) {
  console.error("Gemini error:", error);
return res.status(500).json({
      reply: "AI is currently unavailable. Please try again later.",
    });
}
}

console.log('Gemini Key:', process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Not Found');


/*
//array
    const event= data.eventsLifecycle.find(e => text.includes(e.name.toLowerCase()));
    if (event)return res.json({ reply : ` ${event.name} (${event.type}):${event.description}`});


    const program =data.programs.find(p => text.includes(p.name.toLowerCase()));
    if (program) return res.json({ reply: ` ${program.name} :${program.description}`});


   const social = data.socialMedia.find( s => s.platform.toLowerCase() === text);
   if (social) { let reply = `${social.platform}\n`;
  if (social.username) reply += `Username: ${social.username}\n`;
  if (social.followers) reply += `Followers: ${social.followers}\n`;
  if (social.likes) reply += `Likes: ${social.likes}\n`;
  if (social.url) reply += `Website: ${social.url}`;
  if (social.founded) reply += `Founded: ${social.founded}\n`;
  if (social.posts) reply += `Posts: ${social.posts}\n`;

  return res.json({ reply });
}
//list 

if (text.includes("community") || text.includes("gdg")) {
  return res.json({ reply: `${data.community.name} (${data.community.fullName}): ${data.community.description} ${data.community.slogan} ${data.community.backedBy} ${data.community.location} ${data.community.values.join(', ')}` });
}

if (text.includes("team")) {
  return res.json({ reply: data.coreMembers.map(member => `${member.name} - ${member.role} ${member.responsibilities}`).join('\n') });
};

if (
  text.includes("discord") ||
  text.includes("server") ||
  text.includes("meetings")
) {
  const discord = data.discordActivities;

  let reply = `${discord.platform} Activities:\n`;
  reply += `Activities:\n- ${discord.activities.join("\n- ")}\n\n`;
  reply += `Examples:\n- ${discord.examples.join("\n- ")}`;

  return res.json({ reply });
}*/