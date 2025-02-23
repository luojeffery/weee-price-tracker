import { Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/Store'
import { About } from './pages/About'
import { Navbar } from "./components/NavBar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { LineGraph } from "./components/generateChart"
import { lineChartData } from "../src/data/FAKE_DATA";

function App() {
  // const {options, data} = lineChartData;
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
        <LineGraph options={lineChartData.options} data={lineChartData.data}/>
      </Container>
    </ShoppingCartProvider>

  )
}

export default App
