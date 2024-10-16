<template>
  <div>
    <div class="card card-layout">
      <div class="card-body">

        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#clientModal">
          Gerenciar clientes
        </button>

        <div class="modal fade" id="clientModal" tabindex="-1" aria-labelledby="clientModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="clientModalLabel">Gerenciar Clientes</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3>Lista de clientes</h3>
                  </div>
                  <div class="panel-body">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="client in clients" :key="client.key">
                          <td>
                            <span v-if="!client.isEditing">{{ client.nome }}</span>
                            <input v-else type="text" v-model="client.editingName" />
                          </td>
                          <td>
                            <i v-if="!client.isEditing" class="fa fa-pencil" aria-hidden="true"
                              @click="toggleEditClient(client)"></i>
                            <i v-if="!client.isEditing" class="fa fa-trash" aria-hidden="true"
                              @click="removeClient(client)"></i>
                            <i v-if="client.isEditing" class="fa fa-check" aria-hidden="true"
                              @click="confirmEditClient(client)"></i>
                            <i v-if="client.isEditing" class="fa fa-times" aria-hidden="true"
                              @click="cancelEditClient(client)"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <form @submit.prevent="addClient">
                  <div class="form-group">
                    <label for="clientName">Nome:</label>
                    <input type="text" id="clientName" v-model="newClientName" required />
                  </div>
                  <button type="submit" class="btn btn-primary">Adicionar Cliente</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clientRef } from '../../firebaseConfig';
import { onValue, push, remove, ref, update } from 'firebase/database';

export default {
  name: 'ClientEditCard',
  data() {
    return {
      clients: [],
      newClientName: ''
    };
  },
  methods: {
    fetchClients() {
      onValue(clientRef, (snapshot) => {
        const data = snapshot.val();
        this.clients = data ? Object.keys(data).map(key => ({
          ...data[key],
          key,
          isEditing: false,
          editingName: data[key].nome 
        })) : [];
      });
    },
    toggleEditClient(client) {
      client.isEditing = true;
    },
    confirmEditClient(client) {
      const clientRefToUpdate = ref(clientRef, client.key);
      update(clientRefToUpdate, { nome: client.editingName })
        .then(() => {
          client.isEditing = false;
          client.nome = client.editingName;
        });
    },
    cancelEditClient(client) {
      client.isEditing = false;
      client.editingName = client.nome; 
    },
    removeClient(client) {
      const clientRefToRemove = ref(clientRef, client.key);
      remove(clientRefToRemove)
        .then(() => {
          this.clients = this.clients.filter(c => c.key !== client.key);
        })
        .catch((error) => {
          console.error('Erro ao remover cliente:', error);
        });
    },
    addClient() {
      if (this.newClientName.trim() !== '') {
        const newClient = { nome: this.newClientName };
        push(clientRef, newClient)
          .then(() => {
            this.newClientName = '';
            this.clients.push(newClient);
          })
          .catch((error) => {
            console.error('Erro ao adicionar cliente:', error);
          });
      }
    }
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

.btn-outline-primary {
  margin-top: 20px;
}

.fa-pencil,
.fa-trash,
.fa-check,
.fa-times {
  cursor: pointer;
  margin-right: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
</style>
