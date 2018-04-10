function habitacoesDAO(connection) {
  this._connection = connection;
}

habitacoesDAO.prototype.save = function(habitacao, id, callback) {

  let query = null;
  if (id === null) {
    query = `insert into habitacoes ( titular_1,
                                      naturalidade_1,
                                      pai_1,
                                      mae_1,
                                      nascimento_1,
                                      estado_civil_1,
                                      escolaridade_1,
                                      cpf_1,
                                      rg_1,
                                      viculo_titular_1_com_titular_2,
                                      atividade_1,
                                      renda_1,
                                      informal_1,
                                      formal_1,
                                      empresa_1,
                                      pcd_1,
                                      pcd_qual_1,
                                      doenca_grave_1,
                                      doenca_qual_1,
                                      bolsa_familia_1,
                                      bolsa_familia_valor_1,
                                      bpc_1,
                                      bpc_valor_1,
                                      inscrito_cadastro_unico_1,
                                      inscricao_cadastro_unico_1,
                                      titular_2,
                                      naturalidade_2,
                                      pai_2,
                                      mae_2,
                                      nascimento_2,
                                      estado_civil_2,
                                      escolaridade_2,
                                      cpf_2,
                                      rg_2,
                                      viculo_titular_2_com_titular_1,
                                      atividade_2,
                                      renda_2,
                                      informal_2,
                                      formal_2,
                                      empresa_2,
                                      pcd_2,
                                      pcd_qual_2,
                                      doenca_grave_2,
                                      doenca_qual_2,
                                      bolsa_familia_2,
                                      bolsa_familia_valor_2,
                                      bpc_2,
                                      bpc_valor_2,
                                      inscrito_cadastro_unico_2,
                                      inscricao_cadastro_unico_2,
                                      endereco,
                                      numero,
                                      bairro,
                                      telefones,
                                      tempo_moradia_anos,
                                      tempo_moradia_meses,
                                      procedencia_municipio,
                                      procedencia_uf,
                                      cooperativa_inscricao,
                                      cooperativa_nome,
                                      moradia_atual,
                                      ocupacao,
                                      titular,
                                      cras,
                                      caps,
                                      associacao_moradores,
                                      comprovante_residencia,
                                      comprovante_tempo_campo_bom,
                                      comprovante_cpf_rg,
                                      comprovante_renda,
                                      comprovante_deficiencia_doenca_grave,
                                      outras_rendas,
                                      observacao,
                                      createdAt,
                                      updatedAt )
                             values ( '${habitacao.titular_1}',
                                      '${habitacao.naturalidade_1}',
                                      '${habitacao.pai_1}',
                                      '${habitacao.mae_1}',
                                       ${habitacao.nascimento_1},
                                      '${habitacao.estado_civil_1}',
                                      '${habitacao.escolaridade_1}',
                                      '${habitacao.cpf_1}',
                                      '${habitacao.rg_1}',
                                      '${habitacao.viculo_titular_1_com_titular_2}',
                                      '${habitacao.atividade_1}',
                                       ${habitacao.renda_1},
                                       ${habitacao.informal_1},
                                       ${habitacao.formal_1},
                                      '${habitacao.empresa_1}',
                                       ${habitacao.pcd_1},
                                      '${habitacao.pcd_qual_1}',
                                       ${habitacao.doenca_grave_1},
                                      '${habitacao.doenca_qual_1}',
                                       ${habitacao.bolsa_familia_1},
                                       ${habitacao.bolsa_familia_valor_1},
                                       ${habitacao.bpc_1},
                                       ${habitacao.bpc_valor_1},
                                       ${habitacao.inscrito_cadastro_unico_1},
                                      '${habitacao.inscricao_cadastro_unico_1}',
                                      '${habitacao.titular_2}',
                                      '${habitacao.naturalidade_2}',
                                      '${habitacao.pai_2}',
                                      '${habitacao.mae_2}',
                                       ${habitacao.nascimento_2},
                                      '${habitacao.estado_civil_2}',
                                      '${habitacao.escolaridade_2}',
                                      '${habitacao.cpf_2}',
                                      '${habitacao.rg_2}',
                                      '${habitacao.viculo_titular_2_com_titular_1}',
                                      '${habitacao.atividade_2}',
                                       ${habitacao.renda_2},
                                       ${habitacao.informal_2},
                                       ${habitacao.formal_2},
                                      '${habitacao.empresa_2}',
                                       ${habitacao.pcd_2},
                                      '${habitacao.pcd_qual_2}',
                                       ${habitacao.doenca_grave_2},
                                      '${habitacao.doenca_qual_2}',
                                       ${habitacao.bolsa_familia_2},
                                       ${habitacao.bolsa_familia_valor_2},
                                       ${habitacao.bpc_2},
                                       ${habitacao.bpc_valor_2},
                                       ${habitacao.inscrito_cadastro_unico_2},
                                      '${habitacao.inscricao_cadastro_unico_2}',
                                      '${habitacao.endereco}',
                                      '${habitacao.numero}',
                                      '${habitacao.bairro}',
                                      '${habitacao.telefones}',
                                       ${habitacao.tempo_moradia_anos},
                                       ${habitacao.tempo_moradia_meses},
                                      '${habitacao.procedencia_municipio}',
                                      '${habitacao.procedencia_uf}',
                                       ${habitacao.cooperativa_inscricao},
                                      '${habitacao.cooperativa_nome}',
                                      '${habitacao.moradia_atual}',
                                      '${habitacao.ocupacao}',
                                      '${habitacao.titular}',
                                       ${habitacao.cras},
                                       ${habitacao.caps},
                                       ${habitacao.associacao_moradores},
                                       ${habitacao.comprovante_residencia},
                                       ${habitacao.comprovante_tempo_campo_bom},
                                       ${habitacao.comprovante_cpf_rg},
                                       ${habitacao.comprovante_renda},
                                       ${habitacao.comprovante_deficiencia_doenca_grave},
                                       ${habitacao.outras_rendas},
                                      '${habitacao.observacao}',
                                      now(),
                                      now());`;
  } else {
   query = `update habitacoes
               set titular_1                            = '${habitacao.titular_1}',
                   naturalidade_1                       = '${habitacao.naturalidade_1}',
                   pai_1                                = '${habitacao.pai_1}',
                   mae_1                                = '${habitacao.mae_1}',
                   nascimento_1                         =  ${habitacao.nascimento_1},
                   estado_civil_1                       = '${habitacao.estado_civil_1}',
                   escolaridade_1                       = '${habitacao.escolaridade_1}',
                   cpf_1                                = '${habitacao.cpf_1}',
                   rg_1                                 = '${habitacao.rg_1}',
                   viculo_titular_1_com_titular_2       = '${habitacao.viculo_titular_1_com_titular_2}',
                   atividade_1                          = '${habitacao.atividade_1}',
                   renda_1                              =  ${habitacao.renda_1},
                   informal_1                           =  ${habitacao.informal_1},
                   formal_1                             =  ${habitacao.formal_1},
                   empresa_1                            = '${habitacao.empresa_1}',
                   pcd_1                                =  ${habitacao.pcd_1},
                   pcd_qual_1                           = '${habitacao.pcd_qual_1}',
                   doenca_grave_1                       =  ${habitacao.doenca_grave_1},
                   doenca_qual_1                        = '${habitacao.doenca_qual_1}',
                   bolsa_familia_1                      =  ${habitacao.bolsa_familia_1},
                   bolsa_familia_valor_1                =  ${habitacao.bolsa_familia_valor_1},
                   bpc_1                                =  ${habitacao.bpc_1},
                   bpc_valor_1                          =  ${habitacao.bpc_valor_1},
                   inscrito_cadastro_unico_1            =  ${habitacao.inscrito_cadastro_unico_1},
                   inscricao_cadastro_unico_1           = '${habitacao.inscricao_cadastro_unico_1}',
                   titular_2                            = '${habitacao.titular_2}',
                   naturalidade_2                       = '${habitacao.naturalidade_2}',
                   pai_2                                = '${habitacao.pai_2}',
                   mae_2                                = '${habitacao.mae_2}',
                   nascimento_2                         =  ${habitacao.nascimento_2},
                   estado_civil_2                       = '${habitacao.estado_civil_2}',
                   escolaridade_2                       = '${habitacao.escolaridade_2}',
                   cpf_2                                = '${habitacao.cpf_2}',
                   rg_2                                 = '${habitacao.rg_2}',
                   viculo_titular_2_com_titular_1       = '${habitacao.viculo_titular_2_com_titular_1}',
                   atividade_2                          = '${habitacao.atividade_2}',
                   renda_2                              =  ${habitacao.renda_2},
                   informal_2                           =  ${habitacao.informal_2},
                   formal_2                             =  ${habitacao.formal_2},
                   empresa_2                            = '${habitacao.empresa_2}',
                   pcd_2                                =  ${habitacao.pcd_2},
                   pcd_qual_2                           = '${habitacao.pcd_qual_2}',
                   doenca_grave_2                       =  ${habitacao.doenca_grave_2},
                   doenca_qual_2                        = '${habitacao.doenca_qual_2}',
                   bolsa_familia_2                      =  ${habitacao.bolsa_familia_2},
                   bolsa_familia_valor_2                =  ${habitacao.bolsa_familia_valor_2},
                   bpc_2                                =  ${habitacao.bpc_2},
                   bpc_valor_2                          =  ${habitacao.bpc_valor_2},
                   inscrito_cadastro_unico_2            =  ${habitacao.inscrito_cadastro_unico_2},
                   inscricao_cadastro_unico_2           = '${habitacao.inscricao_cadastro_unico_2}',
                   endereco                             = '${habitacao.endereco}',
                   numero                               = '${habitacao.numero}',
                   bairro                               = '${habitacao.bairro}',
                   telefones                            = '${habitacao.telefones}',
                   tempo_moradia_anos                   =  ${habitacao.tempo_moradia_anos},
                   tempo_moradia_meses                  =  ${habitacao.tempo_moradia_meses},
                   procedencia_municipio                = '${habitacao.procedencia_municipio}',
                   procedencia_uf                       = '${habitacao.procedencia_uf}',
                   cooperativa_inscricao                =  ${habitacao.cooperativa_inscricao},
                   cooperativa_nome                     = '${habitacao.cooperativa_nome}',
                   moradia_atual                        = '${habitacao.moradia_atual}',
                   ocupacao                             = '${habitacao.ocupacao}',
                   titular                              = '${habitacao.titular}',
                   cras                                 =  ${habitacao.cras},
                   caps                                 =  ${habitacao.caps},
                   associacao_moradores                 =  ${habitacao.associacao_moradores},
                   comprovante_residencia               =  ${habitacao.comprovante_residencia},
                   comprovante_tempo_campo_bom          =  ${habitacao.comprovante_tempo_campo_bom},
                   comprovante_cpf_rg                   =  ${habitacao.comprovante_cpf_rg},
                   comprovante_renda                    =  ${habitacao.comprovante_renda},
                   comprovante_deficiencia_doenca_grave =  ${habitacao.comprovante_deficiencia_doenca_grave},
                   outras_rendas                        =  ${habitacao.outras_rendas},
                   observacao                           = '${habitacao.observacao}',
                   updatedAt                            = now()
             where id = ${habitacao.id};`;
  }

  this._connection.query(query, callback);
}

habitacoesDAO.prototype.list = function(callback) {
  this._connection.query('select * from habitacoes',callback);
}

habitacoesDAO.prototype.getById = function (id,callback) {
  this._connection.query("select * from habitacoes where id = ?",[id],callback);
}

habitacoesDAO.prototype.getPaginate = function (limit, callback) {
  this._connection.query(`select ceil(count(*) / ?) as total from habitacoes where deleted = false;`, [limit], callback);
}

habitacoesDAO.prototype.getListPaginate = function (page, limit, callback) {
  this._connection.query(`select h.id as id,
                                 h.titular_1 as titular_1,
                                 h.titular_2 as titular_2
                            from habitacoes h
                           where deleted = false
                           order by h.id asc
                           limit ?,?`, [page, limit], callback);
}

habitacoesDAO.prototype.verificarCpf = function (cpf1, cpf2, callback) {
  let query = null;
  if (cpf2 != "") {
    query = `select *
               from habitacoes
              where (cpf_1 = '${cpf1}'
                 or cpf_2 = '${cpf1}'
                 or cpf_1 = '${cpf2}'
                 or cpf_2 = '${cpf2}')
                and deleted = false`;
  } else {
    query = `select *
               from habitacoes
              where (cpf_1 = '${cpf1}'
                 or cpf_2 = '${cpf1}')
                and deleted = false`;
  }

  this._connection.query(query, callback);
}

habitacoesDAO.prototype.delete = function(id, callback) {
  this._connection.query('update habitacoes set deleted = true where id = ?', id, callback);
}


module.exports = function(){
    return habitacoesDAO;
};