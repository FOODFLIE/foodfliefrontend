import React, { useState } from "react";
import { Search, Plus, MoreVertical, Edit2, X } from "lucide-react";
import SEO from "../../../components/common/seo";

const Menu = () => {
  // --- State for Modals & Forms ---
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    isVeg: true,
    description: "",
  });

  const [newCategory, setNewCategory] = useState("");

  // --- Mock Data State ---
  const [categories, setCategories] = useState([
    { id: 1, name: "Bowls And Salads", count: 11, active: true },
    { id: 2, name: "SipnSized Combos", count: 8, active: true },
    { id: 3, name: "Fruit Juices", count: 15, active: true },
    { id: 4, name: "Smoothies", count: 6, active: false },
    { id: 5, name: "Healthy Coldpressed Juices", count: 9, active: true },
    { id: 6, name: "Hot servings", count: 4, active: true },
    { id: 7, name: "Desserts", count: 12, active: true },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: 101,
      name: "Fruits and nuts bowl",
      price: "169",
      isVeg: true,
      variants: 4,
      onStock: true,
      categoryId: 1,
    },
    {
      id: 102,
      name: "Exotic Fruit Bowl",
      price: "169",
      isVeg: true,
      variants: 4,
      onStock: true,
      categoryId: 1,
    },
    {
      id: 103,
      name: "Mixed Fruit Bowl",
      price: "139",
      isVeg: true,
      variants: 5,
      onStock: true,
      categoryId: 1,
    },
    {
      id: 104,
      name: "Melon Bowl",
      price: "121",
      isVeg: true,
      variants: 5,
      onStock: false,
      categoryId: 1,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  // --- Handlers ---

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const newCat = {
      id: categories.length + 1,
      name: newCategory,
      count: 0,
      active: true,
    };
    setCategories([...categories, newCat]);
    setNewCategory("");
    setShowCategoryModal(false);
  };

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.price) return;

    if (editingItem) {
      // Edit Logic
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id ? { ...item, ...newItem } : item,
        ),
      );
    } else {
      // Add Logic
      const item = {
        id: menuItems.length + 101,
        ...newItem,
        variants: 0,
        onStock: true,
        categoryId: selectedCategory,
      };
      setMenuItems([...menuItems, item]);

      // Update category count
      setCategories(
        categories.map((cat) =>
          cat.id === Number(item.categoryId)
            ? { ...cat, count: cat.count + 1 }
            : cat,
        ),
      );
    }
    closeItemModal();
  };

  const openItemModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setNewItem(item);
    } else {
      setEditingItem(null);
      setNewItem({
        name: "",
        price: "",
        category: selectedCategory,
        isVeg: true,
        description: "",
      });
    }
    setShowItemModal(true);
  };

  const closeItemModal = () => {
    setShowItemModal(false);
    setEditingItem(null);
    setNewItem({
      name: "",
      price: "",
      category: "",
      isVeg: true,
      description: "",
    });
  };

  const toggleItemStock = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, onStock: !item.onStock } : item,
      ),
    );
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-slate-100 overflow-hidden">
      <SEO title="Manage Menu" />
      {/* Toolbar */}
      <div className="bg-white p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for an item or category"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-zepto-purple focus:ring-1 focus:ring-zepto-purple transition-all"
          />
        </div>
        {/* Filter buttons could go here */}
      </div>

      {/* Split View Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-slate-700 text-sm">
              CATEGORY ({categories.length})
            </h3>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="text-zepto-purple text-xs font-bold hover:underline"
            >
              + ADD NEW
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 flex items-center justify-between text-sm font-semibold cursor-pointer transition-colors ${selectedCategory === cat.id ? "bg-[#282c3f] text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <span>{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs opacity-70">({cat.count})</span>
                  <div
                    className={`w-8 h-4 rounded-full relative ${cat.active ? "bg-green-500" : "bg-slate-300"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${cat.active ? "right-0.5" : "left-0.5"}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 bg-white flex flex-col overflow-y-auto">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-bold text-slate-700 text-sm uppercase">
              Item (
              {
                menuItems.filter((i) => i.categoryId === selectedCategory)
                  .length
              }
              )
            </h3>
            <button
              onClick={() => openItemModal()}
              className="text-zepto-purple text-xs font-bold hover:underline"
            >
              + ADD NEW
            </button>
          </div>
          <div className="p-4 space-y-4">
            {menuItems
              .filter((i) => i.categoryId === selectedCategory)
              .map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-100 rounded-lg p-4 flex items-start justify-between hover:border-slate-300 transition-colors bg-white group"
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 w-4 h-4 border ${item.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center shrink-0`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold text-slate-700">
                        ₹{item.price}
                      </p>
                      <span className="text-xs text-slate-400 block mt-1">
                        {item.description || "No description"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => openItemModal(item)}
                      className="text-orange-500 text-xs font-bold flex items-center gap-1 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      EDIT <Edit2 size={12} />
                    </button>
                    {/* Toggle */}
                    <button
                      onClick={() => toggleItemStock(item.id)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${item.onStock ? "bg-green-500" : "bg-slate-300"}`}
                    >
                      <div
                        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${item.onStock ? "right-1" : "left-1"}`}
                      ></div>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Add Category</h3>
              <button onClick={() => setShowCategoryModal(false)}>
                <X className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zepto-purple"
                  placeholder="e.g. Starters"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="w-full py-3 bg-zepto-purple text-white font-bold rounded-xl hover:bg-zepto-purple/90 transition-colors"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h3>
              <button onClick={closeItemModal}>
                <X className="text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zepto-purple"
                    placeholder="e.g. Chicken Biryani"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zepto-purple"
                    placeholder="299"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zepto-purple"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: Number(e.target.value) })
                  }
                  disabled={editingItem} // Disable changing category while editing for simplicity
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zepto-purple h-24 resize-none"
                  placeholder="Brief description of the item..."
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700">Type:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={newItem.isVeg}
                      onChange={() => setNewItem({ ...newItem, isVeg: true })}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium">Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={!newItem.isVeg}
                      onChange={() => setNewItem({ ...newItem, isVeg: false })}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium">Non-Veg</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveItem}
                className="w-full py-3 bg-zepto-purple text-white font-bold rounded-xl hover:bg-zepto-purple/90 transition-colors mt-2"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
