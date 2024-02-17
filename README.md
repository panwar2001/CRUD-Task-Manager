# CRUD-Task-Manager
Frontend is built with shadonui+redux, To access only frontend visit this link :https://taskstore.vercel.app/ 

Backend is built with postgresql and rest api with express.
## Installation
```bash
git clone https://github.com/panwar2001/CRUD-Task-Manager.git
cd Frontend
npm install
```
```bash
cd Backend
npm install
```

### Postgresql download: https://www.postgresql.org/download/
##### install postgresql , then start it. After that create database and relational table on that database . Below are commands for reference.
```bash
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
```
In Frontend Repository run below command , To start the frontend.
```bash
npm run dev
```
In Backend Repository run below command , To start the backend.
```bash
npm start
```