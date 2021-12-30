-- create table dbo.projects(
--     projectId int IDENTITY(1,1) not null,
--     projectName VARCHAR(50) not null,
--     projectDescription VARCHAR(300) null DEFAULT NULL

-- )
-- ------------------------//////USERS TABLE/////--------------------------
-- drop table dbo.users
-- create table dbo.users(
--     userId int IDENTITY(1,1) not null primary key,
--     username varchar(50) not null,
--     email varchar(50) not null UNIQUE,
--     password varchar(500) not null UNIQUE,
--     RoleId int default 2,
--     CONSTRAINT FK_roleId FOREIGN KEY(RoleId)
--     REFERENCES dbo.roles(RoleId),
--     projectId int default null,
--     CONSTRAINT FK_projectId FOREIGN KEY(projectId)
--     REFERENCES dbo.projects(projectId),
--     isDeleted bit DEFAULT 0
-- )
-- ----------------------//////TASKS TABLE//////----------------------S
-- drop table dbo.tasks
-- create table dbo.tasks(
--     taskId int IDENTITY(1,1) not null primary key,
--     taskName varchar(50) not null,
--     project_Id int not null,
--     CONSTRAINT FK_project FOREIGN key (project_Id)
--     REFERENCES dbo.projects(projectId),
--     userId int default null,
--     CONSTRAINT FK_userId FOREIGN KEY(userId)
--     REFERENCES dbo.users(userId),
--     taskDescription varchar(500) null,
--     isCompleted bit DEFAULT null,
--     isSubmitted bit DEFAULT 0,
--     isDeleted bit default 0
-- )


-- --------------------------creating primary keys---------------
-- alter table dbo.projects
--     add PRIMARY KEY(projectId)
-- alter table dbo.users
--     add PRIMARY KEY(userId)
-- alter table dbo.tasks
--     add PRIMARY key(taskId)

-- ---------------adding foreign keys-----------------
-- alter table dbo.users
--     add constraint FK_projectId foreign key (projectId) references dbo.projects (projectId) on delete cascade on update cascade
-- alter table dbo.tasks
--     add constraint FK_project foreign key (projectId) references dbo.projects (projectId) on delete cascade on update cascade

-- alter table dbo.tasks
--         add CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES dbo.users (userId);

-- adding unique foreign keys to enforce entity relationships
-- alter table dbo.users
--     add unique(projectId)

-- insert into dbo.users(username, email, [password]) values('dancan', 'dancanmilgo73@gmail.com', 'Dancan@@');

-- ------------------allow nulls fror projectId in users tables

-- alter table dbo.users
--     alter column projectId int 


-- SELECT * from dbo.users



-- insert into dbo.users(username, email, [password]) values('nick', 'nick@gmail.com', 'nick@@'),
--                                                             ('Ahmed', 'Ahemed@dmail.com', 'Ahmed@@');
-- ///////////////////////////////////////////////////////////////////////////////////////////////////////-------




insert into dbo.tasks(taskName, taskDescription, project_Id) values('BE','Designing the Backend',3),
                                                        ('DB', 'Design the database',3),
                                                        ('UI', 'Design the UI',4);             
SELECT * from dbo.tasks;


select * from dbo.projects
delete from dbo.tasks where taskId = 1

delete from dbo.users where userId = 37



insert into dbo.users (username, email, [password], projectId) values('Dan', 'Danc@gmail.com', 'Dan2021',3), 
('felix', 'felix@gmail.com', 'Felix2021',3);
SELECT * from dbo.users
-- -----------------create a table for roles---------------
-- create table dbo.roles(
--     roleId int IDENTITY(1,1) not null,
--     roleName varchar(50) not null
-- )
-- alter table dbo.roles
--     add PRIMARY KEY(roleId)

-- insert into dbo.roles(roleName) values('ADMIN'),
--                                       ('STANDARD'),
--                                       ('GUEST')      
-- SELECT * FROM dbo.roles

-- alter table dbo.users
--     add roleId int not null default 2,
--     CONSTRAINT fk_roleId FOREIGN KEY (roleId) 
--     REFERENCES dbo.roles(roleId)

-- insert into dbo.projects(projectName, projectDescription) values('Time Entry', 'Monitor working hours for Engineers'),
--                                                                 ('Perl Motors', 'Ecommerce for veicles'),
--                                                                 ('User management system', 'Manage teams working on a project')


insert into dbo.usersProjects(userId, projectId) values(10,4)


ALTER TABLE dbo.usersProjects 
    add UNIQUE(userId)


-- ----------------------------------------Add column for soft delete------------------
-- ///users
alter table dbo.users
    add isDeleted bit not null default 0

alter table dbo.users
    add emailSent bit not null default 0
select * from dbo.users

-- ////projects
alter table dbo.projects
    add isDeleted bit not null default 0
alter table dbo.projects 
    add isCompleted bit not null default 0


select * from dbo.projects

-- /////tasks
alter table dbo.tasks 
    add isDeleted bit not null default 0


alter table dbo.tasks
 add emailSent bit not null default 0

select * from dbo.tasks

select * from dbo.usersProjects

delete from dbo.users where userId = 

update dbo.users
    set RoleId = 1 where userId =7
update dbo.tasks
 set emailSent = 0