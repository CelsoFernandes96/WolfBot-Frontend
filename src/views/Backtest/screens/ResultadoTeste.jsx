import React, { Component } from "react";
import { CardHeader, Card, CardBody } from "reactstrap";
import ReactTable from "react-table";
import { getBacktest } from '../BacktestAction';
import moment from 'moment'
moment.locale()

class ResultadoTeste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultTest: [],
    };
  }

  componentDidMount = async () => {
    const resultBacktest = await getBacktest();
    if (resultBacktest.status === 200) {
      const backtest = resultBacktest.data.backtestResult.map((item) => {
        return {
          dateTest: moment(item.dateTest).format('DD-MM-YYYY - HH:mm'),
          cost: `$ ${item.cost.toFixed(2)}`,
          qtdOperations: item.ordersSell.length > 0 ? item.ordersSell.length : 0,
          currency: item.currency,
          profit: `$ ${item.profit.toFixed(2)}`,
          percentage: `% ${item.percentage.toFixed(2)}`,
        }
      });
      if (resultBacktest.status === 200) {
        this.setState({ resultTest: backtest });
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.updateResult !== this.props.updateResult) {
      const backtest = this.props.updateResult.map((item) => {
        return {
          dateTest: moment(item.dateTest).format('DD-MM-YYYY - HH:mm'),
          cost: `$ ${item.cost.toFixed(2)}`,
          qtdOperations: item.ordersSell.length > 0 ? item.ordersSell.length : 0,
          currency: item.currency,
          profit: `$ ${item.profit.toFixed(2)}`,
          percentage: `% ${item.percentage.toFixed(2)}`,
        }
      });
      this.setState({ resultTest: backtest });
    }
  }

  render() {
    const columns = [{
      Header: 'Data do teste',
      accessor: 'dateTest',
      headerClassName: "text-center"
    }, {
      Header: 'Moeda',
      accessor: 'currency',
      headerClassName: "text-center"
    }, {
      Header: 'Qtd. Operações',
      accessor: 'qtdOperations',
      headerClassName: "text-center"
    }, {
      Header: 'Total Investido (USD)',
      accessor: 'cost',
      headerClassName: "text-center"
    }, {
      Header: 'Potencial de Lucro (USD)',
      accessor: 'profit',
      headerClassName: "text-center"
    }, {
      Header: 'Potencial de Lucro (%)',
      accessor: 'percentage',
      headerClassName: "text-center"
    }]
    return (
      <Card>
        <CardHeader>
          <i className="tim-icons icon-laptop text-success" />{" "}
          Resultado dos testes
        </CardHeader>
        <CardBody className="text-center">
          <ReactTable
            data={this.state.resultTest}
            noDataText="Nenhuma teste realizado até o momento!"
            filterable
            resizable={false}
            columns={columns}
            defaultPageSize={10}
            showPaginationBottom
            // Text
            previousText="Anterior"
            nextText="Próximo"
            loadingText="Carregando..."
            pageText="Página"
            ofText="do"
            rowsText="linhas"
            // Accessibility Labels
            pageJumpText="pular para a página"
            rowsSelectorText="linhas por página"
            className="-striped -highlight"
          />
        </CardBody>
      </Card>
    )
  }
}

export default ResultadoTeste;
