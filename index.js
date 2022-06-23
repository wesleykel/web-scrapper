import axios from "axios";
import  cheerio from "cheerio";
import  Express, { response }  from "express";
import ObjectsToCsv from "objects-to-csv";
import encoding from "encoding"

const PORT = 8000
const app = Express()

const url = "https://www.theguardian.com/uk"

const url3 ="https://www.ebay.co.uk/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=paper&_sacat=0"

  /*   const data = []
axios(url)
    .then(response =>{
        const html = response.data
//console.log(html)

        const $ = cheerio.load(html)
        $(`.fc-container__header__title`,html).each(function(){
          const text =  $(this).text()
          console.log(text)
          const link = $(this).find("a").attr("href")

        //console.log(link)
   const convertText = encoding.convert(text, "UTF-8")
        data.push({title:`${convertText}`, href:`${link}`})
        const csv  = new ObjectsToCsv(data)
         csv.toDisk("./Guardian.csv")

        })

    })
*/



let imageArray=[]
const stuffArray = ["nike air max", "lego", "ipad", "macbook", "water", "lamp"]


stuffArray.forEach((item,index)=>{

const url2 = `https://www.ebay.co.uk/sch/i.html?_nkw=${item}&_trksid=p2380057.m4084.l1313`




axios(url2)
.then(response =>{
const newData = response.data
//console.log(newData)
const $ = cheerio.load(newData)

$(".s-item__image-wrapper" ,newData).each(function(){

/*  const imageLength =  $(this).find("img").length
console.log(imageLength)

const images = $(this).find("img").attr("src")
/* const important = $(this).find("a").attr("href")
let i =  [...imageArray,images]*/
//console.log($(this))

const found = $(this).find("img").attr("src")
const altText = $(this).find("img").attr("alt")
console.log(altText)
let imgObject ={pic:found, description:altText}
imageArray=[...imageArray,imgObject ]
console.log(found)
const csv  = new ObjectsToCsv(imageArray)
csv.toDisk("./ebaypics")


})

})






})



    /*axios(url2)
    .then(response =>{
const newData = response.data
//console.log(newData)
const $ = cheerio.load(newData)

$(".s-item__image-wrapper" ,newData).each(function(){

  /*  const imageLength =  $(this).find("img").length
    console.log(imageLength)

    const images = $(this).find("img").attr("src")
   /* const important = $(this).find("a").attr("href")
 let i =  [...imageArray,images]*/
 //console.log($(this))

/*const found = $(this).find("img").attr("src")

 let imgObject ={pic:found}
imageArray=[...imageArray,imgObject ]
console.log(found)
const csv  = new ObjectsToCsv(imageArray)
csv.toDisk("./ebaypics")


})

    })*/

app.listen(PORT, ()=>console.log(`server running on Port ${PORT}`))

