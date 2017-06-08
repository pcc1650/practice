// Relay containers define fragments and not queries, they can be easily embeded in multiple contexts.
// Routes are objects that define a set of root queries and input parameters.
// Relay.Route lets us devlare query roots.

class ProfileRoute extends Relay.Route {
    static queries = {
        user: () => Relay.QL`
            query { user(id: $userID) }
        `,
    }
    static paramDefinitions = {
        userID: {required: true},
    }
    static routeName = 'ProfileRoute'
}

window.addEventListener('popstate', () => {
    var userID = getQueryParamFromURI('userID', document.location.href);
    var profileRoute = new ProfileRoute({ userID: userID })
    ReactDOM.render(
        <Relay.RootContainer
            Component={UserProfile}
            route={profileRoute}
        />,
        document.getElementById('app')
    )
})




