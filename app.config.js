module.exports = {
  apps: [
    {
      name: "rainha main",
      namespace: "rainha",
      script: 'rainha.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Rainha-Bots/Rainha-Main"
    },
    {
      name: "rainha guard",
      namespace: "rainha",
      script: 'rainha.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Rainha-Bots/Rainha-Guard"
    },
    {
      name: "rainha destek",
      namespace: "rainha",
      script: 'rainha.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./Rainha-Bots/Rainha-Destek"
    },

  ]
};