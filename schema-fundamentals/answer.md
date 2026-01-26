1. What schema design is and what a database schema represents
Schema design is essentially the blueprint of a database, it is a process of planning how the data will be stored in the database. It defines the tables, columns, data types, constraints (or) rules, and the relationships that tables hold amongst each other. It is important to know how the data will be structured in the database before coding.

2. Why schema design is required before writing backend code
A schema design before writing the backend code is essential because backend code depends heavily on how the data is structured in the database. Moreover, if the table is created without any constraints or without a proper schema design, it is likely we'll have to alter the table and update its queries and fix multiple bugs. So since APIs will change quite often and queries will get really messy if we scip schema design, it is a lot easier to just do it before writing the backend code.

3. How poor schema design impacts data consistency, maintenance, and scalability
A poor schema design results in data inconsistencies like allowing entry of invalid data. It might allow Null values, or two users with the same emails, or orders whose user has been deleted. Poor schema design also makes it very difficult to maintain the data, because if it allows duplicated data, then fetching or updating the data would be a problem. More than one values might be changed, ad creates multiple bugs. Poor schema design is especially a problem when the system grows in scale. New features cannot built on incompetent old ones, and it makes using joins complicated. The more the system grows, the slower the queries become.

4. What validations are in schema design and why databases enforce validations (for example: NOT NULL, UNIQUE, DEFAULT, PRIMARY KEY)
The most common validations in schema design are NOT NULL, UNIQUE, DEFAULT, PRIMARY KEY, FOREIGN KEY. It is possible to write these validations in the backend, but backend code might fail sometimes, or sometimes people can bypass the APIs altogether. So database needs to enforce its own set of validations.

5. The difference between a database schema and a database table
While a database table is a single structure, a database scchema is the overall structure. It is a collection of the tables, their relationships, and their rules. A table only has rows and columns, and stores data pertaining to the respective entity. But a database schema stores information of how one table is related to the other and what kind of data needs to go into the tables.

6. Why a table should represent only one entity
An entity is a real world object, like an order, a user, a product. If two or more of these are in the same table, it would be a bad table design, because some values might repeat themselves, and sometimes one cell might have to hold more than one value, and it really hard to manage such data. So it is important to maintain a good distinction between one entity to the other during the creation of a good schema design.

7. Why redundant or derived data should be avoided in table design
Redundant data is the data that gets stored multiple times, and derived data is the dta that can be calculated by other existing column data in the table. Both of these must be avoided in a table design. Redundant data because it is really difficult to update the values, because if you change one value, you must update it everywhere. And derived data because it can go out of sync if any one value changes in the equation.

8. The importance of choosing correct data types while designing tables
Choosing the correct datatype helps because it avoids bugs because of mismatched datatype value entries in the table. Because when calculations are performed on such values, where not all values are numbers for example, it cn lead to errors. So in order to avoid such blunders, it is necessary to specify what kind of data is allowed into the table.
