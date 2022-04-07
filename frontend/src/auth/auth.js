export default function auth(to, from, next) {
    if (!localStorage.getItem("token")) {
        next({ name: "home" });
        alert('Connectez vous à votre compte');
        return false;
    }
    return next();
}