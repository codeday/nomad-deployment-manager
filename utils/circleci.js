require("dotenv").config();
import request from "request-promise-native";

export const getBuildsForProject = async repo => {
  const url = `https://circleci.com/api/v1.1/project/gh/${repo}/tree/main?limit=20&filter=successful&circle-token=${process.env.CIRCLECI_TOKEN}`;
  const urlOld = `https://circleci.com/api/v1.1/project/gh/${repo}/tree/master?limit=20&filter=successful&circle-token=${process.env.CIRCLECI_TOKEN}`;

  let builds = JSON.parse(
    await request(url, { headers: { accept: "application/json" } })
  );

  if (!builds || builds.length === 0) {
    builds = JSON.parse(
      await request(urlOld, { headers: { accept: "application/json" } })
    );
  }
  return builds
    .filter(build => [build?.build_parameters?.CIRCLE_JOB, build?.workflows?.job_name, build?.workflows?.workflow_name].includes("build"))
    .map(cBuild => ({
      id: cBuild.vcs_revision,
      committer: cBuild.committer_name,
      message: cBuild.subject
    }));
};
