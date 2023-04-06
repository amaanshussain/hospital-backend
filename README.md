
# CS4347 Database Systems Hospital DBMS

An express.js app designed to work with a database managing a hospital for a Database Systems Class.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST`

`PORT`

`USERNAME`

`PASSWORD`

`DATABASE`


## API Reference

### Login Interface

#### Log in

```http
  POST /api/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

#### Log out

```http
  POST /api/login/logout
```


#### Create user

```http
  POST /api/login/create
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fName`      | `string` | **Required**.  |
| `mInit`      | `string` |  |
| `lName`      | `string` | **Required**.  |
| `deptId`      | `int` | **Required**. Department ID |
| `username`      | `string` | **Required**.  |
| `password`      | `string` | **Required**.  |

### Department Interface

#### Get all departments

```http
  GET /api/departments
```

#### Create department

```http
  POST /api/departments/createdepartment
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.  |


#### Get department rooms

```http
  GET /api/departments/department/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Department ID  |

#### Create room

```http
  POST /api/departments/createroom
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `department` | `int` | **Required**. Department ID  |


#### Get all beds

```http
  GET /api/departments/beds
```

#### Get beds by room

```http
  GET /api/departments/beds/:rno
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Bed Number  |

#### Create bed

```http
  POST /api/departments/createbed
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `department` | `int` | **Required**. Department ID  |
| `room` | `int` | **Required**. Room number  |

#### Move bed

```http
  POST /api/departments/movebed
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bed` | `int` | **Required**. Bed number  |
| `room` | `int` | **Required**. Room number  |

#### Delete bed

```http
  POST /api/departments/deletebed
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bed` | `int` | **Required**. Bed number  |
