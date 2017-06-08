// Relay.RootContainer is a React component that, given a component and a route, attempts to fulfill the data required in order to render an instance of Component
// Relay.RootContainer accepts three optional callbacks as props that give us more fine-grained control over the render behavior.
// They are renderLoading, renderFetched, renderFailure.

<Relay.RootContainer
    Component={ProfilePicture}
    route={profileRoute}
    renderLoading={function() {
        return <div>Loading...</div>
        }
    }
    // {...data}
    renderFetched={function(data) {
        return (
            <ScrollView>
                <ProfilePicture {...data} />
            </ScrollView>
        )
    }}
    // error.source
    renderFailure={function(error, retry) {
        return (
            <div>
                <p>{error.message}</p>
                <p><button onClick={retry}>Retry?</button></p>
            </div>
        )
    }}
    // forceFetch={true}
/>




// Whenever Relay is fulfilling data requirements, it can be useful to know when certain events occur.
// onReadyStateChange
// When Relay fulfills data, the onReadyStateChange callback is called one or more times with an object that describes the current "ready state". 
// ReadyStateEvent ...

