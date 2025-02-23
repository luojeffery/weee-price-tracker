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


function App() {
  const idArray = storeItems.map(storeItem => {
    const { id } = storeItem;
    return id;
  });
  // const productRoutes = idArray.map((id:number) => {
  //   return <Link key={id} path="/product/:id" element={id} />
  // })
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
  // const { name, date, price } = trendDataArray[0];
  // const lineGraphOptions = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: name,
  //       padding: {
  //         top: 10,
  //         bottom: 30
  //       }
  //     }
  //   }
  // }
  // const lineGraphData = {
  //   labels: date,
  //   datasets: [{
  //     label: "Price (USD)",
  //     data: price,
  //     borderColor: "rgb(75, 192, 192)"
  //   }
  //   ]
  // }

  return (

    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          {/* {productRoutes} */}
          <Route path="/product/:id" element={<ProductPage />} />
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
