'use strict';
module.exports = (sequelize, DataTypes) => {
  var permissoes = sequelize.define('permissoes', {
    id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  permissoes.associate = function(models) {
    // associations can be defined here
  };
  return permissoes;
};