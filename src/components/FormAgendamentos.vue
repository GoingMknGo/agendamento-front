<template>
    <div class="form">
        <form>
            <div class="form-group col-md-6">
                <label for="inputUsuario">Usuario <span class="text-danger">{{ error.usuario }}</span></label>
                <input v-model="usuario" type="text" class="form-control" id="inputUsuario"
                    placeholder="Insira seu nome de usuário" />
            </div>
            <div class="form-group col-md-6">
                <label for="inputContaOrigem">Conta de Origem <span class="text-danger">{{ error.contaOrigem
                }}</span></label>
                <input v-model="contaOrigem" type="text"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="6"
                    class="form-control" id="inputContaOrigem" placeholder="123456" />
            </div>
            <div class="form-group col-md-6">
                <label for="inputContaDestino">Conta de Destino <span class="text-danger">{{ error.contaDestino
                }}</span></label>
                <input v-model="contaDestino" type="text"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="6"
                    class="form-control" id="inputContaDestino" placeholder="654321" />
            </div>
            <div class="form-group col-md-6">
                <label for="inputValor">Valor <span class="text-danger">{{ error.valorTransferencia
                }}</span></label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">R$</span>
                    </div>
                    <input v-model="valorTransferencia"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        type="text" class="form-control" id="inputValor" aria-label="Valor" placeholder="99.99">
                </div>
            </div>
            <div class="form-group col-md-6">
                <label>Data da transferência <span class="text-danger">{{ error.dataTransferencia }}</span></label>
                <Datepicker v-model="dataTransferencia" class="mb-3" :format="format" :disabled-dates="disabled"
                    :minDate="new Date()"></Datepicker>
            </div>
            <button v-on:click="validarForm" type="submit" class="btn btn-primary">Agendar</button>
        </form>
    </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            usuario: "",
            contaOrigem: "",
            contaDestino: "",
            valorTransferencia: "",
            dataTransferencia: ref(new Date()),
            error: {
                usuario: "*",
                contaOrigem: "*",
                contaDestino: "*",
                valorTransferencia: "Utilize ponto ( . ) para separar os centavos.",
                dataTransferencia: "*"
            }
        };
    },
    components: { Datepicker },
    methods: {
        validarForm() {
            let erros = 0;

            if (this.usuario.length < 4) {
                this.error.usuario = "Por favor, insira um usuário com ao menos 4 dígitos!"
                erros++;
            } else {
                this.error.usuario = ""
            }

            if (this.contaOrigem.length != 6) {
                this.error.contaOrigem = "Por favor, insira uma conta válida!"
                erros++;
            } else {
                this.error.contaOrigem = ""
            }

            if (this.contaOrigem.length != 6) {
                this.error.contaDestino = "Por favor, insira uma conta válida!"
                erros++;
            } else {
                this.error.contaDestino = ""
            }

            if (this.valorTransferencia.length == 0 || this.valorTransferencia == null) {
                this.error.valorTransferencia = "Por favor, insira um valor acima de 0.00"
                erros++;
            } else {
                this.error.valorTransferencia = ""
            }

            if (erros === 0) {
                this.addAgendamento();
            }

        },
        addAgendamento() {
            axios.post('http://localhost:8080/api/agendamentos/cadastrar', {
                usuario: this.usuario,
                contaOrigem: this.contaOrigem,
                contaDestino: this.contaDestino,
                valorTransferencia: this.valorTransferencia,
                dataTransferencia: this.dataTransferencia
            })
                .then(function (response) {
                    Swal.fire({
                        title: response.data,
                        type: "success"
                    }).then(function () {
                        location.reload();
                    });
                })
                .catch(function (error) {
                    Swal.fire("Ah não! Algo deu errado!", error.data, "error")
                })
        },
    },
    setup() {
        const data = ref(new Date());
        const format = (data) => {
            const day = data.getDate();
            const month = data.getMonth() + 1;
            const year = data.getFullYear();

            return ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
        };
        return {
            data,
            format,
        };
    },
}
</script>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>