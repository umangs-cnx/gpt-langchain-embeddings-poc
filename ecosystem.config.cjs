module.exports = {
    apps: [
      {
        name: "PDF-Test Chatbot",
        script: "npm start",
  
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 1,
        autorestart: false,
        watch: false,
        max_memory_restart: "1G",
      }
    ]
  };
  