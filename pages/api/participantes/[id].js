import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nome, cargo, paroquia, regiao } = req.body;

    try {
      const { data, error } = await supabase
        .from('participantes')
        .update({ nome, cargo, paroquia, regiao })
        .eq('id', id)
        .single();

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  } else if (req.method === 'DELETE') {
    try {
      const { data, error } = await supabase
        .from('participantes')
        .delete()
        .eq('id', id)
        .single();

      if (error) throw error;

      res.status(200).json({ message: 'Participante deletado com sucesso!', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
