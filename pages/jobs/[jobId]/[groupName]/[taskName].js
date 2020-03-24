import Link from 'next/link'
import { getJob } from '../../../../utils/nomad'
import { getBuildsForProject } from '../../../../utils/circleci';
import { useState } from 'react';

import Layout from '../../../../components/layout'

const postUpdatedTag = async (jobId, groupName, taskName, newTag) => {
  await fetch(`/api/${jobId}/${groupName}/${taskName}/update-tag`, {
    method: 'POST',
    body: JSON.stringify({ tag: newTag }),
  });
}

export const getServerSideProps = async ({ params }) => {
  const job = await getJob(params.jobId);
  const taskGroup = job.TaskGroups.filter((tg) => tg.Name === params.groupName)[0];
  const task = taskGroup.Tasks.filter((t) => t.Name === params.taskName)[0];
  const [ repoName, tag ] = task.Config.image.split(':', 2);
  var builds = [];
  try {
    builds = await getBuildsForProject(repoName);
  } catch (ex) {}

  return {
    props: {
      job,
      taskGroup,
      task,
      builds,
      repo: repoName,
      defaultTag: tag,
    },
  };
};

export default ({ job, taskGroup, task, repo, defaultTag, builds }) => {
  const [ tag, setTag ] = useState(defaultTag);

  return (
    <Layout>
      <Link href={`/jobs/${job.ID}`}><a>&laquo; Back to {job.ID}</a></Link>
      <div className="w-full h-full px-16 mt-8">
        <h2 className="text-2xl pr-8 uppercase font-black">{job.ID} &rarr; {taskGroup.Name} &rarr; {task.Name}</h2>
        <div className="flex justify-between max-w-3xl bg-gray-400 p-2 my-2 rounded-lg">
          <div>
            <input className="rounded px-1 py-1" type="text" value={repo} readOnly={true} /> 
            <span className="text-lg mx-1">:</span>
            <input className="rounded px-1 py-1" type="text" type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
          </div>
          <input className="rounded px-1 py-1 bg-blue-200 transition duration-200 hover:shadow-md hover:bg-blue-300" type="button" onClick={() => postUpdatedTag(job.ID, taskGroup.Name, task.Name, tag)} value="Deploy" />
        </div>
        {builds && (
          <div className="bg-green-200 border-l-8 border-green-500 my-4 p-4">
            {builds.map((build) => (
              <div className="py-2" style={{ fontWeight: tag === build.id ? '700' : '500' }} key={build.id}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setTag(build.id); return false; }}
                >{build.id}</a>
                (&ldquo;{build.message}&rdquo; &mdash;{build.committer})
              </div>
            ))}
          </div>
      )}
      </div>
    </Layout>
  )
};
