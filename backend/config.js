var config = {};

config.twitter = {};
config.redis = {};
config.web = {};
config.app = {};
config.db = {};
config.sendGrid = {};

config.default_stuff = ['red', 'green', 'blue', 'apple', 'yellow', 'orange', 'politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password = process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;
config.app.securedpath = '/api';	//this will be the secured api path from root
config.app.jwtsecret = '936ee7cf-b0f6-4140-909b-926694c2ac80';
config.sendGrid.ApiKey='';//Varun->SendGrid ApiKey for sending Mail--- old key



config.app.views = '../dist/mdb-angular-free';
//configure database properties

//demo db
// config.db.host = "trooworkdevdbinstance.c1c3s2r6mw5k.us-west-2.rds.amazonaws.com";
// config.db.user = "trooworkroot";
// config.db.password = "Zaq1Zaq1";
// config.db.database = "trooworkdb_lite";

// config.db.host = "troowork-lite-dev.mysql.database.azure.com";
// config.db.user = "trooworkdbadmin@troowork-lite-dev";
// config.db.password = "Zaq1Zaq1";
// config.db.database = "trooworkdb_lite";

// config.db.host = "192.168.1.113";
config.db.host = "localhost";
config.db.user = "root";
config.db.password = "root";
config.db.database = "trooworkdb_lite";

module.exports = config;
