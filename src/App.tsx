import { Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from "./components/NavBar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { LineGraph } from "./components/generateChart"
import { lineChartData } from "../src/data/FAKE_DATA";
import trendDataArray from "../src/data/aggregated_data.json";


function App() {
  // const {options, data} = lineChartData;
  const { name, date, price } = trendDataArray[0];
  const lineGraphOptions = {
    // options: {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
    // },
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

  return (

    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <h1>Chart Example</h1>
        <LineGraph options={lineChartData.options} data={lineChartData.data} />
        <LineGraph options={lineGraphOptions} data={lineGraphData} />
      </Container>
    </ShoppingCartProvider>

  )
}

export default App
