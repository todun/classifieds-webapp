const db = {};

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

sequelize.sync({ /*force: true*/ })
  .then(() => {
    console.log(`Database & tables created!`)
});

db.add = sequelize.define('add', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  buysell: Sequelize.INTEGER,
  title: { type: Sequelize.STRING, allowNull:false, validate: { len: [3,100], notEmpty: true, notNull: true }},
  text: { type: Sequelize.STRING, allowNull:false, validate: { len: [3,1000], notEmpty: true, notNull: true }},
  email: { type: Sequelize.STRING, allowNull:false, validate: { isEmail: true, notEmpty: true, notNull: true }},
  phone: Sequelize.STRING,
  address: Sequelize.STRING,
  category: Sequelize.STRING,
  price: Sequelize.DECIMAL(10,2)
});
db.add_fillable = ['buysell', 'title', 'text', 'email', 'phone', 'address', 'category', 'price'];

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;