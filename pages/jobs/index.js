import Link from 'next/link'
import { getJobs }  from '../../utils/nomad'
import Layout from '../../components/layout'

import iconSwitch from '../../components/Icons'
import Box, { Grid, Flex } from '@codeday/topo/Atom/Box';
import StatusDot from '@codeday/topo/Atom/StatusDot';

export const getServerSideProps = async () => {
  return {
    props: {
      jobs: (await getJobs()).filter((job) => job.ParentID === ""),
    },
  };
};

const ListItem = ({item, ...props}) => (
  <Link href={`/jobs/${item.ID}`}>
    <Box as="a" w="100%" padding={[4]} borderWidth="1px" rounded="lg">
      <Flex justify="space-between" align="center">
        <p>{item.ID}</p>
        {iconSwitch(item.Status)}
      </Flex>
    </Box>
  </Link>
)

const JobsList = ({iterable, ...props}) => (
  <Grid paddingBottom={[16]} templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)"]} gap={4}>
    {
      iterable.map(item =>  <ListItem item={item} />)
    }
  </Grid>
)

export default ({ jobs }) => {
  return (
    <Layout>
      <JobsList className="mt-8" iterable={jobs} />
    </Layout>
  )
};
