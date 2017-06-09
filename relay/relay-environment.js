// The Relay "Environment" bundles together the configuration, cache storage, and network-handling that Relay needs in order to operate.
// Most applications will create a single Environment instance and use it throughout.
// However, you may want to create multiple environments for different purposes. 
// For example, you may create a new environment instance whenever the user logsin or out
// in order to prevent data for different users being cached together.

//const environment = new Environment({
//    handlerProvider, // Can omit.
//    network,
//    store,
//})

getRelayEnvironment = (props) => {
    const environment = new Relay.Environment()
    environment.injectNetworkLayer(
        new Relay.DefaultNetworkLayer('graphql', {
            headers: {
                Authorization: props.token
            }
        })
    )
    return environment
}
