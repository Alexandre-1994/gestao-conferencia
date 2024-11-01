import pool from "../../lib/mysqlClient";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const connection = await pool.getConnection();
    const { 
      nome, 
      cargo, 
      paroquia, 
      regiao 
    } = req.body;

    const [result] = await connection.query(
      `INSERT INTO participantes 
       (nome, cargo, paroquia, regiao) 
       VALUES (?, ?, ?, ?)`,
      [nome, cargo, paroquia, regiao]
    );

    connection.release();

    res.status(200).json({ 
      id: result.insertId,
      message: 'Participante registrado com sucesso' 
    });

  } catch (error) {
    console.error('Erro ao registrar participante:', error);
    res.status(500).json({ error: 'Erro ao registrar participante', detalhes: error.message });
  }
}