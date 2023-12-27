const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new github.GitHub(token);
    const context = github.context;
    const prNumber = context.payload.pull_request.number;

    // Get the list of changed files in the PR
    await exec.exec("git", [
      "fetch",
      "origin",
      `pull/${prNumber}/head:pr/${prNumber}`,
    ]);
    const response = await exec.exec(
      "git",
      ["diff", "--name-only", `origin/pr/${prNumber}^..origin/pr/${prNumber}`],
      {
        listeners: {
          stdout: (data) => {
            const changedFiles = data.toString().split("\n").filter(Boolean);

            // Add labels based on the changed files
            if (changedFiles.some((file) => file.startsWith("backend/"))) {
              octokit.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: prNumber,
                labels: ["backend"],
              });
            }

            if (changedFiles.some((file) => file.startsWith("frontend/"))) {
              octokit.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: prNumber,
                labels: ["frontend"],
              });
            }
          },
        },
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
