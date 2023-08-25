const fs = require('fs');
const http = require('http');
const url = require('url');
var slugify = require('slugify');
const replaceTemplate = require(`${__dirname}/starter/modules/replaceTemplate`);

//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template_overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template_card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template_product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
var slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%', cardsHtml);
    res.end(output);

    //PRODUCT
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'text/json',
    });
    res.end(data);

    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world!',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, () => {
  console.log('Listen to req on port 8000');
});
