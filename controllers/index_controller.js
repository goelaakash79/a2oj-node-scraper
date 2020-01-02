require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const Problem = require("../models/Problem");

module.exports.db = (req, res) => {
  let probs = JSON.parse(fs.readFileSync("./data/div1d.json", "utf8"));
  Problem.create(probs);
  let probs1 = JSON.parse(fs.readFileSync("./data/div1e.json", "utf8"));
  Problem.create(probs1);
  let probs2 = JSON.parse(fs.readFileSync("./data/div2a.json", "utf8"));
  Problem.create(probs2);
  let probs3 = JSON.parse(fs.readFileSync("./data/div2b.json", "utf8"));
  Problem.create(probs3);
  let probs4 = JSON.parse(fs.readFileSync("./data/div2c.json", "utf8"));
  Problem.create(probs4);
  let probs5 = JSON.parse(fs.readFileSync("./data/div2d.json", "utf8"));
  Problem.create(probs5);
  let probs6 = JSON.parse(fs.readFileSync("./data/div2e.json", "utf8"));
  Problem.create(probs6);
  let probs7 = JSON.parse(fs.readFileSync("./data/ratinglt1300.json", "utf8"));
  Problem.create(probs7);
  return res.send("ok");
};

module.exports.index = (req, res) => {
  let a2ojUrl = "https://www.a2oj.com/Ladder11.html";
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(a2ojUrl);

    // get div details
    let divData = await page.evaluate(() => {
      let questions = [];
      // get the question elements
      let elements = document.querySelectorAll(
        "body > center > table:nth-child(3) > tbody > tr"
      );
      // get the question data
      elements.forEach(el => {
        let quesJson = {};
        try {
          quesJson.id = el.querySelector(":nth-child(1)").innerText;
          quesJson.name = el.querySelector("td:nth-child(2) > a").innerText;
          quesJson.link = el
            .querySelector("td:nth-child(2) > a")
            .getAttribute("href");
          quesJson.judge = el.querySelector("td:nth-child(3)").innerText;
          quesJson.level = el.querySelector("td:nth-child(4)").innerText;
          if (el.querySelector("strong.price")) {
            quesJson.price = el.querySelector("strong.price").innerText;
          }
        } catch (exception) {}
        questions.push(quesJson);
      });
      return questions;
    });

    console.dir(divData);
    const data = divData;

    fs.writeFile("./ratinglt1300.json", JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File has been created");
      return;
    });
  })();
};
