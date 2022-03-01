const express     = require('express')
const routes      = express.Router()
const instrutores = require('./controllers/instrutores')
const membros     = require('./controllers/membros')


//Redireciona a rota para a pasta instrutores
routes.get('/', function (req, res) {

  return res.redirect("/instrutores")

})

//Renderiza a rota da página instrutores
routes.get('/instrutores', instrutores.index)
 
//Renderiza a rota da página instrutores
routes.get('/instrutores/create', instrutores.create)

//Recebe uma busca do express para exibir dados pro front-end
routes.get('/instrutores/:id', instrutores.show)

//Rota para editar o formulário dos instrutores 
//iniciando com o instrutor de busca
routes.get('/instrutores/:id/edit', instrutores.edit)

//Recebe os dados registrado no ato do cadrasto da pagina create
routes.post('/instrutores', instrutores.post)

//Atualiza os dados dos usuários
routes.put('/instrutores', instrutores.put)

//Deleta os dados dos usuários
routes.delete('/instrutores', instrutores.delete)



// ===================== ROTAS MEMBROS ==============================


//Renderiza a rota da página membros
routes.get('/membros', membros.index)
 
//Renderiza a rota da página membros
routes.get('/membros/create', membros.create)

//Recebe uma busca do express para exibir dados pro front-end
routes.get('/membros/:id', membros.show)

//Rota para editar o formulário dos membros 
//iniciando com o membro de busca
routes.get('/membros/:id/edit', membros.edit)

//Recebe os dados registrado no ato do cadrasto da pagina create
routes.post('/membros', membros.post)

//Atualiza os dados dos usuários
routes.put('/membros', membros.put)

//Deleta os dados dos usuários
routes.delete('/membros', membros.delete)

//Renderiza a rota da página membros
routes.get('/membros', function (req, res) {

  return res.send("membros")

})

module.exports = routes