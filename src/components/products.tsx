import type {Categories} from './categories'
import { useState, useEffect } from "react";
import {product_url} from './config'
import { Button } from "@mui/material";

export type Products = {
    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    category: Categories,
    images: string[],
}

export type CartItem = Products & { quantity: number };

type ProductsProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedCategory: number | null;
  search: string;
};

const ProductsData: React.FC<ProductsProps> = ({ cart,setCart,selectedCategory,search }) =>{
  const[Prod,setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

  
  const addToCart = (clicked: Products) => {
  setCart(prev => {
    const exists = prev.find(p => p.id === clicked.id);
    if (exists) {
      return prev.map(p =>
        p.id === clicked.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      return [...prev, { ...clicked, quantity: 1 }];
    }
  });
};

const removeFromCart = (clicked: Products) => {
  setCart(prev => {
    const exists = prev.find(p => p.id === clicked.id);
    if (!exists) return prev;
    if (exists.quantity === 1) {
      return prev.filter(p => p.id !== clicked.id);
    }
    return prev.map(p =>
      p.id === clicked.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  });
};

    useEffect(()=>{
          const loadData = async() => {
              const cached = localStorage.getItem("productsList");
              if (cached) {
                  setProducts(JSON.parse(cached));
                  return;
              }
          const response = await fetch(product_url);
                const data = await response.json();
                setProducts(data);
                localStorage.setItem("productsList", JSON.stringify(data));
        };
    loadData()},[])

    const filteredProducts = Prod.filter(p => {
    const matchesCategory = selectedCategory ? p.category.id === selectedCategory : true;
     const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) 
// const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

   // Pagination logic
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return(
    <div>
        <h3 className='topdeal'>🔥Top Deals🔥</h3>
          {/* Pagination Controls */}
      <div className="pagination">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ◀
        </Button>
        <span> Page {currentPage} of {totalPages} </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          ▶
        </Button>
      </div>
          <div className="grid-container-products">
                {paginatedProducts.map((ProdData) => (
                    <div key={ProdData.id} className="grid-item">
                    <img src={ProdData.images[0]} alt={ProdData.title} />
                    <h4 className='mar-0'>{ProdData.title}</h4>
                    <p className='mar-0'><b>Price-$</b>{ProdData.price}</p>
                        {
                          cart.some(c => c.id === ProdData.id) ? (
                            <div className='addremovebtn'>
                              <Button onClick={() => removeFromCart(ProdData)}>➖</Button>
                              <span className='pad-8'>
                                {cart.find(c => c.id === ProdData.id)?.quantity}
                              </span>
                              <Button onClick={() => addToCart(ProdData)}>➕</Button>
                            </div>
                          ) : (
                            <Button onClick={() => addToCart(ProdData)}>Add to Cart</Button>
                          )}
                    </div>
                ))}
          </div>
    </div>
  )
}

export default ProductsData;




                            // const handleClick = (clicked: Products) => {
                            //   setCart(prev => {
                            //   const exists = prev.find(p => p.id === clicked.id);
                            //   if (exists) {
                            //     return prev.filter(p => p.id !== clicked.id); // remove
                            //   } else {
                            //     return [...prev, clicked]; // add
                            //   }
                            // });
                            // };