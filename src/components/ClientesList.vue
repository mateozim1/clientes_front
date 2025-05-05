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

                <v-data-table
                    :headers="headers"
                    :items="clientesFiltrados"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template #item.status="{ item }">
                    <v-chip :color="item.status === 'ativo' ? 'green' : 'red'" dark>
                        {{ item.status }}
                    </v-chip>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import axios from 'axios'
    
    const search = ref('')
    const clientes = ref([])
    
    const headers = [
        { title: 'Nome', value: 'nome' },
        { title: 'Data de Nascimento', value: 'data_nascimento' },
        { title: 'CPF/CNPJ', value: 'cpf_cnpj' },
        { title: 'E-mail', value: 'email' },
        { title: 'Telefone', value: 'telefone' },
        { title: 'Status', value: 'status' },
    ]
    
    const carregarClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/clientes')
            clientes.value = response.data
        } catch (error) {
            console.error('Erro ao buscar clientes:', error)
        }
    }
    
    const clientesFiltrados = computed(() => {
        if (!search.value) return clientes.value
            return clientes.value.filter((cliente) =>
            cliente.nome.toLowerCase().includes(search.value.toLowerCase())
        )
    })
    
    onMounted(carregarClientes)
</script>
  