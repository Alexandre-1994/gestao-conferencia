import pool from '../../lib/mysqlClient';

export default async function handler(req, res) {
  try {
    // Executa uma consulta simples, como buscar uma tabela de exemplo
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.status(200).json({ message: 'Conexão bem-sucedida!', result: rows[0].solution });
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
    res.status(500).json({ message: 'Erro na conexão com o banco de dados', error: error.message });
  }
}
