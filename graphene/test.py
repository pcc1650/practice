# A GraphQL schema describes your data model, and provides a GraphQL server with associated set of resolve methods that know how to fetch data.
import graphene

class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.Argument(graphene.String, default_value="stranger"))

    def resolve_hello(self, args, context, info):
        return 'Hello ' + args['name']
        
schema = graphene.Schema(query=Query)


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
