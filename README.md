# CG/SQL

CG/SQL is a code generation system for the popular SQLite library that allows
developers to write stored procedures in a variant of Transact-SQL (T-SQL) and
compile them into C or Lua code that uses SQLite’s C API to do the coded
operations.  CG/SQL enables engineers to create highly complex stored
procedures with very large queries, without the manual code checking that
existing methods require.

CG/SQL system also includes features for managing and upgrading schema,
creating test code for stored procedures, getting query plans for procedures,
as well as interfacing with stored procedures from other languages, such as
Java, C#, and Objective-C.

This tree-sitter grammar is automatically generated from the Bison grammar that
specifies CG/SQL.  The project and its documentation can be found [here](https://github.com/ricomariani/CG-SQL-author).

### Grammar Diagrams
- [Language Railroad Diagrams](https://ricomariani.github.io/CG-SQL-author/cql_grammar.railroad.html)

## Licensing
This grammar is [MIT-licensed](./LICENSE) like the rest of CG/SQL.
