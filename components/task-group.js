import React, { useState } from 'react';
import Link from 'next/link'

const TaskBox = ({jobId, name, task}) => {
  const [ repoName, imageName ] = task.Config.image.split(':', 2)
  const taskName = task.Name

  return (
    <tr>
      <td class="border px-4 py-2">{taskName}</td>
      <td class="border px-4 py-2">{repoName}</td>
      <td class="border px-4 py-2">{imageName}</td>
      <td class="border px-4 py-2">
        <Link href={`/jobs/${jobId}/${name}/${taskName}`}>
          <a className="bg-gray-400 transition duration-300 hover:bg-gray-500 rounded px-2 py-2 flex justify-between">
            <span>Edit</span>
            <span>
              <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
              </svg>
            </span>
          </a>
        </Link>
      </td>
    </tr>
  )
}

export default ({ name, defaultCount, onCountUpdate, tasks, jobId }) => {
  const [ count, setCount ] = useState(defaultCount);

  console.log(tasks)
  return (
    <div className="shadow rounded-lg transition duration-300 hover:shadow-lg p-4 my-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex mt-4">
        <input className="border px-2 py-1 mr-2 rounded focus:shadow-outline" inputMode="numeric" pattern="\d{1,2}" value={count} onChange={(e) => setCount(e.target.value)} />
        <input className="rounded px-1 py-1 bg-blue-200 transition duration-200 hover:shadow-md hover:bg-blue-300" type="submit" onClick={() => onCountUpdate(Number(count))} value="Update Scale" />
      </div>
      <h2 className="text-lg pt-4">Tasks</h2>
      <table class="table-auto w-full">
        <thead>
          <tr className="uppercase">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Repo</th>
            <th class="px-4 py-2">image</th>
            <th class="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskBox name={name} task={task} jobId={jobId} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
