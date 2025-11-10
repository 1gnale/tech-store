import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "👌​",
    title: "Confianza garantizada",
    description: "Todos nuestros productos son probados previamente para asegurar su calidad y funcionamiento."
  },
  {
    icon: "🔒",
    title: "Compra Segura con garantía",
    description: "Todas las compras cuentan con 7 días de cambio directo contra fallos de fábrica."
  },
  {
    icon: "💬",
    title: "Soporte y Asesoría",
    description: "No tenemos problema en ayudarte con cualquier consulta técnica. ¡Pregunta con confianza!"
  }
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl mb-4 text-center">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-secondary-900 mb-3 text-center">
        {feature.title}
      </h3>
      <p className="text-secondary-600 text-center leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="caracteristicas" className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            ¿Por qué elegir TuPolirubro?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            TuPolirubro es un emprendimiento dedicado a ofrecer productos tecnológicos
            de alta calidad que combinan innovación, funcionalidad y diseño sin destruir tu bolsillo.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;