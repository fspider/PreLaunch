import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';
import axios from 'axios'
import FileViewer from 'react-file-viewer';
import { Redirect } from 'react-router';
import Popup from 'reactjs-popup'
import Drawer from 'react-drag-drawer'
import mixpanel from 'mixpanel-browser';
import img from '../landing.jpg';
import './Home.css';

const styles = {
    width:"100%",
    backgroundImage: `url(${ img })`,
    backgroundRepeat  : "no-repeat",
    // backgroundPosition: "center",
    backgroundSize:"cover",
    height:"1050px",
    textAlign:"center"
};

const fi_styles = {
    fontSize : "33px",
};


export default class Home extends Component {
    constructor(props){
        super(props)

        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.state = {
            isVerified: false,
            cat_show: false,
            showPopup: true
        }
    }

    componentDidMount() {
    }

    recaptchaLoaded() {
        console.log('captcha successfully loaded');
    }

    handleSubscribe() {
        const user={name:"user"};
        axios.post("http://localhost:8080/check_captcha",{user,headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(res => {
               if(res.data.status){
                   alert('You have successfully subscribed!');
                   // return (<Redirect to={"//app.sendinblue.com/account/login"} href={"//app.sendinblue.com/account/login"}/>);
                   window.location.href = "https://app.sendinblue.com/account/login";
               }
               else{
                   alert('Please Verify that you are a human!');
                   this.setState({
                       cat_show:true
                   });
               }

            });

    }

    verifyCallback(response) {
        if (response) {
            this.setState({
                isVerified: true
            });
            alert("Passed");
            // return (<Redirect to={"//sendinblue.com"} target="_blank" href={"//sendinblue.com"}/>);
            window.location.href = "https://app.sendinblue.com/account/login";
        }
    }

    // toggle = () => {
    //     let { toggle } = this.state;
    //
    //     this.setState({ toggle: !toggle })
    // }

    closePopup() {
        this.setState({
            showPopup: false
        });
    }

    render() {
      return (
          <div style={styles}>
              <Navbar fluid default collapseOnSelect style={{"boxShadow":"none", "padding":"50px 100px 0 100px"}}>
                  <Navbar.Header>
                      <Navbar.Brand>
                          <Image src="assets/mark.png" className="mark-image" style={{"width":"300px"}}/>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                      <Nav pullRight style={{"marginTop":"30px"}}>
                          <NavItem eventKey={1} componentClass={Link} to={"//www.twitter.com"} target="_blank" href={"//www.twitter.com"} style={{"marginRight":"30px"}}>
                              <span className="btn btn-danger btn_pre">
                                  <i className="fa fa-twitter" style={fi_styles}></i>
                              </span>
                          </NavItem>
                          <NavItem eventKey={2} componentClass={Link} to={"//www.facebook.com"} target="_blank" href={"//www.facebook.com"} style={{"marginRight":"30px"}}>
                              <span className="btn btn-info btn_pre">
                                  <i className="fa fa-facebook" style={fi_styles}></i>
                              </span>
                          </NavItem>
                          <NavItem eventKey={3} componentClass={Link} to={"//www.instagram.com"} target="_blank" href={"//www.instagram.com"} style={{"marginRight":"30px"}}>
                              <span className="btn btn-info btn_pre">
                                  <i className="fa fa-instagram" style={{"fontSize":"35px", "color":"white"}}></i>
                              </span>
                          </NavItem>
                          <NavItem eventKey={4} componentClass={Link} to={"//www.youtube.com"} target="_blank" href={"//www.youtube.com"} style={{"marginRight":"30px"}}>
                              <span className="btn btn-info btn_pre">
                                  <i className="fa fa-youtube-play" style={fi_styles}></i>
                              </span>
                          </NavItem>
                      </Nav>
                  </Navbar.Collapse>
              </Navbar>
              <div className="content">
                  <span style={{"fontSize":"60px", "color":"white"}}>
                      Transforming the reading experience for children worldwide!
                  </span><br></br><br></br><br></br><br></br>
                  <span style={{"fontSize":"30px", "color":"white"}}>
                      Where your child can be at the centre of stories.
                  </span><br></br><br></br><br></br><br></br>
                  <span style={{"fontSize":"50px", "color":"white"}}>
                      Email me when it ready.
                  </span><br></br><br></br><br></br>
                  <Row style={{"margin":"0"}}>
                      <Col xs={12} sm={4} md={4}></Col>
                      <Col xs={12} sm={4} md={4}>
                          <form onSubmit={this.handleSubscribe}>
                          <Row>
                              <Col xs={12} sm={8} md={8} style={{"padding":"0"}}>
                                  <input type="email" className="form-control" style={{"height":"60px", "fontSize":"30px", "borderRadius":"5px 0 0 5px"}} placeholder="Enter your email" required/>
                              </Col>
                              <Col xs={12} sm={4} md={4} style={{"padding":"0"}}>
                                  <button type="submit" className="btn btn-danger btn-block btn-lg" style={{"height":"60px", "borderRadius":"0 5px 5px 0", "fontSize":"30px"}}>Sign Up</button>
                              </Col>
                          </Row>
                          </form>
                      </Col>
                      <Col xs={12} sm={4} md={4}></Col>
                  </Row>
                  { this.state.cat_show ?<Recaptcha
                      sitekey="6Ld2i78UAAAAAG2E_FEM5rkYLpIRYNU7JltUSVmX"
                      ref={(el) => {this.captchaDemo = el;}}
                      render="explicit"
                      onloadCallback={this.recaptchaLoaded}
                      verifyCallback={this.verifyCallback}
                  /> : null }
              </div>

              {this.state.showPopup ?
              <div className='popup'>
                  <div className='popup_inner'>
                      <Row>
                          <Col xs={8} sm={8} md={8}>
                            <div>
                                <p style={{"float":"right"}}>
                                    By using this website you agree to our <a href="assets/Cookies Policy.docx"><b>cookie policy</b></a><br></br>
                                    {/*We have updated our <a href="assets/Privacy Policy.docx">privacy policy</a>, please read and accept.*/}
                                </p>
                            </div>
                          </Col>
                          <Col xs={4} sm={4} md={4}>
                            <button onClick={this.closePopup.bind(this)} className="btn btn-primary btn-lg">Dismiss</button>
                          </Col>
                      </Row>
                  </div>
              </div> : null
              }

              {/*<FileViewer*/}
              {/*    fileType={'docx'}*/}
              {/*    filePath={"assets/Cookies Policy.docx"}*/}
              {/*    />*/}

              {/*<Popup trigger={<button> Trigger</button>}>*/}
              {/*    <div>Popup content here !!</div>*/}
              {/*</Popup>*/}
              {/*<Drawer*/}
              {/*    open={open}*/}
              {/*    onRequestClose={this.toggle}*/}
              {/*>*/}
              {/*    <div>Hey Im inside a drawer!</div>*/}
              {/*</Drawer>*/}
          </div>
      )
    }
}



mixpanel.init('2896b922feebfb6b659da03a7767c6f0');

let env_check = process.env.NODE_ENV === 'production';

let actions = {
    identify: (id) => {
        if (env_check) mixpanel.identify(id);
    },
    alias: (id) => {
        if (env_check) mixpanel.alias(id);
    },
    track: (name, props) => {
        if (env_check) mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            if (env_check) mixpanel.people.set(props);
        },
    },
};

export let Mixpanel = actions;


// This website uses cookies to ensure you have the best experience on our site.
//     We have updated our privacy policy since your last visit, please read and accept.