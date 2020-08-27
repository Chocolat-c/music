import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

class MapRoute extends Component {
    render() {
        let { routes } = this.props
        return (
            <Switch>
                {
                    routes.map((item,index) => {
                        return (
                            item.redirect ? (
                                <Redirect key={item.path} path={item.path} to={item.redirect} />
                            ) : (
                                <Route key={item.path} path={item.path}
                                    // component={item.component}
                                    render={(props) => {
                                        return item.auth ? (
                                            localStorage.getItem('uname') ? (
                                                <item.component {...props} routes={item.children} />
                                            ) : (
                                                <Redirect to='/login' />
                                            )
                                        ) : (
                                            <item.component {...props} routes={item.children} />
                                        )
                                    }}
                                 />
                            )
                        )
                    })
                }
            </Switch>
        );
    }
}

export default MapRoute;