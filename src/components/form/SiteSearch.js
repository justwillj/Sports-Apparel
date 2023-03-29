import { useState, useEffect } from "react"
import fetchProducts from "../product-page/ProductPageService";

const SiteSearch =()=> {
    const [query, setquery] = useState('')
    const [products, setProducts] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [state, setstate] = useState(
      'test'
      // {
      //     query: '',
      //     list: []
      //   }
        )

useEffect(() => {
  fetchProducts(setProducts, setApiError);
}, []);
     const handleSubmit = () => {
           const results = products.filter(product => {
                if (query === "") return products;
                return products.toLowerCase().includes(query.toLowerCase())
            })
            setstate({
                query: query,
                list: results
            })
          console.log(state)
     }
     return (
      <div>
          <form>
            <label for="q">Search</label>
            <input type="search" name="q" value={query} onChange={(e)=>setquery(e.target.value)}/>
            <button type="submit" value="submit" onSubmit={handleSubmit}>Submit</button>
          </form>
      </div>
    )
  }

export default SiteSearch;