import supabase from '../../lib/supabaseClient';

export default async function handler(req, res) {
   if (req.method === 'POST') {
     const { nome, cargo, paroquia, regiao } = req.body;
     
     try {
       // Teste de conexão: tentar buscar dados da tabela
       const {  error: testError } = await supabase
         .from('participantes')
         .select('*')
         .limit(1);
       
       if (testError) {
         console.error("Erro na conexão com o Supabase:", testError.message);
         return res.status(500).json({ message: "Erro na conexão com o Supabase", error: testError.message });
       }
       
       // Insere os dados
       const { data, error } = await supabase
         .from('participantes')
         .insert([{ nome, cargo, paroquia, regiao }]);
       
       if (error) throw error;
       
       res.status(200).json({ message: 'Participante registrado com sucesso!', data });
     } catch (error) {
       console.error("Erro ao registrar participante:", error.message);
       res.status(500).json({ message: 'Erro ao registrar participante', error: error.message });
     }
   } else {
     res.status(405).json({ message: 'Método não permitido' });
   }
}