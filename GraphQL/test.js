// a simple GraphQL query, to get user's name and avatar whose id is 1001.
{
	user (id: 1001) {
		name,
		photo
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
// object type 
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
