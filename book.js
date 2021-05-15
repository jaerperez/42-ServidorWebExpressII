//1. importar express y demas librerias
const express = require("express");
const compression = require("compression");
//2. crear instancia de express
const server = express();
//3. agregar middlewares globales (que es un middleware?) lo vemos la otra clase
server.use(express.json()); // nos ubica el body en el objeto request
server.use(compression());

const PORT = 3000;
const AUTHORS = [
    {
        id: 1,
        author: "Eric Elliott",
        country: "UK",
        book: [
            {
                id: 1,
                title: "Eloquent JavaScript, Second Edition",
                pages: 297,
                description: "An In-Depth Guide for Programmers",
            },
            {
                id: 2,
                title: "Understanding ECMAScript 6",
                pages: 300,
                description: "The Definitive Guide for JavaScript Developers",
            },
            {
                id: 3,
                title: "Eloquent JavaScript, Second Edition",
                pages: 650,
                description: "A Modern Introduction to Programming",
            }
        ]
    },
    {
        id: 2,
        author: "Addy Osmani",
        country: "China",
        book: [
            {
                id: 1,
                title: "Programming JavaScript Applications",
                pages: 297,
                description: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
            },
            {
                id: 2,
                title: "You Don't Know J",
                pages: 300,
                description: "ES6 & Beyond",
            },
            {
                id: 3,
                title: "Git Pocket Guide",
                pages: 650,
                description: "A Working Introduction",
            }
        ]
    },
    {
        id: 3,
        author: "Richard E. Silverman",
        country: "Colombia",
        book: [
            {
                id: 1,
                title: "Learning JavaScript Design Patterns",
                pages: 297,
                description: "A JavaScript and jQuery Developer's Guide",
            },
            {
                id: 2,
                title: "Speaking JavaScript",
                pages: 300,
                description: "An In-Depth Guide for Programmer",
            },
            {
                id: 3,
                title: "Designing Evolvable Web APIs with ASP.NET",
                pages: 650,
                description: "Harnessing the Power of the Web",
            }
        ]
    }
];

const middlewareValidarTipoId = (req, res, next) => {
  if (isNaN(parseInt(req.params.id))) {
      res.status(400).json({error:"El ID debe ser un numero"})
  } else {
    next();
  }
};

const middlewareValidarinput = (req, res, next) => {
    if (
        !req.body.title ||
        !req.body.pages ||
        !req.body.description
    ) {
        res.status(400).json({
            error: "debe enviar los datos completos del libro",
        });
    } else {
      next();
    }
};

//Firts point============================================================//
//consult autor from books
server.get("/author/:id", middlewareValidarTipoId, (req, res) => {
    const authorid=req.params.id;
    const requestauthor=AUTHORS.find(aut=>aut.id==authorid);
    console.log(requestauthor);
    if (!requestauthor) {
        res.status(400).json({ error: `Autor con id ${authorid} no existe` });
    } else {
        const requestbook=requestauthor.book;
        console.log("========================================================");
        console.log(requestbook);
        res.status(200).json({requestbook});      
    }
});

//Create a new book
server.post("/author/:id",middlewareValidarinput, (req, res) => {
    const authorid=req.params.id;
    const requestauthor=AUTHORS.find(aut=>aut.id==authorid);
    console.log(requestauthor);
    if (!requestauthor) {
        res.status(400).json({ error: `Autor con id ${authorid} no existe` });
    } else{
        const newbook = {
            id: requestauthor.book.length + 1,
            title: req.body.title,
            pages: req.body.pages,
            description: req.body.description
        };
        const c=requestauthor.book;

        c.push(newbook);
        res.status(201).json(c);
    }
});

//consult all from authors
server.get("/authors",(req, res) => {
    res.status(200).json(AUTHORS);
});


//Second point============================================================//
//consult book from author
server.get("/author/:id/book/:idbook",(req,res)=>{
    const authorid=req.params.id;
    const requestauthor=AUTHORS.find(aut=>aut.id==authorid);
    console.log(requestauthor);
    if (!requestauthor) {
        res.status(400).json({ error: `Autor con id ${authorid} no existe` });
    } else {
        const bookid=req.params.idbook;
        const requestbook=requestauthor.book.find(book=>book.id==bookid);
        console.log(requestbook);
        if (!requestbook) {
            res.status(400).json({ error: `Libro con id ${bookid} no existe` });
        } else {
            res.status(200).json({requestbook});
        }        
    }
});

//Update book from author
server.put("/author/:id/book/:idbook",(req,res)=>{
    const authorid=req.params.id;
    const requestauthor=AUTHORS.find(aut=>aut.id==authorid);
    console.log(requestauthor);
    if (!requestauthor) {
        res.status(400).json({ error: `Autor con id ${authorid} no existe` });
    } else {
        const bookid=req.params.idbook;
        const requestbook=requestauthor.book.find(book=>book.id==bookid);
        console.log(requestbook);
        if (!requestbook) {
            res.status(400).json({ error: `Libro con id ${bookid} no existe` });
        } else {
            requestbook.title=req.body.title;
            requestbook.pages=req.body.pages;
            requestbook.description=req.body.description;
            res.status(200).json({AUTHORS});
        }        
    }
})

//Delete book from author
server.delete("/author/:id/book/:idbook",(req,res)=>{
    const authorid=req.params.id;
    const requestauthor=AUTHORS.find(aut=>aut.id==authorid);
    console.log(requestauthor);
    if (!requestauthor) {
        res.status(400).json({ error: `Autor con id ${authorid} no existe` });
    } else {
        const bookid=req.params.idbook;
        const requestbook=requestauthor.book.find(book=>book.id==bookid);
        console.log(requestbook);
        if (!requestbook) {
            res.status(400).json({ error: `Libro con id ${bookid} no existe` });
        } else {
            removeItemFromArr(requestauthor, requestbook);
            res.status(200).json({AUTHORS});
        }        
    }
})

function removeItemFromArr(arr, item) {
    var i = arr.book.indexOf(item);
    if (i !== -1) {
        arr.book.splice(i, 1);
    }
}

//6. levantar el servidor
server.listen(PORT, () => {
  console.log(`servidor iniciado en puerto ${PORT}`);
});