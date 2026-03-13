import cron from "node-cron";
import { crawlProduct } from "./crawler.js";

const products = [
 "headphones",
 "laptops",
 "running shoes",
 "air fryer",
 "gaming mouse"
];

cron.schedule("0 * * * *", async () => {

 console.log("Starting scheduled crawl...");

 for(const product of products){

  await crawlProduct(product);

 }

});
