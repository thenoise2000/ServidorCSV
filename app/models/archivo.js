module.exports = (sequelize, Sequelize) => {
	const Archivo = sequelize.define('archivo', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  file: {
			type: Sequelize.STRING
	  },
	  text: {
			type: Sequelize.TEXT
	  },
	  number: {
			type: Sequelize.INTEGER
	  },
	  hex: {
		type: Sequelize.STRING(32)
  }
  
	});
	
	return Archivo;
}