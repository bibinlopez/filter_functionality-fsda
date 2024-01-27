### Filter Functionalities Project

1. pnpm/npm install

2. npm start

## No need to change MongoDB DataBase URI. It can be access from anywhere.

## Database has 1 Million + records.

## Performed Filter Queries with below 100ms latency.

### Route 1 - Get Items

http://localhost:3000/item?condition[price][$gte]=200&condition[price][$lte]=600&condition[rating]=3&condition[isFeatured] =false&condition[category]=clothing&condition[brand]=TESLA&condition[color]=blue&sort=price,-createdAt&limit=200&skip=0&condition[country]=Oman

### Route 2 - Get Single Item

http://localhost:3000/item/65ace8e869d39eb8ebf54b8e

### Route 3 - Delete an Item

http://localhost:3000/item/65ace8e869d39eb8ebf54b8e
