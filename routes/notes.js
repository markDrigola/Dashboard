let express = require('express');
let router = express.Router();


//Конектим контроллер клиента на бэкенде
const clients = require('../controllers/clients');

//Ответ сервера на запрос клиентов - возврат всех клиентов
// router.get('*', function(req, res, next) {
//     if(!req.isAuthenticated()) {
//         //fixme - ajax request
//         res.statusCode(401).redirect('/login');
//     } else {
//         next();
//     }
// });
/* GET users listing. */
router.get('/', function(req, res, next) {
    clients.getAllClients().then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

router.get('/toDay', function(req, res, next) {
    clients.getAllClientsToDay().then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

router.get('/prevDays', function(req, res, next) {
    clients.getAllClientsPrevDay().then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

//Добавление новой записи клиента в базу

router.post('/', (req, res, next)=> {
    clients.createClient(req.body).then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

router.put('/ref', (req, res, next)=> {
    clients.refactoringClient(req.body).then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

module.exports = router;
