

# Cranban

## Description

Craneban is a Kanban board to create projects and tasks, tasks can handle subtasks. Users can create Teams, invite members to share tasks to each other solve projects in colloboration.

I build it myself using React, Node.js and MongoDB



## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating team
- **Login:** As a user I can login to the platform so that I can see my profile
- **Logout:** As a user I can logout from the platform so no one else can use it
- **See my profile** As a user I want to see my profile, edit my password, or delete my profile
- **Add team** As a user I can create a new team so that I can start to asign tasks to my team member
- **See my team** As a user I want to see my team, and the task the are doing, and have done
- **Create project** As a user I want to create a project, name it, add a deadline
- **Create task** As a user I want to create task, mark them as done, add a deadline

  



### Backlog

## Client

### Client Routes (REACT)

| Path                            | Component                | Permissions           | Behavior                                                     |
| ------------------------------- | ------------------------ | --------------------- | ------------------------------------------------------------ |
| `/`                             | HomePageComponent        | public/user           | Link to login and signup in public and user's dashboard if user |
| `/signup`                       | SignupPageComponent      | anon only             | signup form, link to login, navigate to homepage after signup |
| `/login`                        | LoginPageComponent       | anon only             | login form, link to signup, navigate to homepage after login |
| `/edit-profile`                 | EditProfilePageComponent | user only             | form to update the user's data                               |
| /projects/                      | Projects                 | user only             | Link to profile, add project, overview projects, tasks, specific task |
| /projects/:id                   | ProjectDetails           | user only             | Link to profile, add project, overview projects, edit project, edit task |
| /projects/:id/tasks:id          | TaskDetails              | user only             | Link to profile, add project, overview projects, delete project, edit project, edit task, delete task |
| /team/:id                       | Team                     | user only             | Link to profile, add project, overview projects              |
| /team/:id/edit                  | TeamDetails              | user only/team leader | Link to profile, add project, overview projects              |
| /team/:id/project/:id           | TeamProjects             | user only/team member | Link to profile, add project, overview projects, team tasks, specific team task |
| /team/:id/project/:id/tasks/:Id | TeamProjectDetails       | user only/team member | Link to profile, add project, overview projects, delete project, edit project, edit task, delete task |

### Components

- HomeNoUser component

- Login component

- Signup component

- HomeUser component

- Navbar component

- Navtop component

- ProjectList component

- ProjectDetails component

- ProjectEdit component

- ProjectAdd component

- TaskDetails component

- TaskAdd component

- TaskEdit component

- TaskDone component

- Team component

- TeamDetails component

- TeamProjectDetails

- UserProjectDetails

  

  

### Services

Auth Service

- auth.login(user)
- auth.signup(user)
- auth.logout()
- auth.me()
- auth.getUser() // synchronous

Project Service

- Project.getOne(id)
- Project.create(id)
- Project.findOneByIdAndUpdate(id)
- Project.findOneByIdAndDelete(id)
- Project.find()

Task Service

- Task.getOne(id)
- Task.getTasksByProject(id)
- Task.create()
- Task.findOneByIdAndUpdate(id)
- Task.findOneByIdAndDelete(id)

Team Service

- Team.getOne(id)
- Team,getTasksByIdAndUpdate(id)
- Team.finOneByIdAndDelete(id)
- Team.create()
- Team.find()

## Server

### Models

```javascript
User = {
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
          password: { type: String, required; true },
          email: { type: String, required: true, unique:true },
  				projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
				},
  
 Team = {
  				name: { type: String, required: true },
  				users: [{type: Schemma.Types.ObjectId, ref: 'User'}],
  				projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
				},

  
Project = {
  						title: { type: String, required: true },
  						description: { type: String, required: true },
  						deadline: { type: Date, default: null },
  						tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
              users: [{ type: Schema.Types.ObjectId, reg: 'User'}],
  						teams: [{ type: Schema.Types.ObjectId, reg: 'Team'}],
						},
  
  Task = {
  					title: { type: String, required: true },
  					description: { type: String, required: true },
  					deadline: { type: Date, default: null },
  					project: { type: Schema.Types.ObjectID, ref: 'Project'},
  					done: { type: Boolean, default: false },
  					subTask: [{ 
  											description: { type: String, required: true }, 
  											done: { type: Boolean, default: false }
											}]
					}
```



### Schema

```javascript
const userSchema = mongoose.Schema({
                  firstName: { type: String, required: true },
                  lastName: { type: String, required: true },
                  password: { type: String, required; true },
                  email: { type: String, required: true, unique:true },
                  projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
  								teams: [{ type: Schema.Types.ObjectId, ref: 'Team'}]
}, { 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
})


const teamSchema = mongoose.Schema({
                  name: { type: String, required: true },
                  users: [{type: Schemma.Types.ObjectId, ref: 'User'}],
                  projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}]
 
}, { 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
})


const projectSchema = mongoose.Schema({
  								title: { type: String, required: true },
                  description: { type: String, required: true },
                  deadline: { type: Date, default: null },
                  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
                  users: [{ type: Schema.Types.ObjectId, reg: 'User'}],
  						    teams: [{ type: Schema.Types.ObjectId, reg: 'Team'}],
  
}, { 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
})


const taskSchema = mongoose.Schema({
  								title: { type: String, required: true },
                  description: { type: String, required: true },
                  deadline: { type: Date, default: null },
                  project: { type: Schema.Types.ObjectID, ref: 'Project'},
                  done: { type: Boolean, default: false },
                  subTask: [{ 
                              description: { type: String, required: true }, 
                              done: { type: Boolean, default: false }
														}]
  
},{ 
    timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
})




const subTaskSchema = mongoose.Schema({ 
                     description: { type: String, required: true }, 
                     done: { type: Boolean, default: false }
})
```







## 

## API Endpoints (backend routes)

| HTTP Method | URL                            | Request Body                            | Success status | Error Status | Description                                                  |
| ----------- | ------------------------------ | --------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/me                       | Saved session                           | 200            | 404          | Check if user is logged in and return profile page(200), if user not found(404) |
| POST        | `/auth/signup`                 | {firstName, lastName,  email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                  | {email, password}                       | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                 | (empty)                                 | 204            | 400          | Logs out the user(204), if not logged out(400)               |
| GET         | /user/email/:email             | (empty)                                 | 200            | 404          | find user by email (200), if not found(404)                  |
| GET         | /user/:id                      | (empty)                                 | 200            | 404          | find user by id (200), if not found(404)                     |
| PUT         | /user                          | {user, team, projects, tasks}           | 200            | 401          | Update the user via the id from the session.  if no session (401),  update user(200) |
| POST        | /projects                      | { title, description}                   | 201            | 500          | Body not empty, then create object(201), if body empty(500)  |
| GET         | /projects                      |                                         | 200            | 400          | get all the projects(200), if not found(400)                 |
| GET         | /projects/**:id**              |                                         | 200            | 500          | project found, populate tasks (200), if project id is not valid (500) |
| PUT         | /projects/**:id**              | { title, description, deadline }        | 200            | 500          | if body empty, or if project id is not valid (500), project id found and update by id (200) |
| DELETE      | /projects/**:id**              |                                         | 202            | 500          | if project id is valid, findByIdAndRemove (202), if project id is not valid (500) |
| GET         | /projects/**:projectId**/tasks |                                         | 200            | 500          | Get all tasks for a specific project. with valid task id (200), if task id is not valid (500) |
| GET         | /tasks/**:id**                 |                                         | 200            | 500          | Get one task by id. With valid task id (200), if task id is not valid (500) |
| POST        | /tasks                         | { title, description, deadline }        | 201            | 400          | New task, update project (201), err (400)                    |
| PUT         | /tasks/**:id**                 | { title, descriptio, deadline, done }   | 201            | 500          | find and update task (201), if task id not valid id (500)    |
| DELETE      | /tasks/**:id**                 |                                         | 201            | 500          | find and remove, update project (201), if task id not valid id (500) |
| GET         | /teams/**:id**                 |                                         | 200            | 404          | id is not valid 404, id exists, get team(200)                |
| POST        | /teams/**:id**                 | { teamId, title }                       | 201            | 500          | new team(201), if not valid(500)                             |
| DELETE      | /teams/**:id**                 |                                         | 202            | 500          | find one and remove(202), update project. if not valid(500)  |



### Links

git Server

git Client

[Trello]: https://trello.com/b/Qm5tr5P3	"Trello Board"

Präsentation



Deploy

