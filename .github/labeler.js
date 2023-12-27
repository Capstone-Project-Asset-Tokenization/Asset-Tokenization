const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new github.GitHub(token);
    const context = github.context;
    const prNumber = context.payload.pull_request.number;

    // Get the list of changed files in the PR
    const { data: files } = await octokit.pulls.listFiles({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
    });

    // Check if any file path starts with "backend/" or "frontend/"
    const hasBackendChanges = files.some((file) => file.filename.startsWith("backend/"));
    const hasFrontendChanges = files.some((file) => file.filename.startsWith("frontend/"));

    // Add labels based on the changed files
    if (hasBackendChanges) {
      await octokit.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        labels: ["backend"],
      });
    }

    if (hasFrontendChanges) {
      await octokit.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        labels: ["frontend"],
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
