async function userLogin(payload) {
  try {
    return await $nuxt.$api.post(`user/login`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}
async function userVerifyEmailCode(payload) {
  try {
    return await $nuxt.$api.post(`user/verify-otp`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function userRegister(payload) {
  try {
    return await $nuxt.$api.post(`user/register`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function partnerLogin(payload) {
  try {
    return await $nuxt.$api.post(`partner/login`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}
async function partnerVerifyEmailCode(payload) {
  try {
    return await $nuxt.$api.post(`partner/verify-otp`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function partnerRegister(payload) {
  try {
    return await $nuxt.$api.post(`partner/register`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}
async function companyLogin(payload) {
  try {
    return await $nuxt.$api.post(`company/login`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}
async function companyVerifyEmailCode(payload) {
  try {
    return await $nuxt.$api.post(`company/verify-otp`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function companyRegister(payload) {
  try {
    return await $nuxt.$api.post(`company/register`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function userRestPassword(payload) {
  try {
    return await $nuxt.$api.post(`password/email`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function verifyRestCode(payload) {
  try {
    return await $nuxt.$api.post(`verify-rest-code`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function changePassword(payload) {
  try {
    return await $nuxt.$api.post(`change-password`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function verifyCode(payload) {
  try {
    return await $nuxt.$api.post(`verify-phone`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function updateUser(payload) {
  try {
    return await $nuxt.$api.post(`update-user`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}
async function updateUserName(payload) {
  try {
    return await $nuxt.$api.post(`update-user-name`, payload).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function getUser() {
  try {
    return await $nuxt.$api.get(`edit-user`).then((r) => {
      return r;
    });
  } catch (error) {}
}

async function getCities() {
  try {
    return await $nuxt.$api.get(`all-cities`).then((r) => {
      return r;
    });
  } catch (error) {}
}

const auth = {
  userLogin,
  userRegister,
  userVerifyEmailCode,
  partnerLogin,
  partnerRegister,
  partnerVerifyEmailCode,
  companyLogin,
  companyRegister,
  companyVerifyEmailCode,
  userRestPassword,

  verifyRestCode,
  changePassword,
  verifyCode,
  updateUser,
  updateUserName,
  getUser,
  getCities,
};
export default auth;
