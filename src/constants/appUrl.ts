export let appUrl = 'http://localhost:3000/';
if (process.env.NODE_ENV === 'development') {
    appUrl = 'http://localhost:3000/';
}
if (process.env.NODE_ENV === 'production') {
    appUrl = 'https://exclusive-mart.vercel.app/';
}