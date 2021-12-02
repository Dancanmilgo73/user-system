-- create table dbo.projects(
--     projectId int IDENTITY(1,1) not null,
--     projectName VARCHAR(50) not null,
--     projectDescription VARCHAR(300) null DEFAULT NULL

-- )
-- create table dbo.users(
--     userId int IDENTITY(1,1) not null,
--     username varchar(50) not null,
--     email varchar(50) not null UNIQUE,
--     password varchar(500) not null UNIQUE,
--     projectId int not null
-- )

-- create table dbo.tasks(
--     taskId int IDENTITY(1,1) not null,
--     taskName varchar(50) not null,
--     projectId int not null,
--     userId int not null,
--     taskDescription varchar(500) null
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

-----------------------user projects link table------------s
-- create table dbo.usersProjects(
--     userId int not null unique,
--      CONSTRAINT fk_userId FOREIGN KEY (userId) 
--         REFERENCES dbo.users(userId),
--     projectId int not null,
--     CONSTRAINT fk_projectId FOREIGN KEY (projectId) 
--         REFERENCES dbo.projects(projectId)

-- )


-- insert into dbo.projects(projectname) values('XYZ')
insert into dbo.usersProjects(userId, projectId) values(6,1)

SELECT * from dbo.usersProjects


insert into dbo.tasks(taskName, projectId, userId, taskDescription) values('BE', 1,6,'Designing the Backend'),
                                                                           ('DB', 1, 5, 'Design the database')             
SELECT * from dbo.tasks
delete from dbo.tasks

select * from dbo.projects
delete from dbo.projects

delete from dbo.usersProjects
alter table dbo.usersProjects
    add UNIQUE(projectId)

select * from dbo.usersProjects

insert into dbo.users (username, email, [password]) values('Eric', 'Eric@gmail.com', 'Eric2021'),
                                                        ('Nick', 'nick@gmail.com', 'Nick2021'),
                                                        ('Felix', 'felix@gmail.com', 'Felix2021')

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


select * from dbo.users

-- ////projects
alter table dbo.projects
    add isDeleted bit not null default 0


select * from dbo.projects

-- /////tasks
alter table dbo.tasks 
    add isDeleted bit not null default 0

select * from dbo.tasks

select * from dbo.usersProjects