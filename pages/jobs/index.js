import Link from 'next/link'
import { getJobs }  from '../../utils/nomad'

export const getServerSideProps = async () => {
  return {
    props: {
      jobs: await getJobs(),
    },
  };
};

export default ({ jobs }) => (
  <ul>
    {jobs.map((job) => (
      <li key={job.ID}>
        <Link href={`/jobs/${job.ID}`}>
          <a>{job.ID}</a>
        </Link>
      </li>
    ))}
  </ul>
);
