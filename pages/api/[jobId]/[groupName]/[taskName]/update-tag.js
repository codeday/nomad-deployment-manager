import { getJob, updateJob } from "../../../../../utils/nomad";

const splitImage = image => {
  const lastIndex = image.lastIndexOf(":");
  const repo = image.substr(0, lastIndex);
  const tag = image.substr(lastIndex + 1) || "latest";
  return [repo, tag];
};

export default async (req, res) => {
  const { tag } = JSON.parse(req.body);
  const { jobId, groupName, taskName } = req.query;
  const jobSpec = await getJob(jobId);

  jobSpec.TaskGroups.map(group => {
    if (group.Name !== groupName) return group;

    group.Tasks = group.Tasks.map(task => {
      if (task.Name !== taskName) return task;

      const [repo] = splitImage(task.Config.image);
      task.Config.image = `${repo}:${tag}`;

      if (!task.Env) task.Env = {};
      task.Env.IMAGE_TAG = tag;

      return task;
    });

    return group;
  });

  res.send(await updateJob(jobId, jobSpec));
};
