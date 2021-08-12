module.exports = {
    types: [
      { types: ["add", "feature"], label: "Added" },
      { types: ["fix", "bugfix"], label: "Fixed" },
      { types: ["change"], label: "Changed" },
      { types: ["update"], label: "Updated" },
      { types: ["rm", "remove"], label: "Removed" },
    ],
    excludeTypes: ["other"],
  
    renderTypeSection: function (label, commits) {
      let text = `\n### ${label}\n`;
  
      commits.forEach((commit) => {
        text += `* ${commit.subject}\n`;
      });
  
      return text;
    },
  
    renderChangelog: function (release, changes) {
      return `## ${release}\n` + changes + "\n\n";
    },
  };