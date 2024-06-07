const conf = {
    cognitoUserpool: import.meta.env.COGNITO_USERPOOL_ID,
    cognitoUserpoolClient: import.meta.env.COGNITO_USERPOOL_CLIENT_ID,
    cognitoRegion: String(import.meta.env.COGNITO_REGION),
}

export default conf