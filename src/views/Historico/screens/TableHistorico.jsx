import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactTable from "react-table";
import { getHistocic } from '../HistoricoActions';
import moment from 'moment';
class TableHistorico extends Component {
  constructor(props) {
    super(props)
    this.state = {
      operations: [],
    }
  }

  async componentDidMount() {
    const orders = await getHistocic();
    if (orders.status === 200) {
      const { ordersResult } = orders.data;
      if (ordersResult) {
        console.log(ordersResult)
        const operationsResult = ordersResult.map((item) => {
          return {
            date: moment(item.date).format('DD-MM-YYYY - HH:MM:SS'),
            amount: item.amount,
            price: `$${item.price.toFixed(2)}`,
            cost: `$${item.cost.toFixed(2)}`,
            currency: item.currency,
            type_operation: item.type_operation === 'buy' ? 'compra' : 'venda'
          }
        });
        this.setState({ operations: operationsResult });
      }
    }
  }

  render() {
    const columns = [{
      Header: 'Data da Operação',
      accessor: 'date',
      headerClassName: "text-center"
    }, {
      Header: 'Quantidade',
      accessor: 'amount',
      headerClassName: "text-center"
    }, {
      Header: 'Custo',
      accessor: 'cost',
      headerClassName: "text-center"
    }, {
      Header: 'Preço',
      accessor: 'price',
      headerClassName: "text-center"
    }, {
      Header: 'Moeda',
      accessor: 'currency',
      headerClassName: "text-center"
    }, {
      Header: 'Tipo de Operação',
      accessor: 'type_operation',
      headerClassName: "text-center"
    }]
    return (
      <Card>
        <CardHeader>
          <i className="tim-icons icon-laptop text-success" />{" "}
          Histórico das operações
        </CardHeader>
        <CardBody className="text-center">
          <ReactTable
            data={this.state.operations}
            noDataText="Nenhuma operação realizada até o momento!"
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

export default TableHistorico;
