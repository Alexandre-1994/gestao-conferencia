import pool from '../../../lib/mysqlClient';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nome, cargo, paroquia, regiao } = req.body;

    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'UPDATE participantes SET nome = ?, cargo = ?, paroquia = ?, regiao = ? WHERE id = ?',
        [nome, cargo, paroquia, regiao, id]
      );
      connection.release();

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      res.status(200).json({ message: 'Participante atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar participante:', error);
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'DELETE FROM participantes WHERE id = ?',
        [id]
      );
      connection.release();

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      res.status(200).json({ message: 'Participante deletado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar participante:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}