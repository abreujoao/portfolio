from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "chave-secreta"

usuarios = {
    "admin": "senha_admin"  # Usuário ADM
}

@app.route('/')
def home():
    return redirect(url_for('login'))  

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in usuarios and usuarios[username] == password:
            session['username'] = username
            return redirect(url_for('escolhas')) 
        else:
            flash("Usuário ou senha inválidos!", "error")
    return render_template("login.html")

@app.route('/escolhas')
def escolhas():
    if 'username' in session:
        return render_template("escolhas.html")  
    return redirect(url_for('login'))  


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username not in usuarios:
            usuarios[username] = password
            flash("Registro realizado com sucesso!", "success")
            return redirect(url_for('login'))
        else:
            flash("Usuário já existe!", "error")
    return render_template("register.html")

@app.route('/logout')
def logout():
    session.pop('username', None)  
    flash("Você saiu com sucesso!", "success")
    return redirect(url_for('login'))

class Funcionario:
    def __init__(self, nome, salarioMensal):
        self.nome = nome
        self.salarioMensal = salarioMensal

    def calcularSalarioAnual(self):
        return self.salarioMensal * 12

funcionario = Funcionario("João", 0.0)

class Conta:
    def __init__(self, saldo_inicial=0.0):
        self.saldo = saldo_inicial
        self.transacoes = []

    def depositar(self, valor):
        self.saldo += valor
        self.transacoes.append(f"Depósito de R${valor:.2f}")

    def sacar(self, valor):
        if valor <= self.saldo:
            self.saldo -= valor
            self.transacoes.append(f"Saque de R${valor:.2f}")
        else:
            raise ValueError("Saldo insuficiente.")

conta_corrente = Conta()
conta_poupanca = Conta()

@app.route('/salario', methods=['GET', 'POST'])
def salario():
    if request.method == 'POST':
        try:
            salario = float(request.form['salario'])
            funcionario.salarioMensal = salario
            conta_corrente.depositar(salario)
            flash(f"Salário de R${salario:.2f} depositado com sucesso na Conta Corrente!", "success")
        except ValueError:
            flash("Insira um valor válido para o salário.", "error")
        return redirect(url_for('salario'))
    return render_template("salario.html", funcionario=funcionario)

@app.route('/conta_corrente', methods=['GET', 'POST'])
def conta_corrente_view():
    if request.method == 'POST':
        try:
            valor = float(request.form['valor'])
            tipo = request.form['tipo']
            if tipo == 'deposito':
                conta_corrente.depositar(valor)
            elif tipo == 'saque':
                conta_corrente.sacar(valor)
            flash(f"{tipo.capitalize()} de R${valor:.2f} realizado com sucesso!", "success")
        except ValueError as e:
            flash(str(e), "error")
        return redirect(url_for('conta_corrente_view'))
    return render_template("conta_corrente.html", conta=conta_corrente)

@app.route('/conta_poupanca', methods=['POST', 'GET'])
def conta_poupanca_view():
    if request.method == 'POST':
        try:
            valor = float(request.form['valor'])
            tipo = request.form['tipo']
            if tipo == 'deposito':
                conta_poupanca.depositar(valor)
                flash(f"Depósito de R${valor:.2f} realizado com sucesso na Poupança!", "success")
            elif tipo == 'saque':
                conta_poupanca.sacar(valor)
                flash(f"Saque de R${valor:.2f} realizado com sucesso da Poupança!", "success")
        except ValueError as e:
            flash(str(e), "error")
        return redirect(url_for('conta_poupanca_view'))
    return render_template("conta_poupanca.html", conta=conta_poupanca)

if __name__ == "__main__":
    app.run(debug=True) 