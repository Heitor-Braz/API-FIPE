
async function getVehicleValueByFipeCode(fipeCode) {
    try {

        console.log('Código FIPE:', fipeCode)

        fipeCode = fipeCode.trim()

        if (!fipeCode) {
            throw new Error('Código FIPE inválido ou vazio.')
        }

        const url = `https://brasilapi.com.br/api/fipe/preco/v1/${fipeCode}`
        console.log('URL elaborada para a requisição:', url)

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Código FIPE não existe.')
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Erro ao buscar valor do veículo:', error);
        return 
    }
}

document.getElementById('fipeForm').addEventListener('submit', async (event) => {
    event.preventDefault()

    const fipeCode = document.getElementById('fipeCode').value.trim()

    console.log('Valor capturado do campo FIPE:', fipeCode)

    if (!fipeCode) {
        alert('Insira o código FIPE.')
        return
    }

    const veiculoData = await getVehicleValueByFipeCode(fipeCode)
    const resultadoElemento = document.getElementById('result')

    if (veiculoData) {

        resultadoElemento.innerHTML = `
            <pre>${JSON.stringify(veiculoData, null, 2)}</pre>
        `
    } else {
        resultadoElemento.textContent = 'Não foi possível obter a resposta com o código FIPE informado.'
    }
})
