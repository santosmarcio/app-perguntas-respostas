var PERGUNTA = (function() {
    "use strict"

    
// Imporanto modulo express e o iniciando
const express = require("express")
const app = express()

// importando conexão do banco de dados
const conection = require("./database/database")
// tabela pergunta
const Pergunta = require("./database/Pergunta")
// tabela resposra
const Resposta = require("./database/Resposta")

// autenticando conexão com o banco de dados
conection.authenticate()
.then(()=>{
    console.log('Conectou!')
})
.catch((e)=>{
    console.log('erro', e)
})

// Bory parser para tratar indormação recebidas no formulario
// é responsavel por traduzir os dados do formulario para o javascript

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//EJS para tratar dados HTML
app.set("view engine", "ejs")
app.use(express.static('public'))

// Rotas

/**
 *  Pergunta.findAll busca os dados na rabela no servidor
 * ({raw: true}) informa ao filAll que quer apenas os dados sem informações denecessárias que por vezes o mesmo traz
 */
app.get("/", (_req, res)=>{

    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then((perguntas)=>{
        Resposta.findAll({}).then((respostas)=>{
            res.render("index",{
                perguntas: perguntas,
                respostas: respostas
            })
        })
        
    })
    
})

app.get("/perguntar", (req, res)=>{
    res.render("perguntar",{})
})

app.post("/salvarpergunta",(req, res)=>{
    Pergunta.create({
        titulo: req.body.titulo,
        descricao: req.body.pergunta,
        assunto: req.body.assunto
    }).then(()=>{   
        res.redirect("/")
    })
})

/**
 * id = é será o número da pergunta dentro do banco de dados
 * pergunta.findOne = busca a condição estabelecida pelo JSOn
 * where estabelece a condição
 */
app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta =>{
        if (pergunta == undefined) {
            res.redirect("/")
        }else{
            Resposta.findAll({
                where: {perguntaID: pergunta.id},
                order:[
                    ['id', 'DESC']
                ]
            }).then((respostas)=>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }
    })
})

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo : corpo,
        perguntaID : perguntaId
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaId}`)
    })

})

//  iniciando o servidor;
app.listen(8080, (erro)=>{console.log("App rodando!")})
})()
