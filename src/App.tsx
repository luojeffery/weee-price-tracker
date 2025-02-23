import { Routes, Route, Link } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from "./components/NavBar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { LineGraph } from "./components/LineChart"
import { lineChartData } from "../src/data/FAKE_DATA";
import trendDataArray from "../src/data/aggregated_data.json";
import storeItems from "../src/data/response.json"
import { ProductPage } from "./pages/ProductPage"
import {useState} from "react";


function App() {
  const [search, setSearch] = useState("valentines day");
  const [storeItems, setStoreItems] = useState([]);

  const idArray = storeItems.map(storeItem => {
    const { id } = storeItem;
    return id;
  });
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

  return (

    <ShoppingCartProvider storeItems={storeItems} setStoreItems={setStoreItems}>
      <Navbar search={search} setSearch={setSearch} />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home search={search} setSearch={setSearch} storeItems={storeItems} setStoreItems={setStoreItems}/>} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductPage storeItems={storeItems} setStoreItems={setStoreItems}/>} />
        </Routes>
        {/* <h1>Chart Example</h1> */}
        {/* <LineGraph options={lineChartData.options} data={lineChartData.data} /> */}
        {/* <LineGraph options={lineGraphOptions} data={lineGraphData} /> */}
        {/* {lineGraphs} */}
      </Container>
    </ShoppingCartProvider>

  )
}

export default App
