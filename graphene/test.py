# 1. Getting Started
# A GraphQL schema describes your data model, and provides a GraphQL server with associated set of resolve methods that know how to fetch data.
import graphene

class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.Argument(graphene.String, default_value="stranger"))

    def resolve_hello(self, args, context, info):
        return 'Hello ' + args['name']
        
schema = graphene.Schema(query=Query)

# 2. Types Reference
# Graphene defines the following base Scalar Types: 
# graphene.String, graphene.Int, graphene.Float, graphene.Boolean, graphene.ID
# custom scalars: graphene.types.datetime.DateTime, graphene.types.datetime.Time, graphene.types.json.JSONString

# Mounting Scalars
# Scalars mounted in a ObjectType, Interface or Mutation act as Fields.
class Person(graphene.ObjectType):
    name = graphene.String()

# Is equivalent to: 
class Person(graphene.ObjectType):
    name = graphene.Field(graphene.String)

# NonNull
class Character(graphene.ObjectType):
    name = graphene.NonNull(graphene.String)
# Is equivalent to:
class Character(graphene.ObjectType):
    name = graphene.String(required=True)

# List, which indicates that this field will return a list of that type.
class Character(graphene.ObjectType):
    appears_in = graphene.List(graphene.String)


# Interfaces
# An Interface contains the essential fields that will be implemented by multiple ObjectTypes.
# The basics:
# Each Interface is a Python class that inherits from graphene.Interface
# Each attribute of the Interface represents a GraphQL field.
class Character(graphene.Interface):
    name = graphene.String()

# Human is a Character implementation
class Human(graphene.ObjectType):
    class Meta:
        interfaces = (Character, )
    born_in = graphene.String()

# In a schema, the above types have the following representation
interface Character {
   name: String 
}

type Human implements Character {
    name: String
    bornIn: String
}

# AbstractTypes
# An Abstract contains fields that can be shared among graphene.ObjectType, graphene.Interface, graphene.InputObjectType or other graphene.AbstractType
# The basics:
# Each AbstractType is a Python class that inherits from graphene.AbstractType
# Each attribute of the AbstractType represents a field (a graphene.Field or graphene.InputField depending on where it is mounted)
class UserFields(graphene.AbstractType):
    name = graphene.String()
class User (graphene.ObjectType, UserFields):
    pass
class UserInput(graphene.InputObjectType, UserFields):
    pass

type User {
    name: String
}
inputtype UserInput {
    name: String
}




# ObjectTypes
# An ObjectType is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you're querying.
# The basics:
# Each ObjectType is a Python class that inherits from graphene.ObjectType.
# Each attribute of the ObjectType represents a Field.

class Person(graphene.ObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    full_name = graphene.String()

    def resolve_full_name(self, args, context, info):
        return '{} {}'.format(self.first_name, self.last_name)
# first_name and last_name are fields of the ObjectType. Each field is specified as a class attribute, and each attribute maps to a Field.


# Resolvers
# A resolver is a method that resolves certain fields within a ObjectType. If not specified otherwise, the resolver of a field is the resolve_{field_name} method on the ObjectType. 
# By default resolvers take the arguments args, context, and info.
class Query(graphene.ObjectType):
    reverse = graphene.String(word=graphene.String())

    def resolve_reverse(self, args, context, info):
        word = args.get('word')
        return word[::-1]

# Resolvers outside the class


# Schema
# A Schema is created by supplying the root types of each type of operation, query and mutation(optional). A schema definition is then supplied to the validator and executor.
root_schema = graphene.Schema(
    query=MyRootQuery,
    mutation=MyRootMutation,
)

# There are some cases where the schema cannot access all of the types that we plan to have. For example, when a field returns an Interface, the schema doesn't know about any of the implementations. In this case, we need to use the type argument when creating the Schema.
root_schema = graphene.Schema(
    query=MyRootQuery,
    types=[SomeExtraObjectType]
)

# Querying
root_schema.execute('{ lastName }')
# Auto CamelCase field names


# Mutation
# A Mutation is a special ObjectType that also defines an input.
class CreatePerson(graphene.Mutation):
    class Input:
        name = graphene.String()

    ok = graphene.Boolean()
    person = graphene.Field(lambda: Person)

    @staticmethod
    def mutate(root, args, context, info):
        person = Person(name=args.get('name'))
        ok = True
        return CreatePerson(person=person, ok=ok)
# person and ok are the output fields of the Mutation when is resolved.
# Input attributes are the arguments that the Mutation CreatePerson needs for resolving.
# mutate is the function that will be applied once the mutation is called.


# InputFields and InputObjectTypes
# InputFields are used in mutations to allow nested input data for mutations
# To use an InputField you define an InputObjectType that specifies the structure of your input data.
# InputObjectTypes can also be fields of InputObjectTypes allowing you to have as complex of input data as you need.



# 3. Execution
# schema = graphene.Schema(...)
# result = schema.execute('{ name }')
# result represents the result of execution. result.data is the result of executing the query, result.errors is None if no errors occured, and is a non-empty list if an error occurred.


# Middleware
# Dataloader



# 4. Relay
# Nodes
# A node is an Interface provided by graphene.relay that contains a single field id(which is a ID!). Any object that inherits from it has to implement a get_node method for retrieving a Node by an id.
class Ship(graphene.ObjectType):
    class Meta: 
        interfaces = (relay.Node, )

    name = graphene.String(description='The name of the ship')

    @classmethod
    def get_node(cls, id, context, info):
        return get_ship(id)
# The id returned by the Ship type when you query it will be a scalar which contains enough info for the server to know its type and its id.
# Custom Nodes ...
# Accessing node types
# If we want to retrieve node instances from a global_id(scalar that identifies an instance by it's type name and id), we can simple do Node.get_node_from_global_id(global_id, context, info)
# In the case we want to restrict the instance retrieval to a specific type, we can do:
# Node.get_node_from_global_id(global_id, context, info, only_type=Ship). This will raise an error if the global_id doesn't correspond to a Ship type.

# Node Root field
# As is required in the Relay specification, the server must implement a root field called node that returns a Node Interface.
# For this reason, graphene provides the field relay.Node.Field, which links to any type in the Schema which implements Node.
class Query(graphene.ObjectType):
    node = relay.Node.Field()

# Connection
# A connection is a vitaminized version of a List that provides ways of slicing and paginating through it.
# ????????


