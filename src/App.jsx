import { useMemo, useState } from "react";

const STORAGE_KEY = "cliente-onboard";

const availableScreensByPlan = {
  basico: ["Resumo da conta", "Atualizacao cadastral"],
  pro: ["Resumo da conta", "Atualizacao cadastral", "Financeiro", "Relatorios"],
  enterprise: [
    "Resumo da conta",
    "Atualizacao cadastral",
    "Financeiro",
    "Relatorios",
    "Aprovacoes",
    "Painel administrativo",
  ],
};

function App() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    plano: "basico",
  });
  const [savedAt, setSavedAt] = useState("");

  const suggestedScreens = useMemo(
    () => availableScreensByPlan[formData.plano] ?? [],
    [formData.plano],
  );

  function onChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      telasLiberadas: availableScreensByPlan[formData.plano] ?? [],
      cadastradoEm: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedAt(new Date().toLocaleString("pt-BR"));
  }

  return (
    <main className="card">
      <h2>Onboard de cliente</h2>
      <p className="sub">Cadastre os dados para liberar as telas do sistema.</p>

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Nome do cliente
          <input
            name="nome"
            value={formData.nome}
            onChange={onChange}
            required
            placeholder="Ex.: Ana Oliveira"
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            placeholder="ana@empresa.com"
          />
        </label>

        <label>
          Empresa
          <input
            name="empresa"
            value={formData.empresa}
            onChange={onChange}
            required
            placeholder="Empresa XYZ"
          />
        </label>

        <label>
          Plano contratado
          <select name="plano" value={formData.plano} onChange={onChange}>
            <option value="basico">Basico</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>

        <button type="submit">Salvar onboard</button>
      </form>

      <section className="preview">
        <h3>Telas previstas para este plano</h3>
        <ul>
          {suggestedScreens.map((screen) => (
            <li key={screen}>{screen}</li>
          ))}
        </ul>
      </section>

      {savedAt ? <p className="saved">Cadastro salvo em {savedAt}</p> : null}
    </main>
  );
}

export default App;
