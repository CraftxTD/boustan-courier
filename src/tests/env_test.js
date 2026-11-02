const dotenv = require("../../.env");

const result = dotenv.config();

console.log("dotenv result:", result.error || "loaded");
console.log("cwd:", process.cwd());
console.log("token found:", !!process.env.DISCORD_TOKEN);
