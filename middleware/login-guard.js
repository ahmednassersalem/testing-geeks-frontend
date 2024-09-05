export default async function({ $auth, redirect, route }) {
  const isLoggedIn = $auth.$storage.getUniversal("logged_In")
  if (!isLoggedIn) {
      const path = encodeURIComponent(route.path);
      return redirect(`/auth/login?r=${path}`);
  }
}
