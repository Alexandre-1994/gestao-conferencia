import pool from '../../../lib/mysqlClient';

export default async function handler(req, res) {
  try {
    console.log('Tentando conectar ao MySQL...');
    const connection = await pool.getConnection();
    console.log('Conexão estabelecida com sucesso!');
    
    const [rows] = await connection.query('SELECT * FROM participantes');
    console.log('Dados recuperados:', rows);

    connection.release();
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro na API:', error);
    console.error('Erro detalhado:', error);
    res.status(500).json({ error: 'Erro ao buscar participantes' });
  }
}