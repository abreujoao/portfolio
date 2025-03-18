// Simulação de banco de dados
let usuarios = {
    "admin": "senha_admin"
};

let contaCorrente = {
    saldo: 0,
    transacoes: []
};

let contaPoupanca = {
    saldo: 0,
    transacoes: []
};

// Elementos do DOM
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const salarioForm = document.getElementById('salarioForm');
const correnteForm = document.getElementById('correnteForm');
const poupancaForm = document.getElementById('poupancaForm');

// Event Listeners
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (usuarios[username] && usuarios[username] === password) {
        document.getElementById('userDisplay').textContent = username;
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
    } else {
        alert('Usuário ou senha inválidos!');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (usuarios[username]) {
        alert('Usuário já existe!');
    } else {
        usuarios[username] = password;
        alert('Registro realizado com sucesso!');
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    }
});

salarioForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const salario = parseFloat(document.getElementById('salario').value);
    contaCorrente.saldo += salario;
    contaCorrente.transacoes.push(`Depósito de R$${salario.toFixed(2)} (Salário)`);
    atualizarSaldoCorrente();
    atualizarTransacoesCorrente();
    alert('Salário registrado com sucesso!');
});

correnteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valorCorrente').value);
    const tipo = document.getElementById('tipoCorrente').value;

    if (tipo === 'saque' && valor > contaCorrente.saldo) {
        alert('Saldo insuficiente!');
        return;
    }

    if (tipo === 'deposito') {
        contaCorrente.saldo += valor;
        contaCorrente.transacoes.push(`Depósito de R$${valor.toFixed(2)}`);
    } else {
        contaCorrente.saldo -= valor;
        contaCorrente.transacoes.push(`Saque de R$${valor.toFixed(2)}`);
    }

    atualizarSaldoCorrente();
    atualizarTransacoesCorrente();
    alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} realizado com sucesso!`);
});

poupancaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valorPoupanca').value);
    const tipo = document.getElementById('tipoPoupanca').value;

    if (tipo === 'saque' && valor > contaPoupanca.saldo) {
        alert('Saldo insuficiente!');
        return;
    }

    if (tipo === 'deposito') {
        contaPoupanca.saldo += valor;
        contaPoupanca.transacoes.push(`Depósito de R$${valor.toFixed(2)}`);
    } else {
        contaPoupanca.saldo -= valor;
        contaPoupanca.transacoes.push(`Saque de R$${valor.toFixed(2)}`);
    }

    atualizarSaldoPoupanca();
    atualizarTransacoesPoupanca();
    alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} realizado com sucesso!`);
});

// Funções auxiliares
function showSection(section) {
    document.querySelectorAll('.dashboard__content > div').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(`${section}Section`).style.display = 'block';
}

function logout() {
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'block';
    loginForm.reset();
}

function atualizarSaldoCorrente() {
    document.getElementById('saldoCorrente').textContent = contaCorrente.saldo.toFixed(2);
}

function atualizarSaldoPoupanca() {
    document.getElementById('saldoPoupanca').textContent = contaPoupanca.saldo.toFixed(2);
}

function atualizarTransacoesCorrente() {
    const lista = document.getElementById('transacoesCorrente');
    lista.innerHTML = '';
    contaCorrente.transacoes.forEach(transacao => {
        const li = document.createElement('li');
        li.textContent = transacao;
        lista.appendChild(li);
    });
}

function atualizarTransacoesPoupanca() {
    const lista = document.getElementById('transacoesPoupanca');
    lista.innerHTML = '';
    contaPoupanca.transacoes.forEach(transacao => {
        const li = document.createElement('li');
        li.textContent = transacao;
        lista.appendChild(li);
    });
} 