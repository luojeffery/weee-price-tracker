import { useParams } from "react-router-dom"
import { LineGraph } from "../components/LineChart";
import storeItems from "../../src/data/response.json"
import trendDataArray from "../../src/data/aggregated_data.json";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

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

    if (!product) {
        return <h2>Product not found ☹️</h2>
    }
    console.log(product);

    return (
        <Card className="h-100"        >
            <Card.Img
                variant="top"
                src={product.img_urls[0]}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{product.name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
                </Card.Title>
            </Card.Body>
            {lineGraphs[product.index]}
        </Card>
    )
}