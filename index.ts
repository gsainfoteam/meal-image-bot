import { App } from "@slack/bolt";

const app = new App({
  token: Bun.env.SLACK_BOT_TOKEN,
  appToken: Bun.env.SLACK_APP_TOKEN,
  signingSecret: Bun.env.SLACK_SIGNING_SECRET,
  socketMode: Bun.env.NODE_ENV === "development",
});

app.command("/meal", async ({ command, ack, respond }) => {
  await ack();

  const response = await fetch(
    "https://www.gist.ac.kr/kr/html/sub05/050602.html",
  );
  const html = await response.text();
  const user = command.user_name;

  await respond(`Hello, ${user}! You typed: "${html.slice(0, 1000)}".`);
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
