import { db } from "./SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
      "Notas " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
  });
}

export async function adicionaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) values (?,?,?);", [nota.titulo, nota.categoria, nota.texto], () => {
        resolve("Nota adicionado com sucesso");
      });
    });
  });
}

export async function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, nota.texto, nota.id], () => {
        resolve("Nota atualizado com sucesso");
      });
    });
  });
}

export async function removeNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id], () => {
        resolve("Nota removido com sucesso");
      });
    });
  });
}

export async function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas;", [], () => {
        resolve(resultado.rows._array);
      });
    });
  });
}