import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const StudentSchedule = () => {
  const { userData } = useUser();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/student_schedule"
        );
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center margin-top-bottom min-vh-100">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

  return (
    <div
      className="container margin-top-bottom text-center d-flex flex-column min-vh-100 gap-4"
      style={{ marginTop: "15vh" }}
    >
      <h2 className="display-6">Student Schedule</h2>
      <p className="fs-4 mt-4">
        Hello {userData.fullName}, here is your schedule
      </p>
      <div className=" col-lg-8 col-md-12 mx-auto">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item._id}>
                <td>{item.time}</td>
                <td>{item.subject}</td>
                <td>{item.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentSchedule;
