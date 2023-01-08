# Show table with columns:

```sql
select 
  table_name,
  table_rows

from information_schema.tables

where table_schema = 'chatik_test';

```

# Show all FK
```sql
select table_foreignForeignCol.* from
(


select
	table_name,
	column_name
from information_schema.columns 
where table_schema = 'chatik_test'
	and column_name like '%id'
	and column_name <> 'id'
group by
	table_name,
	column_name



) as table_foreignForeignCol
;

```
