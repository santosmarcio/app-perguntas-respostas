var CONECTION = (function () {
    "use strict"
// Importar modulo SEquilize
const Sequelize = require("sequelize")
/**
 * Criar nova conexão com o banco informando:
 * perguntas=> nome do banco de dados;
 * root=> nome do usuario do banco de dados;
 * 123456=> senha do banco de dados;
 * host=> local onde o servidor esta rodando;
 * dialect=> qual o modelo do banco de dados.
 */
const conection = new Sequelize("perguntas", "root", "123456", {
    host: '127.0.0.1',
    dialect: 'mysql'
})
module.exports = conection;
})()