const { Octokit } = require("@octokit/rest");
const simpleGit = require("simple-git");
const git = simpleGit();
const sh = require("shelljs");

const octokit = new Octokit({
  auth: "tg21bfe5242681003f8f6c146aa51bb4821c6696",
});
let cretaeRepo = "Hello_Bossy_Demo"

async function createRepository(repoName) {
  try {

    const createRepo = await octokit.repos.get({
      owner: "satish6965",
      repo: repoName,
    });

    await sh.cd("/Node_octokit");
    await sh.echo(sh.pwd());

    await git.add("octokitApi.js").then(
      (addSuccess) => {
        console.log(addSuccess);
      },
      (failedAdd) => {
        console.log("adding files failed");
      }
    );

    await git
      .init()
      .then(function onInit(initResult) {})
      .then(() =>
        git.addRemote("origin", "https://github.com/satish6965/Hello_Saus.git")
      )
      .then(function onRemoteAdd(addRemoteResult) {})
      .catch((err) => console.error(err.message))
      .finally(function () {
        console.log("Error");
      });

    // Commit files as Initial Commit
    await git.commit("Intial commit by simplegit").then(
      (successCommit) => {
        console.log(successCommit);
      },
      (failed) => {
        console.log("failed commmit");
      }
    );
    // Finally push to online repository
    await git.push("origin", "master").then(
      (success) => {
        console.log("repo successfully pushed");
      },
      (failed) => {
        console.log("repo push failed");
      }
    );
  } catch (error) {
    console.log("Error is : " + error.message);
  }
}

createRepository(cretaeRepo);
