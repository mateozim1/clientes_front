<template>
    <v-container>
        <v-card>
            <v-card-title>Lista de Clientes</v-card-title>
    
            <v-card-text>
                <v-text-field
                    v-model="search"
                    label="Buscar por nome"
                    class="mb-4"
                    clearable
                />

                <div>
                    <v-select
                        v-model="filtroStatus"
                        :items="['Todos', 'ativo', 'inativo']"
                        label="Filtrar por Status"
                        class="mb-4"
                        clearable
                    />
                    <v-data-table
                        :headers="headers"
                        :items="clientesFiltrados"
                        :items-per-page="10"
                        :sort-by="['created_at']"
                        :sort-desc="[true]"
                        class="elevation-1"
                    >
                        <template #item.status="{ item }">
                            <v-chip :color="item.status === 'ativo' ? 'green' : 'red'" dark>
                                {{ item.status }}
                            </v-chip>
                        </template>
                        <template #item.data_nascimento="{ item }">
                            {{ formatarData(item.data_nascimento) }}
                        </template>
                        <template #item.cpf_cnpj="{ item }">
                            {{ formatarCpfCnpj(item.cpf_cnpj) }}
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import axios from 'axios'

    const filtroStatus = ref('Todos')
    const search = ref('')
    const clientes = ref([])
    
    const headers = [
        { title: 'Nome', value: 'nome' },
        { title: 'Data de Nascimento', value: 'data_nascimento' },
        { title: 'CPF/CNPJ', value: 'cpf_cnpj' },
        { title: 'E-mail', value: 'email' },
        { title: 'Telefone', value: 'telefone' },
        { title: 'Profissão', value: 'profissao.nome_profissao' },
        { title: 'Status', value: 'status' },
    ];
    
    const carregarClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clientes')
            clientes.value = response.data
        } catch (error) {
            console.error('Erro ao buscar clientes:', error)
        }
    }
    
    const clientesFiltrados = computed(() => {
        return clientes.value
            .filter(c =>
                (filtroStatus.value === 'Todos' || c.status === filtroStatus.value) &&
                (c.nome.toLowerCase().includes(search.value.toLowerCase()))
            )
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    })

    function formatarData(data) {
        if (!data) return ''
        const [ano, mes, dia] = data.split('-')
        return `${dia}/${mes}/${ano}`
    }

    function formatarCpfCnpj(valor) {
        if (!valor) return ''
        const numeros = valor.replace(/\D/g, '')

        if (numeros.length === 11) {
            return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        } else if (numeros.length === 14) {
            return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
        }

        return valor
    }
    
    onMounted(carregarClientes)
</script>
  