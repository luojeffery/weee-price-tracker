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
// export function LineGraph({options, data}:LineProps) {
    // const options: ChartOptions<'line'> = {
        // plugin: {
        //     title: {
        //         display: true,
        //         text: 'Custom Chart Title',
        //         padding: {
        //             top: 10,
        //             bottom: 30
        //         }
        //     }
        // }
    // };
    // const data = {};
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
    
}