<template>
    <div class="agendamentos">
        <h1>Agendamentos feitos</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Usuário</th>
                    <th scope="col">Conta de origem</th>
                    <th scope="col">Conta de destino</th>
                    <th scope="col">Data da transferência</th>
                    <th scope="col">Data do agendamento</th>
                    <th scope="col">Valor da transferência</th>
                    <th scope="col">Taxa da transferência</th>
                </tr>
            </thead>
            <tbody class="list" v-for="agendamento in agendamentos" :key="agendamento">
                <tr>
                    <td class="dados">{{ agendamento.usuario }}</td>
                    <td class="dados">{{ agendamento.contaOrigem }}</td>
                    <td class="dados">{{ agendamento.contaDestino }}</td>
                    <td class="dados">{{ agendamento.dataTransferencia }}</td>
                    <td class="dados">{{ agendamento.dataAgendamento }}</td>
                    <td class="dados">R$ {{ formatPrice(agendamento.valorTransferencia) }}</td>
                    <td class="dados">R$ {{ formatPrice(agendamento.taxaTransferencia) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            agendamentos: {
            }
        }
    },
    methods: {
        getAgendamentos() {
            axios.get('http://localhost:8080/api/agendamentos')
                .then(resp => (this.agendamentos = resp.data))
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    },
    created() {
        this.getAgendamentos()
    }

}

</script>

<style lang="scss" scoped>
.agendamentos {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>