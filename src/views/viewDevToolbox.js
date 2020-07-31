import React from "react";
import "../styles/view.scss";
import { Redirect } from "react-router-dom";
import { Loading, getView, Event, EventUnSubscribe } from "../components/utilities";
import ReactMarkdown from "react-markdown";
/** Vistas */
/** Modales */
import ModalOptions from "../modals/modalOptions";
import ModalDemo from "../modals/modal";
import ModalList from "../modals/modalList";
import ModalSingleList from "../modals/modalSingleList";
import ModalPrint from "../modals/modalPrint";
import ModalUpload from "../modals/modalUpload";
import ModalObject from "../modals/modalObject";

class ViewDevToolBox extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _view: getView()
    };
  }

  eventSetView = e => {
    this.setState({ _view: e });
  };

  handleExecute = e => {
    console.log("handleExecute");
  };

  componentDidMount() {
    Event("__viewInit", this.eventSetView);
  }

  componentWillUnmount() {
    EventUnSubscribe("__viewInit", this.eventSetView);
  }

  render() {
    if (this.state._view !== this.props.location.pathname) {
      return <Redirect to={this.state._view} push={true} />;
    }
    const name = "Modal";
    return (
      <React.Fragment>
        <div className="__viewToolBox view">
          <div className="container blog">
            <header className="blog-header py-3">
              <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-12 text-center">
                  <label className="blog-header-logo text-dark">ToolBox</label>
                </div>
              </div>
            </header>
            <main role="main" className="container">
              <div className="row">
                <div className="col-md-8 blog-main">
                  <div className="blog-post">
                    <h2 className="blog-post-title">Componentes</h2>
                    <p className="blog-post-meta">
                      Enero 31, 2020 por <label className="link-mute">Cesar Galvis</label>
                    </p>
                    <p>
                      Esta publicación recopila los componenetes de tipo <b>Vista</b> y <b>Formularion Modales</b> y la definición de sus
                      propiedades, metodos y eventos que establecen su modos de uso e implementación.
                    </p>
                    <hr></hr>
                    <div id="modalDemo">
                      <h2>ModalDemo</h2>
                      <p>Formulario modal demo</p>
                      <ModalDemo className="btn btn-primary btn-sm btn-3" onChange={this.handleExecute}>
                        {name}
                      </ModalDemo>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalDemo\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n params={params}\n >\n{name}</ModalDemo>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalOptions">
                      <h2>ModalOptions</h2>
                      <p>Formulario modal, que permite tener una respuesta de confirmal, aceptar o cancelar una acción.</p>
                      <ModalOptions
                        className="btn btn-primary btn-sm btn-3"
                        data={{ _id: "1", _state: "0" }}
                        _state="0"
                        onClose={this.handleExecute}
                      >
                        {name}
                      </ModalOptions>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalOptions\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n data={{ _id: '1', _state: '0' }}\n >\n{name}</ModalOptions>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalList">
                      <h2>ModalList</h2>
                      <p>Formulario modal para manejo de listas</p>
                      <ModalList className="btn btn-primary btn-sm btn-3" onChange={this.handleExecute}>
                        {name}
                      </ModalList>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalList\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n params={params}\n >\n{name}</ModalList>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalSingleList">
                      <h2>ModalSingleList</h2>
                      <p>Formulario modal para manejo de lista unica</p>
                      <ModalSingleList className="btn btn-primary btn-sm btn-3" onChange={this.handleExecute} _state="0">
                        {name}
                      </ModalSingleList>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalSingleList\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n _state='0'\n params={params}\n >\n{name}</ModalSingleList>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalPrint">
                      <h2>ModalPrint</h2>
                      <p>Formulario modal para manejo de impresiones</p>
                      <ModalPrint className="btn btn-primary btn-sm btn-3" onChange={this.handleExecute}>
                        {name}
                      </ModalPrint>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalPrint\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n params={params}\n >\n{name}</ModalPrint>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalUpload">
                      <h2>ModalUpload</h2>
                      <p>Formulario modal para manejo de cargue de archivos</p>
                      <ModalUpload className="btn btn-primary btn-sm btn-3" onChange={this.handleExecute} _state="0">
                        {name}
                      </ModalUpload>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalUpload\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n _state='0'\nparams={params}\n >\n{name}</ModalUpload>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                    <div id="modalSuport">
                      <h2>ModalSuport</h2>
                      <p>Formulario modal para manejo de objetos ó soportes</p>
                      <ModalObject
                        className="btn btn-primary btn-sm btn-3"
                        onChange={this.handleExecute}
                        _state="0"
                        data={{ _id: "1", _state: "0" }}
                      >
                        {name}
                      </ModalObject>
                      <figure className="highlight mt-3">
                        <ReactMarkdown
                          source={
                            "\n``` javascript\n<ModalObject\n className='btn btn-primary btn-sm btn-3'\n onChange={this.handleExecute}\n data={{ _id: '1', _state: '0' }}\n >\n{name}</ModalObject>\n```"
                          }
                          escapeHtml={false}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 blog-sidebar">
                  <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="font-italic">Acerca de Toolbox</h4>
                    <p className="mb-0">
                      Toolbox es un conjunto de componenees de tipo <b>Vista</b>, <b>Formularion Modales</b> y las <b>Api</b> de la
                      plataforma Jospehine.
                    </p>
                  </div>
                  <div className="p-4">
                    <h4 className="font-italic">Form modal</h4>
                    <ol className="list-unstyled mb-3">
                      <li>
                        <ModalDemo className="link" onChange={this.handleExecute}>
                          ModalDemo
                        </ModalDemo>
                      </li>
                      <li>
                        <ModalOptions className="link" onClose={this.handleExecute}>
                          ModalOptions
                        </ModalOptions>
                      </li>
                      <li>
                        <ModalList className="link" onChange={this.handleExecute}>
                          ModalList
                        </ModalList>
                      </li>
                      <li>
                        <ModalSingleList className="link" onChange={this.handleExecute} _state="0">
                          ModalSingleList
                        </ModalSingleList>
                      </li>
                      <li>
                        <ModalPrint className="link" onChange={this.handleExecute}>
                          ModalPrint
                        </ModalPrint>
                      </li>
                      <li>
                        <ModalUpload className="link" onChange={this.handleExecute} _state="0">
                          ModalUpload
                        </ModalUpload>
                      </li>
                      <li>
                        <ModalObject className="link" onChange={this.handleExecute} _state="0" data={{ _id: "1", _state: "0" }}>
                          ModalObject
                        </ModalObject>
                      </li>
                    </ol>
                    <h4 className="font-italic">Vistas</h4>
                    <ol className="list-unstyled mb-3"></ol>
                    <h4 className="font-italic">Api</h4>
                    <ol className="list-unstyled mb-3"></ol>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewDevToolBox;
