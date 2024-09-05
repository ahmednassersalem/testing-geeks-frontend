export default async function({ $auth, redirect, route }) {
  const isLoggedIn = $auth.$storage.getUniversal("logged_In")
  const token = $auth.$storage.getUniversal("token")
  if (isLoggedIn) {
    return redirect('/')
  }
}
