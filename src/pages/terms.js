import React from "react";
import "../styles/document.scss";
import TopBar from "../components/topbar";
import { Loading } from "../components/utilities";
import * as Scroll from "react-scroll";
const Element = Scroll.Element;

class Terms extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.title = "Terminos";
  }

  render() {
    return (
      <React.Fragment>
        <TopBar></TopBar>
        <div className="blog">
          <div className="container-fluid">
            <header className="blog-header py-3">
              <div className="row flex-nowrap justify-content-between align-items-center">
                <div className="col-12 text-center">
                  <label className="blog-header-logo text-dark">{this.title}</label>
                </div>
              </div>
            </header>
          </div>
          <main role="main" className="container">
            <div className="row">
              <div className="col-md-8 blog-main">
                <div className="blog-post">
                  <Element id="start">
                    <h2 className="blog-post-title">Términos y condiciones de Dploy</h2>
                    <p className="blog-post-meta">Ultima actualización: 1 de Julio de 2020</p>

                    <p>
                      Esta página web es propiedad y esta operada por <strong>DPLOY</strong>. Estos Términos establecen los términos y
                      condiciones bajo los cuales usted puede usar nuestra página web y servicios ofrecidos por nosotros. Esta página web
                      ofrece a los visitantes Servicios que consisten en el arrendamiento de los siguientes módulos:
                      <strong> Ilumina</strong> (Sistema de gestión de mantenimiento para el Alumbrado Público), <strong>REDIST </strong>
                      (sistema de mantenimiento para redes de distribución eléctrica) y <strong>MATCH 365</strong> (Herramienta que permite
                      la automatización de procesos y facilita la interacción con usuarios, mediante un bot bajo la plataforma Telegram);
                      bajo el modelo de <strong>Arrendamiento de Software Como Servicio</strong> (Software as a Services -SAAS), en su sitio
                      web <strong>https://www.dploy.site/</strong>
                    </p>
                    <blockquote>
                      <p>
                        <strong>DPLOY</strong> podrá modificar los Términos y condiciones cuando lo considere oportuno, sin necesidad de
                        notificación previa, sin perjuicio de que pueda publicar en uno o varios medios de comunicación esas Condiciones
                        actualizadas o las políticas modificadas o condiciones suplementarias sobre el Servicio aplicable. Su acceso o uso
                        continuado de los Servicios después de dicha publicación constituye ratificación de su consentimiento a vincularse a
                        las Condiciones y sus modificaciones.
                      </p>
                    </blockquote>
                  </Element>
                  <Element id="paragraph01">
                    <h3>Requisitos para crear una cuenta</h3>
                    <p>
                      Usted debe registrarse con su número de celular o correo electrónico y recibirá un código vía mensaje de texto o
                      correo electrónico, lo debe digitar en la aplicación o página web y así podrá acceder. Usted debe tener como mínimo
                      <strong> 18 años</strong>, o tener la mayoría de edad legal en su jurisdicción (si es distinta a los 18 años). No esta
                      permitido utilizar esta página web y / o recibir servicios si hacerlo está prohibido en su país o en virtud de
                      cualquier ley o regulación aplicable a su caso.
                    </p>
                  </Element>
                  <Element id="paragraph02">
                    <h3>Términos comerciales ofrecidos a los clientes</h3>
                    <p>
                      El usuario que desee registrase, podrá hacerlo y tendrá una demostración gratuita del módulo al cual se registre por
                      <strong> 3 meses</strong> contados a partir de la fecha de registro, al culminar este tiempo el módulo será bloqueado
                      automáticamente por parte de DPLOY, si el usuario después de este tiempo en demostración desea continuar usando el
                      servicio, debe contactarse con DPLOY y gestionar el acceso a la plataforma nuevamente, de acuerdo con negociaciones
                      previas del servicio.
                    </p>
                  </Element>
                  <Element id="paragraph03">
                    <h3>Derechos de autor</h3>
                    <p>
                      Está prohibido reproducir, duplicar, copiar, vender, revender, visitar o explotar de otro modo el Sitio DPLOY o
                      cualquier modulo del Sitio con un fin comercial sin el consentimiento expreso por escrito de DPLOY.
                    </p>
                  </Element>
                  <Element id="paragraph04">
                    <h3>Derecho a suspender o cancelar la cuenta de usuario</h3>
                    <p>
                      DPLOY puede terminar o suspender de manera permanente o temporal el acceso al servicio de los módulos de DPLOY sin
                      previo aviso y responsabilidad por cualquier razón, incluso si se viola alguna disposición de estos Términos o
                      cualquier ley o regulación aplicable. Como usuario registrado puede descontinuar el uso y solicitar cancelar su cuenta
                      y / o cualquier servicio en cualquier momento.
                    </p>
                  </Element>
                  <Element id="paragraph05">
                    <h3>Uso del sitio</h3>
                    <p>
                      El acceso o ingreso a la aplicación móvil, sitio web y módulos implica que usted ha aceptado que el uso que usted hará
                      de este Sitio/App, de sus Contenidos, módulos, Servicios y la información contenida en éste, tendrá propósitos
                      legítimos y legales, y se hará en cumplimiento de estos Términos y condiciones y de todas y cualesquiera leyes
                      aplicables de su jurisdicción. Entre otras consideraciones, usted acepta que no usará este Sitio/App, sus Contenidos o
                      la información contenida en éste.
                    </p>
                  </Element>
                  <Element id="paragraph06">
                    <h3>Su cuenta</h3>
                    <p>
                      Si usted utiliza el Sitio DPLOY, es usted responsable de mantener la confidencialidad de su cuenta y contraseña y de
                      restringir el acceso a su ordenador, y se compromete a aceptar la responsabilidad derivada de todas las actividades
                      que se realicen en su cuenta o con su contraseña. DPLOY se reserva el derecho de denegar el servicio, cancelar la
                      cuenta, eliminar o editar el contenido a su entera discreción.
                    </p>
                  </Element>
                  <Element id="paragraph07">
                    <h3>Acceso a la red y dispositivos</h3>
                    <p>
                      Usted es responsable de obtener el acceso a la red de datos necesario para utilizar los Servicios y acceder a los
                      servicios que le brinda DPLOY. Podrán aplicarse las tarifas y tasas de datos y mensajes de su red móvil si usted
                      accede o utiliza los Servicios desde un dispositivo inalámbrico y usted será responsable de dichas tarifas y tasas.
                      Usted es responsable de adquirir y actualizar el hardware compatible o los dispositivos necesarios para acceder y
                      utilizar los Servicios y Aplicaciones y cualquier actualización de estos. DPLOY no garantiza que los Servicios, o
                      cualquier parte de estos, funcionen en cualquier hardware o dispositivo particular. Además, los Servicios podrán ser
                      objeto de disfunciones o retrasos inherentes al uso de Internet y de las comunicaciones electrónicas. DPLOY no es
                      responsable por las debilidades, incapacidades o fallas en las redes o en los dispositivos que le impidan acceder a
                      los Servicios y a los servicios de los terceros vinculados al canal de comunicación dispuesto por DPLOY.
                    </p>
                  </Element>
                  <Element id="paragraph08">
                    <h3>Emails de promociones y contenido</h3>
                    <p>
                      Acepta recibir de vez en cuando nuestros mensajes y materiales de promoción por correo electrónico o cualquier otro
                      formulario de contacto que nos proporcione (incluido número de teléfono para llamadas o mensajes de texto). Si no
                      desea recibir dichos materiales o avisos de promociones, simplemente nos avisa en cualquier momento.
                    </p>
                  </Element>
                  <Element id="paragraph09">
                    <h3>Limite de responsabilidad</h3>
                    <p>
                      En la máxima medida permitida por la ley aplicable en Colombia, en ningún caso DPLOY será responsable por daños
                      indirectos, punitivos, incidentales, especiales, consecuentes o ejemplares, incluidos, entre otros, daños por pérdida
                      de beneficios, buena voluntad, uso, datos. u otras pérdidas intangibles, que surjan de o estén relacionadas con el uso
                      o la imposibilidad de utilizar el servicio.
                    </p>
                    <p>En la máxima medida permitida por la ley aplicable, DPLOY no asume responsabilidad alguna por:</p>
                    <ul>
                      <li>Errores o inexactitudes de contenido.</li>
                      <li>
                        Lesiones personales o daños a la propiedad, de cualquier naturaleza que sean, como resultado de tu acceso o uso de
                        nuestro servicio
                      </li>
                      <li>
                        Cualquier acceso no autorizado o uso de nuestros servidores seguros y / o toda la información personal almacenada en
                        los mismos.
                      </li>
                    </ul>
                  </Element>
                  <Element id="paragraph10">
                    <h3>Nuestra dirección</h3>
                    <p className="mb-0">Dploy SAS</p>
                    <p className="mt-0 mb-0">Calle 3 # 12B-41 Apto 402</p>
                    <p className="mt-0 mb-0">San Gil, Santander; Colombia</p>
                    <p className="mt-0 mb-0">contacto@dploy.site</p>
                    <p className="mt-0">https://www.dploy.site/</p>
                  </Element>
                </div>
              </div>
              <aside className="col-md-4 blog-sidebar">
                <div className="p-4 mb-3 bg-light rounded">
                  <h4 className="font-italic">Acerca de los Terminos</h4>
                  <p className="mb-0">
                    Bienvenido a Dploy! Le invitamos a acceder a nuestros sitios web y a utilizar nuestros servicios, pero tenga en cuenta
                    que su uso está sujeto a su aceptación de estos <strong>Términos y Condiciones</strong>. Este documento describe en
                    detalle sus derechos y nuestros derechos en relación con las disposiciones de los Servicios (tal y como se definen a
                    continuación), así que por favor lea estos Términos con detenimiento.
                  </p>
                </div>
              </aside>
            </div>
          </main>
          <footer className="blog-footer">
            <small>© 2016-2020 Dploy SAS.</small>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default Terms;
