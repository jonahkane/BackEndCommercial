const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
  // be sure to include its associated Products
try {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData)
} catch(err) {
  res.status(500).json(err)
}
  });

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
if (!categoryData) {
  res.status(404).json({ message: 'No category with this id!'});
  return;
}
   res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
 try { 
  const categoryData = await Category.create(req.body);
  res.status(200).json({ message: "new category added" });
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category with this id!'});
    return;
  }
  res.status(200).json({ message: "category updated" });
  console.log(categoryData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
} 
});
  

router.delete('/:id', async (req, res) => {
try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No category with this id!'});
    return;
    }
    res.status(200).json({ message: "category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});    
module.exports = router;
