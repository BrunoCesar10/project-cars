const db = require("../models");
Car = db.cars;

exports.create = (req, res) => {
    if (!req.body.model) {
        res.status(400).send({ message: "Conteúdo não pode estar vazio" });
        return;
    }

    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        name: req.body.name,
        year: req.body.year,
        price: req.body.price,
        color: req.body.color
    });

    car.save(car).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao inserir o carro"
        });
    });
};

exports.findAll = (req, res) => {
    const brand = req.query.brand;
    var condition = brand ? { brand: { $regex: new RegExp(brand), $options: "i" } } : {};

    Car.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ocorreu um erro ao buscar os carros"
        });
    });   
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Car.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Não foi encontrado o carro com este id" });
    }).catch(err => {
        res.status(500).send({ message: "Houve um erro ao buscar o carro com este id" });
    })
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Dados não podem estar vazios"
        });
      }
    
      const id = req.params.id;
    
      Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: "Não foi possível atualizar os dados deste carro"
            });
          } else res.send({ message: "Dados do carro atualizados com sucesso" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Houve um erro ao tentar atualizar os dados deste carro"
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

  Car.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "Houve um erro ao tentar excluir os dados deste carro"
        });
      } else {
        res.send({
          message: "Dados do carro excluídos com sucesso"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir os dados deste carro"
      });
    });
};

exports.deleteAll = (req, res) => {
    Car.deleteMany({})
    .then(data => {
      res.send({
        message: "Dados dos carros excluídos com sucesso"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao excluir os dados"
      });
    });
};