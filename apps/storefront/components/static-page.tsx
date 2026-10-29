export function StaticPage({ page }: { page: { title: string; paragraphs: string[] } }) {
  return (
    <main id="main-content">
      <section className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)", padding: "3rem 0" }}>
        <div className="container-x"><h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", margin: 0 }}>{page.title}</h1></div>
      </section>
      <section className="container-x" style={{ padding: "2rem 0 4rem", maxWidth: 760 }}>
        {page.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
      </section>
    </main>
  );
}
