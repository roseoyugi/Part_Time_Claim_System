import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { serverUrl } from "../utilities/Constants";
import { DepartmentType, JobType } from "../utilities/Types";

export default function MyAccount() {
  const { user } = useContext(UserContext);
  const [userJob, setUserJob] = useState<JobType>();
  const [userDepartment, setUserDepartment] = useState<DepartmentType>();

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`${serverUrl}/jobs/${user?.job_id}`);
        const data = await response.json();

        setUserJob(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchJob();
  }, [user?.job_id]);

  useEffect(() => {
    async function getDepartment() {
      if (!userJob) return;
      try {
        const response = await fetch(
          `${serverUrl}/departments/${userJob?.department_id}`
        );

        const data = await response.json();
        setUserDepartment(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getDepartment();
  }, [userJob]);

  return (
    <div className="flex flex-col gap-2 items-center w-full p-6">
      <h1 className="text-blue-800 font-semibold text-lg">My Account</h1>

      <div className="flex flex-col gap-2 w-full max-w-[500px] border shadow p-2 rounded">
        <div>
          Name: <span className="font-semibold">{user?.name}</span>
        </div>

        <div>
          Email: <span className="font-semibold">{user?.email}</span>
        </div>

        <div>
          National ID:{" "}
          <span className="font-semibold">{user?.national_id}</span>
        </div>

        <div>
          Role: <span className="font-semibold">{user?.role}</span>
        </div>

        {user?.role !== "admin" && (
          <>
            <div>
              Department:{" "}
              <span className="font-semibold">{userDepartment?.name}</span>
            </div>

            <div>
              Job: <span className="font-semibold">{userJob?.name}</span>
            </div>
          </>
        )}

        <div>
          Account Number:{" "}
          <span className="font-semibold">{user?.account_number}</span>
        </div>
      </div>
    </div>
  );
}
