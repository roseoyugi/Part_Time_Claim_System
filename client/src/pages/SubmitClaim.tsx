import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import { serverUrl } from "../utilities/Constants";
import { JobType } from "../utilities/Types";

export default function SubmitClaim() {
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File>();

  const { user } = useContext(UserContext);

  const [userJob, setUserJob] = useState<JobType>();

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchJob() {
      if (user?.role !== "claimant") return;
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

  async function uploadFile() {
    try {
      const formData = new FormData();
      formData.append("file", file as File);
      const res = await fetch(`${serverUrl}/submit-claim/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const fileUrl = await uploadFile();
      console.log("submitting...");

      const response = await fetch(`${serverUrl}/submit-claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours,
          date,
          status: "pending",
          user_id: user?.id,
          job_id: user?.job_id,
          file_url: fileUrl,
        }),
      });
      console.log("submitted");

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
    <div className="flex w-full p-6 gap-2 justify-evenly">
      <div className="text-lg font-semibold flex flex-col gap-4 grow max-w-[400px]">
        <p className="flex justify-between border-b">
          Name: <span className="text-base">{user?.name}</span>
        </p>

        <p className="flex justify-between border-b">
          Email: <span className="text-base">{user?.email}</span>
        </p>

        <p className="flex justify-between border-b">
          P.T Job: <span className="text-base">{userJob?.name}</span>
        </p>
      </div>

      <form
        className="flex flex-col gap-2 border shadow h-fit grow p-2  max-w-[600px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl text-blue-900 font-semibold text-center">
          Submit Claim
        </h1>

        <label className="">
          <p>Enter number of hours worked</p>
          <input
            min={1}
            max={9}
            className="border rounded w-full p-1 shadow"
            type="number"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </label>

        <label className="">
          <p>Enter the date you worked</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="date"
            max={currentDate}
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="">
          <p>Select supporting document</p>
          <input
            className="border rounded w-full p-1 shadow"
            type="file"
            required
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </label>

        <button className="border shadow bg-blue-600 rounded p-2 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
