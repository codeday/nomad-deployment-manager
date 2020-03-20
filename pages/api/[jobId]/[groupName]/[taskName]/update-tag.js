import { getJob, updateJob } from '../../../../../utils/nomad'

export default async (req, res) => {
  const { tag } = JSON.parse(req.body);
  const { jobId, groupName, taskName } = req.query;
  const jobSpec = await getJob(jobId);

  jobSpec.TaskGroups.map((group) => {
    if (group.Name !== groupName) return group;

    group.Tasks = group.Tasks.map((task) => {
      if (task.Name !== taskName) return task;

      const [ repo ] = task.Config.image.split(':', 2);
      task.Config.image = `${repo}:${tag}`;
      return task;
    })

    return group;
  });

  res.send(await updateJob(jobId, jobSpec));
}
