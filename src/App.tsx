
import CategoriesData from './components/categories' 
import Header from './components/header'
import './App.css'
import ProductsList from './components/products'
import type { Products } from './components/products';
import { useState,useEffect } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<Products[]>([]);
  const [search,setsearch] = useState<string>('');

  const clearCart = () => {
  setCart([]); // reset state
  localStorage.removeItem("cartItems"); // wipe localStorage
};

  // Load cart from localStorage on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem("cartItems");
    if (cachedCart) {
      setCart(JSON.parse(cachedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const handleRemove = (item: Products) => {
    setCart(prev => prev.filter(p => p.id !== item.id));
  };

  return (
    <div>
      <Header cart={cart} onRemove={handleRemove} Search={search} SetSearch = {setsearch} clearCart={clearCart} />
      <CategoriesData onSelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <ProductsList cart={cart} setCart={setCart} selectedCategory={selectedCategory} search={search}/>
    </div>
  )
}

export default App