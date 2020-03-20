import { getJob, updateJob } from '../../../../utils/nomad'

export default async (req, res) => {
  const { count } = JSON.parse(req.body);
  const { jobId, groupName } = req.query;
  const jobSpec = await getJob(jobId);

  jobSpec.TaskGroups.map((group) => {
    if (group.Name !== groupName) return group;
    group.Count = Number(count);
    return group;
  });

  res.send(await updateJob(jobId, jobSpec));
}
