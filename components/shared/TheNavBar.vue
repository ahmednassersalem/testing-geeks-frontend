<template>
  <nav class="app-nav global_padding_nav rtl_nav">
    <div class="navbar">
      <div class="left">
          <nuxt-link :to="localePath('/')" class="desktop-logo">
            <the-logo />
          </nuxt-link>
      </div>
      <div class="center nav_list">
        <div class="item">
            <nuxt-link :to="localePath('/auth/register')">
              register
            </nuxt-link>
        </div>
        <div class="item">
          <nuxt-link :to="localePath('/auth/login')">
            login
          </nuxt-link>
        </div>
      </div>
      <div class="right nav_list">
          <div class="item bread">
            <a>
              <span v-if="userInfo">
                <nuxt-link :to="localePath('/profile/user')">
                  <span>{{ userInfo.name }}</span>
                </nuxt-link>
              </span>
              <span v-if="!userInfo">
                <a @click="goToLogin">{{ $t("shared.my_profile") }}</a>
              </span>
            </a>
          </div>
          <div class="item" v-if="userInfo" @click="logout">({{ $t('shared.logout') }})</div>
          <div class="item" v-if="userInfo"> </div>
          <div class="item"></div>
          <div class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="27.156" height="26.809" viewBox="0 0 27.156 26.809">
              <path id="Path_140" data-name="Path 140" d="M98.566,50.567a11.78,11.78,0,0,1,1.859-.913,20.418,20.418,0,0,1,3.771-1.046,19.744,19.744,0,0,1,1.06-3.724,11.59,11.59,0,0,1,.924-1.834A11.638,11.638,0,0,0,98.566,50.567Zm11.142-9.923a13.406,13.406,0,1,0,13.578,13.4A13.493,13.493,0,0,0,109.708,40.644Zm0,1.871a1.83,1.83,0,0,0-1.279.687,7.588,7.588,0,0,0-1.414,2.377,17.091,17.091,0,0,0-.827,2.737,32.692,32.692,0,0,1,7.039,0,17.094,17.094,0,0,0-.826-2.737,7.588,7.588,0,0,0-1.415-2.377A1.828,1.828,0,0,0,109.708,42.515Zm5.511,6.093a19.82,19.82,0,0,0-1.059-3.724,11.592,11.592,0,0,0-.925-1.834,11.634,11.634,0,0,1,7.614,7.517,11.768,11.768,0,0,0-1.858-.913A20.43,20.43,0,0,0,115.219,48.608Zm-1.654,1.633a30.482,30.482,0,0,0-7.714,0,29.352,29.352,0,0,0,0,7.615,30.482,30.482,0,0,0,7.714,0,29.352,29.352,0,0,0,0-7.615Zm1.95,7.282a31.534,31.534,0,0,0,0-6.949,17.718,17.718,0,0,1,2.772.816,7.7,7.7,0,0,1,2.408,1.4,1.492,1.492,0,0,1,0,2.524,7.721,7.721,0,0,1-2.408,1.4A17.611,17.611,0,0,1,115.515,57.523Zm-2.288,2.258a32.522,32.522,0,0,1-7.039,0,17.06,17.06,0,0,0,.827,2.737,7.577,7.577,0,0,0,1.414,2.377,1.532,1.532,0,0,0,2.557,0,7.576,7.576,0,0,0,1.415-2.377A17.063,17.063,0,0,0,113.227,59.781Zm.008,5.267a11.6,11.6,0,0,0,.925-1.835,19.809,19.809,0,0,0,1.059-3.723,20.509,20.509,0,0,0,3.772-1.046,11.943,11.943,0,0,0,1.858-.913A11.636,11.636,0,0,1,113.235,65.048Zm-7.055,0a11.64,11.64,0,0,1-7.614-7.517,11.955,11.955,0,0,0,1.859.913A20.5,20.5,0,0,0,104.2,59.49a19.733,19.733,0,0,0,1.06,3.723A11.6,11.6,0,0,0,106.18,65.048ZM103.9,57.523a17.624,17.624,0,0,1-2.773-.816,7.733,7.733,0,0,1-2.408-1.4,1.492,1.492,0,0,1,0-2.524,7.713,7.713,0,0,1,2.408-1.4,17.731,17.731,0,0,1,2.773-.816,31.371,31.371,0,0,0,0,6.949Z" transform="translate(-96.13 -40.644)" fill="#1f4287" fill-rule="evenodd"/>
            </svg>
          </div>
          <div class="item">
            <nuxt-link
                class="list-link"
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
              >
              <span style="text-transform: uppercase;" @click="switshLang">
                {{ locale.code }}
              </span>
              </nuxt-link>
          </div>

      </div>

    </div>

    <div class="mobile-nav">
      <div class="nav_mobile">
        <div class="left">
          <nuxt-link :to="localePath('/')" class="desktop-logo">
            <the-logo />
          </nuxt-link>
        </div>
        <div class="right">
          <button class="menu-nav" @click="mobileNav = !mobileNav">
            <i class="fas fa-bars icon"></i>
          </button>
        </div>
      </div>
      <div class="navbar_in_mobile" v-if="mobileNav">
        <div class="item">
            <nuxt-link :to="localePath('/auth/register')">
              register
            </nuxt-link>
        </div>
        <div class="item">
          <nuxt-link :to="localePath('/auth/login')">
            login
          </nuxt-link>
        </div>
        <div class="item">
          <a >
              <span v-if="userInfo">
                <nuxt-link :to="localePath('/profile/user')">
                  <span>{{ userInfo.name }}</span>
                </nuxt-link>
              </span>
              <span v-if="!userInfo">
                <a @click="goToLogin">{{ $t("shared.my_profile") }}</a>
              </span>

            </a>
        </div>
        <div class="item" v-if="userInfo" @click="logout">{{ $t('shared.logout') }}</div>
        <div class="item">
          <nuxt-link
              class="list-link"
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
            >
              <span style="text-transform: uppercase;" @click="switshLang">
                {{ locale.code }}
              </span>
            </nuxt-link>
        </div>
      </div>
      </div>
    </div>
  </nav>
</template>



<script>
export default {
  data() {
    return {
      mobileNav: false,
    };
  },
  computed: {

    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    userInfo() {
      return this.$auth.$storage.getUniversal("userData");
    },
  },
  created() {
    //console.log(this.$store.state.user);
    //console.log(this.$auth.$storage.getUniversal("userData"));
  },
  methods: {
    logout() {
      this.$auth.$storage.removeUniversal("token");
      this.$auth.$storage.removeUniversal("userData");
      this.$auth.$storage.setUniversal("logged_In", false);
      this.$store.commit("user/resetState");
      this.$nuxt.$bvToast.toast(this.$t("shared.successLogout"), {
        toaster: "b-toaster-top-right",
        noCloseButton: false,
        solid: true,
        autoHideDelay: 3000,
        variant: "success",
      });
      setTimeout(() => {
        window.location.href = this.localePath("/")
      }, 1000);
    },
    switshLang(){
      setTimeout(() => {
        window.location.href = window.location.href
      }, 500);
    },
    goToLogin(){
      const path = encodeURIComponent(this.$route.fullPath);
      window.location.href = `/auth/login?r=${path}`
    }
  },
};
</script>

<style lang="scss" scoped>

@keyframes animationWidth  {
    from {width: 0%;}
    to {width: 60%;}
}
@keyframes animationWidthMedia  {
    from {width: 0%;}
    to {width: 10%;}
}

@keyframes animationWidthNav  {
    from {top: 0%;opacity: 0;}
    to {top: 100%;opacity: 1;}
}
.app-nav {
  background: var(--white);
	.navbar {
    justify-content: space-around;
    border-bottom: 1px solid #b1afaf;

		padding: 15px 70px;

    .center{
      display: flex;
			align-items: center;
			// width: 610px;
			justify-content: space-between;
			text-transform: uppercase;
			font-weight: 500;

      .item {
				font-size: 16px;
				position: relative;
				cursor: pointer;
        font-weight: 500;
        margin: 0 10px;
        a{
          color: var(--second-color);
        }
			}
    }
		.left {
			display: flex;
			align-items: center;
			// width: 610px;
			justify-content: space-between;
			text-transform: uppercase;
			font-weight: 300;

			.item {
				font-size: 16px;
				position: relative;
				cursor: pointer;
        font-weight: 400;
        a{
          color: var(--second-color);
        }
			}
		}
		.nav_list {
			.item {
				&:hover {
          a{
            color: var(--main-color);
            .icon{
              color: var(--main-color);
            }
          }

				}
			}
			.active {
        a{
          color: var(--main-color);
        }

			}
		}
		.right {
			display: flex;
			width: auto;
      justify-content: center;
			.item {
				font-size: 16px;
				position: relative;
				cursor: pointer;
        color: var(--main-color);
        margin: 0 5px;
        font-weight: 500;
        a{
          color: var(--main-color);
          .icon{
              color: var(--main-color);
            }
        }
			}

		}
	}

  .mobile-nav{
    display: none;
  }
}



.rtl {


}

@media (max-width: 1179px) {
      .app-nav {
      .navbar {
        display: none;
      }

      .mobile-nav{
        display: block;
        background: var(--white);
        padding: 0 90px;
        height: 80px;
        display: flex;
        flex-direction: column;
        position: relative;
        border-bottom: 1px solid #00000075;

        .nav_mobile{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          .left{}
          .right{
            .menu-nav{
              border: 0;
              background: 0;
              .icon{
                color: var(--second-color);
                font-size: 25px;
              }
            }
          }
        }
        .navbar_in_mobile{
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          z-index: 20;
          background: var(--white);
          transition: 0.3s ease-in-out;
          animation: animationWidthNav 0.2s linear;
          .item{
            font-size: 16px;
            position: relative;
            cursor: pointer;
            font-weight: 500;
            padding: 17px 0;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #0000002e;
            color: var(--second-color);
            a{
              color: var(--second-color);
            }
            &:hover {
              background: #d7d7d72b;

              a{
                color: var(--main-color);
                .icon{
                  color: var(--main-color);
                }
              }
            }
          }
          .active{
            a{
              color: var(--main-color);
            }
          }
        }
      }
    }
}

@media (max-width: 450px) {
  .app-nav{
    .mobile-nav{
      padding: 0 30px;
    }
  }
}

@media (min-width: 1400px) {
  .global_padding_nav{

    .navbar{
      width: 100%;
      margin: 0 auto;
    }
  }
}


</style>
