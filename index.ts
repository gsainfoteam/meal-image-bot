import { App } from "@slack/bolt";

// Initialize your app with your bot token and app token (or use environment variables)
const app = new App({
  token: Bun.env.SLACK_BOT_TOKEN,
  appToken: Bun.env.SLACK_APP_TOKEN,
  signingSecret: Bun.env.SLACK_SIGNING_SECRET,
  socketMode: true, // Use socketMode for development without a public URL
});

// Listen for the slash command
app.command("/meal", async ({ command, ack, respond }) => {
  // Acknowledge the command request immediately
  await ack();

  const user = command.user_name;
  const text = command.text; // The text entered after the command

  // Respond to the user
  await respond(`Hello, ${user}! You typed: "${text}".`);
});

(async () => {
  // Start the app
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
