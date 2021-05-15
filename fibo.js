
//1. importar express y demas librerias
const express = require("express");
const compression = require("compression");
//2. crear instancia de express
const server = express();
//3. agregar middlewares globales (que es un middleware?) lo vemos la otra clase
server.use(express.json()); // nos ubica el body en el objeto request
server.use(compression());
const PORT = 3000;



function fibonacci(cantidad){
    const element=[];
    let nuev=0, ant=1;
    while (element.length<cantidad) {
        if(element.length==0){
            act=0;
            element.push(act);
        }else if(element.length==1||element.length==2){
            act=1;
            element.push(act);
        }else{
            nuev=act+ant;
            act=ant;
            ant=nuev;
            element.push(nuev);
        }  
    }   
    console.log(element);
}

fibonacci(7);




//6. levantar el servidor
server.listen(PORT, () => {
    console.log(`servidor iniciado en puerto ${PORT}`);
  });

