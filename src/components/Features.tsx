import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🚚",
    title: "Envío Gratis",
    description: "Envío gratuito en pedidos superiores a $50. Recibe tus productos en 24-48 horas."
  },
  {
    icon: "🔒",
    title: "Compra Segura",
    description: "Transacciones 100% seguras con encriptación SSL y protección de datos."
  },
  {
    icon: "⚡",
    title: "Tecnología Avanzada",
    description: "Productos con la última tecnología y certificaciones de calidad internacional."
  },
  {
    icon: "🎯",
    title: "Garantía Premium",
    description: "2 años de garantía en todos nuestros productos con soporte técnico 24/7."
  },
  {
    icon: "💬",
    title: "Soporte Experto",
    description: "Equipo de expertos disponible para ayudarte con cualquier consulta técnica."
  },
  {
    icon: "♻️",
    title: "Eco-Friendly",
    description: "Comprometidos con el medio ambiente, empaques reciclables y procesos sostenibles."
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
            ¿Por qué elegir TechStore?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Nos destacamos por ofrecer la mejor experiencia de compra, productos de calidad 
            premium y un servicio al cliente excepcional.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-medium p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-secondary-600">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-secondary-600">Productos Disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
              <div className="text-secondary-600">Satisfacción</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-secondary-600">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;