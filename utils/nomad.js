import request from 'request-promise-native'

const fetchNomad = async (path, method, json) => {
  const result = await request({
    url: `${process.env.NOMAD_ADDR}/v1/${path}`,
    method: method || 'GET',
    json
  });
  if (typeof result === 'string' || result instanceof String)
    return JSON.parse(result);
  else
    return result;
}

export const getJobs = async () => {
  return await fetchNomad('jobs');
}

export const getJob = async (jobId) => {
  return await fetchNomad(`job/${jobId}`);
}

export const getJobLatestDeployment = async (jobId) => {
  return await fetchNomad(`job/${jobId}/deployment`);
}

export const updateJob = async (jobId, job) => {
  return await fetchNomad(`job/${jobId}`, 'POST', { Job: job });
}
