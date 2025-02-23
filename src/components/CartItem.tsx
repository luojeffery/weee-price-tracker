import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/response.json"
import { formatCurrency } from "../utilities/formatCurrency"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

type CartItemProps = {
    id: number
    quantity: number
}
export function CartItem({ id, quantity }: CartItemProps) {
    const navigate = useNavigate();
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    const handleClick = () => {
        goToProduct(id)
        // setViewTrend(!viewTrend);
    }

    const goToProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    const [hover, setHover] = useState(false);
    const [cancelBtnHover, setCancelBtnHover] = useState(false);
    return (
        <Stack
            style={{
                cursor: "pointer",
                opacity: hover ? 0.5 : 1, //adjust opacity on hover
                transition: "opacity 0.3s ease-in-out"
            }}
            onClick={() => handleClick()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}

            direction="horizontal"
            gap={2}
            className="d-flex align-items-center">
            <img
                src={item.img_urls[0]}
                style={{
                    width: "125px",
                    height: "75px",
                    objectFit: "cover"
                }}


            />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>

            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                onMouseEnter={() => setCancelBtnHover(true)}
                onMouseLeave={() => setCancelBtnHover(false)}
                style={{
                    cursor: "pointer",
                    opacity: cancelBtnHover ? 1 : 0.5, //adjust opacity on hover
                    transition: "opacity 0.3s ease-in-out"
                }}
            >
                &times;
            </Button>
        </Stack>
    )
}