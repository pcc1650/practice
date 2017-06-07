// a simple GraphQL query, to get user's name and avatar whose id is 1001.
{
	user (id: 1001) {
		name,
		avatar	
	}
}

// query outcome
{
	"user": {
		"name": "tonyzhao",
		"avatar": "https://avatar.tonyzhao.com/hgfdsa"
	}
}


// hierarchical
{
	user (id: 1001) {
		name,
		avatar,
		age,
		friends {
			name,
			sex,
			addr {
				country,
				city
			}
		}
	}
}

// strong-typing 
// scalar type includes Int, Float, String, Boolean, ID
// advanced: Object, Interface, Union, Enum, Input Object, List, Non-Null
type Query {
	user: User
}

type User {
	name: String,
	photo: String,
	age: Integer,
	addr: Address,
	friends: [User]
}

type Address {
	country: String,
	city: String
}


// GraphQL query
{
	__schema {
		queryType {
			name,
			fields {
				name,
			}
		}
	}
}	


// Mutation
// comma or not ?
mutation {
	create_client (name: "tonyzhao", dob: "xx/xx/xxxx")
	{
		id
		name
		dob
	}
}


// fragment
{
	user {
		name
		friends {
			name
			events {
				name
			}
		}
	}
}

{
	user {
		name
		friends {
			...friendFragment
		}
	}
}

fragment friendFragment on User {
	name
	events {
		name
	}
}


// parameter
query getMyPost($id: String) {
	post(id: $id) {
		title,
		body,
		author {
			name
			avatarUrl
			profileUrl
		}
	}
}
