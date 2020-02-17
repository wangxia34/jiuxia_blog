// import App from 'next/app'
// import 'antd/dist/antd.css'
// import '../static/style/pages/comm.css'

import App from 'next/app'
import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'
import React from 'react'
import common from "../config/common"

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
        return <div onClick={common.setClickSpecialEffects} className="custom_class">
            <Component {...pageProps}  />
        </div>
    }
}

// export default App