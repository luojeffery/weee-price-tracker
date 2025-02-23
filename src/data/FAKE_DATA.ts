export const lineChartData = {
    options: {
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
    },
    data: {
        labels: [
            "Monday",
            "Tuesday",
            "wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "Steps",
                data: [300, 500, 400, 450, 600, 800, 700, 900],
                borderColor: "rgb(75, 192, 192)",
            },
        ],
    }
}