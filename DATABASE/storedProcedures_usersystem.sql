-- --------------------------------------------Get all userss


-- alter procedure dbo.spUsers_GetAllUsers
-- as 
-- begin
--     select * from dbo.users where isDeleted = 0
-- end


-- exec dbo.spUsers_GetAllUsers

-- -----------------------------------------create user------------
-- create procedure dbo.spUsers_AddUser
--     @username varchar(50),
--     @email varchar(50),
--     @password varchar(500)
-- as
-- begin 
--     insert into dbo.users(username, email, password) values(@username, @email, @password)
-- end


-- exec dbo.spUsers_AddUser 'tich', 'ch@gmail', 'Dancan2021yy'

---------------------------------------------login user ----------------------------
-- drop procedure if exists dbo.spUsers_SelectUser;
-- create procedure dbo.spUsers_SelectUser
--     @email varchar(50)
-- as
-- begin 

--     select * from dbo.users where email = @email and isDeleted = 0
-- end
-- exec dbo.spUsers_SelectUser  'felix@gmail.com'

------------------------------------------------update user details----------------------
-- alter procedure dbo.spUsers_UpdateUser
--     @id int,
--     @username VARCHAR(50),
--     @email VARCHAR(50),
--     @password VARCHAR(500),
--     @roleId int

-- AS
-- BEGIN
--     update dbo.users
--         set email = @email,
--             username = @username,
--             password = @password,
--             roleId = @roleId
--         where userId = @id
-- END



-- exec dbo.spUsers_UpdateUser 22, 'Admin', 'superAdmin@gmail.com', '$2b$10$4mjuPRBMe9jp1H5tjjKIXeEyNr6.gOS1m/qTQdaFau2QCNd3T0ppa', 1

-- ----------------------------------delete user using email-----------------------------
-- create procedure dbo.spUsers_DeleteUser
--     @email varchar(50)
--     AS
--     BEGIN
--         update dbo.users
--         set isDeleted = 1 where email = @email
--     END
-- exec dbo.spUsers_DeleteUser 'dancanmilgo73@gmail.com'
--------------------------------------Add Project------------------
-- drop PROCEDURE if exists dbo.spUsers_AddProject
-- create procedure dbo.spProjects_AddProject
--     @name varchar(50),
--     @description varchar(300) = null
-- AS
-- BEGIN
--     insert into dbo.projects(projectName, projectDescription) VALUES(@name, @description)
-- END


-- exec dbo.spProjects_AddProject 'Bitcoin Website'
-- select * from dbo.projects

------------------------------------------------update project Details----------------------
-- create procedure dbo.spProjects_Update
--     @id int,
--     @name VARCHAR(50),
--     @Description VARCHAR(300)
-- AS
-- BEGIN
--     update dbo.projects
--         set projectName = @name,
--             projectDescription = @Description
--         where projectId = @id
-- END

-- exec dbo.spProjects_Update 7, 'Perl motors', 'Vehicle Ecommerce'

--------------------------------Get All Projects --------------------------------------
-- alter procedure dbo.spProjects_GetAllProjects
-- as 
-- begin
--     select * from dbo.projects where isDeleted = 0
-- end


-- exec dbo.spProjects_GetAllProjects



--------------------------------Get a single Project --------------------------------------
-- alter procedure dbo.spProjects_GetProject
--         @id int
-- as 
-- begin
--     select * from dbo.projects
--     where projectId = @id and isDeleted = 0
-- end


-- exec dbo.spProjects_GetProject 7

-- ----------------------------Get all tasks-----------------------------------
-- alter procedure dbo.spTasks_GetAllTasks
--     AS
--     BEGIN
--         select * from dbo.tasks where isDeleted = 0
--     END

-- exec dbo.spTasks_GetAllTasks


-- -----------------------------Get a single task--------------------------------
-- alter procedure dbo.spTasks_GetTask
--     @id int
--     AS
--     BEGIN
--         select * from dbo.tasks where taskId = @id and isDeleted = 0
--     END


-- exec dbo.spTasks_GetTask 1


-- ------------------------------Add task-----------------------------
-- drop PROCEDURE if EXISTS dbo.spTasks_AddTask;
-- create procedure dbo.spTasks_AddTask
--     @taskname varchar(50),
--     @projectId int,
--     @taskDescription VARCHAR(500)
--     AS
--     BEGIN
--         insert into dbo.tasks(taskName, project_Id, taskDescription) 
--                         values(@taskname, @projectId, @taskDescription)
--     END

-- exec dbo.spTasks_AddTask 'Ui', 7, 'create the UI'


 
-- -------------------------////assign a task/////--------------
-- drop PROCEDURE if EXISTS dbo.spTasks_AssignTask;
-- CREATE PROCEDURE dbo.spTasks_AssignTask
--     @taskId int,
--     @userId INT
--     AS
--         declare @project_Id int;
--     BEGIN
--     set NOCOUNT on;
--         set @project_Id= (select project_Id from dbo.tasks t where t.taskId = @taskId);
--         update dbo.users
--             set projectId = @project_Id
--              where userId = @userId and projectId is NULL;
--         UPDATE dbo.tasks
--             set userId = @userId
--         where taskId = @taskId;
--     END
-- update dbo.users set projectId = NULL
-- exec dbo.spTasks_AssignTask 2,5
-- ---------------------------/////Delete a task//////------------
-- select * from dbo.tasks
-- alter PROCEDURE dbo.spTasks_DeleteTask
--     @id INT
--     AS
--     BEGIN
--         update dbo.tasks
--         set isDeleted = 1 where taskId = @id and userId is null
--     END

-- exec dbo.spTasks_DeleteTask 1016

-- /-----------/////update task///////-----------------------
-- drop PROCEDURE if exists dbo.spTasks_UpdateTask
-- CREATE PROCEDURE dbo.spTasks_UpdateTask
-- @id int,
-- @name VARCHAR(50),
-- @projectId int,
-- @userId int,
-- @taskDescription VARCHAR(500),
-- @isCompleted bit,
-- @isSubmitted BIT
-- AS
-- BEGIN
--     update dbo.tasks
--         set taskName = @name,
--             project_Id =@projectId,
--             userId = @userId,
--             taskDescription = @taskDescription,
--             isCompleted = @isCompleted,
--             isSubmitted = @isSubmitted
--         where taskId = @id
-- END

-- exec  dbo.spTasks_UpdateTask 2, 'UI', 3,5,'Design the UI and use redux for state management', NULL, 0


-- -----------------------------------//////Submit Task as Complete/////--------------------------
-- DROP PROCEDURE if exists dbo.spTasks_SubmitCompleteTask
-- create PROCEDURE dbo.spTasks_SubmitCompleteTask
--     @id INT
--     AS
--     BEGIN
--         update dbo.tasks
--             set isSubmitted = 1
--         where taskId = @id
--     END

-- exec dbo.spTasks_SubmitCompleteTask 3

--------------------------------------- Send emails when a user  is assigned a task
-- alter procedure dbo.spTasks_SendEmailTaskAlert
-- AS
-- BEGIN
-- select dbo.users.userId, dbo.users.username, dbo.users.email, dbo.tasks.taskName,dbo.tasks.taskDescription,
-- dbo.projects.projectId, dbo.projects.projectName,  dbo.tasks.emailSent
--  from dbo.users inner join dbo.tasks on dbo.tasks.userId = dbo.users.userId 
-- inner join dbo.projects on dbo.projects.projectId = dbo.tasks.project_Id WHERE dbo.users.emailSent = 1 and dbo.tasks.emailSent = 0 and 
-- dbo.users.isDeleted = 0;
-- update dbo.tasks
--     set emailSent = 0 where dbo.tasks.userId is not null
-- END

-- exec  dbo.spTasks_SendEmailTaskAlert
-- exec dbo.spUsers_GetAllUsers

-- ----------------------------------Send Email when a user registers-------------------------
-- drop PROCEDURE dbo.spUsers_sendEmailOnRegister
CREATE PROCEDURE dbo.spUsers_sendSMSOnRegister
AS
BEGIN
    select * from dbo.users where emailSent = 0 and isDeleted = 0;
    update dbo.users
        set emailSent = 0 where isDeleted = 0
END

-- exec dbo.spUsers_sendSMSOnRegister


-- update dbo.tasks
--  set emailSent = 0 where userId =37
--  select * from dbo.tasks

-- create procedure dbo.spProjects_Delete
-- @id int
-- AS
-- BEGIN
--     update dbo.projects
--         set isDeleted = 1 where projectId = @id
--     update dbo.tasks
--         set isDeleted = 1 where project_Id = @id
--     update dbo.users
--         set projectId = NULL where projectId =@id

-- END

-- exec dbo.spProjects_Delete 14
-- select * from dbo.projects where isDeleted = 0
-- select * from dbo.tasks

-- alter procedure dbo.spProjects_MarkAsComplete
-- @id INT
-- AS
-- BEGIN
-- DECLARE @pendingTasks INT;
-- DECLARE @returnmessage VARCHAR(100);
-- select @pendingTasks = COUNT(*) from dbo.tasks where project_Id = @id and (isCompleted = 0 or isCompleted is null);
-- IF @pendingTasks > 0 
--     BEGIN
--      SET @returnmessage = 'Cannot complete project because of pending tasks';
--      SELECT 'message' = @returnmessage;
--     END
-- ELSE
--     BEGIN
--     SET @returnmessage = 'Project completed';
--         update dbo.projects
--             set isCompleted = 1 where projectId = @id;
--         SELECT 'message' = @returnmessage;
--     END
-- END

-- exec dbo.spProjects_MarkAsComplete  1026