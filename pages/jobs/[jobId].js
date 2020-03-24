import Link from 'next/link'
import { getJob } from '../../utils/nomad'
import TaskGroup from '../../components/task-group'
import Layout from '../../components/layout'

import iconSwitch from '../../components/Icons'

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
  <Layout>
    <Link href="/jobs"><a>&laquo; Back to All Jobs</a></Link>
    <div className="w-full h-full px-16 mt-8">
      <div className="flex align-bottom">
        <h2 className="text-3xl pr-8 uppercase font-black">{job.ID}</h2>
        <div class="h-12 w-12">
          {iconSwitch(job.Status)}
        </div>
      </div>
      {job.TaskGroups.map((group) => <TaskGroup
        key={group.Name}
        name={group.Name}
        defaultCount={group.Count}
        jobId={job.ID}
        tasks={group.Tasks}
        onCountUpdate={(count) => postUpdatedCount(job.ID, group.Name, count)}
      />)}
    </div>
  </Layout>
);
