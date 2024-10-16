<template>
  <div id="app" class="container">
    <div class="row">
      <div class="title-client">
        <h1>Clientes</h1>
      </div>
      <div class="col-md-6">
        <ClientCard />
      </div>
      <div class="col-md-6">
        <ClientEditCard />
      </div>
    </div>
    <div class="row">
      <div class="title-certificate">
        <h2>Certificados</h2>
      </div>
      <div class="col-md-6">
        <CertificateCard />
      </div>
      <div class="col-md-6">
        <CertificateEditCard />
      </div>
    </div>
  </div>
</template>

<script>
import ClientCard from './components/cards/ClientCard.vue';
import ClientEditCard from './components/cards/ClientEditCard.vue';
import CertificateCard from './components/cards/CertificateCard.vue';
import CertificateEditCard from './components/cards/CertificateEditCard.vue';

export default {
  name: 'App',
  components: {
    ClientCard,
    ClientEditCard,
    CertificateCard,
    CertificateEditCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
.title-client {
  display: flex;
}
.title-certificate {
  display: flex;
}
.row {
  display: flex;
  justify-content: space-around;
}
</style>
