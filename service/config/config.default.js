/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};
    
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1578381011912_9718';
    
    // add your middleware config here
    config.middleware = [];
    
    config.mysql = {
        // database configuration
        client: {
            // host
            host: 'localhost',
            // port
            port: '3306',
            // username
            user: 'jiuxia',
            // password
            password: 'jiuxia123456',
            // database
            database: 'jiuxia',
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };
    
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    
    return {
        ...config,
        ...userConfig,
    };
};
