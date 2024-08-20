const config={
    apiUrl:String("https://assessnet-cipherschools.onrender.com/api/auth"),
    emailJSServiceID:String(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID),
    emailJSTemplateID:String(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID),
    emailJSPublicKEY:String(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY)
}
export default config;