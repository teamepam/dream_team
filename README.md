# EPAM JS Hiring Camp Lviv 🎉

## Table of Contents

* [Abstract](#abstract)
* [Setup](#setup)
* [Workflow](#workflow)
  * [Import](#1-import)
  * [Expose](#2-expose)
* [Where to find test data?](#where-to-find-test-data)
* [OS Support](#os-support)
* [Hints](#hints)

## Abstract

This task mimics migration of legacy data to modern scalable data store and exposing it via RESTful web service interface.

## Setup

* Use latest production ready version of **Node.js**
* Use `npm` (or `yarn` if you like) to add dependencies to `package.json`
* Add basic linting to the project
* Are you TDD kinda person? Add some unit test where applicable
* Read the app configuration from running environment
* The app should have single `start` script that executes **Import** phase and then start HTTP(s) server
* In case database you've chosen requires migration script, make sure you create one.
* OPTIONAL: Are you into DevOps and Automation? Add `Dockerfile` and maybe one shell script as single entry point

## Workflow

### 1. Import

There are two types of records to be migrated: `Users` and `Orders`. Sources are plain CSV files placed on the disk. Each file contains header row. Import tool should read data records from file and write to the database.

Figure out a way to run it from the shell and add some basic help for **CLI**. 

``` shell
$ import --type=orders --source=orders.csv
```
``` shell
$ import --type=users --source=users.csv
```
### 2. Expose

You should create `npm` script named `serve` which runs HTTP(s) server signaling with short message to console when ready. Server has to support graceful shutdown logs requests to console and most importantly expose two **Resources** and conform to the REST architectural style.

#### Resource #1. System status
Returns current system `status` which one of the following: `good` or `bad` and `last_updated` timestamp. Resource will indicate database missing or not reachable with `bad` status in response.

```json
{
  "last_updated": "2018-12-01T11:16:33.703Z",
  "status": "good"
}
```

#### Resource #2. Total quantity of certain product being purchased by user over time.

Returns orders in `purchased` status from users with status being `active`. Resource should respond with records sorted by total quantity in descending order.

OPTIONAL: Add Swagger UI to the API you've build.

##### Parameters
* `product` - product name to filter by. *Required*
* `limit` - records to return. *Optional and defaults to `3`*
* `offset` - records to skip from the beginning *Optional*

```json
[{
    "id": 16,
    "name": "Nicholas",
    "quantity": 64
  },
  {
    "id": 7,
    "name": "Patrick",
    "quantity": 45
  },{
    "id": 3,
    "name": "Jack",
    "quantity": 23
}]
```

## Where to find test data?

Please find sample CSV files in `testdata` folder. Also note that sample size is pretty small but we're expecting you to put some efforts into CLI and/or API future proofing. (Make it scalable 😝)

## OS Support

The app has to be platform agnostic and run on following Operation Systems:

* Linux (pick any flavor)
* macOS 10.12+
* Windows 10 (God help you)

## Hints

Node.js ecosystem is huge and bizarre but we expect you wrestle it and choose well supported and secure packages.

For instance, when developing command-line app [Commander](https://www.npmjs.com/package/commander). When tinkering with RESTful APIs – [Express](https://expressjs.com) or [Koa](https://koajs.com/). When dealing with configuration use [dotenv](https://www.npmjs.com/package/dotenv) and chose from wide selection of middleware for [Express](https://expressjs.com/en/resources/middleware.html) or [Koa](https://github.com/koajs/koa/wiki) to help you with this coding task.

Good Luck and looking forward to see you on technical interview 😉



CREATE TABLES

```
create schema if not exists epam;

use epam;

create table if not exists epam.users
(
    id     int auto_increment
        primary key,
    name   varchar(50)          not null,
    status tinyint(1) default 0 not null
);

create table if not exists epam.status
(
    id    int auto_increment
        primary key,
    label varchar(50) null
);

create table if not exists epam.`order`
(
    id        int auto_increment
        primary key,
    count     int         null,
    product   varchar(50) not null,
    status_id int         null,
    user_id   int         not null,
    constraint order_status_id_fk
        foreign key (status_id) references epam.status (id)
            on update cascade on delete cascade,
    constraint order_users_id_fk
        foreign key (user_id) references epam.users (id)
            on update cascade on delete cascade
);


```


TEST DATA

```
INSERT INTO epam.users(name, status) VALUE ('Vlad', true);
INSERT INTO epam.users(name, status) VALUE ('Valya', FALSE);
INSERT INTO epam.users(name, status) VALUE ('Ruslan', TRUE);
INSERT INTO epam.users(name, status) VALUE ('Viktor', FALSE);

INSERT INTO epam.status(label) VALUE ('pending');
INSERT INTO epam.status(label) VALUE ('purchased');
INSERT INTO epam.status(label) VALUE ('canceled');

INSERT INTO epam.`order`(count, product, status_id, user_id) VALUE (22, 'Apple', 1, 1);
INSERT INTO epam.`order`(count, product, status_id, user_id) VALUE (5, 'Grushka', 2, 2);
INSERT INTO epam.`order`(count, product, status_id, user_id) VALUE (3, 'Banana', 3, 3);
INSERT INTO epam.`order`(count, product, status_id, user_id) VALUE (99, 'Orange', 2, 3);
INSERT INTO epam.`order`(count, product, status_id, user_id) VALUE (1, 'Pomidor', 1, 2);
```
