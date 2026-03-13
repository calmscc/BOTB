export function generatePrompts(product){

 const prompts = []

 const templates = [

 "best PRODUCT",
 "top rated PRODUCT",
 "best PRODUCT brands",
 "where to buy PRODUCT",
 "best place to buy PRODUCT",
 "best PRODUCT deals",
 "best PRODUCT under 100",
 "best PRODUCT under 200",
 "best PRODUCT reddit",
 "best PRODUCT for beginners",
 "best PRODUCT for professionals",
 "best PRODUCT online",
 "what store sells PRODUCT",
 "cheap PRODUCT vs expensive",
 "most popular PRODUCT",
 "best selling PRODUCT",
 "high quality PRODUCT",
 "top PRODUCT reviews",
 "best PRODUCT recommendations",
 "best PRODUCT 2025"

 ]

 for(let i=0;i<10;i++){

  templates.forEach(t=>{

   prompts.push(
    t.replace("PRODUCT",product)
   )

  })

 }

 return prompts

}
