import { Row, Col } from "react-bootstrap"
import storeItems from "../data/response.json"
import { StoreItem } from "../components/StoreItem"
import { useState } from "react";

export function Store() {

    const [query, setQuery] = useState("");
    const filteredItems = storeItems.filter(el => (el.name.toLowerCase().includes(query.toLowerCase())));
    filteredItems.filter(item => item.name.includes(query));
    return (
        <>
            <h1>Store</h1>
            
        <div className="d-flex justify-content-center align-items-center">
            {/* <label>Filter by term: </label> */}
            <input 
            type="text" 
            placeholder="Filter term" 
            onChange={(e) =>setQuery(e.target.value)} 
            style = {{width: "50%", fontSize: "125%", borderRadius: "25px", padding: "15px", margin: "20px"}}
            />
        </div>

            <Row md={2} xs={1} lg={3} className="g-3">
                {filteredItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>

                ))}
            </Row>
        </>
    )
}