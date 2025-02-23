import {useEffect, useState} from "react"
import axios from "axios";

export function SearchBar() {
    const [query, setQuery] = useState("");
    useEffect(()=>{
        axios.get("http://127.0.0.1:8080/api/get_auths").then(r => {
            console.log(r.data)
        })
    }, [])
    const handleSearch = async () => {
        axios.get(`http://127.0.0.1:8080/api/search_products/${query}`).then(r => {
            console.log(r.data)
        })
    }

    return (
        <div style={{
            paddingLeft: "5%",
            paddingRight: "5%",
        }}>
            <input 
            type="text" 
            placeholder="Search"
            onChange={(e) =>setQuery(e.target.value)}
            value={query}
            style = {{
                borderRadius: "20px",
                paddingLeft: "15px",
                paddingRight: "15px"
            }} 
            />
            <button 
            onClick={handleSearch}
            style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                cursor: "pointer",
                backgroundColor: "white",
                border: "none"
            }}>
                 <svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.545 15.467l-3.779-3.779a6.15 6.15 0 0 0 .898-3.21c0-3.417-2.961-6.377-6.378-6.377A6.185 6.185 0 0 0 2.1 8.287c0 3.416 2.961 6.377 6.377 6.377a6.15 6.15 0 0 0 3.115-.844l3.799 3.801a.953.953 0 0 0 1.346 0l.943-.943c.371-.371.236-.84-.135-1.211zM4.004 8.287a4.282 4.282 0 0 1 4.282-4.283c2.366 0 4.474 2.107 4.474 4.474a4.284 4.284 0 0 1-4.283 4.283c-2.366-.001-4.473-2.109-4.473-4.474z"/></svg>
            </button>
        </div>
    )
}