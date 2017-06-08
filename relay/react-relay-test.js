// Relay todo list example
class Todo extends React.Component {
	render() {
		return (
			<div>{this.props.todo.id} {this.props.todo.text}</div>
		)
	}
}

const TodoContainer = Relay.createContainer(Todo, {
	fragments: {
		todo: () => Relay.QL`
			fragment on Todo {
				id,
				text
			}
		`,
	}
})

// another example. This example is a whole process of GraphQL and relay.
// HelloWorld.js
import React from 'react'
import Relay from 'react-relay'

class HelloWorld extends React.Component {
	render() {
		var { hello } = this.props.someHelloFromRelay
		return <h1>{hello}</h1>
	}
} 

export default Relay.createContainer(HelloWorld, {fragments: {
		someHelloFromRelay: () => Relay.QL`
			fragment on HelloObject {
				hello,
			}
		`,
	}
}) 


// Route or RelayQueryConfig
// HelloWorldRoute.js
import Relay from 'react-relay'

class HelloRoute extends Relay.Route {
	// routeName must be unique
	static routeName = 'testRoute'
	static queries = {
		someHelloFromRelay: (Component) => Relay.QL`
			query GreetingsQuery {
				helloField {
					${Component.getFragment('someHelloFromRelay')},
				},
			}
		`,
	}
}

// app.js
import HelloWorld from './HelloWorld'
import HelloRoute from './HelloWorldRoute'
ReactDOM.render(
	<Relay.RootContainer
		Component={HelloWorld}
		// route name not 'testRoute'
		route={new HelloRoute()}
	/>,
	mountNode
);


// schema.js
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

var GreetingsType = new GraphQLObjectType({
	name: 'HelloObject',
	fields: () => ({
		hello: {type: GrapgQLString},
	}),
})

export default new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'request',
		fields: () => ({
			helloField: {
				type: GreetingsType,
				resolve: () => data,
			},
		}),
	}),
})
