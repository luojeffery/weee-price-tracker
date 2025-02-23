import {Link, useLocation} from "react-router-dom";

export function ProductList() {
    const { state } = useLocation();

    const idNameArray = state.items.map(storeItem => {
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