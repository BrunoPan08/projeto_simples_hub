<template>
    <div class="card mb-4">
      <div class="card-body">
        <div class="container-deadline">
            <ul class="wrapper-deadline">
                <li><span class="text-success">✔️ {{ totalCertificates }} integrados</span></li>
                <li><span class="text-warning">⚠️ {{ expiringCertificates }} vencem em breve</span></li>
                <li><span class="text-danger">❌ {{ expiredCertificates }} vencidos</span></li>
            </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CertificateCard',
    data() {
      return {
        totalCertificates: 118,
        expiringCertificates: 36,
        expiredCertificates: 3,
        showCertificateModal: false,
      };
    },
    methods: {
      openCertificateModal() {
        this.showCertificateModal = true;
      },
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

  .container-deadline {
    display: flex;
    margin-left: 75px;
    justify-content: center;
  }
  .wrapper-deadline {
    width: 52%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: flex-start;
  }
  </style>
  