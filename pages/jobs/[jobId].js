import Link from 'next/link'
import { getJob } from '../../utils/nomad'
import TaskGroup from '../../components/task-group'
import Layout from '../../components/layout'
import iconSwitch from '../../components/Icons'

import Text from '@codeday/topo/Atom/Text'
import Button from '@codeday/topo/Atom/Button';
import Box, { Grid, Flex } from '@codeday/topo/Atom/Box';

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

const Menu = () => (
  <Link href="/jobs">
    <Button variant="outline" variantColor="brand">&laquo; Back to All Jobs</Button>
  </Link>
)

const Job = ({ job }) => (
  <Layout extendMenu={<Menu />}>
    <Flex justify="start" align="center">
      <Text textTransform="uppercase" fontWeight="bold" fontSize="3xl" as='h1' paddingRight={4}>{job.ID}</Text>
      <div>{iconSwitch(job.Status, 4)}</div>
    </Flex>
    {job.TaskGroups.map((group) => <TaskGroup
      key={group.Name}
      name={group.Name}
      defaultCount={group.Count}
      jobId={job.ID}
      tasks={group.Tasks}
      onCountUpdate={(count) => postUpdatedCount(job.ID, group.Name, count)}
    />)}
  </Layout>
);

export default Job