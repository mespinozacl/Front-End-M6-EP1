import MainLayout from "../layouts/MainLayout";

const Vulnerabilities = () => {
  return (
    <MainLayout>
      <h1>Demostración de Vulnerabilidades</h1>
      <section>
        <h2>Clickjacking</h2>
        <p>
          Intenta cargar esta página en un iframe para ver cómo se puede evitar este ataque con el encabezado <code>X-Frame-Options</code>.
        </p>
        <iframe
          src="/"
          style={{ width: "100%", height: "200px", border: "1px solid black" }}
          title="Clickjacking Example"
        ></iframe>
      </section>

      <section>
        <h2>Cross-Site Scripting (XSS)</h2>
        <p>
          Ingresa un script malicioso para ver cómo lo sanitizamos.
        </p>
        <form>
          <label>
            Entrada:
            <input type="text" placeholder="Escribe algo..." />
          </label>
          <button type="button" onClick={() => alert("Este es un ejemplo seguro, XSS bloqueado.")}>
            Enviar
          </button>
        </form>
      </section>
    </MainLayout>
  );
};

export default Vulnerabilities;