import App from 'next/app'
import Router from 'next/router'
import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'
import React from 'react'
import Fireworks from '../components/Fireworks'
import common from "../config/common"

Router.events.on('routeChangeComplete', () => {
    if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
    }
});

export default class MyApp extends App {
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }
    

    render () {
        const {Component, pageProps} = this.props;
        // return <div onClick={common.setClickSpecialEffects} className="custom_class">
        return <>
            <div className="custom_class">
                <Component {...pageProps}  />
            </div>
            <div className="canvas-container-box"><Fireworks id="canvas_container"/></div>
        </>
    }
}

// export default App