import {categories_url} from './config'
import { useState, useEffect } from "react";
import All from '../AllIcons.png';

//Exporting this so it remains only at one place.
export type Categories = {
    id: number,
    name: string,
    slug: string,
    image: string,
}
  
type CategoriesProps = {
  onSelect: (id: number|null) => void;
  selectedCategory: number | null;
};

const CategoriesData : React.FC<CategoriesProps> = ({ onSelect,selectedCategory }) => {
  
    const[category,setCategories] = useState<Categories[]>([]);
    useEffect(()=>{
        const loadData = async() => {
            const cached = localStorage.getItem("categories");
            if (cached) {
                setCategories(JSON.parse(cached));
                return;
            }
        const response = await fetch( categories_url);
              const data = await response.json();
              setCategories(data);
              localStorage.setItem("categories", JSON.stringify(data));
        };
        loadData()},[])
    return (            
        <div className="grid-container">
            {/* Show All option */}
            <div
                className={`grid-item ${selectedCategory === null ? "active" : ""}`}
                onClick={() => onSelect(null)}
                style={{ cursor: "pointer", border: "1px solid #ccc" }} >
                <img src={All}/>
                <h3>Show All</h3>
            </div>

            {category.map((Categories) => (
            <div key={Categories.slug} className={`grid-item ${selectedCategory === Categories.id ? "active" : ""}`}
            onClick={() => onSelect(Categories.id)} style={{ cursor: "pointer" }} >
            <img src={Categories.image}/>
            <h3>{Categories.name}</h3>
       </div>
        ))}
    </div>    
        )
    }

export default CategoriesData;