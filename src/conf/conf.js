const conf = {
    cognitoUserpool: String(import.meta.env.COGNITO_USERPOOL_ID),
    cognitoUserpoolClient: String(import.meta.env.COGNITO_USERPOOL_CLIENT_ID),
    cognitoRegion: String(import.meta.env.COGNITO_REGION),
    apiGatewayAdminUrl: String(import.meta.env.API_GATEWAY_ADMIN_URL),
}

export default conf