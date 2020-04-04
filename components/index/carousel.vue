<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="350px"
    class="carousel"
    :autoplay="false"
    indicator-position="none"
    @change="changeaCrousel"
  >
    <el-carousel-item
      v-for="(item,index) in carouselList"
      :key="index"
      @click.native="toDetail(item._id,index)"
    >
      <el-row class="carousel-img">
        <img :src="item.bg" :alt="item.title" />
      </el-row>
      <transition name="el-fade-in-linear">
        <el-card class="carousel-title" v-show="tips===index">
          <div class="carousel-content">
            <el-row>{{item.title}}</el-row>
            <el-row class="carousel-other-info">
              <span class="lfx">
                <i class="el-icon-user"></i>
                {{item.user}}
              </span>
              <span class="rtx">
                <i class="el-icon-timer"></i>
                {{item.time}}
              </span>
            </el-row>
          </div>
        </el-card>
      </transition>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ["carouselList"],
  data() {
    return {
      tips: 0
    };
  },
  mounted() {
    // console.log(this.carouselList);
  },
  methods: {
    changeaCrousel(now, old) {
      setTimeout(() => {
        this.tips = now;
      }, 100);
    },
    toDetail(id, index) {
      if (this.tips === index) {
        this.$router.push({
          path: "/listDetail",
          query: { id: JSON.stringify(id) }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.carousel {
  width: 1400px;
  margin: 15px auto;
  .carousel-img {
    height: 300px;
    overflow: hidden;
    border: 1px solid #e4ecfb;
    box-sizing: border-box;
    box-shadow: 0px 2px 10px #d8d8d8;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .carousel-title {
    position: absolute;
    width: 400px;
    height: 100px;
    bottom: 0px;
    left: 50%;
    margin-left: -200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .carousel-content {
      display: flex;
      height: 80px;
      text-align: center;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .carousel-other-info {
        color: #e7838c;
        font-size: 12px;
        padding: 3px;
        width: 100%;
        white-space: nowrap;
        .lfx {
          text-align: right;
          padding-right: 5px;
        }
        .rtx {
          text-align: left;
          padding-left: 5px;
        }
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .carousel {
    width: 100%;
    .carousel-title {
      width: 100%;
      font-size: 14px;
      margin-left: -50%;
      box-sizing: border-box;
    }
  }
}
</style>