import { useNavigate, useParams } from "react-router-dom"
import { LineGraph } from "../components/LineChart";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../../src/data/response.json"
import trendDataArray from "../../src/data/aggregated_data.json";

type ProductPageProps = {
    id: number,
    name: string,
    price: number,
    img_urls: string[],
}

export function ProductPage() {

    const lineGraphs = trendDataArray.map((trendData, index) => {
        const { name, date, price } = trendData;
        const lineGraphOptions = {
            plugins: {
                title: {
                    display: true,
                    text: name,
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
        const lineGraphData = {
            labels: date,
            datasets: [{
                label: "Price (USD)",
                data: price,
                borderColor: "rgb(75, 192, 192)"
            }
            ]
        }
        return <LineGraph key={index} options={lineGraphOptions} data={lineGraphData} />
    })

    const productArray = storeItems.map((storeItem, index) => {
        const { id, name, price, img_urls } = storeItem;
        return { id, name, price, img_urls, index };
    });

    const { id } = useParams<{ id: string }>();

    // find product with matching ID

    const product = productArray.find((p) => p.id === Number(id));
    const navigate = useNavigate();

    if (!product) {
        return <div style={{"textAlign": "center"}}>
            <h2>☹️Product not found ☹️</h2>
            <Button onClick={() => navigate(`/`)}>
                            Return to Results
                        </Button>
            </div>
    }
    console.log(product);
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(Number(id))
    return (
        <Card className="h-100"        >
            <Card.Img
                variant="top"
                height="300px"
                src={product.img_urls[0]}
                style={{
                    objectFit: "cover"
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{product.name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity < 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(Number(id))}>
                            + Add To Cart
                        </Button>
                    ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button onClick={() => decreaseCartQuantity(Number(id))}>-</Button>
                            <span className="fs-3">{quantity} in cart</span>
                            <Button onClick={() => increaseCartQuantity(Number(id))}>+</Button>
                        </div>
                        {(quantity > 0 ?
                            <Button
                                onClick={() => removeFromCart(Number(id))}
                                variant="danger"
                                size="sm">
                                Remove
                            </Button> : null
                        )}
                        <Button onClick={() => navigate(`/`)}>
                            Return to Results
                        </Button>
                    </div>}
                </div>

            </Card.Body>
            {lineGraphs[product.index]}
        </Card>
    )
}