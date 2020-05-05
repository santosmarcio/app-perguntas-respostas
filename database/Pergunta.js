var PERGUNTA = (function () {
    "use strict"
    const Sequelize = require("sequelize")
    const conection = require("./database")
    /**
     * Pergunta = nome da tablea
     * titudo e descricao = nome da coluna
     * type = tipo de dado
     * allowNull é para evitar nulos
     */
    const Pergunta = conection.define('perguntas',{
        titulo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        assunto:{
            type: Sequelize.STRING,
            allowNull: true
        },
        descricao:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    })
    /**
     * Criar a tabela no banco de dados
     * force = caso a tabela ja exista ela nao sera recriada
     */
    Pergunta.sync({force: false}).then(()=>{})
    module.exports = Pergunta    
})()
