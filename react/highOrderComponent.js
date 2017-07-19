// High order component
// prop proxy
import React, { Component } from 'react'

const MyContainer = (WrappedComponent) => 
    class extends Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }

class MyComponent extends Component {
    // ..
}

export default MyContainer(MyComponent)

// Decorator method

@MyContainer
class MyComponent extends Component {
    render(){}
}

export default MyComponent
