import * as React from 'react';
import App from './src/index';
import AuthProvider from './src/store/Auth';
export default ()=>{
    return (
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
};