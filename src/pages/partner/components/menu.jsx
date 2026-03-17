import React, { useState, useEffect } from "react";
import { Search, Plus, MoreVertical, Edit2, X, Trash2 } from "lucide-react";
import SEO from "../../../components/common/seo";
import { useAuth } from "../../../context/authContext";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
  getAllCategories,
  getProductsByCategory,
} from "../../../services/partnerProductService";

const Menu = () => {
  const { partner } = useAuth();
  // --- State for Modals & Forms ---
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category_id: "",
    is_veg: true,
    description: "",
    preparation_time: 30, // Default prep time
  });

  const [newCategory, setNewCategory] = useState("");

  // --- Data State ---
  const [categories, setCategories] = useState([]);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- Fetch Initial Data ---
  const fetchMenuData = async () => {
    if (!partner?.id) return;
    const partnerId = partner.id;

    try {
      setIsLoading(true);
      const categoriesData = await getAllCategories();
      const catsArray = categoriesData.data || [];
      const catsWithCount = catsArray.map(cat => ({
        ...cat,
        count: 0,
        active: true
      }));
      setCategories(catsWithCount);
      
      if (catsWithCount.length > 0) {
        setSelectedCategory(catsWithCount[0].id);
        const productsData = await getProductsByCategory(partnerId, catsWithCount[0].id);
        setMenuItems(productsData.data?.products || []);
      }
    } catch (error) {
      console.error("Failed to fetch menu items", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, [partner]);

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

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (!partner?.id) return;
    const partnerId = partner.id;

    try {
      setIsLoading(true);
      const productsData = await getProductsByCategory(partnerId, categoryId);
      const products = productsData.data?.products || [];
      setMenuItems(products);
    } catch (error) {
      console.error("Failed to fetch category products", error);
      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveItem = async () => {
    if (!newItem.name || !newItem.price) return;
    const partnerId = partner?.id;

    try {
      const payload = {
        partner_id: partnerId,
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        category_id: newItem.category_id || selectedCategory,
        is_veg: newItem.is_veg,
        preparation_time: newItem.preparation_time,
        is_available: newItem.is_available !== undefined ? newItem.is_available : true,
      };

      if (editingItem) {
        await updateProduct(editingItem.id, payload);
      } else {
        await addProduct(payload);
      }
      
      await fetchMenuData();
      closeItemModal();
    } catch (error) {
      console.error("Failed to save item", error);
    }
  };

  const openItemModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setNewItem({
        name: item.name,
        price: item.price,
        category_id: item.category_id,
        is_veg: item.is_veg,
        description: item.description || "",
        preparation_time: item.preparation_time || 30,
        is_available: item.is_available,
      });
    } else {
      setEditingItem(null);
      setNewItem({
        name: "",
        price: "",
        category_id: selectedCategory,
        is_veg: true,
        description: "",
        preparation_time: 30,
        is_available: true,
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
      category_id: selectedCategory,
      is_veg: true,
      description: "",
      preparation_time: 30,
    });
  };

  const toggleItemStock = async (item) => {
    const partnerId = partner?.id;
    try {
      setMenuItems(
        menuItems.map((m) =>
          m.id === item.id ? { ...m, is_available: !m.is_available } : m,
        ),
      );
      await toggleProductAvailability(item.id, partnerId, !item.is_available);
    } catch (error) {
      console.error("Failed to toggle availability", error);
      fetchMenuData(); 
    }
  };

  const handleDeleteItem = async (item) => {
    if(!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;
    const partnerId = partner?.id;
    try {
      await deleteProduct(item.id, partnerId);
      await fetchMenuData();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
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
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
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
              className="text-brand text-xs font-bold hover:underline"
            >
              + ADD NEW
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-4 flex items-center justify-between text-sm font-semibold cursor-pointer transition-colors ${selectedCategory === cat.id ? "bg-[#282c3f] text-white" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <span>{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs opacity-70">({menuItems.filter(i => i.category?.id === cat.id).length})</span>
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
              Item ({menuItems.length})
            </h3>
            <button
              onClick={() => openItemModal()}
              className="text-brand text-xs font-bold hover:underline"
            >
              + ADD NEW
            </button>
          </div>
          <div className="p-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center p-8 text-slate-400">Loading menu...</div>
            ) : menuItems.length === 0 ? (
              <div className="flex justify-center p-8 text-slate-400">No items in this category.</div>
            ) : (
              menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-100 rounded-lg p-4 flex items-start justify-between hover:border-slate-300 transition-colors bg-white group"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`mt-1 w-4 h-4 border ${item.is_veg ? "border-green-600" : "border-red-600"} flex items-center justify-center shrink-0`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${item.is_veg ? "bg-green-600" : "bg-red-600"}`}
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
                        title="Edit Item"
                        className="text-slate-400 text-xs font-bold flex items-center gap-1 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        title="Delete Item"
                        className="text-slate-400 text-xs font-bold flex items-center gap-1 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                      {/* Toggle */}
                      <button
                        onClick={() => toggleItemStock(item)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${item.is_available ? "bg-green-500" : "bg-slate-300"}`}
                      >
                        <div
                          className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${item.is_available ? "right-1" : "left-1"}`}
                        ></div>
                      </button>
                    </div>
                  </div>
                ))
            )}
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="e.g. Starters"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand/90 transition-colors"
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
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
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
                    className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand"
                  value={newItem.category_id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category_id: Number(e.target.value) })
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand h-24 resize-none"
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
                      checked={newItem.is_veg}
                      onChange={() => setNewItem({ ...newItem, is_veg: true })}
                      className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium">Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={!newItem.is_veg}
                      onChange={() => setNewItem({ ...newItem, is_veg: false })}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium">Non-Veg</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveItem}
                className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand/90 transition-colors mt-2"
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
