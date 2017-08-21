let express = require('express');
let router = express.Router();


//Конектим контроллер клиента на бэкенде
const tasks = require('../controllers/tasks');

router.get('/', function(req, res, next) {
    tasks.getAllTask().then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

//Добавление новой записи задачи в базу
router.post('/', (req, res, next)=> {
    tasks.createTask(req.body).then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

//редактирование
router.put('/', (req, res, next)=> {
    tasks.refactoringTask(req.body).then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});

//удаление
router.delete('/:id', (req, res, next)=> {
    tasks.deleteTask(req.params).then((data)=> {
        res.status(200).send(data);
    },(error)=> {
        res.status(400).send(error);
    }).catch((error)=> {
        res.status(500).send(error);
    });
});


module.exports = router;

