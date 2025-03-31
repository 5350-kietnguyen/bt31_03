const Menu = require('../models/menu');

// Lấy danh sách menu theo cấu trúc cha - con
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    // Chuyển đổi thành cấu trúc cây
    const menuMap = new Map();
    menus.forEach(menu => menuMap.set(menu._id.toString(), { ...menu.toObject(), children: [] }));

    const rootMenus = [];
    menus.forEach(menu => {
      if (menu.parent) {
        menuMap.get(menu.parent.toString()).children.push(menuMap.get(menu._id.toString()));
      } else {
        rootMenus.push(menuMap.get(menu._id.toString()));
      }
    });

    res.json(rootMenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo menu mới
exports.createMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật menu
exports.updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa menu
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
