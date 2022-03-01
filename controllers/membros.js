const fs            = require('fs')           //enviar os dados recebidos para o arquivo data.json
const data          = require("../data.json")  //armazena os dados no arquivo data.json
const { age, date } = require("../utils")      //Mostra quanto anos o membro tem

exports.index = function (req, res) {

  return res.render("membros/index", { membros: data.membros })

}

//Exporta a função de criar cadastro
exports.post = function(req, res) {

  // kyes retorna um Array["avatar_url","name","birth","gender","services"]
  const keys = Object.keys(req.body)

  for (key of keys) {

    if(req.body[key] == "")
      return res.send('Por favor, Preencha todos os campos')
      
  }

  
  birth            = Date.parse(req.body.birth)

  //criando a variavel que recebe o tempo de criação do membro
  // const created_at = Date.now()

  //
  let id           = 1
  const lastMembro     = data.membros[data.membros.length -1]
  if (lastMembro) {
    id = lastMembro.id + 1
  }

  // inicia com uma chave de nome membros, sendo um Array[vazio]
  // e inseri novos dados no arquivo data.json [{...}]
  // Destruturando o req.body
  data.membros.push({
    id, 
    ...req.body,       
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    
    if (err) return res.send("Write file error!")

    return res.redirect("/membros")

  })

  //return res.send(req.body)
  
}

//Exporta a função create

exports.create = function (req, res) {

  return res.render("membros/create")

}

//Exporta a função que exibi o usuários pelo id show
exports.show = function(req, res) {
  //req.params.id = /:id
  const { id } = req.params

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "membros"
  const encontrarMembro = data.membros.find(function(membro){

    return membro.id == id    

  })
  
  if (!encontrarMembro) return res.send("membro não encontrado")

  const membro = {
    ...encontrarMembro,
    age: date(encontrarMembro.birth).birthDay    
    
  }
  
  //Renderiza a pagina show e envia os dados que a variável encontrarMembro
  //buscou do data.JSON para o front-end
  return res.render("membros/show", { membro })
}

//Exporta a função que edita os dados do usuários
exports.edit = function(req, res) {

  //req.params.id = /:id
  const { id } = req.params

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "membros"
  const encontrarMembro = data.membros.find(function(membro){

    return membro.id == id    

  })
  
  if (!encontrarMembro) return res.send("membro não encontrado")

  //Retorna day--month--year  
  const membro = {
    ...encontrarMembro,
    birth: date(encontrarMembro.birth).iso
  }

  
  return res.render("membros/edit", { membro })

}

//Exporta a função que atualizar dados dos usuários
exports.put = function(req, res) {

    //req.body.id = /:id
    const { id } = req.body

    let index    = 0

    //Variável que busca dentro do arquivo data.JSON o Arry de objeto "membros"
    const encontrarMembro = data.membros.find(function(membro, encontarIndex){
  
      if ( membro.id == id ) {
        index = encontarIndex
        return true
      }   
  
    })
    
    if (!encontrarMembro) return res.send("membro não encontrado")

    const membro = {
      ...encontrarMembro,
      ...req.body,
      birth:  Date.parse(req.body.birth),
      id:     Number(req.body.id)
    }
    
    data.membros[index] = membro

    fs.writeFile('data.json',JSON.stringify(data, null, 2), function(err){
      if(err) return res.send("Write error")

      return res.redirect(`/membros/${id}`)
    })
    
}

//Delete
exports.delete = function(req, res) {

  //
  const { id } = req.body

  //
  const filtraMembros = data.membros.filter(function(membro){

    return membro.id != id

  })

  data.membros = filtraMembros

  fs.writeFile('data.json', JSON.stringify(data,null, 2), function(err){

    if(err) return res.send("write Error")

    return res.redirect('/membros')

  })
}

