const fs = require('fs');
const Sauce = require('../models/sauce');

exports.createsauce = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    const thing = new Sauce({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename}`,
    });
    sauce
        .save()
        .then(() => res.status(201).json({ sauce }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res) => {
    const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename}`,
        }
        : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id },
    )
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res) => {
    switch (req.body.like) {
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.find((user) => user === req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                                _id: req.params.id,
                            },
                        )
                            .then(() => {
                                res
                                    .status(201)
                                    .json({ message: 'Ton avis a été pris en compte!' });
                            })
                            .catch((error) => {
                                res.status(400).json({ error });
                            });
                    }
                    if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                                _id: req.params.id,
                            },
                        )
                            .then(() => {
                                res
                                    .status(201)
                                    .json({ message: 'Ton avis a été pris en compte!' });
                            })
                            .catch((error) => {
                                res.status(400).json({ error });
                            });
                    }
                })
                .catch((error) => {
                    res.status(404).json({ error });
                });
            break;
        case 1:
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                    _id: req.params.id,
                },
            )
                .then(() => {
                    res.status(201).json({ message: 'Ton like a été pris en compte!' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
            break;
        case -1:
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                    _id: req.params.id,
                },
            )
                .then(() => {
                    res
                        .status(201)
                        .json({ message: 'Ton dislike a été pris en compte!' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
            break;
        default:
            console.error('mauvaise requête');
    }
}
