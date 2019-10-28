import React, { Component } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import { getBalance } from '../CarteiraActions';

class TablePosicoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: []
    };
  }

  async componentDidMount() {
    const balance = await getBalance();
    if (balance.status === 200) {
      const arrayBalance = []
      const objBalance = balance.data.saldo.total;
      console.log(objBalance)
      if (objBalance !== null && objBalance !== undefined) {
        Object.keys(objBalance).forEach((item) => {
          if (objBalance[item] > 0) {
            arrayBalance.push({ currency: item, amount: objBalance[item] });
          }
        });
        this.setState({ balance: arrayBalance });
      }
    }
  }

  render() {
    const columns = [
      {
        Header: "Moeda",
        accessor: "currency",
        headerClassName: "text-center"
      },
      {
        Header: "Quantidade",
        accessor: "amount",
        headerClassName: "text-center"
      },
    ];

    return (
      <Card>
        <CardHeader>
          <i className="tim-icons icon-wallet-43 text-success" /> Carteira de
          Ativos
        </CardHeader>
        <CardBody className="text-center">
          <ReactTable
            data={this.state.balance}
            noDataText="Nenhum saldo para apresentar até o momento!"
            filterable
            resizable={false}
            columns={columns}
            defaultPageSize={5}
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
    );
  }
}

export default TablePosicoes;
