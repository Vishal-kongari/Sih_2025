// Firebase Configuration Check
export const checkFirebaseConfig = () => {
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    console.log('=== FIREBASE CONFIGURATION CHECK ===');
    console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Missing');
    console.log('Auth Domain:', config.authDomain ? '✅ Set' : '❌ Missing');
    console.log('Project ID:', config.projectId ? '✅ Set' : '❌ Missing');
    console.log('Storage Bucket:', config.storageBucket ? '✅ Set' : '❌ Missing');
    console.log('Messaging Sender ID:', config.messagingSenderId ? '✅ Set' : '❌ Missing');
    console.log('App ID:', config.appId ? '✅ Set' : '❌ Missing');

    const missingConfigs = Object.entries(config)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (missingConfigs.length > 0) {
        console.error('❌ Missing Firebase configuration:', missingConfigs);
        return {
            isValid: false,
            missing: missingConfigs,
            message: `Missing Firebase configuration: ${missingConfigs.join(', ')}`
        };
    }

    console.log('✅ All Firebase configuration variables are set');
    return {
        isValid: true,
        config,
        message: 'Firebase configuration is valid'
    };
};

export const getFirebaseConfigStatus = () => {
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const missingConfigs = Object.entries(config)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    return {
        isValid: missingConfigs.length === 0,
        missing: missingConfigs,
        hasApiKey: !!config.apiKey,
        hasProjectId: !!config.projectId,
        config
    };
};
