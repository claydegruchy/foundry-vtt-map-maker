module.exports = (plop, a, b, c) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}.jsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
    ],
  });


  plop.setGenerator('readme', {
    description: 'Create a readme',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your repo name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'readme.md',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/readme.md.hbs',
      },
    ],
  });

};
