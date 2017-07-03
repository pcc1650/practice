# [1, 4, 9]
result = map(lambda s: s**2, [1,2,3])

# Lambda Functions
# Lambda definition does not include a "return" statement
g = lambda x: x**2
g(8) # 64


# make_incrementor
def make_incrementor(n): return lambda x: x + n
f = make_incrementor(2)
print f(42) # 44


# foo = [2, 18, 9, 22, 17, 24, 8, 12, 27]
# [18, 9, 24, 12, 27]
filter(lambda x: x % 3 == 0, foo)
# [14, 46, 28, 54, 44, 58, 26, 34, 64]
map(lambda x: x * 2 + 10, foo)
# 139
reduce(lambda x, y: x + y, foo)
# do the same with sum(foo)
# All of the three function expect two arguments: A functuon and a list.


# list.split()


# String.replace
str = "this is string example....wow!!! this is really string"
print str.replace("is", "was") # thwas was string example....wow!!! thwas was really string
print str.replace("is", "was", 3) # thwas was string example....wow!!! thwas is really string
# str is still the origin string

# initialize list
# the first one creates copies of the lists, not new lists for column or row.
# the second one is list comprehension
counts1 = [[0 for _ in range(7)] for _ in range(3)]
counts2 = [[0] * 7 ] * 3 


# use the variable args in a function
def sample_func(**filters):
    status = filters['status']
    period = filters['period']

# from graphene.types.generic import GenericScalar
# from django.core import serializers
# options = GenericScalar
# xxx.objects.order_by(*order)
# xxx.objects.filter(**filters)
# serializers.serialize('json', querySet, fields=('name', ))
