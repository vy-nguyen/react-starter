/*
 * Vy Nguyen (2019)
 */
import _         from 'lodash';
import React     from 'react';
import PropTypes from 'prop-types';
import Icofont   from 'react-icofont';

import {Link}          from 'react-scroll';
import {Redirect}      from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {withRouter, NavLink} from 'react-router-dom';
import {Navbar, Container, Nav, Form, FormControl, Button} from "react-bootstrap";

import Action     from '../action/Action';
import RoutePaths from '../config/RoutePaths';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        let elem = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elem.classList.add("menu-shrink");
                elem.classList.add("fixed-top");
            } else {
                elem.classList.remove("menu-shrink");
                elem.classList.remove("fixed-top");
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
    }

    closeNavbar() {
        if (window.matchMedia("screen and (max-width: 991px)").matches) {
            document.getElementById("collaspe-btn").click();
        }
    }

    renderHeaderItems(items, col, fmt) {
        let out = items.map(it => {
            return (
                <li key={_.uniqueId()}>
                    <a href={it.link} rel='noopener noreferrer' target='_blank'>
                        <Icofont icon={it.icon}/> {it.title}
                    </a>
                </li>
            );
        });
        return (
            <div className={col}>
                <div className={fmt}>
                    <ul className='list-inline'>
                        {out}
                    </ul>
                </div>
            </div>
        );
    }

    renderContactHeader(contacts) {
        return this.renderHeaderItems(contacts, 'col-lg-7 col-md-7', 'address-bar');
    }

    renderSocialLink(links) {
        return this.renderHeaderItems(links, 'col-lg-5 col-md-5', 'social-icons');
    }

    renderHeader() {
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        {this.renderContactHeader(this.props.Contacts)} 
                        {this.renderSocialLink(this.props.Links)}
                    </div>
                </div>
            </div>
        );
    }

    renderBrand() {
        return (
            <Navbar.Brand className="navbar-brand logo">
                <React.Fragment>
                    <LinkContainer exact to="/">
                        <img src={this.props.MainLogo} alt="Logo"/>
                    </LinkContainer>
                </React.Fragment>
            </Navbar.Brand>
        );
    }

    renderBrandAlt() {
        if (this.props.Logo2 == null) {
            return null;
        }
        return (
            <Navbar.Brand className="navbar-brand logo"> 
                <React.Fragment>
                    <LinkContainer exact to="/">
                        <img className="img-fluid" src={this.props.Logo2} alt=""/>
                    </LinkContainer>
                </React.Fragment>
            </Navbar.Brand>
        );
    }

    renderNavLinkItem(items) {
        let out = items.map((it) => {
            let cls = it.className ? it.className : 'nav-link';
            return (
                <Nav.Item key={_.uniqueId()}>
                    <NavLink to={it.link} className={cls} activeClassName="">
                        {it.title}
                    </NavLink>
                </Nav.Item>
            );
        });
        return (
            <React.Fragment>{out}</React.Fragment>
        );
    }

    renderMenuItem(items) {
        let route = this.props.Opt.routeLink, out;
       
        out = items.map((it) => {
            let item, clsn = it.className ? it.className : 'nav-link';

            item = route || it.doRoute ?
                <NavLink className={clsn} to={it.link}>
                    {it.title}
                </NavLink> 
                    :
                <Link activeclass="active"
                    to={it.link}
                    spy={it.spyItem}
                    smooth={it.smoothItem}
                    offset={it.offset || -200}
                    duration={it.duration || 800}
                    className={clsn}
                    onClick={this.closeNavbar}>
                    {it.title}
                </Link>;
            return (
                <Nav.Item key={_.uniqueId()}>
                    {item}
                </Nav.Item>
            );
        });
        return (<React.Fragment>{out}</React.Fragment>);
    }

    logout = () => {
        Action.logout();
        this.props.history.push('/');
    }

    renderLogin() {
        let out, clsn, login = this.props.Opt.login;
        
        if (login == null) {
            return null;
        }
        clsn = login.className ? login.className : "nav-link";
        if (login.login) {
            out = (
                <div onClick={this.logout} className={clsn}>
                    <span><Icofont icon="logout"/> {login.title}</span>
                </div>
            );
        } else {
            out = (
                <NavLink to={login.link} className={clsn}>
                    <span><Icofont icon="login"/> {login.title}</span>
                </NavLink>
            );
        }
        return (
            <Nav.Item>{out}</Nav.Item>
        );
    }

    renderSearch() {
        if (this.props.Opt.search === false) {
            return false;
        }
        return (
            <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
            </Form>
        );
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect push to={RoutePaths.homeLink}/>;
        }
        return (
            <React.Fragment>
                {this.renderHeader()}
                <Navbar
                    id="navbar"
                    bg="light"
                    expand="lg"
                    className="navbar navbar-expand-md navbar-light"
                    collapseOnSelect={true}>
                    <Container>
                        {this.renderBrand()}
                        {this.renderBrandAlt()}
                        <Navbar.Toggle 
                            className="navbar-toggler" 
                            type="button" data-toggle="collapse" 
                            data-target="#navbarSupportedContent" 
                            aria-controls="navbarSupportedContent" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation" 
                            id="collaspe-btn"/>

                        <Navbar.Collapse id="navbarSupportedContent">
                            <Nav>
                                {this.renderMenuItem(this.props.MenuItem)}
                            </Nav>
                            <Nav className="justify-content-end">
                                {this.renderLogin()}
                            </Nav>
                        </Navbar.Collapse>
                        {this.renderSearch()}
                    </Container>
                </Navbar>
            </React.Fragment>
        );
    }
}

// Props Types
NavBar.propTypes = {
    Contacts:  PropTypes.arrayOf(PropTypes.shape({
        link:  PropTypes.string,
        icon:  PropTypes.string,
        title: PropTypes.string
    })),
    Links: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        icon: PropTypes.string
    })),
    MenuItem: PropTypes.arrayOf(PropTypes.shape({
        title:  PropTypes.string,
        link:   PropTypes.string,
        spy:    PropTypes.bool,
        smooth: PropTypes.bool,
        offset: PropTypes.number,
        duration:  PropTypes.number,
        className: PropTypes.string
    })),
    Opt: PropTypes.shape({
        login: PropTypes.object,
        lang: PropTypes.bool,
        search: PropTypes.bool,
        routeLink: PropTypes.bool
    }),
    MainLogo: PropTypes.string,
    Logo2: PropTypes.string
};

const NavBarWithRouter = withRouter(NavBar);

export default NavBarWithRouter;
