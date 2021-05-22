// import puppeteer from 'puppeteer';

// var Queue = require('bull');

// const redis = require("redis");
// const client = redis.createClient(process.env.STACKHERO_REDIS_URL_TLS);

// client.on("error", function(error: any) {
//   console.error(error);
// });

// client.set("key", "value", redis.print);
// client.get("key", redis.print);

// console.log(process.env.STACKHERO_REDIS_URL_TLS);

// var videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');

// dotenv.config();

/*
const webhookClient = new Discord.WebhookClient(process.env.DISCORD_WEBHOOK_ID || "", process.env.DISCORD_WEBHOOK_TOKEN || "");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.wowprogress.com/gearscore/?lfg=1&raids_week=3&lang=fr&sortby=ts');

  await page.waitForSelector('table.rating');

  console.log('found it!');

  const players = await page.evaluate(() => {
    const lines = Array.from(document.querySelectorAll('table.rating tbody tr'));

    const playersInfo = lines.map((line) => {
      const name = line.querySelector('td:nth-of-type(1)')?.textContent;
      const server = line.querySelector('td:nth-of-type(4)')?.textContent;
      const link = 'https://www.wowprogress.com' + line.querySelector('td:nth-of-type(1) a')?.getAttribute('href');

      return { name, server, link, charClass: '', charSpec: '' }
    });

    return playersInfo;
  });


  for (let i = 1; i < players.length; i++) {
    console.log(players[i]);
    console.log(i, players.length, players[i].link);
    await page.goto(players[i].link);

    await page.waitForSelector('div.primary');

    const moreInfo = await page.evaluate(() => {
      return {
        charClass: document.querySelector('div.primary div:nth-of-type(2) div:nth-of-type(1) i')?.textContent,
        charSpec: document.querySelector('div.registeredTo div.language:nth-of-type(6) strong')?.textContent,
      };
    });

    players[i].charClass = moreInfo.charClass || "";
    players[i].charSpec = moreInfo.charSpec || "";

  }



  // const embed = new Discord.MessageEmbed()
	// .setTitle(`${players.length} players found`)
	// .setColor('#0099ff');

  // webhookClient.send(players.map(p => `${p.name} ${p.charClass} ${p.charSpec} ${p.server}`).join('\n\n'), {
  //   username: 'Big Pull Staffing',
  //   embeds: [embed],
  // });



  await browser.close();
})();

*/