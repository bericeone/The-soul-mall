const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    nickname: '管理员'
  },
  {
    id: 2,
    username: 'test',
    password: '123456',
    nickname: '测试用户'
  }
];


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    
    res.json({
      code: 0,
      data: {
        id: user.id,
        username: user.username,
        nickname: user.nickname
      },
      message: '登录成功'
    });
  } else {
    
    res.json({
      code: 1,
      message: '用户名或密码错误'
    });
  }
});


const categories = [
  { id: 1, name: '黑暗之魂系列', icon: '/images/categories/darksouls.png' },
  { id: 2, name: '血源诅咒', icon: '/images/categories/bloodborne.png' },
  { id: 3, name: '只狼', icon: '/images/categories/sekiro.png' },
  { id: 4, name: '艾尔登法环', icon: '/images/categories/elden-ring.png' }
];

const goods = [
  
  {
    id: 1,
    name: '黑暗之魂3 豪华版',
    game: '黑暗之魂3',
    price: 298.00,
    stock: 50,
    image: '/images/goods/ds3-deluxe.jpg',
    description: '包含游戏本体和所有DLC内容',
    category: 1
  },
  {
    id: 2,
    name: '黑暗之魂3 原声带',
    game: '黑暗之魂3',
    price: 199.00,
    stock: 30,
    image: '/images/goods/ds3-soundtrack.png',
    description: '游戏原声音乐集，包含所有BGM',
    category: 1
  },
  {
    id: 3,
    name: '黑暗之魂3 艺术设定集',
    game: '黑暗之魂3',
    price: 299.00,
    stock: 20,
    image: '/images/goods/ds3-artbook.png',
    description: '游戏美术设定集，包含角色、场景等原画',
    category: 1
  },
  {
    id: 4,
    name: '黑暗之魂3 太阳骑士索拉尔手办',
    game: '黑暗之魂3',
    price: 599.00,
    stock: 15,
    image: '/images/goods/ds3-figure.png',
    description: '高品质手办，高度约25cm',
    category: 1
  },
  
  {
    id: 5,
    name: '血源诅咒 年度版',
    game: '血源诅咒',
    price: 268.00,
    stock: 40,
    image: '/images/goods/bloodborne-goty.png',
    description: '包含游戏本体和老猎人DLC',
    category: 2
  },
  {
    id: 6,
    name: '血源诅咒 原声带',
    game: '血源诅咒',
    price: 199.00,
    stock: 25,
    image: '/images/goods/bb-ost.jpg',
    description: '游戏原声音乐集，包含所有BGM',
    category: 2
  },
  {
    id: 7,
    name: '血源诅咒 艺术设定集',
    game: '血源诅咒',
    price: 299.00,
    stock: 20,
    image: '/images/goods/bb-artbook.jpg',
    description: '游戏美术设定集，包含角色、场景等原画',
    category: 2
  },
  {
    id: 8,
    name: '血源诅咒 手办 - 猎人',
    game: '血源诅咒',
    price: 699.00,
    stock: 10,
    image: '/images/goods/bb-figure.jpg',
    description: '高品质手办，高度约30cm',
    category: 2
  },
 
  {
    id: 9,
    name: '只狼 年度版',
    game: '只狼',
    price: 298.00,
    stock: 45,
    image: '/images/goods/sekiro-goty.jpg',
    description: '包含游戏本体和所有更新内容',
    category: 3
  },
  {
    id: 10,
    name: '只狼 原声带',
    game: '只狼',
    price: 199.00,
    stock: 30,
    image: '/images/goods/sekiro-ost.jpg',
    description: '游戏原声音乐集，包含所有BGM',
    category: 3
  },
  {
    id: 11,
    name: '只狼 艺术设定集',
    game: '只狼',
    price: 299.00,
    stock: 25,
    image: '/images/goods/sekiro-artbook.jpg',
    description: '游戏美术设定集，包含角色、场景等原画',
    category: 3
  },
  {
    id: 12,
    name: '只狼 手办 - 狼',
    game: '只狼',
    price: 799.00,
    stock: 15,
    image: '/images/goods/sekiro-figure.jpg',
    description: '高品质手办，高度约28cm',
    category: 3
  },
  
  {
    id: 13,
    name: '艾尔登法环 豪华版',
    game: '艾尔登法环',
    price: 398.00,
    stock: 60,
    image: '/images/goods/er-deluxe.jpg',
    description: '包含游戏本体和数字艺术设定集',
    category: 4
  },
  {
    id: 14,
    name: '艾尔登法环 原声带',
    game: '艾尔登法环',
    price: 199.00,
    stock: 35,
    image: '/images/goods/er-ost.jpg',
    description: '游戏原声音乐集，包含所有BGM',
    category: 4
  },
  {
    id: 15,
    name: '艾尔登法环 艺术设定集',
    game: '艾尔登法环',
    price: 399.00,
    stock: 30,
    image: '/images/goods/er-artbook.jpg',
    description: '游戏美术设定集，包含角色、场景等原画',
    category: 4
  },
  {
    id: 16,
    name: '艾尔登法环 手办 - 褪色者',
    game: '艾尔登法环',
    price: 899.00,
    stock: 20,
    image: '/images/goods/er-figure.jpg',
    description: '高品质手办，高度约32cm',
    category: 4
  }
];


let cart = [];


app.get('/api/categories', (req, res) => {
  res.json({
    code: 0,
    data: categories
  });
});


app.get('/api/goods', (req, res) => {
  const { category, page = 1, pageSize = 10 } = req.query;
  let filteredGoods = goods;
  
  if (category) {
    filteredGoods = goods.filter(item => item.category === parseInt(category));
  }
  
  const start = (page - 1) * pageSize;
  const end = start + parseInt(pageSize);
  const list = filteredGoods.slice(start, end);
  
  res.json({
    code: 0,
    data: {
      list,
      total: filteredGoods.length
    }
  });
});


app.get('/api/cart/count', (req, res) => {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({
    code: 0,
    data: count
  });
});


app.post('/api/cart/add', (req, res) => {
  const { goodsId, quantity = 1 } = req.body;
  const goodsItem = goods.find(item => item.id === goodsId);
  
  if (!goodsItem) {
    return res.json({
      code: 404,
      message: '商品不存在'
    });
  }
  
  const cartItem = cart.find(item => item.goodsId === goodsId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({
      goodsId,
      quantity,
      goods: goodsItem
    });
  }
  
  res.json({
    code: 0,
    data: cart
  });
});


app.get('/api/cart', (req, res) => {
  res.json({
    code: 0,
    data: cart
  });
});


app.put('/api/cart/update', (req, res) => {
  const { goodsId, quantity } = req.body;
  const cartItem = cart.find(item => item.goodsId === goodsId);
  
  if (cartItem) {
    cartItem.quantity = quantity;
  }
  
  res.json({
    code: 0,
    data: cart
  });
});


app.delete('/api/cart/delete', (req, res) => {
  const { goodsId } = req.body;
  cart = cart.filter(item => item.goodsId !== goodsId);
  
  res.json({
    code: 0,
    data: cart
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 