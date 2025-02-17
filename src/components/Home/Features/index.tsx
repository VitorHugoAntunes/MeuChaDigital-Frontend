import FeatureItem from "./featureItem";

export default function Features() {
  return (
    <section className="mt-32">
      <h2 className="text-3xl font-semibold text-center text-text-primary">
        Tudo o que você precisa para o chá perfeito.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <FeatureItem
          title="Crie uma lista de presentes"
          description="Adicione presentes de qualquer loja e compartilhe com seus convidados."
          icon="tag"
        />

        <FeatureItem
          title="Envie convites digitais"
          description="Personalize seus convites e envie para seus convidados por e-mail."
          icon="guests"
        />

        <FeatureItem
          title="Confirmações de presença"
          description="Saiba quem vai ao seu chá e planeje tudo com antecedência."
          icon="list-checks"
        />
      </div>
    </section>
  )
}