// common stuff for client/server. Do not put anything sensitive here
module.exports = {
  add_categories: [
  	{
  	  name: 'Real estate',
      sub: [{
        name: 'Apartments/Houses',
        sub: [],
      },
      {
        name: 'Land',
        sub: [],
      },
      {
        name: 'Offices',
        sub: [],
      }],
  	},
  	{
  	  name: 'Vehicles',
      sub: [{
        name: 'Motorcycles',
        sub: [],
      },
      {
        name: 'Cars',
        sub: [],
      },
      {
        name: 'Bikes',
        sub: [],
      }],
  	},
  	{
  	  name: 'Electronics',
      sub: [{
        name: 'Communication',
        sub: [{
          name: 'Cellphones',
          sub: [],
        },
        {
          name: 'Walkie talkies',
          sub: [],
        },
        {
          name: 'Faxes',
          sub: [],
        }
        ,
        {
          name: 'Satelite phones',
          sub: [],
        }],
        },
      {
        name: 'Computers',
        sub: [{
          name: 'PC',
          sub: [],
        },
        {
          name: 'PC parts',
          sub: [],
        },
        {
          name: 'Laptops',
          sub: [],
        },
        {
          name: 'Laptop parts',
          sub: [],
        },
        {
          name: 'Tablets',
          sub: [],
        }],
      },
      {
        name: 'Audio',
        sub: [],
      }],
  	},
  ]
}