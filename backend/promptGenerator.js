import axios from "axios";

export async function harvestPrompts(product){

 const prompts = [];

 try {

  const googleURL =
  `https://suggestqueries.google.com/complete/search?client=firefox&q=${product}`;

  const googleRes = await axios.get(googleURL);

  googleRes.data[1].forEach(p => prompts.push(p));

 } catch {}

 try {

  const redditURL =
  `https://www.reddit.com/search.json?q=${product}&limit=20`;

  const redditRes = await axios.get(redditURL);

  redditRes.data.data.children.forEach(post => {
   prompts.push(post.data.title);
  });

 } catch {}

 const templates = [

  `best ${product}`,
  `top rated ${product}`,
  `best ${product} under 200`,
  `where to buy ${product}`,
  `best place to buy ${product}`,
  `best ${product} deals`,
  `what store sells ${product}`

 ];

 templates.forEach(t => prompts.push(t));

 return [...new Set(prompts)];

}
