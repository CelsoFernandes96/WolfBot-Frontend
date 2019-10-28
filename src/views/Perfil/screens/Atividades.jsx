import React, { Component } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTable from "react-table";
import { getAtividades } from "../../Perfil/PerfilActions";

class Atividades extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(values) {}

  componentWillMount() {
    const { getAtividades } = this.props;
    getAtividades();
  }

  render() {
    const data = this.props.atividades;

    const columns = [
      {
        Header: "IP",
        accessor: "ip",
        headerClassName: "text-center"
      },
      {
        Header: "Sistema Operacional",
        accessor: "osPlatform",
        headerClassName: "text-center"
      },
      {
        Header: "Navegador",
        accessor: "browser",
        headerClassName: "text-center"
      },
      {
        Header: "Data",
        accessor: "date",
        headerClassName: "text-center"
      }
    ];

    const { handleSubmit } = this.props;
    return (
      <Card>
        <div className="rna-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <CardHeader>
          <h5 className="title">Relatório de Acessos na Conta</h5>
        </CardHeader>
        <CardBody>
          <ReactTable
            data={data}
            filterable
            resizable={false}
            columns={columns}
            defaultPageSize={5}
            showPaginationTop
            showPaginationBottom={false}
            className="-striped -highlight"
            // Text
            previousText="Anterior"
            nextText="Próximo"
            loadingText="Carregando..."
            noDataText="Nenhum registro"
            pageText="Página"
            ofText="do"
            rowsText="linhas"
            // Accessibility Labels
            pageJumpText="pular para a página"
            rowsSelectorText="linhas por página"
          />
        </CardBody>
        <CardFooter />
      </Card>
    );
  }
}

Atividades = reduxForm({ form: "dadosPessoaisForm" })(Atividades);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAtividades }, dispatch);
const mapStateToProps = state => ({
  atividades: state.profile.atividades
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Atividades);
