export default function auth(to, from, next) {
    if (!localStorage.getItem("token")) {
        next({ name: "home" });
        return false;
    }
    return next();
}