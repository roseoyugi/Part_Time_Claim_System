import { useEffect, useState } from "react";
import { serverUrl } from "../utilities/Constants";
import { DepartmentType } from "../utilities/Types";
import toast from "react-hot-toast";

export default function AddJob() {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const [name, setName] = useState("");
  const [payRate, setPayRate] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(`${serverUrl}/departments`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchDepartments();
  }, []);

  async function addJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${serverUrl}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          pay_rate: payRate,
          department_id: departmentId,
        }),
      });

      const data = await response.json();
      toast.success(data);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="w-full flex justify-center p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-[500px]"
        onSubmit={(e) => addJob(e)}
      >
        <h1 className="text-lg font-medium text-center text-blue-800">
          Add Job
        </h1>

        <label className="">
          <p>Enter Job name</p>
          <input
            className="border shadow w-full p-1 rounded "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter Job Pay Rate per Hour in KES</p>
          <input
            className="border shadow w-full p-1 rounded "
            type="number"
            value={payRate}
            onChange={(e) => setPayRate(e.target.value)}
          />
        </label>

        <label className="">
          <p>Select Job Department</p>
          <select
            className="border shadow w-full p-1 rounded "
            name=""
            id=""
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option disabled value="" defaultValue="">
              select department
            </option>
            {departments.map((department) => (
              <option value={department.id} key={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        <button className="shadow bg-blue-800 p-2 rounded text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
