<template>
  <div class="container">
    <aya-header />
    <nuxt />
    <aya-footer />
  </div>
</template>

<script>
import ayaHeader from "@/components/public/header";
import ayaFooter from "@/components/public/footer";
export default {
  components: {
    ayaHeader,
    ayaFooter
  }
};
</script>