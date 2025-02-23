import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useState } from "react"
import { LineGraph } from "./LineChart"
import { useNavigate } from "react-router-dom"

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    img_urls: string[],
}

export function StoreItem({ id, name, price, img_urls }: StoreItemProps) {
    const navigate = useNavigate();
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    // const [viewTrend, setViewTrend] = useState(true);
    const handleClick = () => {
        goToProduct(id)
        // setViewTrend(!viewTrend);
    }

    const goToProduct = (id: number) => {
        navigate(`/product/${id}`);
    }
    const [cardHover, setCardHover] = useState(false);
    const quantity = getItemQuantity(id)
    return (
        <Card
            className="h-100"
        >
            <Card.Img
                variant="top"
                src={img_urls[0]}
                height="200px"
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
                style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    opacity: cardHover ? 0.7 : 1, //adjust opacity on hover
                    transition: "opacity 0.3s ease-in-out"
                }}
                onClick={() => handleClick()}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                {/* {viewTrend ? (
                    // replace image with the graph
                    // <LineGraph options={lineGraphOptions} data={lineGraphData} />
                    <img src="../public/imgs/line_graph.png" alt="plot" />
                ): null} */}
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
                            + Add To Cart
                        </Button>
                    ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <span className="fs-3">{quantity}</span> in cart
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button
                            onClick={() => removeFromCart(id)}
                            variant="danger"
                            size="sm">
                            Remove
                        </Button>
                    </div>}
                </div>

                <Button className="w-100" onClick={() => handleClick()}>
                    {/* {viewTrend ? "Close Price Trend" : "View Price Trend"} */}
                    {"View Product Details"}
                </Button>
            </Card.Body>
        </Card>
    )
}