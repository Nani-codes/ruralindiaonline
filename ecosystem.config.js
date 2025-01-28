module.exports = {
  apps : [
  {
    name: "pari-app-fe-1",
    script: "pnpm",
     args: "run start -- --port=3000",
    env: {
      NODE_ENV: "production",
      
    }
  },
 {
   name: "pari-app-fe-2",
   script: "pnpm",
    args: "run start -- --port=3001",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-3",
   script: "pnpm",
    args: "run start -- --port=3002",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-4",
   script: "pnpm",
    args: "run start -- --port=3003",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-5",
   script: "pnpm",
    args: "run start -- --port=3004",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-6",
   script: "pnpm",
    args: "run start -- --port=3005",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-7",
   script: "pnpm",
    args: "run start -- --port=3006",
   env: {
     NODE_ENV: "production",
   }
 },
 {
   name: "pari-app-fe-8",
   script: "pnpm",
    args: "run start -- --port=3007",
   env: {
     NODE_ENV: "production",
   }
 } 
  ]
};
