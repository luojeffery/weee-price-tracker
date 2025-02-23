import { Line } from "react-chartjs-2";
import type {ChartData, ChartOptions} from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import revenueData from "../data/revenueData.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// const lineChartData = {
//     labels: data[0].date,
//     datasets: [
//         {
//             label: "Price (USD)",
//             data: data[0].price
//         },
//     ],
// }
interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
  }
  
export const LineGraph = ({options, data}: LineProps) => {
    return (
        <Line options={options} data={data} />
    )
    
}