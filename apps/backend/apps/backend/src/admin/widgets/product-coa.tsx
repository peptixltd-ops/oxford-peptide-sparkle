import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type Batch = {
  id: string
  batch_number: string
  status: string
  variant_id?: string | null
  tests?: Array<{ purity: string; lab: string; test_date: string; document_url: string; status: string }>
}

const ProductCoaWidget = ({ data }: { data: { id: string } }) => {
  const [batches, setBatches] = useState<Batch[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    fetch(`/admin/coa?product_id=${data.id}`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`COA request failed (${response.status})`)
        return response.json()
      })
      .then((body) => {
        if (!cancelled) setBatches(body.batches || [])
      })
      .catch((reason: Error) => {
        if (!cancelled) setError(reason.message)
      })
    return () => {
      cancelled = true
    }
  }, [data.id])

  return (
    <section style={{ marginTop: 16, padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Certificates of Analysis</h2>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>Product → batch → test. Research use only.</p>
      {error ? <p style={{ color: "#991b1b" }}>{error}</p> : null}
      {!batches.length && !error ? <p style={{ fontSize: 14 }}>No batches recorded for this product yet.</p> : null}
      <ul style={{ display: "grid", gap: 8, padding: 0, listStyle: "none" }}>
        {batches.map((batch) => (
          <li key={batch.id} style={{ fontSize: 13 }}>
            <strong>{batch.batch_number}</strong> · {batch.status}
            {(batch.tests || []).map((test, index) => (
              <div key={`${batch.id}-${index}`}>
                {test.purity} · {test.lab} · {test.test_date} · {test.status}
                {test.document_url ? (
                  <>
                    {" "}
                    · <a href={test.document_url}>document</a>
                  </>
                ) : null}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductCoaWidget
