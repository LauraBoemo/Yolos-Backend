exports.handleUncaughtErrors = () => {
  process.on('unhandledRejection', (err) => {
    console.log(`Rejeição não tradada: ${ err.message } ${ JSON.stringify(err.stack) }`);
  });

  process.on('uncaughtException', (err) => {
    console.log(`Rejeição não tradada ${ err.message } ${ JSON.stringify(err.stack) }`);
  });
};
