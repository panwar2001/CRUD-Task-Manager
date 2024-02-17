linux installation:
sudo apt-get install postgresql

linux- 
sudo systemctl start postgresql
sudo systemctl stop postgresql

linux- 
to set new password for postgresql:
sudo -u postgres psql
windows password setup of postgresql db
psql -U postgres

ALTER USER postgres PASSWORD 'root';
CREATE DATABASE "TaskManager";

command to get into a database
\c TaskManager
To view list of database write below command
\l 

To drop table 
DROP TABLE tasks;