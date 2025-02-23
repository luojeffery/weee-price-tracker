import { Row, Col } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useState, useEffect } from "react";
import axios from "axios";

export function Home() {
    const [query, setQuery] = useState("");
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/api/search_products/valentines day')
            .then(r => {
                setStoreItems(r.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, [])

    const filteredItems = storeItems.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <input
                    type="text"
                    placeholder="Filter term"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: "50%", fontSize: "125%", borderRadius: "25px", padding: "15px", margin: "20px" }}
                />
                <svg
                    aria-describedby="desc"
                    aria-labelledby="title"
                    role="img"
                    width="30px" height="30px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <title>Filter</title>
                    <desc>A line styled icon from Orion Icon Library.</desc>
                    <path
                        d="M2 2h59L36 34v20l-8 8V34L2 2z"
                        data-name="layer1"
                        fill="none"
                        stroke="#202020"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth={2}
                    />
                </svg>
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