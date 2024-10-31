import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


// Estilos para o modal (pode ajustar conforme preferir)
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '100%',
    position: 'relative'
  }
};


export default function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    paroquia: '',
    regiao: ''
  });
  const [participantes, setParticipantes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchParticipantes = async () => {
    try {
      const response = await fetch('/api/participantes');
      if (!response.ok) throw new Error('Erro ao buscar participantes');
      const data = await response.json();
      setParticipantes(data);
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
    }
  };

  useEffect(() => {
    fetchParticipantes();
  }, []);
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Participantes", 14, 20);
    // Configuração da tabela
    const tableColumn = ["Nome", "Cargo", "Paróquia", "Região"];
    const tableRows = participantes.map(participante => [
      participante.nome,
      participante.cargo,
      participante.paroquia,
      participante.regiao
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
     // Salva o PDF
     doc.save("Lista_Participantes.pdf");
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Registro realizado com sucesso!");
        setFormData({ nome: '', cargo: '', paroquia: '', regiao: '' });
        fetchParticipantes();
        setIsModalOpen(false); // Fecha o modal ao finalizar
      } else {
        alert("Falha no registro.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (participante) => {
    setEditingId(participante.id);
    setFormData({
      nome: participante.nome,
      cargo: participante.cargo,
      paroquia: participante.paroquia,
      regiao: participante.regiao
    });
    setIsModalOpen(true); // Abre o modal ao iniciar uma edição
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/participantes/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Participante atualizado com sucesso!");
        setEditingId(null);
        setFormData({ nome: '', cargo: '', paroquia: '', regiao: '' });
        fetchParticipantes();
        setIsModalOpen(false); // Fecha o modal ao finalizar
      } else {
        alert("Falha ao atualizar participante.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/participantes/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Participante deletado com sucesso!");
        fetchParticipantes();
      } else {
        alert("Falha ao deletar participante.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Registro de Participantes da Conferência</h1>

      {/* Botão para abrir o modal */}
      <button onClick={() => setIsModalOpen(true)} style={{ margin: '20px 0', padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        {editingId ? 'Editar Participante' : 'Cadastrar Novo Participante'}
      </button>
      < button
        onClick={generatePDF} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#2ecc71', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >Imprimir PDF
      </button>

      {/* Modal de cadastro/edição */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>✖</button>
            <h2>{editingId ? 'Editar Participante' : 'Cadastrar Novo Participante'}</h2>
            <form onSubmit={editingId ? handleUpdate : handleSubmit}>
              <input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                value={formData.nome}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo na Igreja"
                value={formData.cargo}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                name="paroquia"
                placeholder="Paróquia"
                value={formData.paroquia}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                name="regiao"
                placeholder="Região ou Zona"
                value={formData.regiao}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button type="submit" style={{ padding: '10px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#3498db', color: 'white', cursor: 'pointer' }}>
                {editingId ? 'Atualizar' : 'Registrar'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lista de participantes */}
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Lista de Participantes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cargo</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Paróquia</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Região</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((participante) => (
            <tr key={participante.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{participante.nome}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{participante.cargo}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{participante.paroquia}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{participante.regiao}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => handleEdit(participante)} style={{ marginRight: '5px' }}>Editar</button>
                <button onClick={() => handleDelete(participante.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
