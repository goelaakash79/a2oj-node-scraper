require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");

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
