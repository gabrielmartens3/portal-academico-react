const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Dados iniciais
let turmas = [
    {
        id: 1,
        disciplina: 'Desenvolvimento Front-End',
        area: 'Programação',
        professor: 'Prof. Ricardo Alves',
        horarioCodigo: '24',
        horarioTexto: 'Segunda - Noite',
        cargaHoraria: 60,
        alunosMatriculados: ['1252024201779']
    },
    {
        id: 2,
        disciplina: 'Matemática Financeira',
        area: 'Gestão e Negócios',
        professor: 'Profa. Mariana Costa',
        horarioCodigo: '44',
        horarioTexto: 'Quarta - Noite',
        cargaHoraria: 60,
        alunosMatriculados: ['1252024201779']
    },
    {
        id: 3,
        disciplina: 'Engenharia de Software Ágil',
        area: 'Programação',
        professor: 'Prof. Ricardo Alves',
        horarioCodigo: '34',
        horarioTexto: 'Terça - Noite',
        cargaHoraria: 60,
        alunosMatriculados: []
    },
    {
        id: 4,
        disciplina: 'Governança de TI',
        area: 'Gestão e Negócios',
        professor: 'Prof. Carlos Mendes',
        horarioCodigo: '54',
        horarioTexto: 'Quinta - Noite',
        cargaHoraria: 60,
        alunosMatriculados: []
    },
    {
        id: 5,
        disciplina: 'Estrutura de Dados Avançada',
        area: 'Programação',
        professor: 'Prof. Lucas Ferreira',
        horarioCodigo: '21',
        horarioTexto: 'Segunda - Manhã',
        cargaHoraria: 60,
        alunosMatriculados: []
    }
];

let chamados = [
    {
        id: 1,
        assunto: 'Dúvida de Matrícula',
        destinatario: 'Prof. Ricardo Alves',
        mensagem: 'Professor, a disciplina exige conhecimento prévio de Node.js?',
        resposta: 'Olá Gabriel! Não precisa, veremos o básico de Node e Express na semana 5.',
        status: 'respondido',
        data: '12/11/2026'
    },
    {
        id: 2,
        assunto: 'Quebra de Pré-requisito',
        destinatario: 'Prof. Lucas Ferreira',
        mensagem: 'Gostaria de solicitar quebra de pré-requisito para Estrutura de Dados.',
        resposta: '',
        status: 'pendente',
        data: '14/11/2026'
    }
];

// ROTAS DE TURMAS
app.get('/turmas', (req, res) => {
    res.json(turmas);
});

app.post('/turmas', (req, res) => {
    const novaTurma = {
        id: Date.now(),
        disciplina: req.body.disciplina,
        area: req.body.area,
        professor: req.body.professor,
        horarioCodigo: req.body.horarioCodigo,
        horarioTexto: req.body.horarioTexto,
        cargaHoraria: 60,
        alunosMatriculados: []
    };
    turmas.push(novaTurma);
    res.status(201).json(novaTurma);
});

app.delete('/turmas/:id', (req, res) => {
    const id = Number(req.params.id);
    turmas = turmas.filter(t => t.id !== id);
    res.json({ sucesso: true });
});

app.post('/turmas/:id/matricular', (req, res) => {
    const id = Number(req.params.id);
    const { matricula } = req.body;

    turmas = turmas.map(turma => {
        if (turma.id !== id) return turma;
        const jaEsta = turma.alunosMatriculados.includes(matricula);
        const novosAlunos = jaEsta
            ? turma.alunosMatriculados.filter(m => m !== matricula)
            : [...turma.alunosMatriculados, matricula];
        return { ...turma, alunosMatriculados: novosAlunos };
    });

    res.json(turmas);
});

// ROTAS DE CHAMADOS
app.get('/chamados', (req, res) => {
    res.json(chamados);
});

app.post('/chamados', (req, res) => {
    const novoChamado = {
        id: Date.now(),
        assunto: req.body.assunto,
        destinatario: req.body.destinatario,
        mensagem: req.body.mensagem,
        resposta: '',
        status: 'pendente',
        data: new Date().toLocaleDateString('pt-BR')
    };
    chamados.unshift(novoChamado);
    res.status(201).json(novoChamado);
});

app.put('/chamados/:id/responder', (req, res) => {
    const id = Number(req.params.id);
    const { resposta } = req.body;

    chamados = chamados.map(c => {
        if (c.id !== id) return c;
        return { ...c, resposta, status: 'respondido' };
    });

    res.json(chamados);
});

app.listen(PORT, () => {
    console.log(`Servidor API Unisinos rodando em http://localhost:${PORT}`);
});