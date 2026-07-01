type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
