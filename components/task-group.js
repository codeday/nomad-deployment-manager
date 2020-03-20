import React, { useState } from 'react';
import Link from 'next/link'

export default ({ name, defaultCount, onCountUpdate, tasks, jobId }) => {
  const [ count, setCount ] = useState(defaultCount);
  return (
    <div>
      <h2>{name}</h2>
      Count: <input inputMode="numeric" pattern="\d{1,2}" value={count} onChange={(e) => setCount(e.target.value)} />
      <input type="submit" onClick={() => onCountUpdate(Number(count))} value="Update Scale" />

      <h3>Tasks</h3>
      {tasks.map((task) => (
        <p><Link href={`/jobs/${jobId}/${name}/${task.Name}`}><a>{task.Name}</a></Link></p>
      ))}
    </div>
  )
}
