
import React           from 'react';
import {CSSTransition} from 'react-transition-group';
import {Route, Switch, Redirect} from 'react-router-dom';

import '../css/App.css';
import IndexView   from '../view/IndexView';
import HomeView    from '../view/HomeView';
import ContactView from '../view/ContactView';
import LoginView   from '../view/LoginView';
import NavBar      from '../components/NavBar';
import RoutePaths  from '../config/RoutePaths';

class AppRouter extends React.Component {
    getLogin = (p) => {
        return <LoginView {...p}/>;
    }

    getHome = (p) => {
        return <HomeView {...p}/>;
    }

    getContact = (p) => {
        return <ContactView {...p}/>;
    }

    getIndex = (p) => {
        return <IndexView {...p}/>;
    }

    getRoutes = (location) => {
        return (
            <Switch location={location}>
                <Route exact path={RoutePaths.login}   render={p => this.getLogin(p)}/>
                <Route exact path={RoutePaths.home}    render={p => this.getHome(p)}/>
                <Route exact path={RoutePaths.contact} render={p => this.getContact(p)}/>
                <Route exact path='/'                  render={p => this.getIndex(p)}/>
                <Redirect to='/'/>
            </Switch>
        );
    }

    render() {
        let location = this.props.location, timeout = { enter: 900, exit: 900 };
        return (
            <CSSTransition key={location.key} timeout={timeout} classNames="fade">
                <section>
                    {this.getRoutes(location)}
                </section>
            </CSSTransition>
        );
    }
}

class App extends React.Component {
    getAppRouter = (props) => {
        return <AppRouter {...props} {...this.props}/>;
    }

    renderNavBar = () => {
        let opt = {
            search:    true,
            routeLink: true,
            login: {
                login: false,
                title: 'Login',
                link:  RoutePaths.login
            }
        },
        menuItem = [
          {
            title: 'Index',
            link:  '/'
          }, {
            title: 'Home',
            link:  RoutePaths.home
          }, {
            title: 'Contact',
            link:  RoutePaths.contact
          }
        ],
        links = [
          {
            link: RoutePaths.contactPhone,
            icon: 'icofont-phone'
          }, {
            link: RoutePaths.contactEmail,
            icon: 'icofont-email'
          }, {
            link: RoutePaths.contactFb,
            icon: 'icofont-facebook'
          }, {
            link: RoutePaths.contactTwitter,
            icon: 'icofont-twitter'
          }, {
            link: RoutePaths.contactGoogle,
            icon: 'icofont-google-talk'
          }
        ],
        contacts = [
          {
            link:  RoutePaths.contactPhone,
            icon:  'icofont-phone',
            title: 'Phone'
          }, {
            link:  RoutePaths.contactEmail,
            icon:  'icofont-email',
            title: 'Email'
          }
        ];
        return (
            <NavBar Opt={opt}
                MenuItem={menuItem}
                Links={links}
                Contacts={contacts}
                MainLogo=''/>
        );
    }

    render() {
        return (
            <div className='App'>
                <React.Fragment>
                    {this.renderNavBar()}
                    <Route render={p => this.getAppRouter(p)}/>
                </React.Fragment>
            </div>
        );
    }
}

export default App;
