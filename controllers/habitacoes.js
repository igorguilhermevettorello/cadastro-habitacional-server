module.exports = function(app){

  function formatDate(data) {
    if (data == null || data == '') return null;
    data = data.split("/");
    return `'${data[2]}-${data[1]}-${data[0]}'`;
  }

  function formatDecimal(numero) {
    if (numero == null || numero == '') return 0;
    numero = numero.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
    return parseFloat(numero);
  }

  app.get('/habitacoes/habitacoes/:page', (req, res) => {

    let limit = 4;
    let pagina = (isNaN(parseInt(req.params.page))) ? 1 : parseInt(req.params.page);
    pagina = (pagina == 0) ? 1 : pagina;

    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    habitacoesDAO.getPaginate(limit, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        if (result.length == 0) {
          let msg = {msg: "Registro não encontrado."};
          connection.end();
          res.status(404).json(error);
        } else if (result.length > 1) {
          let msg = {msg: "Erro Interno. Nossa equipe irá verificar essa inconsistência."};
          connection.end();
          res.status(500).json(error);
        } else {

          let total = parseInt(result[0].total);
          if (pagina > total) {
            pagina = total;
          }

          let paginacao = [];
          let next = (pagina == total) ? total : pagina+1;
          let prev = (pagina == 1) ? pagina : pagina-1;

          paginacao.push({
            descricao: '<<',
            pagina: 1
          });

          paginacao.push({
            descricao: '<',
            pagina: prev
          });

          for(let i = 1; i <= total; i++) {
            paginacao.push({
              descricao: i,
              pagina: i
            });
          }

          paginacao.push({
            descricao: '>',
            pagina: next
          });

          paginacao.push({
            descricao: '>>',
            pagina: total
          });

          let page = (pagina - 1) * limit;
          habitacoesDAO.getListPaginate(page, limit, (error, result) => {
            if (error) {
              connection.end();
              res.status(404).json(error);
            } else {
              if (result.length == 0) {
                let msg = {msg: "Registro não encontrado."};
                connection.end();
                res.status(404).json(msg);
              } else {
                let listagem = {
                  paginacao: paginacao,
                  lista: result
                }
                connection.end();
                res.status(200).json(listagem);
              }
            }
          });
        }
      }
    });
  });

  app.get('/habitacoes/habitacao/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    let dados = {};
    habitacoesDAO.getById(id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        if (result.length == 0) {
          let msg = {msg: "Registro não encontrado."}
          connection.end();
          res.status(404).json(msg);
        } else if (result.length > 1) {
          let msg = {msg: "Erro Interno. Nossa equipe irá verificar essa inconsistência."}
          connection.end();
          res.status(500).json(error);
        } else {
          dados.habitacoes = result[0];
          let composicaoFamiliarDAO = new app.persistencia.ComposicaoFamiliarDAO(connection);
          composicaoFamiliarDAO.getByHabitacaoId(id, (error, result) => {
            if (error) {
              connection.end();
              res.status(404).json(error);
            } else {
              dados.composicao_familiar = result;
              connection.end();
              res.status(200).json(dados);
            }
          });
        }
      }
    });
  });

  app.get('/habitacoes/cpf/:id/:cpf1/:cpf2', (req, res) => {
    let id = req.params.id;
    let cpf1 = req.params.cpf1;
    let cpf2 = req.params.cpf2;
    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    habitacoesDAO.verificarCpf(cpf1, cpf2, (error, result) => {
      if (error) {
        console.log("error", error);
        let msg = {msg: "Erro Interno. Nossa equipe irá verificar essa inconsistência."};
        connection.end();
        res.status(500).json(msg);
      } else {

        let update = true;
        let vinculo = null;

        if (result.length >= 1) {
          result.map(item => {
            if (item.id != id) {
              update = false;
              vinculo = item.id;
            }
          });
        }

        if (update) {
          connection.end();
          res.status(200).json();
        } else {
          let msg = {
            msg: "Cpf já está vinculado ao cadastro:" + vinculo,
            cadastrar: false
          };
          connection.end();
          res.status(403).json(msg);
        }
      }
    });
  });

  app.post('/habitacoes/habitacao', function(req, res){
    let dados = req.body;

    let habitacao = dados.habitacoes;
    habitacao.nascimento_1 = formatDate(habitacao.nascimento_1);
    habitacao.nascimento_2 = formatDate(habitacao.nascimento_2);
    habitacao.renda_1 = formatDecimal(habitacao.renda_1);
    habitacao.renda_2 = formatDecimal(habitacao.renda_2);
    habitacao.bolsa_familia_valor_1 = formatDecimal(habitacao.bolsa_familia_valor_1);
    habitacao.bpc_valor_1 = formatDecimal(habitacao.bpc_valor_1);
    habitacao.bolsa_familia_valor_2 = formatDecimal(habitacao.bolsa_familia_valor_2);
    habitacao.bpc_valor_2 = formatDecimal(habitacao.bpc_valor_2);
    habitacao.tempo_moradia_anos = (isNaN(parseInt(habitacao.tempo_moradia_anos))) ? 0 : parseInt(habitacao.tempo_moradia_anos);
    habitacao.tempo_moradia_meses = (isNaN(parseInt(habitacao.tempo_moradia_meses))) ? 0 : parseInt(habitacao.tempo_moradia_meses);

    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    habitacoesDAO.save(habitacao, null, (error, result) => {
      if (error) {
        connection.end();
        console.log("error > one", error);
        res.status(400).json(error);
      } else {

        dados.id = result.insertId;

        if (dados.composicao_familiar.length > 0) {
          dados.composicao_familiar.map(item => {
            item.id = null;
            item.habitacao_id = dados.id;
            item.dt_nascimento = formatDate(item.dt_nascimento);
            item.renda = formatDecimal(item.renda);
            item.bolsa_familia_valor = formatDecimal(item.bolsa_familia_valor);
            item.bpc_valor = formatDecimal(item.bpc_valor);
          });

          let composicaoFamiliarDAO = new app.persistencia.ComposicaoFamiliarDAO(connection);
          composicaoFamiliarDAO.save(dados.composicao_familiar, (error, result) => {
            if (error) {
              connection.end();
              console.log("error > two", error);
              res.status(400).json(error);
            } else {
              if (result.length >= 1) {
                result.map((rs, i) => {
                  dados.composicao_familiar.map((cf, ii) => {
                    if (i == ii) {
                      cf.id = rs.insertId;
                    }
                  });
                });
              }
              connection.end();
              res.status(201).json(dados);
            }
          });
        } else {
          connection.end();
          res.status(201).json(dados);
        }

      }
    });
  });

  app.put('/habitacoes/habitacao/:id', (req, res) => {
    let id = req.params.id;
    let dados = req.body;

    let habitacao = dados.habitacoes;
    habitacao.id = id;
    habitacao.nascimento_1 = formatDate(habitacao.nascimento_1);
    habitacao.nascimento_2 = formatDate(habitacao.nascimento_2);
    habitacao.renda_1 = formatDecimal(habitacao.renda_1);
    habitacao.renda_2 = formatDecimal(habitacao.renda_2);
    habitacao.bolsa_familia_valor_1 = formatDecimal(habitacao.bolsa_familia_valor_1);
    habitacao.bpc_valor_1 = formatDecimal(habitacao.bpc_valor_1);
    habitacao.bolsa_familia_valor_2 = formatDecimal(habitacao.bolsa_familia_valor_2);
    habitacao.bpc_valor_2 = formatDecimal(habitacao.bpc_valor_2);
    habitacao.tempo_moradia_anos = (isNaN(parseInt(habitacao.tempo_moradia_anos))) ? 0 : parseInt(habitacao.tempo_moradia_anos);
    habitacao.tempo_moradia_meses = (isNaN(parseInt(habitacao.tempo_moradia_meses))) ? 0 : parseInt(habitacao.tempo_moradia_meses);

    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    habitacoesDAO.save(habitacao, id, (error, result) => {
      if (error) {
        connection.end();
        console.log("error > one", error);
        res.status(400).json(error);
      } else {

        dados.id = id;

        if (dados.composicao_familiar.length > 0) {
          dados.composicao_familiar.map(item => {
            item.id = (item.id == "") ? null : item.id;
            item.habitacao_id = dados.id;
            item.dt_nascimento = formatDate(item.dt_nascimento);
            item.renda = formatDecimal(item.renda);
            item.bolsa_familia_valor = formatDecimal(item.bolsa_familia_valor);
            item.bpc_valor = formatDecimal(item.bpc_valor);
          });

          console.log("dados.composicao_familiar", dados.composicao_familiar);

          let composicaoFamiliarDAO = new app.persistencia.ComposicaoFamiliarDAO(connection);
          composicaoFamiliarDAO.save(dados.composicao_familiar, (error, result) => {
            if (error) {
              connection.end();
              console.log("error > two", error);
              res.status(400).json(error);
            } else {

              composicaoFamiliarDAO.getByHabitacaoId(dados.id, (error, result) => {
                if (error) {
                  connection.end();
                  console.log("error > three", error);
                  res.status(400).json(error);
                } else {
                  dados.composicao_familiar = result;
                  connection.end();
                  res.status(201).json(dados);
                }
              });
            }
          });
        } else {
          connection.end();
          res.status(201).json(dados);
        }
      }
    });
  });

  app.delete('/habitacoes/habitacao/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let habitacoesDAO = new app.persistencia.HabitacoesDAO(connection);
    habitacoesDAO.delete(id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(204).json(result);
      }
    });
  });
}