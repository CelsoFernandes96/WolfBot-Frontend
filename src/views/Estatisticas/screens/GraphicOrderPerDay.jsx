
import React, { Component } from 'react'
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
import { getOrderPerDay } from '../../Estatisticas/estatisticasAction';

let chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

class GraphicOrderPerDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entregue: [],
      naoEntregue: []
    };
  }

  async componentDidMount() {
    const result = await getOrderPerDay();
    console.log(result)

    this.setState({
      entregue: result.data
    });
  }

  render() {
    const data = canvas => {
      let ctx = canvas.getContext("2d");
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
        datasets: [
          {
            label: 'Total',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#2dce89",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#2dce89",
            pointBorderColor: "rgba(0, 242, 195, 0.5)",
            pointHoverBackgroundColor: "#2dce89",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.state.entregue
          }
        ]
      };
    };
    return (
      <Card className="card-chart" >
        <CardHeader tag="h4">
          Quantidade de ordens executadas por mês
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Line
              data={data}
              options={chartOptions}
            />
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default GraphicOrderPerDay;