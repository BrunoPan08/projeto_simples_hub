<template>
    <div>
      <div class="card">
        <div class="card-body">
  
          <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#certificateModal">
            Gerenciar certificados
          </button>
  
          <div class="modal fade" id="certificateModal" tabindex="-1" aria-labelledby="certificateModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="certificateModalLabel">Gerenciar Certificados</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h3>Lista de certificados</h3>
                    </div>
                    <div class="panel-body">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Empresa</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="certificate in certificates" :key="certificate.key">
                            <td>
                              <span v-if="!certificate.isEditing">{{ certificate.empresa }}</span>
                              <input v-else type="text" v-model="certificate.editingName" />
                            </td>
                            <td>
                              <i v-if="!certificate.isEditing" class="fa fa-pencil" aria-hidden="true" @click="toggleEditCertificate(certificate)"></i>
                              <i v-if="!certificate.isEditing" class="fa fa-trash" aria-hidden="true" @click="removeCertificate(certificate.key)"></i>
                              <i v-if="certificate.isEditing" class="fa fa-check" aria-hidden="true" @click="confirmEditCertificate(certificate)"></i>
                              <i v-if="certificate.isEditing" class="fa fa-times" aria-hidden="true" @click="cancelEditCertificate(certificate)"></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <form @submit.prevent="addCertificate">
                    <div class="form-group">
                      <label for="certificateName">Empresa:</label>
                      <input type="text" id="certificateName" v-model="newCertificateName" required />
                    </div>
                    <button type="submit" class="btn btn-primary">Adicionar Certificado</button>
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
  import { certificateRef } from '../../firebaseConfig';
  import { onValue, push, remove, update, child } from 'firebase/database';
  
  export default {
    name: 'CertificateEditCard',
    data() {
      return {
        certificates: [],
        newCertificateName: ''
      };
    },
    methods: {
      fetchCertificates() {
        onValue(certificateRef, (snapshot) => {
          const data = snapshot.val();
          this.certificates = data ? Object.keys(data).map(key => ({
            ...data[key],
            key,
            isEditing: false,
            editingName: data[key].empresa 
          })) : [];
        });
      },
      toggleEditCertificate(certificate) {
        certificate.isEditing = true;
      },
      confirmEditCertificate(certificate) {
        const certificateRefToUpdate = child(certificateRef, certificate.key);
        update(certificateRefToUpdate, { empresa: certificate.editingName })
          .then(() => {
            certificate.isEditing = false;
            certificate.empresa = certificate.editingName;
          });
      },
      cancelEditCertificate(certificate) {
        certificate.isEditing = false;
        certificate.editingName = certificate.empresa;
      },
      removeCertificate(certificateKey) {
        const certificateRefToRemove = child(certificateRef, certificateKey);
        remove(certificateRefToRemove)
          .then(() => {
            this.certificates = this.certificates.filter(certificate => certificate.key !== certificateKey);
          });
      },
      addCertificate() {
        if (this.newCertificateName.trim() !== '') {
          const newCertificate = { empresa: this.newCertificateName };
          push(certificateRef, newCertificate)
            .then(() => {
              this.newCertificateName = '';
              this.certificates.push({ ...newCertificate, key: newCertificate.key, isEditing: false });
            })
            .catch((error) => {
              console.error('Erro ao adicionar certificado:', error);
            });
        }
      }
    },
    created() {
      this.fetchCertificates();
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
  