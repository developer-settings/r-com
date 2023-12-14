`
CREATE TYPE CheckInStatus AS ENUM ('ON_TIME', 'LATE');
CREATE TYPE CheckOutStatus AS ENUM ('ON_TIME', 'LATE');
CREATE TYPE WorkDayStatus AS ENUM ('ABSENT',  'DAY_OFF', 'PRESENT');
CREATE TYPE Gender AS ENUM ('FEMALE', 'MALE', 'OTHER');
CREATE TYPE EmployeeStatus AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE Role AS ENUM ('MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'EXECUTIVE');
CREATE TYPE WeekDay AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY','SATURDAY');

CREATE TABLE Address (
    address_id  SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
    profile_id INTEGER NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES ProfileTable(profile_id)
);


CREATE TABLE ProfileTable (
    profile_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender Gender NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);


CREATE TABLE EmployeeTable (
    employee_id SERIAL PRIMARY KEY,
    profile_id INTEGER NOT NULL,
    hire_date DATE NOT NULL,
    salary NUMERIC NOT NULL CHECK (salary > 0),
    department VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    status EmployeeStatus NOT NULL,
    start_shift TIME,
    end_shift TIME,
    reports_to INTEGER NULL,
    role Role NOT NULL,
    day_off WeekDay ,
    FOREIGN KEY (profile_id) REFERENCES ProfileTable(profile_id),
    FOREIGN KEY (reports_to) REFERENCES EmployeeTable(employee_id)
);

// TODO: Profile id should be a one to one relationship with employee id

CREATE TABLE AttendanceTable (
    attendance_id BIGINT SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    check_in_status CheckInStatus,
    check_out_status CheckOutStatus,
    work_day_status WorkDayStatus,
    FOREIGN KEY (employee_id) REFERENCES EmployeeTable(employee_id)
)



CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );

      // // Insert data into the "users" table
      // const insertedUsers = await Promise.all(
      //   users.map(async (user) => {
      //     const hashedPassword = await bcrypt.hash(user.password, 10);
      //     return client.sql`//     INSERT INTO users (id, name, email, password)
//     VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//     ON CONFLICT (id) DO NOTHING;
//   `;
//   }),
// );
``;
