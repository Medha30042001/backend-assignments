
=> Define a database relationship. 

A database relationship is a representation of how one table/entity is connected to the other. We can always store the data in a single table instead of multiple tables, but that creates lots of issues like repitition and disorderliness. Thus creating multiple tables is the best way to approach storage of data. It is also important to connect these tables with relationships with one another.

Maintaining relationships between tables keeps the data organized, the data doesn't repeat, and it is easy to maintain and find data. It tells us how one table depends on or relates to another table.


=> Explain the types of database relationships and illustrate how each type is applied in an e-commerce application.

There are generally 3 types of relationships in relational databases, and they are one to one (1 : 1), one to many (1 : N), and many to many (M : N).

One to one relationships (1 : 1) -
 One row in table A is linked to exacty one row in table B. A real life example would be a user having only one user profile, and the user profile only belongs to that one user. 
![One to one](images/oneToOne(1).svg)

 user
 - user_id (PK)
 - email 
 - password

 user_profiles
 - profile_id (PK)
 - user_id (FK)
 - address 
 - phone

 Here, the user_id is the foreign key in the user_profiles table. This way, we can track users and profiles without cluttering the users table with optional data.

Another example being one country has only one capital, and vice versa.
![One to one](images/oneToOne.png)

One to many (1 : N) - 
One row in table A can be related to many rows in table B, but the same is not true vice versa.
An example is a customer being able to place MANY orders, but each order belongs to only the one customer.

 customers
 - customer_id (PK)
 - name
 - email

 orders
 - order_id (PK)
 - customer_id (FK)
 - total_amount 
 - status

Here, customer_id in the orders table is referencing to the customer from customers table. One customer can be found in multiple rows in the order table.
![One to many](images/oneToMany(1).webp)

Another example would be a book having many pages, but all pages belong to only one book.
![One to many](images/oneToMany(2).jpg)

Many to many (M : N) -
Multiple rows in table A are related to multiple rows in table B, and vice versa is also true.
One examaple being an order can contain multiple products, and a product can appear in multiple orders.
 orders
 - order_id (PK)
 - customer_id

 products
 - product_id (PK)
 - name 
 - price

 order_items
 - order_items_id (PK)
 - order_id (FK)
 - product_id (FK)
 - quality

 Here, order_items connects to both orders and products, and it stores an extra row of data like quantity
![Many to many](images/manyToMany(3).png)
![Many to many](images/manyToMany(1).png)

Another example can be a student being enrolled in many courses, and one course can be enrolled by many other students
![Many to many](images/manyToMany(2).png)
