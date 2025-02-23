import { Link } from "react-router-dom";
import storeItems from "../data/response.json"

export function ProductList() {
    const idNameArray = storeItems.map(storeItem => {
        const { id, name } = storeItem;
        return { id, name };
    });
    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {idNameArray.map((item) => (
                    <li key={item.id}>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}