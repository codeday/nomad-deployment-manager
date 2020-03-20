require('dotenv').config();
import request from 'request-promise-native'

export const getBuildsForProject = async (repo) => {
  const url = `https://circleci.com/api/v1.1/project/gh/${repo}/tree/master?limit=20&filter=successful&circle-token=${process.env.CIRCLECI_TOKEN}`;
  const builds = JSON.parse(await request(url, { headers: { 'accept': 'application/json' }}));
  return builds
    .filter((build) => build.build_parameters.CIRCLE_JOB === 'build' || (build.workflows && build.workflows.workflow_name === 'build'))
    .map((cBuild) => ({
      id: cBuild.vcs_revision,
      committer: cBuild.committer_name,
      message: cBuild.subject,
    }));
}
