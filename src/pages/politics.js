import React from "react";
import "../styles/document.scss";
import TopBar from "../components/topbar";
import { Loading } from "../components/utilities";
import * as Scroll from "react-scroll";
const Anchor = Scroll.Link;
const Element = Scroll.Element;

class Politics extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.title = "Politics";
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
                    <h2 className="blog-post-title">Sample blog post</h2>
                    <p className="blog-post-meta">January 1, 2014 by Mark</p>

                    <p>
                      This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography,
                      images, and code are all supported.
                    </p>
                    <hr></hr>
                    <p>
                      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque
                      ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus
                      sit amet fermentum.
                    </p>
                    <blockquote>
                      <p>
                        Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id
                        dolor id nibh ultricies vehicula ut id elit.
                      </p>
                    </blockquote>
                    <p>
                      Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                      lacinia bibendum nulla sed consectetur.
                    </p>
                  </Element>
                  <h2>Heading</h2>
                  <p>
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </p>
                  <h3>Sub-heading</h3>
                  <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                  <pre>
                    <code>Example code block</code>
                  </pre>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac
                    cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.
                  </p>
                  <h3>Sub-heading</h3>
                  <p>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                    consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                    condimentum nibh, ut fermentum massa justo sit amet risus.
                  </p>
                  <ul>
                    <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                    <li>Donec id elit non mi porta gravida at eget metus.</li>
                    <li>Nulla vitae elit libero, a pharetra augue.</li>
                  </ul>
                  <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                  <ol>
                    <li>Vestibulum id ligula porta felis euismod semper.</li>
                    <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
                    <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
                  </ol>
                  <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>
                </div>

                <div className="blog-post">
                  <h2 className="blog-post-title">Another blog post</h2>
                  <p className="blog-post-meta">December 23, 2013 by Jacob</p>

                  <p>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque
                    ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit
                    amet fermentum.
                  </p>
                  <blockquote>
                    <p>
                      Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id
                      dolor id nibh ultricies vehicula ut id elit.
                    </p>
                  </blockquote>
                  <p>
                    Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                    lacinia bibendum nulla sed consectetur.
                  </p>
                  <p>
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </p>
                </div>

                <div className="blog-post">
                  <h2 className="blog-post-title">New feature</h2>
                  <p className="blog-post-meta">December 14, 2013 by Chris</p>

                  <p>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                    consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                    condimentum nibh, ut fermentum massa justo sit amet risus.
                  </p>
                  <ul>
                    <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                    <li>Donec id elit non mi porta gravida at eget metus.</li>
                    <li>Nulla vitae elit libero, a pharetra augue.</li>
                  </ul>
                  <p>
                    Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                    lacinia bibendum nulla sed consectetur.
                  </p>
                  <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                </div>

                <nav className="blog-pagination">
                  <button className="btn btn-outline-primary m-r-8">Older</button>
                  <button className="btn btn-outline-secondary disabled" aria-disabled="true">
                    Newer
                  </button>
                </nav>
              </div>
              <aside className="col-md-4 blog-sidebar">
                <div className="p-4 mb-3 bg-light rounded">
                  <h4 className="font-italic">About</h4>
                  <p className="mb-0">
                    Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                    lacinia bibendum nulla sed consectetur.
                  </p>
                </div>

                <div className="p-4">
                  <h4 className="font-italic">Archives</h4>
                  <ol className="list-unstyled mb-0">
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        March 2014
                      </Anchor>
                    </li>
                  </ol>
                </div>

                <div className="p-4">
                  <h4 className="font-italic">Elsewhere</h4>
                  <ol className="list-unstyled">
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        GitHub
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        Twitter
                      </Anchor>
                    </li>
                    <li>
                      <Anchor spy={true} smooth={true} to="start">
                        Facebook
                      </Anchor>
                    </li>
                  </ol>
                </div>
              </aside>
            </div>
          </main>
          <footer className="blog-footer">
            <small>© 2016-2020 Josphine Labs.</small>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default Politics;
