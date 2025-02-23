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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
  }
  
export const LineGraph = ({options, data}: LineProps) => {
    return (
        <Line options={options} data={data} />
    )
    
}