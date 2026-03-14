import { App } from "@slack/bolt";
import { load } from "cheerio";

const app = new App({
  token: Bun.env.SLACK_BOT_TOKEN,
  appToken: Bun.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const getFile = async (type: "1" | "2") => {
  const link = `https://www.gist.ac.kr/kr/html/sub05/05060${type}.html`;
  const response = await fetch(link);
  const $ = load(await response.text());
  const image = $(".bd_boxtype:first-child img").attr("src");
  const imageUrl = `${link}${image}`;
  const imageResponse = await fetch(imageUrl);
  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  return buffer;
};

app.event("app_mention", async ({ event, client, say }) => {
  await client.filesUploadV2({
    file_uploads: [
      {
        file: await getFile("1"),
        filename: "meal1.png",
      },
      {
        file: await getFile("2"),
        filename: "meal2.png",
      },
    ],
    channel_id: event.channel,
  });
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();
