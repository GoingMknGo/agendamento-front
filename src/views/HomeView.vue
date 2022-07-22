<template>
  <div class="home">
    <div class="row">
      <div class="col-6">
        <h1 style="text-align: center;">Faça já seu agendamento!</h1>
        <FormAgendamentos />
      </div>
      <div class="col-6" style="padding: 2em;">
        <div class="card text-white bg-dark mb-3" style="max-width: 50rem;">
          <div class="card-header">Atente-se às taxas aplicáveis.</div>
          <div class="card-body">
            <h5 class="card-title">Antes de agendar, consulte abaixo as datas e valores possíveis no nosso sistema.</h5>
            <p class="card-text">A - Transferência de valores abaixo de R$ 1000,99 só podem ser feitas no mesmo
              dia, tendo como taxa R$3,00 mais 3% do valor a ser transferido.
              <br />B - Transferência de valores acima de R$ 1001,00 e abaixo de R$ 2000,00 podem ser agendadas
              com prazo máximo de 10 dias de antecedência, esse tipo de transferência
              possui uma taxa fixa de R$ 12,00.
              <br />C - Transferência de valores acima de R$ 2000,00 podem ser agendadas com qualquer prazo, tendo
              taxa regressiva conforme a data de transferência:
              <br />&emsp;C1 - Acima de 10 dias da data de agendamento 8.2%
              <br />&emsp;C2 - Acima de 20 dias da data de agendamento 6.9%
              <br />&emsp;C3 - Acima de 30 dias da data de agendamento 4.7%
              <br />&emsp;C4 - Acima de 40 dias da data de agendamento 1.7%
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ListaAgendamentos />
      </div>
    </div>
  </div>
</template>

<script>
import FormAgendamentos from "../components/FormAgendamentos.vue"
import ListaAgendamentos from "../components/ListaAgendamentos.vue";
export default {
  name: "HomeView",
  components: { FormAgendamentos, ListaAgendamentos },
};
</script>

<style lang="scss" scoped>
.home {
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>