/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

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
    
    // MySQL数据库
    config.mysql = {
        // database configuration
        client: {
            // host
            host: '192.168.0.44',
            // port
            port: '3306',
            // username
            user: 'root',
            // password
            password: 'root123456',
            // database
            database: 'jiuxia',
        },
        // load into app, default is open
        app: true,
        // load into agent, default is close
        agent: false,
    };
    
    // 跨域问题
    config.security = {
        csrf: {enable: false},
        domainWhiteList: ['http://192.168.0.43:3000', 'http://192.168.0.43:3000']
    };
    config.cors = {
        // origin: 'http://localhost:3001',
        credentials: true,  //允许Cook可以跨域
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    };
    
    config.static = {
        prefix: "/",
        dir: path.join(appInfo.baseDir, 'app/public'),
        dynamic: true,
        preload: false,
        maxAge: 0,
        buffer: false,
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
