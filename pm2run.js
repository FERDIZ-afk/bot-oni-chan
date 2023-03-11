const pm2 = require('pm2')
const cron = require('node-cron');
const fs = require('fs');
const Rest = true

pm2.connect((error) => {
    if (error) {
      console.error(error)
    }

    pm2.start({ script: 'run.js' }, (error, apps) => {
      pm2.disconnect()
      if (error) {
        console.error(error)
      }
    })
    
    if(Rest){
      cron.schedule("50 59 8 * * *", function(){
     //   settings.banChats = true
     //   fs.writeFileSync('./lib/database/setting.json',JSON.stringify(settings,null,2))
        pm2.restart('run', (error) => {
          if (error) {
            console.error(error)
          }
        })
        console.log('[INFO] Time to rest!');
      })
  
      cron.schedule("0 0 7 * * *", function(){
    //    settings.banChats = false
        // fs.writeFileSync('./lib/database/setting.json',JSON.stringify(settings,null,2))
        pm2.restart('run', (error) => {
          if (error) {
            console.error(error)
          }
        })
        console.log('[INFO] Time to work :D');
      })
      
      cron.schedule("0 0 9 * * *", function(){
    //    settings.banChats = false
        // fs.writeFileSync('./lib/database/setting.json',JSON.stringify(settings,null,2))
        pm2.restart('run', (error) => {
          if (error) {
            console.error(error)
          }
        })
        console.log('[INFO] Time to work :D');
      })
      
      cron.schedule("0 0 14 * * *", function(){
    //    settings.banChats = false
        // fs.writeFileSync('./lib/database/setting.json',JSON.stringify(settings,null,2))
        pm2.restart('run', (error) => {
          if (error) {
            console.error(error)
          }
        })
        console.log('[INFO] Time to work :D');
      })
      
      cron.schedule("0 0 19 * * *", function(){
    //    settings.banChats = false
        // fs.writeFileSync('./lib/database/setting.json',JSON.stringify(settings,null,2))
        pm2.restart('run', (error) => {
          if (error) {
            console.error(error)
          }
        })
        console.log('[INFO] Time to work :D');
      })
    }
    
    cron.schedule("0 0 0 * * *", function(){
      /*
      let obj = [{id: settings.owner, limit: 1}];
      fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
      */
      pm2.restart('run', (error) => {
        if (error) {
          console.error(error)
        }
    })
    console.log('[INFO] Limit restarted!');
  })
})