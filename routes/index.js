var express = require('express');
var router = express.Router();
var request = require('superagent');

var auth = "da56d80c34c9a1c121c5c5442e490220";
var zabbix_api = "http://localhost/zabbix/api_jsonrpc.php"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ultimos 10 valores de um item. */
router.get('/item-history', function(req, res) {
	var request_body = {
	    "jsonrpc": "2.0",
	    "method": "history.get",
	    "params": {
	        "output": "extend",
	        "history": 0,
	        "itemids": req.query.itemid,
	        "sortfield": "clock",
	        "sortorder": "DESC",
	        "limit": parseInt(req.query.limit)
	    },
	    "auth": auth,
	    "id": 1
	}

	request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.render('item-history', response.body);
		})
		.catch(error => {
  			res.status(err.status || 404);
  			res.render('error');
		}) 

});


/* GET itens de um grupid e hostid */
router.get('/itens-host-group', function(req, res) {
	var request_body = {
	    "jsonrpc": "2.0",
	    "method": "item.get",
	    "params": {
	        "output": "extend",
	        "hostids": req.query.hostids,
	        "sortfield": "name",
	        "groupid": req.query.groupid
	    },
	    "auth": auth,
	    "id": 1
	}

	request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.render('itens-host-group', response.body)
		})
		.catch(error => {
			res.status(err.status || 404);
  			res.render('error');
		}) 
});

/* GET itens de um grupid e hostid */
router.get('/host-list', function(req, res) {
	var request_body = {
	    "jsonrpc": "2.0",
	    "method": "host.get",
		"params": {
		        "output": [
		            "hostid",
		            "host"
		        ],
		        "selectInterfaces": [
		            "interfaceid",
		            "ip"
		        ]
		    },
	    "auth": auth,
	    "id": 1
	}

	request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.render('host-list', response.body)
		})
		.catch(error => {
			res.status(err.status || 404);
  			res.render('error');
		}) 
});

/* GET itens de um grupid e hostid */
router.get('/group-list', function(req, res) {
	var request_body = {
	    "jsonrpc": "2.0",
	    "method": "hostgroup.get",
	    "params": {
	    	"output": "extend"
	    },
	    "auth": auth,
	    "id": 1
	}

	request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.render('group-list', response.body)
		})
		.catch(error => {
			res.status(err.status || 404);
  			res.render('error');
		}) 
});

module.exports = router;