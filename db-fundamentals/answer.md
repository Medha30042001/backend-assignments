1. Why is db.json not suitable as a database for real projects?
   We use db.json temporarily, only for learning purposes. But we cannot use it for real projects. This is because it fails badly in real-world applications.
   There are some file based storage limitations to using db.json and they are as follows -
   Db.json gives performance issues. Every request requires reading the whole file into the memory. Also, the whole file needs to be rewritten when you update something. So when the file grows larger, the operations get slower. If there are 1000 todos, even if we update 1 todo, the whole file is read and rewritten.
   The second issue is scalability. Db,json cannot adapt to large databases, and it cannot handle multiple users. It cannot work well with high traffic. Real databases can grow from MB to GB to even TB. But that is not possible with db.json. And when we need to fetch a certain data, it’s not easy, because there is no indexing or query optimization.
   The third issue is concurrency problems. If two users were to make changes in a db.json file at the same time, then the file is sure to get corrupted. One user can overwrite over the other because there’s no built-in locking or transaction support.
   The fourth issue is reliability. The data may be easily lost or corrupted because there’s no automatic backups or recovery mechanisms for the data lost. If a server crashes all of a sudden while writing in a file, the file remains partially written.
   Therefore, db.json is not very suitable for real world projects, because it lacks performance, scalability, concurrency and reliability that is required for bigger projects.

2. What are the ideal characteristics of a database system (apart from just storage)?
   An ideal database system is not just for storing data, it is much more. It provides the following benefits -
   =Performance : Its read and write operation is really fast. This is because it doesn’t waste time on searching for the data painstakingly, it indexes the data, uses query optimisation, and caches data. It can search by id in only a few milliseconds even if there are millions of records.
   =Concurrency : More than one user can write in the file at the same time. A good database can prevent data conflict by using locks, transactions and isolation levels. For example, a lot of websites can handle thousands of users placing orders at the same time without any problem.
   =Reliability : A good database ensures that the data is not lost by providing automatic backups, and recovery options when there’s a server crash, and keeps logs of the precise moment of events taking place.
   =Data Integrity : It ensures the data is not only correct, but also consistent by making sure all records have unique values, and that all fields are filled, and makes sure there are valid relationships between the records.
   =Scalability : It can handle it if the users increase over time, the data volume increases, or the number of requests increase all of a sudden. It supports both vertical and horizontal scaling, in other words, it can handle requests that require stronger servers, and it can also handle multiple server requests.
   =Fault Tolerance : If a server fails, the system still continues working regardless. This is extremely useful in banking, e-commerce, and cloud apps. This is possible using replication and failover.

3. How many types of databases are there? What are their use cases or applications?
   Databases are divided into two main types, and they are relational databases and non-relational databases.

    -Relational Databases : The data is stored in the form of tables, in a row and column format. SQL (Structured Query Language) is used to write and access data in this type of database. It has a fixed schema. Some examples of relational databases are MySQL, PostgreSQL, Oracle, SQL server.
    -Such databases usually support relationships between tables, and they have strong data integrity. They use unique keys for each record. Also, they use ACID properties.
    -Relational databases are commonly used in banking systems, e-commerce websites for orders and payments, in schools and colleges, and for inventory management. It is most useful when the data is structured and also related to one another.

    Non-Relational Databases : The data is stored flexibly, there is no schema to store the data. The data can be stored in documents, as key-value pairs, can also be stored in the form of graphs and columns. Some examples of non-relational databases are MongoDB (Document), Redis(Key-Value), Cassandra (Column-based), Neo4j (Graph).
    -Non-Relational databases are usually highly scalable. They can handle unstructured or semi-structured data really well. They work faster for large databases.
    -They are mostly used in social media apps, realtime chat apps, recommendation systems, big data and analysis, and lots of IOT applications.
    -It is best used when the data is huge, and flexible, or if the data is rapidly changing/
