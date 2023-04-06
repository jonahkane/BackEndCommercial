const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//will get all categories listed
router.get('/', async (req, res) => {
try {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData)
} catch(err) {
  res.status(500).json(err)
}
  });
// will get by specific ID
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
//posting new 
router.post('/', async (req, res) => {
 try { 
  const categoryData = await Category.create(req.body);
  res.status(200).json({ message: "new category added" });
  } catch(err) {
    res.status(500).json(err)
  }
});
//updating by specific id
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
  
//deleting by specific id
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
