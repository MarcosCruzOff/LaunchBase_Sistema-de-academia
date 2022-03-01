const fs            = require('fs')           //enviar os dados recebidos para o arquivo data.json
const data          = require("../data.json")  //armazena os dados no arquivo data.json
const { age, date } = require("../utils")      //Mostra quanto anos instrutor tem

exports.index = function (req, res) {

  return res.render("instrutores/index", { instrutores: data.instrutores })

}

//Exporta a função de criar cadastro
exports.post = function(req, res) {

  // kyes retorna um Array["avatar_url","name","birth","gender","services"]
  const keys = Object.keys(req.body)

  for (key of keys) {

    if(req.body[key] == "")
      return res.send('Por favor, Preencha todos os campos')
      
  }

  // Destruturando o req.body
  let {avatar_url, name, birth, gender, services} = req.body

  birth            = Date.parse(birth)

  //criando a variavel que recebe o tempo de criação do instrutor
  const created_at = Date.now()

  //Inserindo um id (identificador único do instrutor) no arquivo data.json
  const id         = Number(data.instrutores.length)

  //inicia com uma chave de nome instrutores, sendo um Array[vazio]
  // e inseri novos dados no arquivo data.json [{...}]
  data.instrutores.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    
    if (err) return res.send("Write file error!")

    return res.redirect("/instrutores")

  })

  //return res.send(req.body)
  
}

//Exporta a função de criar cadastro
exports.create = function (req, res) {

  return res.render("instrutores/create")

}

//Exporta a função que exibi o usuários pelo id show
exports.show = function(req, res) {
  //req.params.id = /:id
  const { id } = req.params

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "instrutores"
  const encontrarInstrutor = data.instrutores.find(function(instrutor){

    return instrutor.id == id    

  })
  
  if (!encontrarInstrutor) return res.send("Instrutor não encontrado")

  const instrutor = {
    ...encontrarInstrutor,
    age: age(encontrarInstrutor.birth),
    services: encontrarInstrutor.services.split(","),
    created_at: new Intl
    .DateTimeFormat("pt-BR")
    .format(encontrarInstrutor.created_at),
  }
  
  //Renderiza a pagina show e envia os dados que a variável encontrarInstrutor
  //buscou do data.JSON para o front-end
  return res.render("instrutores/show", { instrutor })
}

//Exporta a função que edita os dados do usuários
exports.edit = function(req, res) {

  //req.params.id = /:id
  const { id } = req.params

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "instrutores"
  const encontrarInstrutor = data.instrutores.find(function(instrutor){

    return instrutor.id == id    

  })
  
  if (!encontrarInstrutor) return res.send("Instrutor não encontrado")

  //Retorna day--month--year  
  const instrutor = {
    ...encontrarInstrutor,
    birth: date(encontrarInstrutor.birth).iso
  }

  
  return res.render("instrutores/edit", { instrutor })

}

//Exporta a função que atualizar dados dos usuários
exports.put = function(req, res) {

    //req.body.id = /:id
    const { id } = req.body

    let index    = 0

    //Variável que busca dentro do arquivo data.JSON o Arry de objeto "instrutores"
    const encontrarInstrutor = data.instrutores.find(function(instrutor, encontarIndex){
  
      if ( instrutor.id == id ) {
        index = encontarIndex
        return true
      }   
  
    })
    
    if (!encontrarInstrutor) return res.send("Instrutor não encontrado")

    const instrutor = {
      ...encontrarInstrutor,
      ...req.body,
      birth:  Date.parse(req.body.birth),
      id:     Number(req.body.id)
    }
    
    data.instrutores[index] = instrutor

    fs.writeFile('data.json',JSON.stringify(data, null, 2), function(err){
      if(err) return res.send("Write error")

      return res.redirect(`/instrutores/${id}`)
    })
    
}

//Delete
exports.delete = function(req, res) {

  //
  const { id } = req.body

  //
  const filtraInstrutores = data.instrutores.filter(function(instrutor){

    return instrutor.id != id

  })

  data.instrutores = filtraInstrutores

  fs.writeFile('data.json', JSON.stringify(data,null, 2), function(err){

    if(err) return res.send("write Error")

    return res.redirect('/instrutores')

  })
}

