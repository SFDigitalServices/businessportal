Restore
---

    $ mysql -u root -p < db_dump/ccsf_preview_db.sql

Dump
---

    $ mysqldump -u root -p --extended-insert=FALSE ccsf_preview > db_dump/ccsf_preview_db.sql
    
