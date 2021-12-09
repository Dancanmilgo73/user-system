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


-- exec dbo.spUsers_AddUser 'Ngetich', 'tich@gmail', 'Dancan2021y'

---------------------------------------------login user ----------------------------
-- alter procedure dbo.spUsers_LoginUser
--     @email varchar(50)
-- as
-- begin 
--     select * from dbo.users where email = @email and isDeleted = 0
-- end
-- exec dbo.spUsers_LoginUser  'tich@gmail'

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
-- alter procedure dbo.spUsers_AddProject
--     @name varchar(50),
--     @description varchar(300) = null
-- AS
-- BEGIN
--     insert into dbo.projects(projectName, projectDescription) VALUES(@name, @description)
-- END


-- exec dbo.spUsers_AddProject 'ABCd'
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
-- alter procedure dbo.spTasks_AddTask
--     @taskname varchar(50),
--     @projectId int,
--     @userId int,
--     @taskDescription VARCHAR(500)
--     AS
--     BEGIN
--         insert into dbo.tasks(taskName, project_Id, userId, taskDescription) 
--                         values(@taskname, @projectId, @userId, @taskDescription)
--     END

-- exec dbo.spTasks_AddTask 'Ui', 7, 11, 'create the UI'
