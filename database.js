
const { query } = require('express');
const oracledb = require('oracledb');
const namer=require('./tableName.js')

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



async function getStudent(userName,pWord) {
  console.log("getStudent " + pWord)
  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "mor",
      password      : 'fast123',
      connectString : "localhost:1521/orcl"
    });

    const result = await connection.execute(
      `select * from student where  id = :1  `
       ,[pWord],  // bind value for :id
    );
   // console.log(result);
   console.log("getStudent " + pWord)
   console.log('result is = '+ result.rows)
    return result
   

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function getAdmin(id, pWord) {
  console.log("getAdmin " + pWord)

  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "mor",
      password: "fast123",
      connectString: "localhost:1521/orcl"
    });

    const result = await connection.execute(
      `SELECT id, password FROM admin WHERE id = :Admin`,
      [id]
    );

    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function insertStudent(userName,pWord,email,phone) {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
  
      const result = await connection.execute(
        `INSERT INTO STUDENTS VALUES(:1,:2,:3,:4)  `
         ,[userName,pWord,phone,email],  // bind value for :id
            {autoCommit:true}
         );
      console.log("Successfully inserted into database");
     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getTeacher(userName,pWord) {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
  
      const result = await connection.execute(
        `Select * from instructors where  ins_id= :1  `
         ,[pWord],  // bind value for :id
            {autoCommit:true}
         );
         console.log('result is = '+ result.rows)
         return result
     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function studentGetter(userName,pWord) {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
  
      const result = await connection.execute(
        `Select * from student where  ID = :1  `
         ,[pWord],  // bind value for :id
            {autoCommit:true}
         );
        
         console.log(result)
         
         return result
     
  
    } catch (err) {
      console.error("this");
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getTeacherCourses(instructorID) {
    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
  
      const result = await connection.execute(
        `Select section_id,courses_id,SEMESTER_SEMESTER_ID from INSTRUCTOR_TEACHES_COURSE where  Instructors_Ins_ID = :1  `
         ,[instructorID],  // bind value for :id
            {autoCommit:true}
         );
         var queryReuslt={
           CourseName:[],
           Section:[],
           CourseID:[],
           Departments_D_CODE:[],
           CreditHours:[],
           SemesterID: [],
          
         }
         for(var i=0;i<result.rows.length;i++)
         {
              queryReuslt.CourseID.push(result.rows[i].COURSES_ID)
              queryReuslt.Section.push(result.rows[i].SECTION_ID)
              queryReuslt.SemesterID.push(result.rows[i].SEMESTER_SEMESTER_ID)
         }
         for(var i=0;i<result.rows.length;i++)
         {
          course=queryReuslt.CourseID[i]
          const result3 = await connection.execute(
            `Select credit_hours,Name,DEPARTMENTS_D_CODE from courses where ID = :1  `
             ,[course],  // bind value for :id
                {autoCommit:true}
             );
             queryReuslt.CreditHours.push(result3.rows[0].CREDIT_HOURS)
             queryReuslt.CourseName.push(result3.rows[0].NAME)
             queryReuslt.Departments_D_CODE.push(result3.rows[0].DEPARTMENTS_D_CODE)
         }
         return queryReuslt
     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getTableData(tableName) {

    tableName=namer.simpleSqlName(tableName)
    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
  
      const result = await connection.execute(
        `select * from  `+ tableName
        ,  // bind value for :id
      );
     // console.log(result);
     var queryResult={names:[]};
     for(var i=0;i<result.metaData.length;i++)
     {
          queryResult.names.push((result.metaData[i].name))
     }
     console.log(queryResult.names.length)
     return queryResult
    
     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function insertTable(values,tableName) {
    
    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
    if(tableName=='Semester')
    {
      const result = await connection.execute(
        `insert into  Semester values (:1,:2,TO_DATE(:3,'DD/MM/YYYY'),:4) `  
       ,[values.DURATION,values.NAME,values.START_DATE,values.SEMESTER_ID],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }
    if(tableName=='Courses')
    {
      const result = await connection.execute(
        `insert into  courses values (:1,:2,:3,:4,:5) `  
       ,[values.ID,values.CREDIT_HOURS,values.NAME,values.DEPARTMENTS_D_CODE,values.SEMESTER_SEMESTER_ID],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }    
    if(tableName=='INSTRUCTORS')
    {
      const result = await connection.execute(
        `insert into  instructors values (:1,:2,TO_DATE(:3,'DD/MM/YYYY'),:4,:5,:6,:7,:8) `  
       ,[values.NAME,values.INS_ID,values.START_DATE,values.SALARY,values.ADDRESS,values.EMAIL,values.DEPARTMENTS_D_CODE,values.DESIGNATION],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     return result
    }    
    if(tableName=='SECTIONS')
    {
      const result = await connection.execute(
        `insert into  sections values (:1,:2) `  
       ,[values.ID,values.CR_NAME],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }   
    if(tableName=='STUDENT')
    {
      // const result = await connection.execute(
      //   `insert into  student values (:1,:2,:3,:4,:5,:6,:7) `  
      //  ,[values.NAME,values.BATCH,values.ID,values.ADDRESS,values.EMAIL,values.INSTRUCTORS_INS_ID,values.PAY],
      //  {autoCommit:true}  // bind value for :id
      // );
      const result = await connection.execute(
        `insert into  student values (:1,:2,:3,:4,:5,null,null) `  
       ,[values.NAME,values.BATCH,values.ID,values.ADDRESS,values.EMAIL],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }     
    if(tableName=='STUDENT_TAKES_COURSE')
    {
      const result = await connection.execute(
        `insert into  STUDENT_TAKES_COURSE values (:1,:2,:3,:4,:5,:6,:7,:8) `  
       ,[values.STUDENT_ID,values.COURSES_ID,values.GPA,values.MID1,values.MID2,values.FINAL,values.ASS_QUIZZ,values.SEMESTER_SEMESTER_ID],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }    
    if(tableName=='INSTRUCTOR_TEACHES_COURSE')
    {
      const result = await connection.execute(
        `insert into  INSTRUCTOR_TEACHES_COURSE values (:1,:2,:3,:4) `  
       ,[values.INSTRUCTORS_INS_ID,values.COURSES_ID,values.SECTION_ID,values.SEMESTER_SEMESTER_ID],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     return result
    }  
    if(tableName=='STUDENT_ALLOTTED_SECTIONS')
    {
      const result = await connection.execute(
        `insert into STUDENT_ALLOTTED_SECTIONS values (:1,:2,:3,:4) `  
       ,[values.STUDENT_ID,values.SECTIONS_ID,values.COURSES_ID,values.SEMESTER_SEMESTER_ID],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }  
    if(tableName=='STUDENT_ENROLLED_IN_SEMESTER')
    {
      const result = await connection.execute(
        `insert into STUDENT_ENROLLED_IN_SEMESTER values (:1,:2,:3,:4) `  
       ,[values.STUDENT_ID,values.SEMESTER_SEMESTER_ID,values.SGPA,values.CRED_HRS],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    }
    if(tableName=='DEPARTMENTS')
    {
      const result = await connection.execute(
        `insert into DEPARTMENTS values (:1,:2,:3,:4,:5) `  
       ,[values.D_NAME,values.D_CODE,values.D_PHONE,values.INSTRUCTORS_INS_ID,values.START_DATE],
       {autoCommit:true}  // bind value for :id
      );
     // console.log(result);
     
     return result
    } 
       

    
     
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getCoursesWithSections(name,ins_id) {
    
    let connection;
    var queryResult={
      SECTION_ID:[]
    }
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      // const result = await connection.execute(
      //   `select id from courses where name like  :1 `  
      //  ,[name],
      //  {autoCommit:true}  // bind value for :id
      // );
     // var temp=result.rows[0].ID
      const res = await connection.execute(
        `select t.section_id from INSTRUCTOR_TEACHES_COURSE t,courses c where c.id=t.courses_id and c.name=:1 and t.instructors_ins_id =:2 `  
       ,[name,ins_id],
       {autoCommit:true}  // bind value for :id
      );
      for(var i=0;i<res.rows.length;i++)
      {
        queryResult.SECTION_ID.push(res.rows[i].SECTION_ID)
      }
      
      console.log(queryResult)
     
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function sectionsStudentRetreival(name,section_id) {
    
    let connection;
    var queryResult={
      STUDENT_ID:[],
      ASS_QUIZZ:[],
      MID_1:[],
      MID_2:[],
      FINAL:[],
      GPA:[]
    }
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      // const result = await connection.execute(
      //   `select id from courses where name like  :1 `  
      //  ,[name],
      //  {autoCommit:true}  // bind value for :id
      // );
      // var temp=result.rows[0].ID
      const res = await connection.execute(
        `select t.student_id,t.ASS_QUIZZ,t.mid1,t.mid2,t.final,t.gpa from STUDENTS_OF_SECTIONS t, courses c where t.courses_id=c.id and t.SEMESTER_SEMESTER_ID=c.SEMESTER_SEMESTER_ID and c.name LIKE :1 and t.sections_id LIKE :2 `  
        ,[name,section_id],
       {autoCommit:true}  // bind value for :id
      );

      console.log(res)
      for(var i=0;i<res.rows.length;i++)
      {
        queryResult.STUDENT_ID.push(res.rows[i].STUDENT_ID)
        queryResult.ASS_QUIZZ.push(res.rows[i].ASS_QUIZZ)
        queryResult.MID_1.push(res.rows[i].MID1)
        queryResult.MID_2.push(res.rows[i].MID2)
        queryResult.FINAL.push(res.rows[i].FINAL)
        queryResult.GPA.push(res.rows[i].GPA)
      }
      
      console.log(queryResult)
     
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function insertGradesInTable(enteries,selectedCourse,selectedSection) {
    console.log('wimppppp')
  enteries=typeConverter(enteries)
  console.log(enteries.MID_1[0])
    console.log(enteries)
    console.log(selectedCourse)
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      var res=await connection.execute(
        'select id from courses where name like :1'
        ,{1:selectedCourse},
      )
      console.log('asdas' + res.rows[0].ID)
      var course_ID=res.rows[0].ID
      
       for(var i=0;i<enteries.STUDENT_ID.length;i++)
       {
        var mid1=enteries.MID_1[i]
        var mid2=enteries.MID_2[i]
        var studentId=enteries.STUDENT_ID[i]
        var final=enteries.FINAL[i]
        var ass_quizz=enteries.ASS_QUIZZ[i]
        var grade=(final+ass_quizz+mid1+mid2)
        var gpa=enteries.SGPA[i]
        if (grade >=86)
        {
          gpa=4
        }
        else if(grade>=82 && grade<86)
        {
          gpa=3.67
        }
        else if(grade>=78 && grade<82)
        {
          gpa=3.33
        }
        else if(grade>=74 && grade<78)
        {
          gpa=3.0
        }
        else if(grade>=66 && grade<74)
        {
          gpa=2.67
        }
        else if(grade>=60 && grade<66)
        {
          gpa=2.33
        }
        else if(grade>=50 && grade<60)
        {
          gpa=2.0
        }
        else{
          grade=1.0
        }
        
        var si=studentId
        var ci=course_ID
        var ss=selectedSection
         var result = await connection.execute(
          //  `update STUDENT_TAKES_COURSE set MID1=:2,MID2=:3,ASS_QUIZZ=:4,FINAL=:5,GPA=:6 where STUDENT_ID=:7 and COURSES_ID=:8 and SECTIONS_ID=:9 `  
          // ,{2:enteries.MID_1[i],3:enteries.MID_2[i],4:enteries.ASS_QUIZZ[i],5:enteries.FINAL[i],6:enteries.GPA[i],7:enteries.STUDENT_ID[i],8:course_ID,9:selectedSection },
          // {autoCommit:true}  // bind value for :id
           
          'update  STUDENT_TAKES_COURSE set MID1=:1,MID2=:2,final=:3,gpa=:4,ass_quizz=:5  where student_id=:6 and courses_id=:7  and SEMESTER_SEMESTER_ID=(select SEMESTER_SEMESTER_ID from STUDENT_ALLOTTED_SECTIONS where  student_id=:8 and courses_id=:9 and sections_id=:10)'
          ,{1:mid1,2:mid2,3:final,4:gpa,5:ass_quizz,6:studentId,7:course_ID,8:si,9:ci,10:ss},{autoCommit:true}
         );
       } 
       console.log('rqrqeqweqweqw')
      
      console.log(result)
     return 
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getStudentEnrolledCourses(std_id) {
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      var res=await connection.execute(
        'select c.name from courses c,STUDENT_TAKES_COURSE t where t.courses_id=c.id and t.student_id =:1'
        ,{1:std_id},
      )
      var queryResult=[]
      for(var i=0;i<res.rows.length;i++)
      {
        queryResult.push(res.rows[i].NAME)
      }
      console.log(queryResult)
      return queryResult
     return 
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function coursesInGivenSem(sem_name,studentID) {
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      var res=await connection.execute(
        'select * from courses c,departments d,semester s  where  c.semester_semester_id=s.semester_id and d.d_code=c.departments_d_code and s.name =:1 and c.id not in  (select courses_id from STUDENT_TAKES_COURSE where student_id=:2)'
        ,{1:sem_name,2:studentID},
      )
      var queryResult={
        C_NAME:[],
        C_ID:[],
        D_NAME:[],
        CREDIT_HOURS:[]
      }
      for(var i=0;i<res.rows.length;i++)
      {
        queryResult.C_NAME.push(res.rows[i].NAME)
        queryResult.C_ID.push(res.rows[i].ID)
        queryResult.D_NAME.push(res.rows[i].D_NAME)
        queryResult.CREDIT_HOURS.push(res.rows[i].CREDIT_HOURS)
        
      }
      console.log(queryResult)
      return queryResult
     return 
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function insertCourseInStudent(courseID,studentID,section,currSemID) {
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      console.log("choose couse db working")
      var temp=0
      var res=await connection.execute(
        'insert into STUDENT_TAKES_COURSE values(:1,:2,:3,:4,:5,:6,:7,:8)'
        ,{1:studentID,2:courseID,3:temp,4:temp,5:temp,6:temp,7:temp,8:currSemID},{autoCommit:true}
      )
      var test=await connection.execute(
        'insert into STUDENT_ALLOTTED_SECTIONS values(:1,\'A\',:2,:3)'
        ,{1:studentID,2:courseID,3:currSemID},{autoCommit:true}
      )

      
      return res
     return 
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  function typeConverter(enteries)
  {
    for(var i=0;i<enteries.STUDENT_ID.length;i++)
    {
      enteries.STUDENT_ID[i]=parseInt(enteries.STUDENT_ID[i])
      enteries.ASS_QUIZZ[i]=parseFloat(enteries.ASS_QUIZZ[i])
      enteries.MID_1[i]=parseFloat(enteries.MID_1[i])
      enteries.MID_2[i]=parseFloat(enteries.MID_2[i])
      enteries.FINAL[i]=parseFloat(enteries.FINAL[i])
      enteries.SGPA[i]=parseFloat(enteries.SGPA[i])
    }
    return enteries
  }
  async function getNonTAStudents(courseName,section_id) {
    
    let connection;
    var queryResult={
      STUDENT_ID:[],
      NAME:[],
      EMAIL:[]
    }
  
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      // const result = await connection.execute(
      //   `select id from courses where name like  :1 `  
      //  ,[name],
      //  {autoCommit:true}  // bind value for :id
      // );
      // var temp=result.rows[0].ID
      const res = await connection.execute(
        'select DISTINCT s.NAME,s.ID,s.email from student s,STUDENT_TAKES_COURSE t,courses c  where s.ID=t.student_ID and t.courses_id=c.id and c.name <>:1  and s.instructors_ins_id is null'
       ,[courseName],
       {autoCommit:true}  // bind value for :id
      );
      console.log(res)
      for(var i=0;i<res.rows.length;i++)
      {
        queryResult.STUDENT_ID.push(res.rows[i].ID)
        queryResult.EMAIL.push(res.rows[i].EMAIL)
        queryResult.NAME.push(res.rows[i].NAME)

      }
      
      console.log(queryResult)
     
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function assignStudentAsTA(studentID,instructorID,pay) {

    studentID=Number(studentID)
    instructorID=Number(instructorID)
    pay=Number(pay)
    
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      // const result = await connection.execute(
      //   `select id from courses where name like  :1 `  
      //  ,[name],
      //  {autoCommit:true}  // bind value for :id
      // );
      // var temp=result.rows[0].ID
      const res = await connection.execute(
        'update student set instructors_ins_id=:1 , pay=:2 where id=:3'
       ,[instructorID,pay,studentID],
       {autoCommit:true}  // bind value for :id
      );
      console.log(res)
      
      //console.log(queryResult)
     
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getStudentMarksinCourse(studentID,courseName) {
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      const res = await connection.execute(
        'select t.ass_quizz,t.mid1,t.mid2,t.final from STUDENTS_OF_SECTIONS t where t.student_id=:1 and t.COURSES_ID = (select id from courses where name = :2)'
       ,[studentID,courseName],
       {autoCommit:true}  // bind value for :id
      );
      console.log(res)
      var queryResult={
        MID1:0,
        MID2:0,
        FINALS:0,
        ASS_QUIZZ:0        
      }
      queryResult.MID1=res.rows[0].MID1
      queryResult.MID2=res.rows[0].MID2
      queryResult.FINALS=res.rows[0].FINAL
      queryResult.ASS_QUIZZ=res.rows[0].ASS_QUIZZ
      console.log(queryResult)
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function updateStudent(studentID,email,address) {
    
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      const res = await connection.execute(
        'update  student set email=:1,address=:2 where id=:3'
       ,[email,address,studentID],
       {autoCommit:true}  // bind value for :id
      );
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function updateTeacher(teacherID,email,address) {
    
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      const res = await connection.execute(
        'update  instructor set email=:1,address=:2 where id=:3'
       ,[email,address,teacherID],
       {autoCommit:true}  // bind value for :id
      );
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  async function getStudentSemesters(studentID) {
    
    let connection;
    try {
      connection = await oracledb.getConnection( {
        user          : "mor",
        password      : 'fast123',
        connectString : "localhost:1521/orcl"
      });
      const res = await connection.execute(
        'select  sem.name, s.semester_semester_id,s.sgpa,cor.credit_hours,c.gpa,c.courses_id,cor.name,sas.sections_id from STUDENT_ALLOTTED_SECTIONS sas,STUDENT_ENROLLED_IN_SEMESTER s,student_takes_course c,semester sem,courses cor  where   sas.student_id=c.student_id and sas.SEMESTER_SEMESTER_ID=s.SEMESTER_SEMESTER_ID and sas.COURSES_ID=c.COURSES_ID and s.student_id=c.student_id and c.COURSES_ID=cor.ID and s.semester_semester_id=sem.SEMESTER_ID and  s.semester_semester_id=c.semester_semester_id and s.student_id=:1'
       ,[studentID],
       {autoCommit:true}  // bind value for :id
      );
      console.log(res)
      var tempID=[]
      var tempName=[]  
      for(var i=0;i<res.rows.length;i++)
      {
           tempID.push(res.rows[i].SEMESTER_SEMESTER_ID)
           tempName.push(res.rows[i].NAME)
      }
      var IDS = [...new Set(tempID)];
      var NAMES = [...new Set(tempName)];
      var queryResult=[]
    for(var i=0;i<IDS.length;i++)
      {
        var semInfo={
          Name:NAMES[i],
          ID:IDS[i],
          GPA:0,
          CRED_HRS:0,
          COURSE_NAMES:[],
          COURSE_IDS:[],
          COURSE_SECTIONS:[],
          COURSE_CREDIT_HRS:[],
          COURSE_GPA:[]
         }
         queryResult.push(semInfo)
      }
      for(var i=0;i<IDS.length;i++)
      {
          for( var j=0;j<res.rows.length;j++)
          {
            if(queryResult[i].ID==res.rows[j].SEMESTER_SEMESTER_ID)
            {
              queryResult[i].COURSE_NAMES.push(res.rows[j].NAME_1)
              queryResult[i].COURSE_GPA.push(res.rows[j].GPA)
              queryResult[i].COURSE_IDS.push(res.rows[j].COURSES_ID)
              queryResult[i].COURSE_CREDIT_HRS.push(res.rows[j].CREDIT_HOURS)
              queryResult[i].COURSE_SECTIONS.push(res.rows[j].SECTIONS_ID)
            }
          }
          var gpsum=0;
          for(var j=0;j<queryResult[i].COURSE_CREDIT_HRS.length;j++)
          {
            queryResult[i].CRED_HRS+=queryResult[i].COURSE_CREDIT_HRS[j]
            gpsum+=queryResult[i].COURSE_GPA[j]
          }
          queryResult[i].GPA=gpsum/queryResult[i].COURSE_GPA.length
      }
      console.log(queryResult)
    
      
      
     
     return queryResult
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  //enteries=typeConverter(enteries)
  
 //insertGradesInTable(enteries,'Programming 101','A')
  //getTeacherCourses(827)
  //getTableData('Semester')
//sectionsStudentRetreival("Programming 101",'A')
  //getCoursesWithSections('Programming 101',827)
//insertTable(values,'Courses')
//getStudentEnrolledCourses(8972)
//coursesInGivenSem('Fall 2019',8972)
//getNonTAStudents('Programming 101','A')
//getStudentMarksinCourse(8972,'Programming 101')
// var enteries={ 
//   STUDENT_ID: [ 183, 184, 185, 186 ],
//   ASS_QUIZZ: [ 5, 0, 0, 0 ],
//   MID_1: [ 0, 0, 0, 0 ],
//   MID_2: [ 0, 0, 0, 0 ],
//   FINAL: [ 0, 0, 0, 0 ],
//   SGPA: [ 0, 0, 0, 0 ]}
// insertGradesInTable(enteries,'Programming 101','A')
//insertStudent('Spongebob','123')
getStudentSemesters(203);
//updateStudent(183,'cau@gmail.com','sao paulo')

module.exports={
    insertStudent,
    studentGetter,
    getTeacher,
    getTeacherCourses,
    getCoursesWithSections,
    getTableData,
    insertTable,
    sectionsStudentRetreival,
    insertGradesInTable,
    getStudentEnrolledCourses,
    coursesInGivenSem,
    insertCourseInStudent,
    getNonTAStudents,
    assignStudentAsTA,
    getStudentMarksinCourse,
    getStudentSemesters,
    updateStudent,
    updateTeacher,
    getAdmin
}