<template>
  <div>
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Clientes cadastrados</h5>
        <h2 class="client-count">{{ clients.length }} <span class="text-success">+{{ newClientsCount }}</span></h2>
        
      </div>
    </div>
  </div>
</template>

<script>
import { clientRef } from '../../firebaseConfig';
import { onValue } from 'firebase/database';

export default {
  name: 'ClientCard',
  data() {
    return {
      clients: [],
      newClientsCount: 0,
      newClientName: ''
    };
  },
  methods: {
    fetchClients() {
      onValue(clientRef, (snapshot) => {
        const data = snapshot.val();
        this.clients = data ? Object.keys(data).map(key => ({ ...data[key], key })) : [];
        this.newClientsCount = 23; 
      });
    },
  },
  created() {
    this.fetchClients();
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 125px;
}
.client-count {
  font-size: 2.5rem;
  font-weight: bold;
}
.btn-outline-primary {
  margin-top: 20px;
}
</style>
