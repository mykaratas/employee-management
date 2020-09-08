CREATE type STATUS AS ENUM('a', 'i', 'd', 'w');

CREATE TABLE employees (
    emp_no      INT             NOT NULL, 
    status      Status          NOT NULL DEFAULT 'a',
    birth_date  DATE            NOT NULL,
    first_name  VARCHAR(14)     NOT NULL,
    last_name   VARCHAR(16)     NOT NULL,
    gender      ENUM ('M','F')  NOT NULL,  -- Enumeration of either 'M' or 'F'  
    hire_date   DATE            NOT NULL,
    PRIMARY KEY (emp_no)                   -- Index built automatically on primary-key column
 
);




CREATE TABLE departments (
    dept_no     INT             NOT NULL,  -- in the form of department
    dept_name   VARCHAR(40)     NOT NULL,
    status      Status          NOT NULL DEFAULT 'a',
    loc_no      INT             NOT NULL
    PRIMARY KEY (dept_no),                 -- Index built automatically
    UNIQUE  (dept_name)                -- Build INDEX on this unique-value column
    
   FOREIGN KEY (loc_no) REFERENCES locations (loc_no) ON DELETE CASCADE,
);

CREATE TABLE dept_emp (
    emp_no      INT         NOT NULL,
    dept_no     INT     	NOT NULL,
    status      Status      NOT NULL DEFAULT 'a',
    from_date   DATE        NOT NULL,
    to_date     DATE        NOT null,
      -- Build INDEX on this non-unique-value column
      -- Build INDEX on this non-unique-value column
    FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
           -- Cascade DELETE from parent table 'employee' to this child table
           -- If an emp_no is deleted from parent 'employee', all records
           --  involving this emp_no in this child table are also deleted
           -- ON UPDATE CASCADE??
    FOREIGN KEY (dept_no) REFERENCES departments (dept_no) ON DELETE CASCADE,
           -- ON UPDATE CASCADE??
    PRIMARY KEY (emp_no, dept_no)
           -- Might not be unique?? Need to include from_date
);

CREATE TABLE dept_manager (
   dept_no      INT  	 NOT NULL,
   emp_no       INT      NOT NULL,
   status      Status          NOT NULL DEFAULT 'a',
   from_date    DATE     NOT NULL,
   to_date      DATE     NOT NULL
  ,
   FOREIGN KEY (emp_no)  REFERENCES employees (emp_no)    ON DELETE CASCADE,
                                  -- ON UPDATE CASCADE??
   FOREIGN KEY (dept_no) REFERENCES departments (dept_no) ON DELETE CASCADE,
   PRIMARY KEY (emp_no, dept_no)  -- might not be unique?? Need from_date
);


CREATE TABLE titles (
	title_no    INT  	     NOT NULL,
	dept_no     INT  	     NOT NULL,
    emp_no      INT          NOT NULL,
    title       VARCHAR(50)  NOT NULL,
    status      Status       NOT NULL DEFAULT 'a',
    from_date   DATE         NOT NULL,
    to_date     DATE
   ,
    FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
                         -- ON UPDATE CASCADE??
    PRIMARY KEY (title_no)
    UNIQUE  (emp_no, title, from_date)
       -- This ensures unique combination. 
       -- An employee may hold the same title but at different period
);


CREATE TABLE salaries (
    emp_no      INT    NOT NULL,
    salary      INT    NOT NULL,
    from_date   DATE   NOT NULL,
    status      Status          NOT NULL DEFAULT 'a',
    to_date     DATE   NOT NULL,
    
    
    FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
    PRIMARY KEY (emp_no, from_date)
);

CREATE TABLE locations (
    loc_no        INT    		 NOT NULL,
    address       VARCHAR(250)   NOT NULL,
    postal_code   VARCHAR(50)    NOT NULL,
    status        Status          NOT NULL DEFAULT 'a',
    city     	  VARCHAR(250)   NOT NULL,
    country       VARCHAR(250)   NOT NULL,

    FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
    PRIMARY KEY (emp_no, from_date)
);


CREATE TABLE title_changes (
    emp_no      INT    NOT NULL,
    old_title   INT    NOT NULL,
    new_title   INT    NOT NULL,
    status      Status NOT NULL DEFAULT 'a',
    from_date   DATE   NOT NULL,
    to_date     DATE   NOT NULL,
    
    FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
    FOREIGN KEY (old_title) REFERENCES titles (title_no) ON DELETE CASCADE,
    FOREIGN KEY (new_title) REFERENCES titles (title_no) ON DELETE CASCADE,

    PRIMARY KEY (emp_no, from_date)
);
