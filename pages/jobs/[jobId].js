import Link from 'next/link'
import { getJob } from '../../utils/nomad'
import TaskGroup from '../../components/task-group'

const postUpdatedCount = async (jobId, groupName, newCount) => {
  await fetch(`/api/${jobId}/${groupName}/update-group-count`, {
    method: 'POST',
    body: JSON.stringify({ count: newCount }),
  });
}

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      job: await getJob(params.jobId),
    },
  };
};

export default ({ job }) => (
  <div>
    <Link href="/jobs"><a>&laquo; Back to All Jobs</a></Link>
    <h1>{job.ID}</h1>
    {job.TaskGroups.map((group) => <TaskGroup
      key={group.Name}
      name={group.Name}
      defaultCount={group.Count}
      jobId={job.ID}
      tasks={group.Tasks}
      onCountUpdate={(count) => postUpdatedCount(job.ID, group.Name, count)}
    />)}
  </div>
);
