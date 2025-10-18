import React, { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);    //An empty array at first,Later, this will hold the student data coming from Django.

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/students/')    //data from Django API.
      .then((res) => res.json())                     //Converts it into JSON format.
      .then((data) => setStudents(data))              //store data into students array
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((s, i) => (   // i is unique kry for each items
          <li key={i}>{s.name}</li>  //it will show name of each student
        ))}
      </ul>
    </div>
  );
}

export default StudentList;



//means what will backend data go in frontend help of this studentlist all user data show in frontend using this link







