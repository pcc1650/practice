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
