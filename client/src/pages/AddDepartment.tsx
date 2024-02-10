import { useEffect, useState } from "react";
import { serverUrl } from "../utilities/Constants";
import { UserType } from "../utilities/Types";
import toast from "react-hot-toast";

export default function AddDepartment() {
  const [managers, setManagers] = useState<UserType[]>([]);
  const [name, setName] = useState("");
  const [managerId, setManagerId] = useState("");

  useEffect(() => {
    async function fetchManagers() {
      try {
        const response = await fetch(`${serverUrl}/users/managers`);
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    fetchManagers();
  }, []);

  async function addDepartment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${serverUrl}/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          manager_id: managerId,
        }),
      });

      const data = await response.json();
      console.log(data);
      toast.success(data);
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
        onSubmit={(e) => addDepartment(e)}
      >
        <h1 className="text-lg font-medium text-center text-blue-800">
          Add Department
        </h1>

        <label className="">
          <p>Enter Department name</p>
          <input
            className="border shadow w-full p-1 rounded "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="">
          <p>Select Manager</p>
          <select
            className="border shadow w-full p-1 rounded "
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          >
            <option value="" defaultValue="">
              --- Select manger ---
            </option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}: {manager.email}
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
