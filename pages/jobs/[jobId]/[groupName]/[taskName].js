import Link from 'next/link'
import { getJob } from '../../../../utils/nomad'
import { getBuildsForProject } from '../../../../utils/circleci';
import { useState } from 'react';

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
    <div>
      <Link href={`/jobs/${job.ID}`}><a>&laquo; Back to {job.ID}</a></Link>
      <h1>{job.ID} &rarr; {taskGroup.Name} &rarr; {task.Name}</h1>
      <input type="text" value={repo} readOnly={true} />:<input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
      <input type="button" onClick={() => postUpdatedTag(job.ID, taskGroup.Name, task.Name, tag)} value="Deploy" />
      {builds && (
        <ul>
          {builds.map((build) => (
            <li style={{ fontWeight: tag === build.id ? '700' : '500' }} key={build.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setTag(build.id); return false; }}
              >{build.id}</a>
              (&ldquo;{build.message}&rdquo; &mdash;{build.committer})
              </li>
          ))}
        </ul>
      )}
    </div>
  )
};
