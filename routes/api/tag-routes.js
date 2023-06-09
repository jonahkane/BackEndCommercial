const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get tag by id
router.get('/:id', async (req, res) => {
try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  if (!tagData) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});
//create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body); 
    res.status(200).json({ message: "new tag created" });
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});
//update tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json({ message: "Tag updated"});
  } catch (err) {
    res.status(500).json(err);
  }
    }); 
  // update a tag's name by its `id` value

//delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData){
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json({ message : "tag deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
