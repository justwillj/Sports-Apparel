import { useState } from "React"

const ProductSearch =()=> {
    const [query, setquery] = useState('')
    const [products, setProducts] = useState([]);
    const [apiError, setApiError] = useState(false);

useEffect(() => {
  fetchProducts(setProducts, setApiError);
}, []);
     const handleChange = (e) => {
           const results = products.filter(post => {
                if (e.target.value === "") return products;
                return products.catagory.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setstate({
                query: e.target.value,
                list: results
            })
     }
     return (
      <div>
          <form>
            <input type="search" value={query} onChange={handleChange}/>
          </form>
      </div>
    )
  }

export default ProductSearch;