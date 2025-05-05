<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card>
                    <v-card-title>Cadasto de Cliente</v-card-title>

                    <v-card-text>
                        <div>
                            <div v-if="currentStep === 1">
                                <v-text-field v-model="cliente.nome" label="Nome" maxlength="255" :error-messages="erros.nome" required />
                                <v-text-field v-model="cliente.data_nascimento" label="Data Nascimento" type="date" :error-messages="erros.data_nascimento" required />
                                <v-select
                                    v-model="cliente.tipo_pessoa"
                                    :items="[
                                        { text: 'Física', value: 'fisica' },
                                        { text: 'Jurídica', value: 'juridica' }
                                    ]"
                                    item-title="text"
                                    item-value="value"
                                    label="Tipo de Pessoa"
                                    :error-messages="erros.tipo_pessoa"
                                    required
                                ></v-select>
                                <v-text-field v-model="cliente.cpf_cnpj" label="CPF/CNPJ" maxlength="20" :error-messages="erros.cpf_cnpj" required />
                                <v-text-field v-model="cliente.email" label="E-mail" maxlength="255" :error-messages="erros.email" required />
                                <v-text-field v-model="cliente.telefone" label="Telefone" maxlength="15" :error-messages="erros.telefone" required />
                                <v-select
                                    v-model="cliente.status"
                                    :items="[
                                        { text: 'Ativo', value: 'ativo' },
                                        { text: 'Inativo', value: 'inativo' }
                                    ]"
                                    item-title="text"
                                    item-value="value"
                                    label="Status"
                                    :error-messages="erros.status"
                                    required
                                ></v-select>
                            </div>
                        
                            <div v-else-if="currentStep === 2">
                                <v-text-field v-model="cliente.endereco" label="Endereço" maxlength="255" :error-messages="erros.endereco" required />
                                <v-text-field v-model="cliente.numero" label="Número" maxlength="20" :error-messages="erros.numero" required />
                                <v-text-field v-model="cliente.bairro" label="Bairro" maxlength="100" :error-messages="erros.bairro" required />
                                <v-text-field v-model="cliente.cidade" label="Cidade" maxlength="100" :error-messages="erros.cidade" required />
                                <v-text-field v-model="cliente.uf" label="UF" maxlength="2" :error-messages="erros.uf" required />
                                <v-text-field v-model="cliente.complemento" maxlength="100" label="Complemento" />
                            </div>
                        
                            <div v-else-if="currentStep === 3">
                                <v-select
                                    v-model="cliente.id_profissao"
                                    :items="profissoes"
                                    item-value="id"
                                    item-title="nome_profissao"
                                    label="Profissão"
                                    :error-messages="erros.id_profissao"
                                    required
                                />
                            </div>
                        
                            <div class="mt-4">
                                <v-btn @click="passoAnterior" color="secondary" class="mr-2" :disabled="currentStep === 1">Voltar</v-btn>
                                <v-btn @click="proximoPasso" color="primary" v-if="currentStep < 3">Próximo</v-btn>
                                <v-btn @click="salvarCliente" v-if="currentStep === 3">Salvar</v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
  </template>
  
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const currentStep = ref(1)

    const cliente = reactive({
        nome: '',
        data_nascimento: '',
        tipo_pessoa: '',
        cpf_cnpj: '',
        email: '',
        telefone: '',
        status: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        id_profissao: null,
        id_endereco: null
    })

    const erros = reactive({})
    const profissoes = ref([])

    const carregarProfissoes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/profissoes')
            profissoes.value = response.data
        } catch (error) {
            console.error('Erro ao carregar profissões:', error)
        }
    }

    onMounted(() => {
        carregarProfissoes()
    })

    function validarEtapa() {
        erros.nome = ''
        erros.email = ''
        erros.telefone = ''
        erros.cpf_cnpj = ''
        erros.endereco = ''
        erros.data_nascimento = ''
        erros.tipo_pessoa = ''
        erros.status = ''
        erros.id_profissao = ''
        let valido = true

        if (currentStep.value === 1) {
            if (!cliente.nome || cliente.nome.length > 255) {
                erros.nome = 'Nome é obrigatório e deve ter no máximo 255 caracteres'
                valido = false
            }
            if (!cliente.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(cliente.email)) {
                erros.email = 'E-mail inválido'
                valido = false
            }
            if (!cliente.cpf_cnpj || !validarCpfCnpj(cliente.cpf_cnpj)) {
                erros.cpf_cnpj = 'CPF/CNPJ inválido'
                valido = false
            }
            if (!cliente.telefone) {
                erros.telefone = 'Telefone é obrigatório'
                valido = false
            }
            if (!cliente.data_nascimento) {
                erros.data_nascimento = 'Data de nascimento é obrigatória'
                valido = false
            }
            if (!cliente.tipo_pessoa) {
                erros.tipo_pessoa = 'Tipo de pessoa é obrigatório'
                valido = false
            }
            if (!cliente.status) {
                erros.status = 'Status é obrigatório'
                valido = false
            }
        }

        if (currentStep.value === 2) {
            if (!cliente.endereco) {
                erros.endereco = 'Endereco é obrigatório'
                valido = false
            }
            if (!cliente.numero) {
                erros.numero = 'Numero é obrigatório'
                valido = false
            }
            if (!cliente.bairro) {
                erros.bairro = 'Bairro é obrigatório'
                valido = false
            }
            if (!cliente.cidade) {
                erros.cidade = 'Cidade é obrigatório'
                valido = false
            }
            if (!cliente.uf) {
                erros.uf = 'Uf é obrigatório'
                valido = false
            }
        }

        if (currentStep.value === 3) {
            if (!cliente.id_profissao) {
                erros.id_profissao = 'Profissão é obrigatória'
                valido = false
            }
        }

        return valido
    }

    function proximoPasso() {
        if (validarEtapa()) {
        currentStep.value++
        }
    }

    function passoAnterior() {
        if (currentStep.value > 1) {
            currentStep.value--
        }
    }

    function validarCpfCnpj(valor) {
        const numeros = valor.replace(/\D/g, '')

        if (numeros.length === 11) {
            return validarCPF(numeros)
        } else if (numeros.length === 14) {
            return validarCNPJ(numeros)
        }

        return false
    }

    function validarCPF(cpf) {
        if (/^(\d)\1+$/.test(cpf)) return false

        let soma = 0
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i)
        }

        let resto = 11 - (soma % 11)
        let digito1 = resto >= 10 ? 0 : resto

        if (parseInt(cpf.charAt(9)) !== digito1) return false

        soma = 0
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i)
        }
        resto = 11 - (soma % 11)
        let digito2 = resto >= 10 ? 0 : resto

        return parseInt(cpf.charAt(10)) === digito2
    }

    function validarCNPJ(cnpj) {
        if (/^(\d)\1+$/.test(cnpj)) return false

        let pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        let pesos2 = [6].concat(pesos1)

        let soma = 0
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesos1[i]
        }

        let resto = soma % 11
        let digito1 = resto < 2 ? 0 : 11 - resto

        if (parseInt(cnpj.charAt(12)) !== digito1) return false

        soma = 0
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * pesos2[i]
        }
        resto = soma % 11
        let digito2 = resto < 2 ? 0 : 11 - resto

        return parseInt(cnpj.charAt(13)) === digito2
    }

    async function salvarCliente() {
        if (!validarEtapa()) return

        try {
            await axios.post('http://localhost:8000/api/clientes', cliente)
            router.push('/')
            alert("Cliente criado com sucesso")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert('Erro ao salvar: ' + error.response.data.message)
            } else if (error.response && error.response.data && typeof error.response.data === 'object') {
                const mensagens = Object.values(error.response.data).flat().join('\n')
                alert('Erro ao salvar:\n' + mensagens)
            } else {
                alert('Erro inesperado ao salvar cliente.')
            }

            console.error('Erro ao salvar cliente:', error)
        }
    }
</script>
  
<style scoped>
    .text-error {
        color: red;
        font-size: 0.875rem;
    }
</style>