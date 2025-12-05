const musicas = [
  {
    id: 1,
    titulo: "Porque Ele Vive",
    artista: "Harpa Cristã",
    tom: "A",
    // IMPORTANTE: Os acordes devem estar entre colchetes [] para sua lógica funcionar!
    // Use apenas sustenidos (#) por enquanto, pois seu array de notas no Song.jsx não tem bemóis (b).
    letra: `
[G]         [C]
Deus enviou seu Filho amado
           [G]            [D]
Pra me salvar e perdoar
           [G]           [C]
Na cruz morreu por meus pecados
           [G]       [D]          [G]
Mas ressurgiu e vivo com o Pai está

[G]         [C]
Porque Ele vive, posso crer no amanhã
           [G]             [D]
Porque Ele vive, temor não há
           [G]              [C]
Mas eu bem sei, eu sei, que a minha vida
         [G]        [D]          [G]
Está nas mãos do meu Jesus, que vivo está
    `
  },
  {
    id: 2,
    titulo: "Parabéns pra Você",
    artista: "Tradicional",
    tom: "C",
    letra: `
[C]             [G]
Parabéns pra você
               [C]
Nessa data querida
               [F]
Muitas felicidades
[G]             [C]
Muitos anos de vida
    `
  }
];

export { musicas };