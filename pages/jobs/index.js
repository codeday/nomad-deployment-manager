import Link from 'next/link'
import { getJobs }  from '../../utils/nomad'
import Layout from '../../components/layout'

import iconSwitch from '../../components/Icons'

export const getServerSideProps = async () => {
  return {
    props: {
      jobs: (await getJobs()).filter((job) => job.ParentID === ""),
    },
  };
};

const ListItem = ({item, ...props}) => (
  <Link href={`/jobs/${item.ID}`}>
    <a className="bg-white max-w-xs w-3/4 lg:w-1/4 py-4 px-4 mx-auto mx-8 my-2 flex justify-between rounded-md border shadow transition duration-300 hover:bg-gray-100 hover:shadow-lg transform hover:scale-105" key={item.ID}>
      <span>{item.ID}</span>
      <div className="h-6 w-6">
        {iconSwitch(item.Status)}
      </div>
    </a>
  </Link>
)

const JobsList = ({iterable, ...props}) => (
  <div className={"flex flex-col flex-wrap w-full h-full lg:-mb-64 lg:pb-64 " + props.className}>
    {
      iterable.map(item =>  <ListItem item={item} />)
    }
  </div>
)

export default ({ jobs }) => {
  console.log(jobs)
  return (
    <Layout>
      <JobsList className="mt-8" iterable={jobs} />
    </Layout>
  )
};
