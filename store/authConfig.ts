export const msalConfig = {
    auth: {
        clientId: "26b12d6c-de49-4979-b639-b90f6bedf6cc",
        authority: "https://login.microsoftonline.com/consumers",
        redirectUri: process.env.NODE_ENV == 'production' ? "https://www.saofrance.net/api/oauth/microsoft/callback" : "http://localhost:3000/api/oauth/microsoft/callback",
        //redirectUri: "http://localhost:3000/api/oauth/microsoft/callback",
        //redirectUri: "https://login.microsoftonline.com/common/oauth2/nativeclient",

    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    client_secret: "Wq_8Q~7BNxZq.w2XS5zpvw6a4E7gJYqQObnd~ci1"
};

export const loginRequest = {
    scopes: ["Xboxlive.signin","offline_access"]
};
